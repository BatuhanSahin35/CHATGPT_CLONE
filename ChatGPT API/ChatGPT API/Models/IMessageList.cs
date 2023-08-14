
namespace ChatGPT_API.Models
{
    public interface IMessageList
    {
        void add(string str);
        List<string> getAll();
    }
}