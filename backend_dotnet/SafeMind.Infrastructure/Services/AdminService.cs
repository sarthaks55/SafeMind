using Microsoft.EntityFrameworkCore;
using SafeMind.Core.DTOs.Admin.Request;
using SafeMind.Core.DTOs.Admin.Response;
using SafeMind.Core.DTOs.User.Request;
using SafeMind.Core.Entities;
using SafeMind.Core.Interfaces;
using SafeMind.Infrastructure.Data;

namespace SafeMind.Infrastructure.Services
{
    public class AdminService : IAdminService
    {
        private readonly ApplicationDbContext _context;
        private readonly INotificationService _notificationService;

        public AdminService(ApplicationDbContext context, INotificationService notificationService)
        {
            _context = context;
            _notificationService = notificationService;
        }

        public async Task UpdateOwnProfileAsync(long adminId, AdminUpdateDTO dto)
        {
            var admin = await _context.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.UserId == adminId);
            if (admin == null) throw new Exception("Admin not found");

            if (admin.Role.RoleName != "ROLE_ADMIN")
            {
                throw new Exception("Not an admin");
            }

            if (!string.IsNullOrEmpty(dto.FullName)) admin.FullName = dto.FullName;
            if (!string.IsNullOrEmpty(dto.Email)) admin.Email = dto.Email;
            if (!string.IsNullOrEmpty(dto.Phone)) admin.Phone = dto.Phone;
            if (dto.Gender.HasValue) admin.Gender = dto.Gender.Value;

            await _context.SaveChangesAsync();
        }

        public async Task UpdatePasswordAsync(long userId, PasswordUpdateDTO dto)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) throw new Exception("User not found");

            if (!BCrypt.Net.BCrypt.Verify(dto.OldPassword, user.PasswordHash))
            {
                throw new Exception("Old password incorrect");
            }

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            await _context.SaveChangesAsync();
        }

        public async Task<List<AdminUserViewDTO>> GetAllUsersAsync()
        {
            return await _context.Users
                .Include(u => u.Role)
                .Where(u => u.Role.RoleName == "ROLE_USER")
                .Select(u => new AdminUserViewDTO
                {
                    UserId = u.UserId,
                    FullName = u.FullName,
                    Email = u.Email,
                    Phone = u.Phone,
                    Gender = u.Gender,
                    IsActive = u.IsActive
                })
                .ToListAsync();
        }

        public async Task UpdateUserActivationAsync(long userId, bool isActive)
        {
            var user = await _context.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.UserId == userId);
            if (user == null) throw new Exception("User not found");

            if (user.Role.RoleName != "ROLE_USER")
            {
                throw new Exception("Not a USER");
            }

            user.IsActive = isActive;
            await _context.SaveChangesAsync();
        }

        public async Task<List<AdminProfessionalViewDTO>> GetAllProfessionalsAsync()
        {
            return await _context.Professionals
                .Include(p => p.User)
                .Select(p => new AdminProfessionalViewDTO
                {
                    ProfessionalId = p.ProfessionalId,
                    UserId = p.UserId,
                    FullName = p.User.FullName,
                    Email = p.User.Email,
                    IsVerified = p.IsVerified
                })
                .ToListAsync();
        }

        public async Task UpdateProfessionalVerificationAsync(long userId, bool isVerified)
        {
            var professional = await _context.Professionals
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.UserId == userId);

            if (professional == null) throw new Exception("Professional not found");

            professional.IsVerified = isVerified;
            await _context.SaveChangesAsync();

            /* NOTIFY PROFESSIONAL */
            string message = isVerified
                ? "Your professional account has been verified."
                : "Your professional account has been rejected.";

            await _notificationService.SendInAppNotificationAsync(
                professional.UserId,
                "Account Verification Status",
                message
            );

            await _notificationService.SendEmailNotificationAsync(
                professional.User.Email,
                "Verification Update",
                message
            );
        }
    }
}
