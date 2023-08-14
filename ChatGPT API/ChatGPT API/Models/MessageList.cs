namespace ChatGPT_API.Models
{
    public class MessageList : IMessageList
    {
        public List<string> conversationHistory = new List<string>();

        public void add(string str)
        {
            conversationHistory.Add(str);
        }

        public List<string> getAll()
        {
            return conversationHistory;
        }
    }
}
