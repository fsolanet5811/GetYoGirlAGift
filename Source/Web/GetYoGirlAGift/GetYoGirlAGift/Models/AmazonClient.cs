using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using RestSharp;
using Newtonsoft.Json;

namespace GetYoGirlAGift.Models
{
    public class AmazonClient
    {
        private static readonly string BASE_ADDRESS = "https://api.rainforestapi.com/request?";
        private static readonly string AMAZON_DOMAIN = "amazon.com";

        private RestClient _client;
        
        public string ApiKey { get; set; }

        public AmazonClient(string apiKey)
        {
            _client = new RestClient(BASE_ADDRESS);
            ApiKey = apiKey;
        }

        public SearchRequestResponse Search(string searchText)
        {
            // Create the search request.
            IRestRequest request = CreateBaseRequest();
            request.AddParameter("type", "search");
            request.AddParameter("search_term", searchText);

            // Send the request and get the response.
            IRestResponse response = _client.Execute(request);

            // Parse the content into one of our wrapper classes.
            _SearchRequestResponseWrapper responseWrapper = JsonConvert.DeserializeObject(response.Content, typeof(_SearchRequestResponseWrapper),
                new JsonSerializerSettings() { MissingMemberHandling = MissingMemberHandling.Ignore }) as _SearchRequestResponseWrapper;

            return responseWrapper.ToSearchRequestResponse();
        }

        private IRestRequest CreateBaseRequest()
        {
            IRestRequest request = new RestRequest();
            request.AddParameter("api_key", ApiKey);
            request.AddParameter("amazon_domain", AMAZON_DOMAIN);
            return request;
        }

        #region Json Classes

        private class _SearchRequestResponseWrapper
        {
            [JsonProperty("search_results")]
            public List<SearchResult> SearchResults { get; set; }

            [JsonProperty("request_info")]
            public _RequestInfoWrapper RequestInfo { get; set; }

            public SearchRequestResponse ToSearchRequestResponse()
            {
                return new SearchRequestResponse()
                {
                    SearchResults = SearchResults,
                    CreditsUsed = RequestInfo.CreditsUsed,
                    CreditsRemaining = RequestInfo.CreditsRemaining
                };
            }
        }

        private class _RequestInfoWrapper
        {
            [JsonProperty("credits_used")]
            public int CreditsUsed { get; set; }

            [JsonProperty("credits_remaining")]
            public int CreditsRemaining { get; set; }
        }

        #endregion
    }
}