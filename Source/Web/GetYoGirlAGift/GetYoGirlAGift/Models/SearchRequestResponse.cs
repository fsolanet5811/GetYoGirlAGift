﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GetYoGirlAGift.Models
{
    public class SearchRequestResponse : RequestResponse
    {
        public List<SearchResult> SearchResults { get; set; }
    }
}