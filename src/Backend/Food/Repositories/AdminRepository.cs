using System.Security.Claims;
using Food.Data;
using Food.Dto_s;
using Food.Entities;
using Food.Interface;
using Microsoft.EntityFrameworkCore;

namespace Food.Repositories;

public class AdminRepository
{/*
    private readonly AppDbContext _context;

    public AdminRepository(AppDbContext context) => _context = context;

    public async Task<User> CreateAdmin(ClaimsPrincipal claim,UserDto user)
    {
        /*var nameClaim = claim.FindFirst(ClaimTypes.Name);
        if (nameClaim != null)
        {
            var name = nameClaim.Value; 
            var userWithEmail = await _context.Users.FirstOrDefaultAsync(x => x.UserName == name);


            userWithEmail.
            

        }#1#
        
    }

    public Task<UserDto> CreateOwner(UserDto user)
    {
        throw new NotImplementedException();
    }*/
}