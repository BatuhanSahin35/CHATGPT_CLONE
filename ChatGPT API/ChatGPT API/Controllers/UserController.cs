using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ChatGPT_API.Models;

namespace ChatGPT_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ChatGPTUserContext _context;

        public UserController(ChatGPTUserContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] UserLoginRequest request)
        {
            // Find the user in the database by the provided username
            var user = _context.Users.FirstOrDefault(u => u.Username == request.Username);

            // Check if the user exists and the password matches.
            if (user!=null && user.Password.Trim() == request.Password)
            {
                return Ok(new { Message = "Login successful!" });
            }
            else
            {
                return Ok(new { Message = "Invalid username or password." });
            }
        }
    }

    public class UserLoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
