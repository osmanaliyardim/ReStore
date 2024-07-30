﻿using ReStoreWebAPI.Entities;
using Stripe;

namespace ReStoreWebAPI.Services;

public class PaymentService
{
    private readonly IConfiguration _configuration;

    public PaymentService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Basket basket)
    {
        StripeConfiguration.ApiKey = _configuration["StripeSettings:SecretKey"];

        var paymentService = new PaymentIntentService();

        var intent = new PaymentIntent();
        var subtotal = basket.Items.Sum(item => item.Quantity * item.Product.Price);
        var deliveryFee = subtotal > 10000 ? 0 : 500;

        if (string.IsNullOrEmpty(basket.PaymentIntentId))
        {
            var options = new PaymentIntentCreateOptions
            {
                Amount = subtotal + deliveryFee,
                Currency = "usd",
                PaymentMethodTypes = new List<string> { "card" }
            };

            intent = await paymentService.CreateAsync(options);
        }
        else
        {
            var options = new PaymentIntentUpdateOptions
            {
                Amount = subtotal + deliveryFee
            };

            await paymentService.UpdateAsync(basket.PaymentIntentId, options);
        }

        return intent;
    }
}
