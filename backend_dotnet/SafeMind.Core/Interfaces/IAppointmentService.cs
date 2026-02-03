using SafeMind.Core.DTOs.Appointment.Request;
using SafeMind.Core.DTOs.Appointment.Response;
using SafeMind.Core.Enums;

namespace SafeMind.Core.Interfaces
{
    public interface IAppointmentService
    {
        Task<AppointmentResponseDTO> BookAppointmentAsync(AppointmentRequestDTO dto, long userId);
        Task CancelAppointmentAsync(long appointmentId, long userId);
        Task<List<AppointmentResponseDTO>> GetUserAppointmentsAsync(long userId);
         Task<List<AppointmentResponseDTO>> GetProfessionalAppointmentsAsync(long professionalUserId);
        Task<AppointmentResponseDTO> UpdateAppointmentStatusAsync(long appointmentId, AppointmentStatusUpdateDTO dto, long professionalUserId);
        
        // ADMIN
        Task<List<AppointmentResponseDTO>> GetAllAppointmentsAsync();
        Task<List<AppointmentResponseDTO>> GetAppointmentsByStatusAsync(AppointmentStatus status);
        Task<List<AppointmentResponseDTO>> GetAppointmentsByUserIdAsync(long userId);
        Task<List<AppointmentResponseDTO>> GetAppointmentsByProfessionalIdAsync(long professionalId);
        Task<List<AppointmentResponseDTO>> GetAppointmentsBetweenDatesAsync(DateTime start, DateTime end);
    }
}
