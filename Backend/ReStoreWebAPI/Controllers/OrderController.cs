﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReStoreWebAPI.Data;
using ReStoreWebAPI.DTOs;
using ReStoreWebAPI.Entities;
using ReStoreWebAPI.Entities.OrderAggregate;
using ReStoreWebAPI.Extensions;

namespace ReStoreWebAPI.Controllers;

[Authorize]
public class OrderController : BaseApiController
{
    private readonly StoreContext _context;

    public OrderController(StoreContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<OrderDto>>> GetOrders()
    {
        return await _context.Orders
            .ProjectOrderToOrderDto()
            .Where(o => o.BuyerId == User.Identity.Name)
            .ToListAsync();
    }

    [HttpGet("{id}", Name = "GetOrder")]
    public async Task<ActionResult<OrderDto>> GetOrder(int id)
    {
        return await _context.Orders
            .ProjectOrderToOrderDto()
            .Where(o => o.BuyerId == User.Identity.Name && o.Id == id)
            .FirstOrDefaultAsync();
    }

    [HttpPost]
    public async Task<ActionResult<int>> CreateOrder(CreateOrderDto orderDto)
    {
        var basket = await _context.Baskets
            .RetrieveBasketWithItems(User.Identity.Name)
            .FirstOrDefaultAsync();

        if (basket == null) return BadRequest(new ProblemDetails { Title = "Could not find the basket" });

        var items = new List<OrderItem>();

        foreach (var item in basket.Items)
        {
            var productItem = await _context.Products.FindAsync(item.ProductId);

            var itemOrdered = new ProductItemOrdered
            {
                ProductId = productItem.Id,
                Name = productItem.Name,
                PictureUrl = productItem.PictureUrl
            };

            var orderItem = new OrderItem
            {
                ItemOrdered = itemOrdered,
                Price = productItem.Price,
                Quantity = item.Quantity
            };

            items.Add(orderItem);
            productItem.QuantityInStock -= item.Quantity;
        }

        var subtotal = items.Sum(item => item.Price * item.Quantity);
        var deliverFee = subtotal >= 10000 ? 0 : 500;

        var order = new Order
        {
            Items = items,
            BuyerId = User.Identity.Name,
            ShippingAddress = orderDto.ShippingAddress,
            Subtotal = subtotal,
            DeliveryFee = deliverFee,
            PaymentIntentId = basket.PaymentIntentId
        };

        await _context.Orders.AddAsync(order);
        _context.Baskets.Remove(basket);

        if (orderDto.SaveAddress)
        {
            var user = await _context.Users
                .Include(u => u.Address)
                .FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);

            var address = new UserAddress
            {
                FullName = orderDto.ShippingAddress.FullName,
                Address1 = orderDto.ShippingAddress.Address1,
                Address2 = orderDto.ShippingAddress.Address2,
                City = orderDto.ShippingAddress.City,
                State = orderDto.ShippingAddress.State,
                Zip = orderDto.ShippingAddress.Zip,
                Country = orderDto.ShippingAddress.Country
            };

            user.Address = address;
        }

        var result = await _context.SaveChangesAsync() > 0;

        if (result) return CreatedAtRoute(nameof(GetOrder), new { id = order.Id }, order.Id);

        return BadRequest("Problem creating order");
    }
}
