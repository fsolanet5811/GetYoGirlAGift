using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Drawing;
using System.IO;
using System.Threading.Tasks;

namespace GetYoGirlAGift.Models
{
    public static class GiftComparer
    {
        public static async Task<List<Gift>> GetHighestRatedGifts(Bitmap girlImage, List<SearchResult> searchResults, int numGifts)
        {
            Task<Gift>[] giftTasks = (from sr in searchResults
                                      select EvaluateSearchResult(girlImage, sr)).ToArray();

            await Task.Run(() =>
            {
                // Start all of the tasks.
                foreach (Task<Gift> task in giftTasks)
                    task.Start();

                Task.WaitAll(giftTasks);
            });

            // At this point we have all of the rated gifts.
            // We just have to return the top ones.
            IEnumerable<Gift> gifts = (from gt in giftTasks
                                orderby gt.Result.Rating.Overall descending
                                select gt.Result);

            return gifts.Take(Math.Min(numGifts, gifts.Count())).ToList();
        }
      
        public static async Task<Rating> CompareImages(byte[] image1Bytes, byte[] image2Bytes)
        {
            using (MemoryStream image1Stream = new MemoryStream(image1Bytes))
            using (MemoryStream image2Stream = new MemoryStream(image2Bytes))
            {
                return await CompareImages(new Bitmap(image1Stream), new Bitmap(image2Stream));
            }
        }

        public static async Task<Rating> CompareImages(Bitmap image1, Bitmap image2)
        {
            Task<Rating> task = new Task<Rating>(() =>
            {
                // Average out the rgb's for each image.
                double r1 = 0, r2 = 0, g1 = 0, g2 = 0, b1 = 0, b2 = 0;
                int pixelCount = 0;

                for (int i = 0; i < image1.Height; i++)
                    for (int j = 0; j < image1.Width; j++)
                    {
                        Color pixel = image1.GetPixel(i, j);
                        r1 = (pixelCount * r1 + pixel.R) / (pixelCount + 1);
                        g1 = (pixelCount * g1 + pixel.G) / (pixelCount + 1);
                        b1 = (pixelCount * b1 + pixel.B) / (pixelCount + 1);
                        pixelCount++;
                    }

                for (int i = 0; i < image2.Height; i++)
                    for (int j = 0; j < image2.Width; j++)
                    {
                        Color pixel = image2.GetPixel(i, j);
                        r2 = (pixelCount * r2 + pixel.R) / (pixelCount + 1);
                        g2 = (pixelCount * g2 + pixel.G) / (pixelCount + 1);
                        b2 = (pixelCount * b2 + pixel.B) / (pixelCount + 1);
                        pixelCount++;
                    }

                // Create a rating based on the differences of the rgb's.
                return new Rating()
                {
                    Likability = (1 - Math.Abs(r1 - r2) / 255) * 10,
                    ReturnChance = 1 - Math.Abs(g1 - g2) / 255,
                    FriendsJealousy = (1 - Math.Abs(b1 - b2) / 255) * 10
                };
            });

            task.Start();
            return await task;
        }

        public static async Task<Rating> CompareImages(Bitmap image1, byte[] image2Bytes)
        {
            using (MemoryStream image2Stream = new MemoryStream(image2Bytes))
            {
                return await CompareImages(image1, new Bitmap(image2Stream));
            }
        }

        private static async Task<Gift> EvaluateSearchResult(Bitmap girlImage, SearchResult searchResult)
        {
            // Download the image from the search result.
            byte[] searchImage = await searchResult.DownloadImageBytesAsync();

            // Compare the search result image to the image of the girl.
            Rating rating = await CompareImages(girlImage, searchImage);

            return new Gift(searchResult, rating, searchImage);
        }
    }
}