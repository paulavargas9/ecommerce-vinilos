package com.paula.vinilos.ecommerce_vinilos.controller;
import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/stripe")
@CrossOrigin(origins = "http://localhost:5177")
public class StripeController {

    private static final String STRIPE_SECRET_KEY = "sk_test_51RTVkzPYeHeuEMmurRq1XeaYkGNlC8xDuG81wfJnQZW1Ot15iPPiklJ6X6ZNO8skn6c43ckovOP9sJQmeWdebmyK00D6JSjIpG";

    static {
        Stripe.apiKey = STRIPE_SECRET_KEY;
    }

    @PostMapping("/create-checkout-session")
    public Map<String, Object> createCheckoutSession(@RequestBody Map<String, Object> payload) {
        try {
            Long amount = ((Number) payload.get("amount")).longValue();

            SessionCreateParams params = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl("http://localhost:5177/checkout/exito")
                    .setCancelUrl("http://localhost:5177/checkout")
                    .addLineItem(
                            SessionCreateParams.LineItem.builder()
                                    .setQuantity(1L)
                                    .setPriceData(
                                            SessionCreateParams.LineItem.PriceData.builder()
                                                    .setCurrency("eur")
                                                    .setUnitAmount(amount)
                                                    .setProductData(
                                                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                    .setName("Compra en LameDiscos")
                                                                    .build()
                                                    )
                                                    .build()
                                    )
                                    .build()
                    )
                    .build();

            Session session = Session.create(params);

            Map<String, Object> responseData = new HashMap<>();
            responseData.put("id", session.getId());
            return responseData;

        } catch (Exception e) {
            return Map.of("error", e.getMessage());

        }
    }
}
