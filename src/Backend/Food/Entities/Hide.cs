using System.ComponentModel.DataAnnotations.Schema;

namespace Food.Entities;

public class Hide
{
    [NotMapped]
    private int _id;
    public int Id
    {
        get { return _id; }
        private set { _id = value; }
    }
    public string Name { get; set; }
    public string Description { get; set; }
}