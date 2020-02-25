using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GetYoGirlAGift.Models
{
    public class SearchRequestResponse
    {
        public int CreditsUsed { get; set; }

        public int CreditsRemaining { get; set; }

        public List<SearchResult> SearchResults { get; set; }
    }
}