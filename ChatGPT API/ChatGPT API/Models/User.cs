using Microsoft.EntityFrameworkCore;

namespace ChatGPT_API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class ChatGPTUserContext : DbContext
    {
        public ChatGPTUserContext(DbContextOptions<ChatGPTUserContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }

        public DbSet<Message> Messages { get; set; }
    }
}
