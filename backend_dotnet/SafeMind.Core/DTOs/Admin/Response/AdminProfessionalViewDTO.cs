namespace SafeMind.Core.DTOs.Admin.Response
{
    public class AdminProfessionalViewDTO
    {
        public long ProfessionalId { get; set; }
        public long UserId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public bool IsVerified { get; set; }
    }
}
