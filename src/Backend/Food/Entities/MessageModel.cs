namespace Food.Entities;

public class MessageModel
{
    public int Id { get; set; }
    public string SenderUserId { get; set; }
    public string ReceiverUserId { get; set; }
    public string Content { get; set; }
    public DateTime Timestamp { get; set; }
}