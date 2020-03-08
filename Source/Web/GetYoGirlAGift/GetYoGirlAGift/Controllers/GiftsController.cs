﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using GetYoGirlAGift.Models;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace GetYoGirlAGift.Controllers
{
    public class EvaluateGiftRequest
    {
        [JsonProperty("imageBytes")]
        public byte[] ImageBytes { get; set; }
    }

    [Authorize]
    public class GiftsController : ApiController
    {
        private static readonly int NUM_GIFTS = 5;

        [HttpGet]
        public async Task<IHttpActionResult> RetrieveGifts(int girlId, string occassion)
        {
            try
            {
                // Pull the girl information from the database.
                Girl girl = LoadGirlFromId(girlId);
                if (girl is null)
                    return BadRequest($"A girl with the Id {girlId} does not exist.");

                AmazonConsumer consumer = new AmazonConsumer();

                // Generate the search queries.
                List<string> queries = girl.GetGiftSearchQueries(occassion);
                List<SearchResult> results = new List<SearchResult>();

                foreach (string query in queries)
                    results.AddRange(consumer.Search(query));

                return Ok(await GiftComparer.GetHighestRatedGifts(girl.GetRandomImage(), results, NUM_GIFTS));
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        public async Task<IHttpActionResult> Evaluate(int girlId, [FromBody] EvaluateGiftRequest request)
        {
            try
            {
                Girl girl = LoadGirlFromId(girlId);
                if (girl is null)
                    return NotFound();

                return Ok(await GiftComparer.CompareImages(girl.GetRandomImage(), request.ImageBytes));
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        private Girl LoadGirlFromId(int id)
        {
            using (GetYoGirlAGiftContext context = new GetYoGirlAGiftContext())
            {
                return context.Girls.Find(id);
            }
        }
    }
}
