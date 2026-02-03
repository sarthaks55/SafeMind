using SafeMind.Core.DTOs.Appointment.Request;
using SafeMind.Core.DTOs.Professional.Request;
using SafeMind.Core.DTOs.Professional.Response;
using SafeMind.Core.DTOs.User.Request;
using SafeMind.Core.Entities;
using SafeMind.Core.Enums;
using SafeMind.Core.Interfaces;
using SafeMind.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

namespace SafeMind.Infrastructure.Services
{
    public class ProfessionalService : IProfessionalService
    {
        private readonly ApplicationDbContext _context;

        public ProfessionalService(ApplicationDbContext context)
        {
            _context = context;
        }

        private async Task<Professional> GetProfessionalByUserId(long userId)
        {
             var prof = await _context.Professionals
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.UserId == userId);
            
            if (prof == null) throw new Exception("Professional profile not found for this user");
            return prof;
        }

        public async Task<ProfessionalUpdateDTO> UpdateProfessionalProfileAsync(long userId, ProfessionalUpdateDTO dto)
        {
            var prof = await GetProfessionalByUserId(userId);
            var user = prof.User;

            // Update User fields
            if (!string.IsNullOrEmpty(dto.FullName)) user.FullName = dto.FullName;
            if (!string.IsNullOrEmpty(dto.Phone)) user.Phone = dto.Phone;
            if (dto.Gender.HasValue) user.Gender = dto.Gender.Value;

            // Update Professional fields
            if (dto.Specialization.HasValue) prof.Specialization = dto.Specialization.Value;
            if (dto.SpokenLanguage.HasValue) prof.SpokenLanguage = dto.SpokenLanguage.Value;
            if (dto.ExperienceYears.HasValue) prof.ExperienceYears = dto.ExperienceYears.Value;
            if (!string.IsNullOrEmpty(dto.Qualification)) prof.Qualification = dto.Qualification;
            if (dto.Bio != null) prof.Bio = dto.Bio;
            if (dto.ConsultationFee.HasValue) prof.ConsultationFee = dto.ConsultationFee.Value;

            await _context.SaveChangesAsync();
            
            return new ProfessionalUpdateDTO
            {
                FullName = user.FullName,
                Email = user.Email,
                Phone = user.Phone,
                Gender = user.Gender,
                Specialization = prof.Specialization,
                SpokenLanguage = prof.SpokenLanguage,
                ExperienceYears = prof.ExperienceYears,
                Qualification = prof.Qualification,
                Bio = prof.Bio,
                ConsultationFee = prof.ConsultationFee
            };
        }

        public async Task<ProfessionalUpdateDTO> GetProfessionalProfileAsync(long userId)
        {
            var prof = await GetProfessionalByUserId(userId);
             return new ProfessionalUpdateDTO
            {
                FullName = prof.User.FullName,
                Email = prof.User.Email,
                Phone = prof.User.Phone,
                Gender = prof.User.Gender,
                Specialization = prof.Specialization,
                SpokenLanguage = prof.SpokenLanguage,
                ExperienceYears = prof.ExperienceYears,
                Qualification = prof.Qualification,
                Bio = prof.Bio,
                ConsultationFee = prof.ConsultationFee
            };
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

        public async Task UpdateAppointmentStatusAsync(long professionalUserId, long appointmentId, ProfessionalAppointmentStatusDTO dto)
        {
            var prof = await GetProfessionalByUserId(professionalUserId);
            var appointment = await _context.Appointments.FindAsync(appointmentId);

            if (appointment == null) throw new Exception("Appointment not found");
            if (appointment.ProfessionalId != prof.ProfessionalId) throw new Exception("Unauthorized to update this appointment");

            appointment.Status = dto.Status;
            await _context.SaveChangesAsync();
        }

        public async Task<ProfessionalAvailabilityResponseDTO> AddAvailabilityAsync(long professionalUserId, ProfessionalAvailabilityDTO dto)
        {
            var prof = await GetProfessionalByUserId(professionalUserId);

            if (!TimeSpan.TryParse(dto.StartTime, out TimeSpan start) || !TimeSpan.TryParse(dto.EndTime, out TimeSpan end))
            {
                throw new Exception("Invalid time format. Use HH:mm");
            }

            var availability = new ProfessionalAvailability
            {
                 ProfessionalId = prof.ProfessionalId,
                 DayOfWeek = dto.DayOfWeek,
                 StartTime = start,
                 EndTime = end
            };

            _context.ProfessionalAvailabilities.Add(availability);
            await _context.SaveChangesAsync();

            return new ProfessionalAvailabilityResponseDTO(availability.AvailabilityId, availability.DayOfWeek, availability.StartTime, availability.EndTime);
        }

        public async Task<List<ProfessionalAvailabilityResponseDTO>> GetMyAvailabilityAsync(long professionalUserId)
        {
            var prof = await GetProfessionalByUserId(professionalUserId);
            
            return await _context.ProfessionalAvailabilities
                .Where(a => a.ProfessionalId == prof.ProfessionalId)
                .Select(a => new ProfessionalAvailabilityResponseDTO(a.AvailabilityId, a.DayOfWeek, a.StartTime, a.EndTime))
                .ToListAsync();
        }

        public async Task DeleteAvailabilityAsync(long professionalUserId, long availabilityId)
        {
            var prof = await GetProfessionalByUserId(professionalUserId);
            var availability = await _context.ProfessionalAvailabilities.FindAsync(availabilityId);

            if (availability == null) throw new Exception("Availability not found");
            if (availability.ProfessionalId != prof.ProfessionalId) throw new Exception("Unauthorized");

            _context.ProfessionalAvailabilities.Remove(availability);
            await _context.SaveChangesAsync();
        }
    }
}
