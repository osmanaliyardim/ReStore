using Microsoft.AspNetCore.Identity;

namespace ReStoreWebAPI.Entities;

public class User : IdentityUser<int>
{
    public UserAddress Address { get; set; }
}
