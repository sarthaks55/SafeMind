using SafeMind.Core.Entities;
using SafeMind.Core.Enums;
using SafeMind.Core.Interfaces;
using SafeMind.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace SafeMind.Infrastructure.Services
{
    public class VideoSessionService : IVideoSessionService
    {
        private readonly ApplicationDbContext _context;

        public VideoSessionService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<VideoSession> CreateOrGetVideoSessionAsync(long appointmentId)
        {
            var appointment = await _context.Appointments.FindAsync(appointmentId);
            if (appointment == null) throw new Exception("Appointment not found");

            // Check if session exists
            var session = await _context.VideoSessions
                .FirstOrDefaultAsync(v => v.AppointmentId == appointmentId);
            
            if (session != null) return session;

            // Create new
            session = new VideoSession
            {
                AppointmentId = appointmentId,
                RoomToken = Guid.NewGuid().ToString(), // Simple token generation
                AllowedFrom = appointment.StartTime.AddMinutes(-5), // Allow joining 5 mins early
                AllowedUntil = appointment.EndTime.AddMinutes(10), // Allow 10 mins over
                Status = VideoSessionStatus.CREATED,
                CreatedAt = DateTime.UtcNow
            };

            _context.VideoSessions.Add(session);
            await _context.SaveChangesAsync();

            return session;
        }

        public async Task MarkParticipantJoinedAsync(long videoSessionId, bool isProfessional)
        {
             var session = await _context.VideoSessions.FindAsync(videoSessionId);
            if (session == null) throw new Exception("Session not found");

            if (isProfessional)
            {
                session.ProfessionalJoined = DateTime.UtcNow;
            }
            else
            {
                session.PatientJoined = DateTime.UtcNow;
            }

            if (session.ProfessionalJoined.HasValue && session.PatientJoined.HasValue)
            {
                session.Status = VideoSessionStatus.ACTIVE;
            }

            await _context.SaveChangesAsync();
        }

        public async Task EndSessionAsync(long videoSessionId)
        {
             var session = await _context.VideoSessions.FindAsync(videoSessionId);
            if (session == null) throw new Exception("Session not found");

            session.Status = VideoSessionStatus.COMPLETED;
            await _context.SaveChangesAsync();
        }

        public async Task<VideoSession> GetByIdAsync(long videoSessionId)
        {
             var session = await _context.VideoSessions.FindAsync(videoSessionId);
            if (session == null) throw new Exception("Session not found");
            return session;
        }
    }
}
