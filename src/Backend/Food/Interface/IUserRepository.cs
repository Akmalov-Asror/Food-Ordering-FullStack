using Food.Dto_s;
using Food.Entities;

namespace Food.Interface;

public interface IUserRepository
{
    Task<User> GetById(int id);
    Task<List<User>> GetListAsync();
    Task<UserDto> CreateUser(UserDto user);
    Task<UserDto> UpdateUser(int id, UserDto user);
    Task DeleteUser(int id);
}