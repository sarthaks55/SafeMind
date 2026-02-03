using SafeMind.Core.Enums;

namespace SafeMind.Core.DTOs.User.Response
{
    public class ProfessionalViewDTO
    {
        public long ProfessionalId { get; set; }
        public long UserId { get; set; }
        public string FullName { get; set; } = string.Empty;
        public Gender? Gender { get; set; }
        
        public Specialization Specialization { get; set; }
        public int ExperienceYears { get; set; }
        public string? Qualification { get; set; }
        public string? Bio { get; set; }
        public decimal ConsultationFee { get; set; }
        public SpokenLanguage SpokenLanguage { get; set; }
        public bool IsVerified { get; set; }
    }
}
