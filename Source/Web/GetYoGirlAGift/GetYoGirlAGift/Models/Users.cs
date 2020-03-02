using System;
using System.Collections.Generic;

namespace GetYoGirlAGift.Models
{
    public partial class Users
    {
        public Users()
        {
            Girls = new HashSet<Girls>();
        }

        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }

        public virtual ICollection<Girls> Girls { get; set; }
    }
}
