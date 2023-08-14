
using ChatGPT_API.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

var connectionString = "Server=(localdb)\\MSSQLLocalDB;Database=ChatGPTUser;TrustServerCertificate=true;Trusted_Connection=True;Integrated Security=SSPI;MultipleActiveResultSets=true;";
builder.Services.AddDbContext<ChatGPTUserContext>(options =>
    options.UseSqlServer(connectionString,
        sqlServerOptionsAction => sqlServerOptionsAction.EnableRetryOnFailure()));

builder.Services.AddSingleton<IMessageList, MessageList>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors(x => x.AllowAnyHeader()
      .AllowAnyMethod()
      .AllowAnyOrigin());


app.Run();
