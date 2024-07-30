using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReStoreWebAPI.Data;
using ReStoreWebAPI.DTOs;
using ReStoreWebAPI.Entities.OrderAggregate;
using ReStoreWebAPI.Extensions;
using ReStoreWebAPI.Services;
using Stripe;

namespace ReStoreWebAPI.Controllers;

public class PaymentController : BaseApiController
{
    private readonly PaymentService _paymentService;
    private readonly StoreContext _context;
    private readonly IConfiguration _configuration;

    public PaymentController(
        PaymentService paymentService, 
        StoreContext context,
        IConfiguration configuration)
    {
        _paymentService = paymentService;
        _context = context;
        _configuration = configuration;
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<BasketDto>> CreateOrUpdatePaymentIntent()
    {
        var basket = await _context.Baskets
            .RetrieveBasketWithItems(User.Identity.Name)
            .FirstOrDefaultAsync();

        if (basket == null) 
            return NotFound();

        var intent = await _paymentService.CreateOrUpdatePaymentIntent(basket);

        if (intent == null) 
            return BadRequest(new ProblemDetails { Title = "Problem creating payment intent via Stripe" });

        basket.PaymentIntentId = basket.PaymentIntentId ?? intent.Id;
        basket.ClientSecret = basket.ClientSecret ?? intent.ClientSecret;

        _context.Update(basket);

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return BadRequest(new ProblemDetails { Title = "Problem updating basket with intent" });

        return basket.MapBasketToDto();
    }

    [HttpPost("webhook")]
    public async Task<ActionResult> StripeWebhook()
    {
        var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

        var stripeEvent = EventUtility.ConstructEvent(
                json,
                Request.Headers["Stripe-Signature"],
                _configuration["StripeSettings:WebHookSecret"]
            );

        var charge = (Charge)stripeEvent.Data.Object;

        var order = await _context.Orders.FirstOrDefaultAsync(o => o.PaymentIntentId == charge.PaymentIntentId);

        if (charge.Status == "succeeded")
            order.Status = OrderStatus.PaymentReceived;
        else order.Status = OrderStatus.PaymentFailed;
        
        await _context.SaveChangesAsync();

        return new EmptyResult();
    }
}
