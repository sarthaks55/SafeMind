using Microsoft.AspNetCore.Mvc;
using SafeMind.Core.DTOs.Auth;
using SafeMind.Core.DTOs.Auth.Response;
using SafeMind.Core.Interfaces;
using SafeMind.Core.Responses;
using SafeMind.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

namespace SafeMind.API.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IOtpService _otpService;
        private readonly IJwtService _jwtService;
        private readonly ApplicationDbContext _context;

        public AuthController(IUserService userService, IOtpService otpService, IJwtService jwtService, ApplicationDbContext context)
        {
            _userService = userService;
            _otpService = otpService;
            _jwtService = jwtService;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO dto)
        {
            try
            {
                var user = await _userService.RegisterUserAsync(dto);
                var response = new RegisterResponseDTO(user.UserId, "User registered successfully. Please verify OTP.");
                return CreatedAtAction(nameof(Register), new { id = user.UserId }, 
                    ApiResponse<RegisterResponseDTO>.SuccessResponse("User registered successfully. Please verify OTP.", response));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }

        [HttpPost("registerProfessional")]
        public async Task<IActionResult> RegisterProfessional([FromBody] RegisterProfessionalDTO dto)
        {
             try
            {
                var professional = await _userService.RegisterProfessionalAsync(dto);
                var response = new RegisterResponseDTO(professional.UserId, "Professional registered successfully. Please verify OTP.");
                return CreatedAtAction(nameof(RegisterProfessional), new { id = professional.ProfessionalId }, 
                    ApiResponse<RegisterResponseDTO>.SuccessResponse("Professional registered successfully. Please verify OTP.", response));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO dto)
        {
            var user = await _context.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            {
                return Unauthorized(ApiResponse<object>.FailureResponse("Invalid email or password"));
            }

            if (!user.IsActive)
            {
                return Unauthorized(ApiResponse<object>.FailureResponse("User is not active. Please verify OTP."));
            }

            var token = _jwtService.GenerateToken(user);
            return Ok(ApiResponse<LoginResponseDTO>.SuccessResponse("Login successful", new LoginResponseDTO(token)));
        }

        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOtp([FromBody] OtpVerifyDTO dto)
        {
            try
            {
                await _otpService.VerifyOtpAsync(dto.UserId, dto.Otp);
                return Ok(ApiResponse<object>.SuccessResponse("OTP verified successfully", null));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }
    }
}
