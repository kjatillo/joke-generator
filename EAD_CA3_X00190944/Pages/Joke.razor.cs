using EAD_CA3_X00190944.Enums;
using EAD_CA3_X00190944.Models;
using Microsoft.AspNetCore.Components.QuickGrid;
using System.Net.Http.Json;

namespace EAD_CA3_X00190944.Pages;

public partial class Joke
{
    // Fields
    private const int MIN_QTY = 1;
    private const int MAX_QTY = 10;
    private const int MAX_PAGE = 5;

    private int quantity = MIN_QTY;
    private bool noJokesFound = false;
    private string searchQuery = string.Empty;
    private JokeType selectedJokeType = JokeType.Any;
    private Language selectedLanguage = Language.EN;
    private List<JokeResponse> jokes = new List<JokeResponse>();
    private PaginationState pagination = new PaginationState { ItemsPerPage = MAX_PAGE };

    private Dictionary<Category, bool> selectedCategories = Enum.GetValues(typeof(Category))
        .Cast<Category>()
        .ToDictionary(category => category, category => false);

    // Generate Joke Method
    private async Task GenerateJokeAsync()
    {
        try
        {
            string url = "https://v2.jokeapi.dev/joke/";

            // Category
            var selectedCategoriesString = string.Join(",", selectedCategories
                    .Where(c => c.Value)
                    .Select(c => c.Key.ToString()));

            if (string.IsNullOrEmpty(selectedCategoriesString))
            {
                selectedCategoriesString = Category.Any.ToString();
            }

            // Blacklist
            var blacklistFlags = string.Join(",", Enum.GetValues(typeof(Blacklist))
                .Cast<Blacklist>()
                .Select(flag => flag.ToString().ToLower()));

            url += $"{selectedCategoriesString}?lang={selectedLanguage.ToString().ToLower()}";
            url += $"&blacklistFlags={blacklistFlags}";

            // Joke Type
            if (selectedJokeType != JokeType.Any)
            {
                url += $"&type={selectedJokeType.ToString().ToLower()}";
            }

            // Search
            if (!string.IsNullOrEmpty(searchQuery))
            {
                var encodedQuery = Uri.EscapeDataString(searchQuery);
                url += $"&contains={encodedQuery}";
            }

            // Quantity
            if (quantity < MIN_QTY)
            {
                quantity = MIN_QTY;
            }
            else if (quantity > MAX_QTY)
            {
                quantity = MAX_QTY;
            }

            url += $"&amount={quantity}";

            // Output
            if (quantity == MIN_QTY)
            {
                JokeResponse? response = await Http.GetFromJsonAsync<JokeResponse>(url);
                if (response != null)
                {
                    jokes = new List<JokeResponse> { response };
                }
                else
                {
                    throw new InvalidOperationException("Joke response is null.");
                }
            }
            else
            {
                MultipleJokeResponse? response = await Http.GetFromJsonAsync<MultipleJokeResponse>(url);
                if (response != null)
                {
                    jokes = response.Jokes;
                }
                else
                {
                    throw new InvalidOperationException("Error: Joke response is null.");
                }
            }

            if (!jokes.Any())
            {
                noJokesFound = true;
            }

            StateHasChanged();
        }
        catch (HttpRequestException httpEx)
        {
            Logger.LogError(httpEx, "Error fetching joke: {Message}", httpEx.Message);
            jokes.Clear();
            noJokesFound = true;
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "An unexpected error occurred: {Message}", ex.Message);
            jokes.Clear();
            noJokesFound = true;
        }
    }

    private void ClearForm()
    {
        jokes.Clear();
        quantity = MIN_QTY;
        noJokesFound = false;
        searchQuery = string.Empty;
        selectedJokeType = JokeType.Any;
        selectedLanguage = Language.EN;
        selectedCategories = Enum.GetValues(typeof(Category))
            .Cast<Category>()
            .ToDictionary(category => category, category => false);
    }
}
