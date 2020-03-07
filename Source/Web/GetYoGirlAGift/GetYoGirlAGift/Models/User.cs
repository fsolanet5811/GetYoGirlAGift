using System;
using System.Collections.Generic;

namespace GetYoGirlAGift.Models
{
    public partial class User
    {
        public User()
        {
            Girls = new HashSet<Girl>();
        }

        public int Id { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public virtual ICollection<Girl> Girls { get; set; }
    }
}
