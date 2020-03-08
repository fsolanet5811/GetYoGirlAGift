using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using Newtonsoft.Json;
using System.Drawing;
using System.IO;
using System.Threading.Tasks;

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

        public async Task<byte[]> DownloadImageBytesAsync()
        {
            using (WebClient client = new WebClient())
            {
                return await Task.Run(() =>client.DownloadData(ImageLink));
            }
        }

        public async Task<Bitmap> DownloadImageAsync()
        {
            byte[] imageBytes = await DownloadImageBytesAsync();
            MemoryStream stream = new MemoryStream(imageBytes);
            return new Bitmap(stream);
        }
    }
}