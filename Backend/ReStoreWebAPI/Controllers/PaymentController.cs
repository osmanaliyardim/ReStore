using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReStoreWebAPI.Data;
using ReStoreWebAPI.DTOs;
using ReStoreWebAPI.Extensions;
using ReStoreWebAPI.Services;

namespace ReStoreWebAPI.Controllers;

public class PaymentController : BaseApiController
{
    private readonly PaymentService _paymentService;
    private readonly StoreContext _context;

    public PaymentController(PaymentService paymentService, StoreContext context)
    {
        _paymentService = paymentService;
        _context = context;
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
}
