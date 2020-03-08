using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GetYoGirlAGift.Models
{
    public class Gift
    {
        public string Name { get; set; }

        public List<Price> Prices { get; set; }

        public byte[] Picture { get; set; }

        public string AmazonLink { get; set; }

        public Rating Rating { get; set; }

        public Gift(SearchResult amazonResult, Rating rating, byte[] picture)
        {
            Rating = rating;
            Picture = picture;
            Name = amazonResult.Title;
            Prices = amazonResult.Prices;
            AmazonLink = amazonResult.ImageLink;
        }
    }
}