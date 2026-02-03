using SafeMind.Core.DTOs.Appointment.Request;
using SafeMind.Core.DTOs.Professional.Request;
using SafeMind.Core.DTOs.Professional.Response;
using SafeMind.Core.DTOs.User.Request;
using SafeMind.Core.Entities;

namespace SafeMind.Core.Interfaces
{
    public interface IProfessionalService
    {
        Task<ProfessionalUpdateDTO> UpdateProfessionalProfileAsync(long userId, ProfessionalUpdateDTO dto);
        Task<ProfessionalUpdateDTO> GetProfessionalProfileAsync(long userId);
        Task UpdatePasswordAsync(long userId, PasswordUpdateDTO dto); // Can reuse IUserService potentially, but keeping separate if logic differs
        Task UpdateAppointmentStatusAsync(long professionalUserId, long appointmentId, ProfessionalAppointmentStatusDTO dto);
        Task<ProfessionalAvailabilityResponseDTO> AddAvailabilityAsync(long professionalUserId, ProfessionalAvailabilityDTO dto);
        Task<List<ProfessionalAvailabilityResponseDTO>> GetMyAvailabilityAsync(long professionalUserId);
        Task DeleteAvailabilityAsync(long professionalUserId, long availabilityId);
    }
}
