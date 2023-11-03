namespace Food.AuditManagers.Attributes;

[AttributeUsage(AttributeTargets.Method)]
public class IgnoreAuditAttribute:Attribute
{
    public IgnoreAuditAttribute(string reason) => this.Reason = reason;
    public string Reason { get; set; }
}