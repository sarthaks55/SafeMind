using SafeMind.Core.Entities;

namespace SafeMind.Core.Interfaces
{
    public interface IOtpService
    {
        Task SendOtpAsync(User user);
        Task VerifyOtpAsync(long userId, string otp);
    }
}
