using Application.Auth.Login;
using MediatR;
using Microsoft.AspNetCore.Mvc;


namespace SilpoApi.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class AuthController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginRequestDto request)
    {
		try
		{
            // відправляємо команду до MediatR, яка обробить логіку аутентифікації
            var result = await mediator.Send(new LoginCommand
			{
				Email = request.Email,
				Password = request.Password
			});
			return Ok(result); // повертаємо результат у вигляді JSON
        }
		catch (Exception ex)
		{
			return BadRequest(ex.Message); // повертаємо код 400 + помилку, якщо щось пішло не так
        }
    }
}
