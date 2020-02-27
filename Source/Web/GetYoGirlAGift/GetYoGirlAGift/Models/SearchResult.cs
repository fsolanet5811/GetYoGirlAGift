using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using Newtonsoft.Json;
using System.Drawing;
using System.IO;

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

        [JsonProperty("prices")]
        public List<Price> Prices { get; set; }

        public Rating Rating { get; set; }

        public byte[] DownloadImageBytes()
        {
            using (WebClient client = new WebClient())
            {
                return client.DownloadData(ImageLink);
               
            }
        }

        public Bitmap DownloadImage()
        {
            byte[] imageBytes = DownloadImageBytes();
            MemoryStream stream = new MemoryStream(imageBytes);
            return new Bitmap(stream);
        }
    }
}