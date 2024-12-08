using EAD_CA3_X00190944.Enums;
using Microsoft.AspNetCore.Components.Web;

namespace EAD_CA3_X00190944.Utilities;

public static class UtilityMethods
{
    public static async Task TriggerGenerateJoke(
        KeyboardEventArgs e, Func<Task> generateJokeAsync)
    {
        if (e.Key == "Enter")
        {
            await Task.Delay(1);  // Ensure the search query binding is updated
            await generateJokeAsync();
        }
    }

    public static string GetLanguageDisplayName(Language language)
    {
        return language switch
        {
            Language.EN => "English",
            Language.CS => "Czech",
            Language.FR => "French",
            Language.DE => "German",
            Language.PT => "Portuguese",
            Language.ES => "Spanish",
            _ => "Unknown"
        };
    }
}
