using ReStoreWebAPI.Entities.OrderAggregate;
using System.ComponentModel.DataAnnotations;

namespace ReStoreWebAPI.DTOs;

public class OrderDto
{
    public int Id { get; set; }

    public string BuyerId { get; set; }

    [Required]
    public ShippingAddress ShippingAddress { get; set; }

    public DateTime Date { get; set; }

    public List<OrderItemDto> Items { get; set; }

    public long Subtotal { get; set; }

    public long DeliveryFee { get; set; }

    public string Status { get; set; }

    public long TotalPrice { get; set; }
}
