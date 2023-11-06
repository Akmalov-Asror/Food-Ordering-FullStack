using System.Security.Claims;
using Food.Data;
using Food.Dto_s;
using Food.Entities;
using Food.ExtensionFunction;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using BCryptNet = BCrypt.Net;

namespace Food.Services.JWTService;

public class AuthService : IAuthService
{
    private readonly AppDbContext _context;
    private readonly UserManager<User> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public AuthService(AppDbContext context, UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
    {
        _context = context;
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task<User> Register(UserDto request)
    {
        var user = new User
        {
            UserName = request.Name,
            Email = request.Email
        };

        var result = await _userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)
        {
            throw new Exception("Password isn't hashed");
        }


        await _userManager.AddToRoleAsync(user, Enum.GetName(request.Role).ToUpper());
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task<string> Login(UserDto request)
    {
        var user = await _context.Users.FirstOrDefaultAsync(e => e.Email == request.Email);

        if (user != null)
        {

            var roles = await _userManager.GetRolesAsync(user);
            var roleClaims = roles.Select(role => new Claim(ClaimTypes.Role, role)).ToList();
            roleClaims.Add(new Claim(ClaimTypes.Name, request.Name));
            roleClaims.Add(new Claim(ClaimTypes.Email, request.Email));
            var token = CreateTokenInJwtAuthorizationFromUsers.CreateToken(user, roleClaims);
            return token;
        }

        throw new BadHttpRequestException("User not found.");
    }

    public async Task<List<User>> GetAllUsers() => await _context.Users.ToListAsync();
}