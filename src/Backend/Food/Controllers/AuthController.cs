using Food.AuditManagers.Attributes;
using Food.Dto_s;
using Food.Entities;
using Food.ExtensionFunction;
using Food.Services.JWTService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Food.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    public AuthController(IAuthService authService) => _authService = authService;

    [HttpGet,Authorize]
    public ActionResult<string> GetMyName() => Ok(CreateTokenInJwtAuthorizationFromUsers.GetMyId());

    [HttpGet("ListUsers"), Authorize]
    public async Task<IActionResult> GetAllUsers() => Ok(await _authService.GetAllUsers());

    [HttpPost("register")]
    [IgnoreAudit("Some reason")]
    public async Task<ActionResult<User>> Register(UserDto request) => Ok(await _authService.Register(request));

    [HttpPost("login")]
    [IgnoreAudit("Some reason")]
    public async Task<IActionResult> Login(UserDto request) => Ok(await _authService.Login(request));

}