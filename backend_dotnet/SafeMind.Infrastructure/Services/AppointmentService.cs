using SafeMind.Core.DTOs.Appointment.Request;
using SafeMind.Core.DTOs.Appointment.Response;
using SafeMind.Core.Entities;
using SafeMind.Core.Enums;
using SafeMind.Core.Interfaces;
using SafeMind.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace SafeMind.Infrastructure.Services
{
    public class AppointmentService : IAppointmentService
    {
        private readonly ApplicationDbContext _context;

        public AppointmentService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<AppointmentResponseDTO> BookAppointmentAsync(AppointmentRequestDTO dto, long userId)
        {
            var professional = await _context.Professionals
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.ProfessionalId == dto.ProfessionalId);
            
            if (professional == null) throw new Exception("Professional not found");

            // Basic validation: Check availability (omitted for brevity, can iterate Availabilities)
            // Check conflicts
            var conflict = await _context.Appointments
                .AnyAsync(a => a.ProfessionalId == dto.ProfessionalId && 
                               a.Status != AppointmentStatus.CANCELLED &&
                               a.StartTime == dto.StartTime);
            
            if (conflict) throw new Exception("Slot already booked");

            // Assume 1 hour duration or passed in DTO? Java DTO didn't have end time, likely fixed duration.
            // ProfessionalAvailability likely defines slots.
            // Let's assume 1 hour for now.
             var endTime = dto.StartTime.AddHours(1);

            var appointment = new Appointment
            {
                UserId = userId,
                ProfessionalId = dto.ProfessionalId,
                StartTime = dto.StartTime,
                EndTime = endTime,
                Status = AppointmentStatus.PENDING, // or CONFIRMED if auto-confirm
                CreatedAt = DateTime.UtcNow
            };

            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();

            // Fetch User for response name
            var user = await _context.Users.FindAsync(userId);

            return new AppointmentResponseDTO
            {
                AppointmentId = appointment.AppointmentId,
                UserId = userId,
                FullName = user?.FullName,
                ProfessionalName = professional.User.FullName,
                StartTime = appointment.StartTime,
                EndTime = appointment.EndTime,
                Status = appointment.Status.ToString()
            };
        }

        public async Task CancelAppointmentAsync(long appointmentId, long userId)
        {
            var appointment = await _context.Appointments.FindAsync(appointmentId);
            if (appointment == null) throw new Exception("Appointment not found");

            if (appointment.UserId != userId) throw new Exception("Unauthorized");

            appointment.Status = AppointmentStatus.CANCELLED;
            appointment.CancellationReason = "Cancelled by user";
            await _context.SaveChangesAsync();
        }

        public async Task<List<AppointmentResponseDTO>> GetUserAppointmentsAsync(long userId)
        {
            return await _context.Appointments
                .Include(a => a.User)
                .Include(a => a.Professional).ThenInclude(p => p.User)
                .Where(a => a.UserId == userId)
                .OrderByDescending(a => a.StartTime)
                .Select(a => new AppointmentResponseDTO
                {
                    AppointmentId = a.AppointmentId,
                    UserId = a.UserId,
                    FullName = a.User.FullName,
                    ProfessionalName = a.Professional.User.FullName,
                    StartTime = a.StartTime,
                    EndTime = a.EndTime,
                    Status = a.Status.ToString()
                })
                .ToListAsync();
        }

        public async Task<List<AppointmentResponseDTO>> GetProfessionalAppointmentsAsync(long professionalUserId)
        {
            var professional = await _context.Professionals.FirstOrDefaultAsync(p => p.UserId == professionalUserId);
            if (professional == null) throw new Exception("Professional not found");

            return await _context.Appointments
                .Include(a => a.User)
                .Include(a => a.Professional).ThenInclude(p => p.User)
                .Where(a => a.ProfessionalId == professional.ProfessionalId)
                .OrderByDescending(a => a.StartTime) // Or ascending for schedule
                 .Select(a => new AppointmentResponseDTO
                {
                    AppointmentId = a.AppointmentId,
                    UserId = a.UserId,
                    FullName = a.User.FullName,
                    ProfessionalName = a.Professional.User.FullName,
                    StartTime = a.StartTime,
                    EndTime = a.EndTime,
                Status = a.Status.ToString()
                })
                .ToListAsync();
        }

        public async Task<AppointmentResponseDTO> UpdateAppointmentStatusAsync(long appointmentId, AppointmentStatusUpdateDTO dto, long professionalUserId)
        {
            var professional = await _context.Professionals.FirstOrDefaultAsync(p => p.UserId == professionalUserId);
            if (professional == null) throw new Exception("Professional not found");

            var appointment = await _context.Appointments
                .Include(a => a.User)
                .Include(a => a.Professional).ThenInclude(p => p.User)
                .FirstOrDefaultAsync(a => a.AppointmentId == appointmentId);
            
            if (appointment == null) throw new Exception("Appointment not found");
            if (appointment.ProfessionalId != professional.ProfessionalId) throw new Exception("Unauthorized");

            appointment.Status = dto.Status;
            await _context.SaveChangesAsync();

            return new AppointmentResponseDTO
            {
                AppointmentId = appointment.AppointmentId,
                UserId = appointment.UserId,
                FullName = appointment.User.FullName,
                ProfessionalName = appointment.Professional.User.FullName,
                StartTime = appointment.StartTime,
                EndTime = appointment.EndTime,
                Status = appointment.Status.ToString()
            };
        }

        public async Task<List<AppointmentResponseDTO>> GetAllAppointmentsAsync()
        {
             return await _context.Appointments
                .Include(a => a.User)
                .Include(a => a.Professional).ThenInclude(p => p.User)
                .OrderByDescending(a => a.StartTime)
                .Select(a => new AppointmentResponseDTO
                {
                    AppointmentId = a.AppointmentId,
                    UserId = a.UserId,
                    FullName = a.User.FullName,
                    ProfessionalName = a.Professional.User.FullName,
                    StartTime = a.StartTime,
                    EndTime = a.EndTime,
                    Status = a.Status.ToString()
                })
                .ToListAsync();
        }

        public async Task<List<AppointmentResponseDTO>> GetAppointmentsByStatusAsync(AppointmentStatus status)
        {
             return await _context.Appointments
                .Include(a => a.User)
                .Include(a => a.Professional).ThenInclude(p => p.User)
                .Where(a => a.Status == status)
                .OrderByDescending(a => a.StartTime)
                .Select(a => new AppointmentResponseDTO
                {
                    AppointmentId = a.AppointmentId,
                    UserId = a.UserId,
                    FullName = a.User.FullName,
                    ProfessionalName = a.Professional.User.FullName,
                    StartTime = a.StartTime,
                    EndTime = a.EndTime,
                    Status = a.Status.ToString()
                })
                .ToListAsync();
        }

        public async Task<List<AppointmentResponseDTO>> GetAppointmentsByUserIdAsync(long userId)
        {
            return await GetUserAppointmentsAsync(userId);
        }

        public async Task<List<AppointmentResponseDTO>> GetAppointmentsByProfessionalIdAsync(long professionalId)
        {
            // Note: input is professionalId (table id), but reused method takes userId. 
            // Wait, GetProfessionalAppointmentsAsync takes professionalUserId.
            // AdminController in Java passed professionalId (from path variable).
            // Let's check Java AdminController again.
            // @GetMapping("/appointments/professional/{professionalId}") ... service.getAppointmentsByProfessional(professionalId)
            
            // Java AppointmentServiceImpl: getAppointmentsByProfessional(Long professionalId) -> repo.findByProfessionalId...
            
            // My existing GetProfessionalAppointmentsAsync takes professionalUserId.
            // I should implement a new one or reuse if I can map.
            
            // Let's implement specific one for ProfessionalId (pk of Professional table)
             return await _context.Appointments
                .Include(a => a.User)
                .Include(a => a.Professional).ThenInclude(p => p.User)
                .Where(a => a.ProfessionalId == professionalId)
                .OrderByDescending(a => a.StartTime)
                .Select(a => new AppointmentResponseDTO
                {
                    AppointmentId = a.AppointmentId,
                    UserId = a.UserId,
                    FullName = a.User.FullName,
                    ProfessionalName = a.Professional.User.FullName,
                    StartTime = a.StartTime,
                    EndTime = a.EndTime,
                    Status = a.Status.ToString()
                })
                .ToListAsync();
        }

        public async Task<List<AppointmentResponseDTO>> GetAppointmentsBetweenDatesAsync(DateTime start, DateTime end)
        {
             return await _context.Appointments
                .Include(a => a.User)
                .Include(a => a.Professional).ThenInclude(p => p.User)
                .Where(a => a.StartTime >= start && a.StartTime <= end)
                .OrderByDescending(a => a.StartTime)
                .Select(a => new AppointmentResponseDTO
                {
                    AppointmentId = a.AppointmentId,
                    UserId = a.UserId,
                    FullName = a.User.FullName,
                    ProfessionalName = a.Professional.User.FullName,
                    StartTime = a.StartTime,
                    EndTime = a.EndTime,
                    Status = a.Status.ToString()
                })
                .ToListAsync();
        }
    }
}
