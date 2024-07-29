using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ReStoreWebAPI.Entities;
using ReStoreWebAPI.Entities.OrderAggregate;

namespace ReStoreWebAPI.Data;

public class StoreContext : IdentityDbContext<User, Role, int>
{
    public StoreContext(DbContextOptions options) : base(options)
    {

    }

    public DbSet<Product> Products { get; set; }

    public DbSet<Basket> Baskets { get; set; }

    public DbSet<Order> Orders { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<User>()
            .HasOne(u => u.Address)
            .WithOne()
            .HasForeignKey<UserAddress>(ua => ua.Id)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<Role>()
            .HasData(
                new Role { Id = 1, Name = "Member", NormalizedName = "MEMBER" },
                new Role { Id = 2, Name = "Admin", NormalizedName = "ADMIN"}
            );
    }
}