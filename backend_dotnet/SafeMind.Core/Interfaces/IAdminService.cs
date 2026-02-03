using SafeMind.Core.DTOs.Admin.Request;
using SafeMind.Core.DTOs.Admin.Response;
using SafeMind.Core.DTOs.User.Request;

namespace SafeMind.Core.Interfaces
{
    public interface IAdminService
    {
        Task UpdateOwnProfileAsync(long adminId, AdminUpdateDTO dto);
        Task UpdatePasswordAsync(long userId, PasswordUpdateDTO dto);
        Task<List<AdminUserViewDTO>> GetAllUsersAsync();
        Task UpdateUserActivationAsync(long userId, bool isActive);
        Task<List<AdminProfessionalViewDTO>> GetAllProfessionalsAsync();
        Task UpdateProfessionalVerificationAsync(long userId, bool isVerified);
    }
}
