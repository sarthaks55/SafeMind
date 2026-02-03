using SafeMind.Core.DTOs.Auth;
using SafeMind.Core.DTOs.User.Request;
using SafeMind.Core.DTOs.User.Response;
using SafeMind.Core.Entities;

namespace SafeMind.Core.Interfaces
{
    public interface IUserService
    {
        Task<User> RegisterUserAsync(RegisterDTO dto);
        Task<Professional> RegisterProfessionalAsync(RegisterProfessionalDTO dto);
        Task<User> UpdateProfileAsync(long userId, UserUpdateDTO dto);
        Task UpdatePasswordAsync(long userId, PasswordUpdateDTO dto);
        Task<UserUpdateDTO> GetProfileAsync(long userId);
        Task<List<ProfessionalViewDTO>> GetAllProfessionalsAsync();
        Task CancelConfirmedAppointmentAsync(long appointmentId, long userId);
    }
}
