using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GetYoGirlAGift.Models
{
    public class EmailVerificationToken
    {
        public int Id { get; set; }

        public string Token { get; set; }

        public DateTime CreatedAt { get; set; }

        public int UserId { get; set; }
    }
}