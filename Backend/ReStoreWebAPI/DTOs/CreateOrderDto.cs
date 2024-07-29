using ReStoreWebAPI.Entities.OrderAggregate;

namespace ReStoreWebAPI.DTOs;

public class CreateOrderDto
{
    public bool SaveAddress { get; set; }

    public ShippingAddress ShippingAddress { get; set; }
}
