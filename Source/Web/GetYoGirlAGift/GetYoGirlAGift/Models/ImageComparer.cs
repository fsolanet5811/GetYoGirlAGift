using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Drawing;
using System.IO;

namespace GetYoGirlAGift.Models
{
    public static class ImageComparer
    {
        public static Rating Compare(byte[] image1Bytes, byte[] image2Bytes)
        {
            using (MemoryStream image1Stream = new MemoryStream(image1Bytes))
            using (MemoryStream image2Stream = new MemoryStream(image2Bytes))
            {
                return Compare(new Bitmap(image1Stream), new Bitmap(image2Stream));
            }
        }

        public static Rating Compare(Bitmap image1, Bitmap image2)
        {
            // Average out the rgb's for each image.
            double r1 = 0, r2 = 0, g1 = 0, g2 = 0, b1 = 0, b2 = 0;
            int pixelCount = 0;

            for(int i = 0; i < image1.Height; i++)
                for(int j = 0; j < image1.Width; j++)
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
        }
    }
}