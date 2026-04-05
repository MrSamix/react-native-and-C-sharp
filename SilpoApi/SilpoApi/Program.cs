using Infrastructure;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// cors
builder.Services.AddCors();

builder.Services.AddOpenApi(options =>
{
    options.AddDocumentTransformer((document, context, cancellationToken) =>
    {
        document.Servers = [
            new OpenApiServer
                {
                    Url = builder.Configuration["ServerRunUrl"]
                }
            ];

        return Task.CompletedTask;
    });
});

// метод, що будує залежності у infrstructure рівні
builder.Services.AddInfrastructureServices(builder.Configuration);

var app = builder.Build();

// cors
app.UseCors(app =>
app.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());

// Configure the HTTP request pipeline.

app.MapOpenApi();

app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/openapi/v1.json", "v1");
    options.OAuthUsePkce();
});

app.UseAuthorization();

app.MapControllers();



app.Run();
