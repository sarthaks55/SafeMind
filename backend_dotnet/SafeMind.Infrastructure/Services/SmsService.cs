using SafeMind.Core.Interfaces;

namespace SafeMind.Infrastructure.Services
{
    public class SmsService : ISmsService
    {
         public Task SendSmsAsync(string to, string message)
        {
            System.Console.WriteLine($"[SmsService] To: {to}, Message: {message}");
            return Task.CompletedTask;
        }
    }
}
