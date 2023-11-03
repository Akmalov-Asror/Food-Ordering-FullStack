using Food.Data;
using Food.Entities;
using Microsoft.AspNetCore.SignalR;

namespace Food.Hubs;

public class ChatHub : Hub
{
    private readonly AppDbContext _context;
    public ChatHub(AppDbContext context) => _context = context;
    public async Task SendMessage(string senderUserId, string receiverUserId, string message)
    {
        var messageModel = new MessageModel
        {
            SenderUserId = senderUserId,
            ReceiverUserId = receiverUserId,
            Content = message,
            Timestamp = DateTime.Now
        };

        _context.MessageModels.Add(messageModel);
        await _context.SaveChangesAsync();

        await Clients.User(receiverUserId).SendAsync("ReceiveMessage", senderUserId, message, messageModel.Timestamp);
    }
}