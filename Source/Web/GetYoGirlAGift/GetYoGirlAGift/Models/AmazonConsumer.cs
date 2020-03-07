using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GetYoGirlAGift.Models
{
    /// <summary>
    /// Wraps the amazon client and the key manager.
    /// </summary>
    public class AmazonConsumer
    {
        private RainforestKeyManager _keyManager;

        public AmazonConsumer()
        {
            _keyManager = new RainforestKeyManager();
        }

        public List<SearchResult> Search(string searchText)
        {
            string key = _keyManager.GetKey();
            AmazonClient client = new AmazonClient(key);
            SearchRequestResponse response = client.Search(searchText);

            // Only one key can be consumed per request.
            if (response.CreditsUsed > 0)
                _keyManager.ConsumeKey(key);

            return response.SearchResults;
        }
    }
}