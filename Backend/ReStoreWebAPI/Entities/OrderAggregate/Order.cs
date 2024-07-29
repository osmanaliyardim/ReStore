namespace ReStoreWebAPI.Entities.OrderAggregate;

public class Order
{
    public int Id { get; set; }

    public string BuyerId { get; set; }

    public ShippingAddress ShippingAddress { get; set; }

    public DateTime Date { get; set; } = DateTime.UtcNow;

    public List<OrderItem> Items { get; set; }

    public long Subtotal { get; set; }

    public long DeliveryFee { get; set; }

    public OrderStatus Status { get; set; } = OrderStatus.Pending;

    public long GetTotal()
    {
        return Subtotal + DeliveryFee;
    }
}
