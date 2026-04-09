using Application.Auth.Login;
using Application.Auth.Register;
using MediatR;
using Microsoft.AspNetCore.Mvc;


namespace SilpoApi.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class AuthController(IMediator mediator) : Controller
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

    [HttpPost]
    public async Task<IActionResult> Register([FromBody] RegisterCommand request)
    {
        try
        {
            // відправляємо команду до MediatR, яка обробить логіку аутентифікації
            await mediator.Send(request);
            return Ok(); // повертаємо результат у вигляді JSON
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message); // повертаємо код 400 + помилку, якщо щось пішло не так
        }
    }
}
