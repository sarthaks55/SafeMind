using System.ComponentModel.DataAnnotations;
using SafeMind.Core.Enums;

namespace SafeMind.Core.DTOs.Auth
{
    public class RegisterDTO
    {
        [Required(ErrorMessage = "Full name is required")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Full name must be between 3 and 50 characters")]
        [RegularExpression(@"^[A-Za-z .'-]+$", ErrorMessage = "Full name can contain only letters, spaces, dots, hyphens and apostrophes")]
        public string FullName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is required")]
        [StringLength(64, MinimumLength = 6, ErrorMessage = "Password must be between 6 and 64 characters")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#^()_+=<>-]).{6,64}$", ErrorMessage = "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character")]
        public string Password { get; set; } = string.Empty;

        [Required(ErrorMessage = "Phone number is required")]
        [RegularExpression(@"^[6-9]\d{9}$", ErrorMessage = "Phone number must be a valid 10-digit Indian mobile number")]
        public string Phone { get; set; } = string.Empty;

        public Gender? Gender { get; set; }

        // Role is handled by logic or default
        public string Role { get; set; } = "ROLE_USER"; 
    }
}
