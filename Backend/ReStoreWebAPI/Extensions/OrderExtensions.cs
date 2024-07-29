using Microsoft.EntityFrameworkCore;
using ReStoreWebAPI.DTOs;
using ReStoreWebAPI.Entities.OrderAggregate;

namespace ReStoreWebAPI.Extensions;

public static class OrderExtensions
{
    public static IQueryable<OrderDto> ProjectOrderToOrderDto(this IQueryable<Order> query)
    {
        return query.Select(order => new OrderDto
        {
            Id = order.Id,
            BuyerId = order.BuyerId,
            Date = order.Date,
            ShippingAddress = order.ShippingAddress,
            DeliveryFee = order.DeliveryFee,
            Subtotal = order.Subtotal,
            Status = order.Status.ToString(),
            Items = order.Items.Select(item => new OrderItemDto
            {
                ProductId = item.ItemOrdered.ProductId,
                Name = item.ItemOrdered.Name,
                PictureUrl = item.ItemOrdered.PictureUrl,
                Price = item.Price,
                Quantity = item.Quantity
            }).ToList(),
            TotalPrice = order.GetTotal()
        }).AsNoTracking();
    }
}
