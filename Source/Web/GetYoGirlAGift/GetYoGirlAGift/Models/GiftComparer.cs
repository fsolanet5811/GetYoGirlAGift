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
            // Calculate the rgb for the girl image first, so we don't have to do it 120 times!
            RGB girlRgb = await CalculateImageAverageRGB(girlImage);

            Task<Gift>[] giftTasks = (from sr in searchResults
                                      select EvaluateSearchResult(girlRgb, sr)).ToArray();

            await Task.Run(() =>
            {
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
            RGB rgb1 = await CalculateImageAverageRGB(image1);
            RGB rgb2 = await CalculateImageAverageRGB(image2);
            return FromRGBs(rgb1, rgb2);
        }

        public static async Task<Rating> CompareImages(Bitmap image1, byte[] image2Bytes)
        {
            using (MemoryStream image2Stream = new MemoryStream(image2Bytes))
            {
                return await CompareImages(image1, new Bitmap(image2Stream));
            }
        }

        private static async Task<Rating> CompareImages(RGB rgb1, byte[] image2Bytes)
        {
            using (MemoryStream image2Stream = new MemoryStream(image2Bytes))
            {
                return await CompareImages(rgb1, new Bitmap(image2Stream));
            }
        }

        private static async Task<Rating> CompareImages(RGB image1AverageRgb, Bitmap image2)
        {
            RGB rgb2 = await CalculateImageAverageRGB(image2);
            return FromRGBs(image1AverageRgb, rgb2);
        }
    
        private static Rating FromRGBs(RGB rgb1, RGB rgb2)
        {
            // Create a rating based on the differences of the rgb's.
            return new Rating()
            {
                Likability = (1 - Math.Abs(rgb1.R - rgb2.R) / 255) * 10,
                ReturnChance = Math.Abs(rgb1.G - rgb2.G) / 255,
                FriendsJealousy = (1 - Math.Abs(rgb1.B - rgb2.B) / 255) * 10
            };
        }

        private static async Task<Gift> EvaluateSearchResult(RGB girlRgb, SearchResult searchResult)
        {
            // Download the image from the search result.
            byte[] searchImage = await searchResult.DownloadImageBytesAsync();

            // Compare the search result image to the image of the girl.
            Rating rating = await CompareImages(girlRgb, searchImage);

            return new Gift(searchResult, rating, searchImage);
        }

        private static async Task<RGB> CalculateImageAverageRGB(Bitmap image)
        {
            return await Task.Run(() =>
            {
                double r = 0, g = 0, b = 0;
                int pixelCount = 0;

                // We are only going to calculate the rgb for the middle of the image.
                // If you divide the image into 9 pieces like a tic-tac-toe board, we would be considered with the square in the dead center
                int startY = image.Height / 3;
                int endY = image.Height * 2 / 3;
                int startX = image.Width / 3;
                int endX = image.Width * 2 / 3;
                for (int y = startY; y < endY; y++)
                    for (int x = startX; x < endX; x++)
                    {
                        Color pixel = image.GetPixel(x, y);
                        r = (pixelCount * r + pixel.R) / (pixelCount + 1);
                        g = (pixelCount * g + pixel.G) / (pixelCount + 1);
                        b = (pixelCount * b + pixel.B) / (pixelCount + 1);
                        pixelCount++;
                    }
              
                return new RGB() { R = r, G = g, B = b }; ;
            });
            
        }

        private class RGB
        {
            public double R { get; set; }

            public double G { get; set; }

            public double B { get; set; }

            public override string ToString()
            {
                return $"R = {R}\nG = {G}\n B = {B}";
            }
        }
    }
}