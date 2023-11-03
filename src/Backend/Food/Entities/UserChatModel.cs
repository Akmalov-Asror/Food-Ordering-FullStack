using System.ComponentModel.DataAnnotations;

namespace Food.Entities;
public class UserChatModel
{
    [Key]
    public string Id { get; set; }
    public string UserName { get; set; }
    public string ProfilePictureUrl { get; set; }
}