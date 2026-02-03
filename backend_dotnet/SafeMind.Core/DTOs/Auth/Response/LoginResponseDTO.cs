namespace SafeMind.Core.DTOs.Auth.Response
{
    public class LoginResponseDTO
    {
        public string Token { get; set; }

        public LoginResponseDTO(string token)
        {
            Token = token;
        }
    }
}
