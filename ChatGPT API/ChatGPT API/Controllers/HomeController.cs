using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OpenAI_API.Completions;
using OpenAI_API;
using System.Collections.Generic;
using Microsoft.AspNetCore.Cors;
using ChatGPT_API.Models;

namespace ChatGPT_API.Controllers
{
    [Route("api/Home")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private string apiKey = "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";

        private readonly IMessageList messageList;

        public HomeController(IMessageList messageList)
        {
            this.messageList = messageList;
        }

        // Tried to create a list for former messages. But didn't work.
        private const int maxTokens = 500;

        

        [HttpPost]
        public IActionResult GetResult([FromBody] MessageInput messageInput)
        {
            var openai = new OpenAIAPI(apiKey);
            messageList.add(messageInput.Message);
            if (messageInput.CurrentSessionId == null && messageInput.NewSession)
            {
                messageInput.CurrentSessionId = System.Guid.NewGuid().ToString();
            }
            

            CompletionRequest completion = new CompletionRequest();
            completion.Prompt = string.Join("\n", messageList.getAll());
            completion.Model = OpenAI_API.Models.Model.DavinciText;
            completion.MaxTokens = maxTokens;

            var result = openai.Completions.CreateCompletionsAsync(completion).Result;

            if (result != null && result.Completions.Count > 0)
            {
                var answer = result.Completions[0].Text;
                var id = result.Id;
                messageList.add(answer);
                return Ok(new MessageOutput { Message = answer, CurrentSessionId=id });
            }

            return BadRequest("Unable to generate a response.");
        }
    }

    public class MessageInput
    {
        public string Message { get; set; }
        public bool NewSession { get; set; }
        public string? CurrentSessionId {get; set;}
    }

    public class MessageOutput
    {
        public string Message { get; set; }
        public string CurrentSessionId { get; set; }
    }
}
