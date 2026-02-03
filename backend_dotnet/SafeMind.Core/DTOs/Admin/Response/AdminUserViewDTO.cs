using SafeMind.Core.Enums;

namespace SafeMind.Core.DTOs.Admin.Response
{
    public class AdminUserViewDTO
    {
        public long UserId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public Gender? Gender { get; set; }
        public bool IsActive { get; set; }
    }
}
