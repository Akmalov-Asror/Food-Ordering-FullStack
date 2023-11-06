using Food.Entities.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace Food.Entities;

public class Language
{
    public int Id { get; set; }
    public ELanguage ELanguage { get; set; }
}