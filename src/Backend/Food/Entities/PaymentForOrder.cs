namespace Food.Entities;

public class PaymentForOrder
{
    public int Id { get; private set; }
    public string UserEmail { get; set; }
    public string UserName { get; set; }
    public string Name { get; set; }
    public string CardNumber { get; set; }
    public string CardPassword { get; set; }
    public string TableNumber { get; set; }
    public DateTime DateTime { get; set; }
}