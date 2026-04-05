using Domain.Entities.Identity;

namespace Application.Interfaces;

public interface IJwtTokenService
{
    Task<string> CreateTokenAsync(UserEntity user);
    Task<string> GenerateRefreshTokenAsync();
    Task RevokeRefreshTokenAsync(string token);
}