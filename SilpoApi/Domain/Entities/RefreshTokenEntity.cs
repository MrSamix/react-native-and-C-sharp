namespace Domain.Entities;

public class RefreshTokenEntity
{
    public int Id { get; set; }
    public string Token { get; set; } = string.Empty;
    public bool IsRevorked { get; set; } = false;
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
}