using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace GetYoGirlAGift.Models
{
    public class GetYoGirlAGiftContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public GetYoGirlAGiftContext() : base("name=GetYoGirlAGiftContext")
        {
        }

        public System.Data.Entity.DbSet<GetYoGirlAGift.Models.User> Users { get; set; }

        public System.Data.Entity.DbSet<GetYoGirlAGift.Models.Girl> Girls { get; set; }

        public System.Data.Entity.DbSet<GetYoGirlAGift.Models.GirlImage> Images { get; set; }

        public System.Data.Entity.DbSet<GetYoGirlAGift.Models.ImportantDate> ImportantDates { get; set; }

        public System.Data.Entity.DbSet<GetYoGirlAGift.Models.Interest> Interests { get; set; }
    }
}
