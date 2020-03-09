using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace GetYoGirlAGift.Models
{
    public class Price
    {
        public string Name { get; set; }

        public double Value { get; set; }

        public string Currency { get; set; }
    }
}