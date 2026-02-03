namespace SafeMind.Core.DTOs.Auth.Response
{
    public class RegisterResponseDTO
    {
        public long UserId { get; set; }
        public string Message { get; set; }

        public RegisterResponseDTO(long userId, string message)
        {
            UserId = userId;
            Message = message;
        }
    }
}
