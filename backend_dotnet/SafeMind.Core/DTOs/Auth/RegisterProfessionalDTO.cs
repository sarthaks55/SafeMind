using System.ComponentModel.DataAnnotations;
using SafeMind.Core.Enums;

namespace SafeMind.Core.DTOs.Auth
{
    public class RegisterProfessionalDTO
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

        [Required(ErrorMessage = "Gender is required")]
        public Gender Gender { get; set; }

        public string Role { get; set; } = "ROLE_PROFESSIONAL";

        [Required(ErrorMessage = "Specialization is required")]
        public Specialization Specialization { get; set; }

        [Range(0, 60, ErrorMessage = "Experience seems invalid")]
        public int ExperienceYears { get; set; }

        [Required(ErrorMessage = "Qualification is required")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Qualification must be between 2 and 100 characters")]
        public string Qualification { get; set; } = string.Empty;

        [StringLength(500, ErrorMessage = "Bio must not exceed 500 characters")]
        public string? Bio { get; set; }

        [Required(ErrorMessage = "Consultation fee is required")]
        [Range(0.1, double.MaxValue, ErrorMessage = "Consultation fee must be greater than 0")]
        public decimal ConsultationFee { get; set; }

        [Required(ErrorMessage = "Spoken language is required")]
        public SpokenLanguage SpokenLanguage { get; set; }
    }
}
