using Food.Data;
using Food.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Food.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class ChatController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly UserManager<User> _userManager;

    public ChatController(AppDbContext context, UserManager<User> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    [HttpPost("add-user")]
    public async Task<IActionResult> AddUser(UserChatModel user)
    {
        var users = await _userManager.GetUserAsync(User);

        if (users == null)
            return BadRequest("User not found");
        if (user == null)
            return BadRequest("Invalid user data");

        var userModels = new UserChatModel();
        userModels.Id = users.Id;
        userModels.UserName = user.UserName;
        userModels.ProfilePictureUrl = user.ProfilePictureUrl;
        _context.UserChatModels.Add(userModels);
        await _context.SaveChangesAsync();

        return Ok("User added successfully");
    }

    [HttpPost("send-message")]
    public async Task<IActionResult> SendMessage(MessageModel message)
    {
        if (message == null)
        {
            return BadRequest("Invalid message data");
        }

        _context.MessageModels.Add(message);
        await _context.SaveChangesAsync();

        return Ok("Message sent successfully");
    }

    [HttpGet("chat-history/{userId}")]
    public IActionResult GetChatHistory(string userId)
    {
        var messages = _context.MessageModels
            .Where(m => m.SenderUserId == userId || m.ReceiverUserId == userId)
            .ToList();

        return Ok(messages);
    }

    [HttpGet("Users")]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _context.UserChatModels.ToListAsync());
    }
}