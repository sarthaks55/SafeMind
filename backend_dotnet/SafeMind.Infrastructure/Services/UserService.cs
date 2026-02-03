using SafeMind.Core.DTOs.Auth;
using SafeMind.Core.DTOs.User.Request;
using SafeMind.Core.DTOs.User.Response;
using SafeMind.Core.Entities;
using SafeMind.Core.Enums;
using SafeMind.Core.Interfaces;
using SafeMind.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

namespace SafeMind.Infrastructure.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;
        private readonly IOtpService _otpService;

        public UserService(ApplicationDbContext context, IOtpService otpService)
        {
            _context = context;
            _otpService = otpService;
        }

        public async Task<User> RegisterUserAsync(RegisterDTO dto)
        {
            if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
            {
                throw new Exception("Email already registered");
            }

            var role = await _context.Roles.FirstOrDefaultAsync(r => r.RoleName == "ROLE_USER")
                       ?? new Role { RoleName = "ROLE_USER" };
            
            if (role.RoleId == 0)
            {
                _context.Roles.Add(role);
            }

            var user = new User
            {
                FullName = dto.FullName,
                Email = dto.Email,
                Phone = dto.Phone,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = role,
                Gender = dto.Gender,
                IsActive = true,
                IsDeleted = false
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            await _otpService.SendOtpAsync(user);

            return user;
        }

        public async Task<Professional> RegisterProfessionalAsync(RegisterProfessionalDTO dto)
        {
             if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
            {
                throw new Exception("Email already registered");
            }

             var role = await _context.Roles.FirstOrDefaultAsync(r => r.RoleName == "ROLE_PROFESSIONAL")
                       ?? new Role { RoleName = "ROLE_PROFESSIONAL" };

             if (role.RoleId == 0)
            {
                _context.Roles.Add(role);
            }

            var user = new User
            {
                FullName = dto.FullName,
                Email = dto.Email,
                Phone = dto.Phone,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = role,
                Gender = dto.Gender,
                IsActive = false,
                IsDeleted = false
            };

            var professional = new Professional
            {
                User = user,
                Specialization = dto.Specialization,
                SpokenLanguage = dto.SpokenLanguage,
                ExperienceYears = dto.ExperienceYears,
                Qualification = dto.Qualification,
                Bio = dto.Bio,
                ConsultationFee = dto.ConsultationFee,
                IsVerified = false
            };

            _context.Users.Add(user);
            _context.Professionals.Add(professional);
            await _context.SaveChangesAsync();

            await _otpService.SendOtpAsync(user);

            return professional;
        }

        public async Task<User> UpdateProfileAsync(long userId, UserUpdateDTO dto)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) throw new Exception("User not found");

            if (!string.IsNullOrEmpty(dto.FullName)) user.FullName = dto.FullName;
            if (!string.IsNullOrEmpty(dto.Phone)) user.Phone = dto.Phone;
            if (dto.Gender.HasValue) user.Gender = dto.Gender.Value;
            
            // Note: Email update might require re-verification, skipping for simplicity as per Java logic usually or keeping it simple.

            await _context.SaveChangesAsync();
            return user;
        }

        public async Task UpdatePasswordAsync(long userId, PasswordUpdateDTO dto)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) throw new Exception("User not found");

            if (!BCrypt.Net.BCrypt.Verify(dto.OldPassword, user.PasswordHash))
            {
                throw new Exception("Invalid old password");
            }

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            await _context.SaveChangesAsync();
        }

        public async Task<UserUpdateDTO> GetProfileAsync(long userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) throw new Exception("User not found");

            return new UserUpdateDTO
            {
                FullName = user.FullName,
                Email = user.Email,
                Phone = user.Phone,
                Gender = user.Gender
            };
        }

        public async Task<List<ProfessionalViewDTO>> GetAllProfessionalsAsync()
        {
            return await _context.Professionals
                .Include(p => p.User)
                .Select(p => new ProfessionalViewDTO
                {
                    ProfessionalId = p.ProfessionalId,
                    UserId = p.UserId,
                    FullName = p.User.FullName,
                    Gender = p.User.Gender,
                    Specialization = p.Specialization,
                    ExperienceYears = p.ExperienceYears,
                    Qualification = p.Qualification,
                    Bio = p.Bio,
                    ConsultationFee = p.ConsultationFee,
                    SpokenLanguage = p.SpokenLanguage,
                    IsVerified = p.IsVerified
                })
                .ToListAsync();
        }

        public async Task CancelConfirmedAppointmentAsync(long appointmentId, long userId)
        {
            var appointment = await _context.Appointments
                .Include(a => a.User)
                .FirstOrDefaultAsync(a => a.AppointmentId == appointmentId);

            if (appointment == null) throw new Exception("Appointment not found");
            if (appointment.UserId != userId) throw new Exception("Unauthorized to cancel this appointment");

            appointment.Status = AppointmentStatus.CANCELLED;
            appointment.CancellationReason = "Cancelled by user";
            
            await _context.SaveChangesAsync();
        }
    }
}
