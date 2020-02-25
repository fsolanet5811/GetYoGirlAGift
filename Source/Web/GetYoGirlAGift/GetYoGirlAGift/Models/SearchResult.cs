using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace GetYoGirlAGift.Models
{
    public class SearchResult
    {
        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("link")]
        public string AmazonLink { get; set; }

        [JsonProperty("image")]
        public string ImageLink { get; set; }

        public List<Price> Prices { get; set; }
    }
}