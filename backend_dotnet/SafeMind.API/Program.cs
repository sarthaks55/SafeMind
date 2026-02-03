using SafeMind.Core.Interfaces;
using SafeMind.Infrastructure.Data;
using SafeMind.Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Net.WebSockets;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
    });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Database
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
if (string.IsNullOrEmpty(connectionString))
{
    // Fallback or error? For now fallback to a default or error.
    // Assuming config exists.
}
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// Authentication
var key = builder.Configuration["Jwt:Key"] ?? "super_secret_key_must_be_long_enough_for_hmac_sha256";
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false, // Set to true if Issuer is configured
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
        };
    });

// Services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IOtpService, OtpService>();
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<IProfessionalService, ProfessionalService>();
builder.Services.AddScoped<IAppointmentService, AppointmentService>();
builder.Services.AddScoped<IVideoSessionService, VideoSessionService>();
builder.Services.AddScoped<IDiaryService, DiaryService>();
builder.Services.AddScoped<IMoodService, MoodService>();
builder.Services.AddScoped<INotificationService, NotificationService>();
builder.Services.AddScoped<IAssessmentService, AssessmentService>();
builder.Services.AddScoped<IAdminService, AdminService>();
// builder.Services.AddScoped<ISmsService, SmsService>(); 

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
    app.UseSwagger();
    app.UseSwaggerUI();
// }

// Enable accepting WebSocket connections in this .NET app and act as a transparent
// proxy for the signaling endpoint. This helps when the frontend attempts to open
// a WebSocket to the configured host/port but the upstream signaling server
// (Spring Boot) is unreachable directly from the browser environment. The proxy
// will forward frames between the browser and the Java signaling server.
app.UseWebSockets();

app.Map("/ws/signaling", async context =>
{
    if (!context.WebSockets.IsWebSocketRequest)
    {
        context.Response.StatusCode = 400;
        return;
    }

    // Accept incoming WebSocket from client (browser)
    using var inboundSocket = await context.WebSockets.AcceptWebSocketAsync();

    // Target upstream signaling server (Spring Boot). Keep this aligned with your
    // actual Java backend address. Using wss://localhost:8443 by default.
    var upstreamUri = new Uri(builder.Configuration["Signaling:UpstreamWs"] ?? "wss://localhost:8443/ws/signaling");

    // In development with self-signed certs we may need to relax cert validation.
    // WARNING: This is only for local development. Do NOT use in production.
    System.Net.ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

    using var outboundSocket = new System.Net.WebSockets.ClientWebSocket();
    try
    {
        await outboundSocket.ConnectAsync(upstreamUri, CancellationToken.None);
    }
    catch (Exception ex)
    {
        // Unable to connect to upstream - close inbound and return
        try { await inboundSocket.CloseAsync(WebSocketCloseStatus.InternalServerError, "Upstream connect failed", CancellationToken.None); } catch { }
        Console.WriteLine("WebSocket proxy: failed to connect to upstream: " + ex.Message);
        return;
    }

    // Relay loop - copy messages in both directions
    var clientToServer = Task.Run(async () =>
    {
        var buffer = new byte[8192];
        try
        {
            while (inboundSocket.State == WebSocketState.Open && outboundSocket.State == WebSocketState.Open)
            {
                var result = await inboundSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                if (result.MessageType == WebSocketMessageType.Close)
                {
                    await outboundSocket.CloseOutputAsync(WebSocketCloseStatus.NormalClosure, "Client closed", CancellationToken.None);
                    break;
                }

                await outboundSocket.SendAsync(new ArraySegment<byte>(buffer, 0, result.Count), result.MessageType, result.EndOfMessage, CancellationToken.None);
            }
        }
        catch (Exception) { }
    });

    var serverToClient = Task.Run(async () =>
    {
        var buffer = new byte[8192];
        try
        {
            while (inboundSocket.State == WebSocketState.Open && outboundSocket.State == WebSocketState.Open)
            {
                var result = await outboundSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                if (result.MessageType == WebSocketMessageType.Close)
                {
                    await inboundSocket.CloseOutputAsync(WebSocketCloseStatus.NormalClosure, "Upstream closed", CancellationToken.None);
                    break;
                }

                await inboundSocket.SendAsync(new ArraySegment<byte>(buffer, 0, result.Count), result.MessageType, result.EndOfMessage, CancellationToken.None);
            }
        }
        catch (Exception) { }
    });

    await Task.WhenAny(clientToServer, serverToClient);

    try { inboundSocket.Abort(); } catch { }
    try { outboundSocket.Abort(); } catch { }
});

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Seed Database
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<ApplicationDbContext>();
    await DbInitializer.Initialize(context);
}

app.Run();
