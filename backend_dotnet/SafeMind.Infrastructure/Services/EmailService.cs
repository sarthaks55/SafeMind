using SafeMind.Core.Interfaces;

namespace SafeMind.Infrastructure.Services
{
    public class EmailService : IEmailService
    {
        public Task SendEmailAsync(string to, string subject, string body)
        {
            // Parse arguments but do nothing (mock)
            System.Console.WriteLine($"[EmailService] To: {to}, Subject: {subject}, Body: {body}");
            return Task.CompletedTask;
        }
    }
}
