using Microsoft.AspNetCore.Mvc;

namespace SFR_Frontend.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CitiesController : ControllerBase
    {
        private readonly List<string> cities = new();

        private readonly ILogger<CitiesController> _logger;

        public CitiesController(ILogger<CitiesController> logger)
        {
            _logger = logger;

            cities.Add("Wien");
            cities.Add("St. Pölten");
            cities.Add("Graz");
            cities.Add("Linz");
            cities.Add("Salzburg");
            cities.Add("Bregenz");
            cities.Add("Klagenfurt");
            cities.Add("Eisenstadt");
            cities.Add("Innsbruck");
        }

        [HttpGet("Lookup")]
        public IEnumerable<string> Lookup(string searchTerm)
        {
            string[] result = cities
                .Where(c => c.StartsWith(searchTerm, StringComparison.InvariantCultureIgnoreCase))
                .ToArray();

            return result;
        }
    }
}