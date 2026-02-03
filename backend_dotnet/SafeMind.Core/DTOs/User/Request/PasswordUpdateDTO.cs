using System.ComponentModel.DataAnnotations;

namespace SafeMind.Core.DTOs.User.Request
{
    public class PasswordUpdateDTO
    {
        [Required(ErrorMessage = "Old password is required")]
        public string OldPassword { get; set; } = string.Empty;

        [Required(ErrorMessage = "New password is required")]
        [StringLength(64, MinimumLength = 6, ErrorMessage = "New password must be between 6 and 64 characters")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$", ErrorMessage = "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character")]
        public string NewPassword { get; set; } = string.Empty;
    }
}
