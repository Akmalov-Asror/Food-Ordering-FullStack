using Food.Data;
using Food.Entities;
using Microsoft.EntityFrameworkCore;

namespace Food.Services.ChatApplicationOptions;

public class ChatService
{
    private readonly AppDbContext _context;
    public ChatService(AppDbContext context) => _context = context;
    public async Task AddUser(UserChatModel user)
    {
        _context.UserChatModels.Add(user);
        await _context.SaveChangesAsync();
    }

    public async Task SendMessage(MessageModel message)
    {
        _context.MessageModels.Add(message);
        await _context.SaveChangesAsync();
    }

    public List<MessageModel> GetChatHistory(string userId)
    {
        return _context.MessageModels
            .Where(m => m.SenderUserId == userId || m.ReceiverUserId == userId)
            .ToList();
    }
}