namespace SafeMind.Core.DTOs.Auth
{
    public class OtpVerifyDTO
    {
        public long UserId { get; set; }
        public string Otp { get; set; } = string.Empty;
    }
}
