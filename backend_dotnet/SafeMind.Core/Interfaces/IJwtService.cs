using SafeMind.Core.Entities;

namespace SafeMind.Core.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(User user);
    }
}
