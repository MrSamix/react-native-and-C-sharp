using Application.Interfaces;
using Domain.Entities.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Auth.Login;

/// <summary>
/// Обробник команди для входу користувача в систему.
/// </summary>
public class LoginCommandHandler(UserManager<UserEntity> userManager, IJwtTokenService jwtTokenService) : IRequestHandler<LoginCommand, LoginResponseDto>
{
    public async Task<LoginResponseDto> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByEmailAsync(request.Email); // шукаємо користувача по e-mail
        if (user == null) // якщо користувача не знайдено - повертаємо помилку
        {
            throw new Exception("Invalid email or password.");
        }

        var passwordValid = await userManager.CheckPasswordAsync(user, request.Password); // перевіряємо, чи пароль валідний
        if (passwordValid == false) // якщо пароль неправильний - повертаємо помилку
        {
            throw new Exception("Invalid email or password.");
        }

        var accessToken = await jwtTokenService.CreateTokenAsync(user); // створюємо access токен

        var refreshToken = await jwtTokenService.GenerateRefreshTokenAsync(); // генеруємо refresh токен


        return new LoginResponseDto // повертаємо токени користувачу
        {
            Token = accessToken,
            RefreshToken = refreshToken
        };
    }
}
