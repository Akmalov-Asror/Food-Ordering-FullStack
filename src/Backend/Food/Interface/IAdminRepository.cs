using Food.Dto_s;
using System.Security.Claims;
using Food.Entities;

namespace Food.Interface;

public interface IAdminRepository
{
    Task<User> CreateAdmin(ClaimsPrincipal claim,UserDto user);
    Task<UserDto> CreateOwner(UserDto user);

}