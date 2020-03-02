using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace GetYoGirlAGift.Models
{
    public partial class poosd_large_projectContext : DbContext
    {
        public virtual DbSet<Girls> Girls { get; set; }
        public virtual DbSet<Images> Images { get; set; }
        public virtual DbSet<ImportantDates> ImportantDates { get; set; }
        public virtual DbSet<Interests> Interests { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            #warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
            optionsBuilder.UseSqlServer(@"Server=tcp:poosd-large-project.database.windows.net,1433;Initial Catalog=poosd-large-project;Persist Security Info=False;User ID=RobertF;Password=RwBy4218$;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;Database=poosd-large-project;Trusted_Connection=False;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Girls>(entity =>
            {
                entity.Property(e => e.Name).HasColumnType("varchar(50)");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Girls)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK__Girls__UserId__5FB337D6");
            });

            modelBuilder.Entity<Images>(entity =>
            {
                entity.Property(e => e.Image).IsRequired();

                entity.HasOne(d => d.Girl)
                    .WithMany(p => p.Images)
                    .HasForeignKey(d => d.GirlId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK__Images__GirlId__5CD6CB2B");
            });

            modelBuilder.Entity<ImportantDates>(entity =>
            {
                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.Occasion).HasColumnType("varchar(50)");

                entity.HasOne(d => d.Girl)
                    .WithMany(p => p.ImportantDates)
                    .HasForeignKey(d => d.GirlId)
                    .HasConstraintName("FK__Important__GirlI__534D60F1");
            });

            modelBuilder.Entity<Interests>(entity =>
            {
                entity.Property(e => e.Value)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.HasOne(d => d.Girl)
                    .WithMany(p => p.Interests)
                    .HasForeignKey(d => d.GirlId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK__Interests__GirlI__5DCAEF64");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnType("varchar(100)");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnType("varchar(50)");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasColumnType("varchar(50)");
            });
        }
    }
}