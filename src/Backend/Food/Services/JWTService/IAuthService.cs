using Food.Dto_s;
using Food.Entities;

namespace Food.Services.JWTService;

public interface IAuthService
{
    Task<User> Register(UserDto userDto);
    Task<string> Login(UserDto userDto);
    Task<List<User>> GetAllUsers();
}