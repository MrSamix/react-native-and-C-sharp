using Application.Interfaces;
using Domain;
using Domain.Entities;
using Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace Application.Services;

public class JwtTokenService(IConfiguration configuration,
    UserManager<UserEntity> userManager, AppDbContext dbContext) : IJwtTokenService
{
    public async Task<string> CreateTokenAsync(UserEntity user)
    {
        var key = configuration["Jwt:Key"];

        var claims = new List<Claim>
        {
            new Claim("email", user.Email ?? ""),
            new Claim("id", user.Id.ToString()),
            new Claim("name", $"{user.FirstName} {user.LastName}"),
            new Claim("image", user.Image != null? user.Image : "")
        };
        foreach (var role in await userManager.GetRolesAsync(user))
        {
            claims.Add(new Claim("role", role));
        }

        //ключ для підпису токена - перетворив у байти
        var keyBytes = System.Text.Encoding.UTF8.GetBytes(key);

        //створюємо об'єкт для підпису токена
        var symmetricSecurityKey = new SymmetricSecurityKey(keyBytes);

        //вказуємо ключ і алгоритм підпису токена
        var signingCredentials = new SigningCredentials(
            symmetricSecurityKey,
            SecurityAlgorithms.HmacSha256);

        //створюємо токен
        var jwtSecurityToken = new JwtSecurityToken(
            claims: claims, //список параметрів у токені, які є доступні
            expires: DateTime.UtcNow.AddDays(7), // термін дії токена - після цього часу токен буде недійсний
            signingCredentials: signingCredentials);

        string token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);

        return token;
    }

    public async Task<string> GenerateRefreshTokenAsync()
    {
        var refreshToken = new RefreshTokenEntity
        {
            Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(128)),
            IsRevorked = false
        };

        dbContext.RefreshTokens.Add(refreshToken);
        await dbContext.SaveChangesAsync();

        return refreshToken.Token;
    }

    public async Task RevokeRefreshTokenAsync(string token)
    {
        var refreshToken = await dbContext.RefreshTokens
            .FirstOrDefaultAsync(x => x.Token == token);

        if (refreshToken != null)
        {
            refreshToken.IsRevorked = true;
            await dbContext.SaveChangesAsync();
        }
    }
}
