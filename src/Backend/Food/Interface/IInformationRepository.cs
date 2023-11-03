using Food.Dto_s;
using Food.Entities;

namespace Food.Interface;

public interface IInformationRepository
{
    Task<Information> GetById(int id);
    Task<List<Information>> GetListAsync();
    Task<InformationDto> CreateUser(InformationDto info);
    Task<InformationDto> UpdateUser(int id, InformationDto info);
    Task DeleteUser(int id);
}