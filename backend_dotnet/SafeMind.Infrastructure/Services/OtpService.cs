using SafeMind.Core.Entities;
using SafeMind.Core.Interfaces;
using SafeMind.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace SafeMind.Infrastructure.Services
{
    public class OtpService : IOtpService
    {
        private readonly ApplicationDbContext _context;
        private readonly IEmailService _emailService;
        // private readonly ISmsService _smsService;

        public OtpService(ApplicationDbContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        public async Task SendOtpAsync(User user)
        {
            var otp = RandomNumberGenerator.GetInt32(100000, 999999).ToString();
            // Hash OTP if desired, or store plain for simplicity in demo (but better hash)
            // Storing plain here for simplicity to match Java logic if it was simple, 
            // but Java had 'otpHash'. I'll assume hash.
            // For now, let's store plain to debug easily, or simple hash.
            var otpHash = BCrypt.Net.BCrypt.HashPassword(otp);

            var verification = await _context.OtpVerifications.FirstOrDefaultAsync(o => o.UserId == user.UserId);
            if (verification == null)
            {
                verification = new OtpVerification { UserId = user.UserId, User = user };
                _context.OtpVerifications.Add(verification);
            }

            verification.OtpHash = otpHash;
            verification.ExpiresAt = DateTime.UtcNow.AddMinutes(10);
            verification.Verified = false;

            await _context.SaveChangesAsync();

            await _emailService.SendEmailAsync(user.Email, "Your OTP Code", $"Your OTP is: {otp}");
        }

        public async Task VerifyOtpAsync(long userId, string otp)
        {
            var verification = await _context.OtpVerifications.FirstOrDefaultAsync(o => o.UserId == userId);
            if (verification == null) throw new Exception("OTP not found");

            if (verification.ExpiresAt < DateTime.UtcNow) throw new Exception("OTP expired");
            
            if (!BCrypt.Net.BCrypt.Verify(otp, verification.OtpHash))
            {
                throw new Exception("Invalid OTP");
            }

            verification.Verified = true;
            
            // Also activate user if not active?
            var user = await _context.Users.FindAsync(userId);
            if (user != null)
            {
                user.IsActive = true;
            }

            await _context.SaveChangesAsync();
        }
    }
}
