using System.ComponentModel.DataAnnotations;
using SafeMind.Core.Enums;

namespace SafeMind.Core.DTOs.Professional.Request
{
    public class ProfessionalUpdateDTO
    {
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Full name must be between 3 and 50 characters")]
        [RegularExpression(@"^[A-Za-z ]+$", ErrorMessage = "Full name can contain only letters and spaces")]
        public string? FullName { get; set; }

        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string? Email { get; set; }

        [RegularExpression(@"^[6-9]\d{9}$", ErrorMessage = "Phone number must be a valid 10-digit Indian mobile number")]
        public string? Phone { get; set; }

        public Gender? Gender { get; set; }

        public Specialization? Specialization { get; set; }
        public SpokenLanguage? SpokenLanguage { get; set; }

        [Range(0, 60)]
        public int? ExperienceYears { get; set; }

        [StringLength(100, MinimumLength = 2)]
        public string? Qualification { get; set; }

        [StringLength(500)]
        public string? Bio { get; set; }

        [Range(0.1, double.MaxValue)]
        public decimal? ConsultationFee { get; set; }
    }
}
