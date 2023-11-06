using Food.Entities.EntityInterface;
using System.ComponentModel.DataAnnotations.Schema;

namespace Food.Entities;

public class Information : IEntity
{
    public int Id { get; set; }
    public string PhoneNumber { get; set; }
    public string StreetAddres { get; set; }
    public string Email { get; set; }
    public string WebsiteUrl { get; set; }
}