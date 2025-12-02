package com.example.comparateur.Service;


/*import com.example.comparateur.DTO.PaymentRequestDTO;
import com.example.comparateur.DTO.PaymentResponseDTO;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.param.checkout.SessionCreateParams.LineItem;
import com.stripe.param.checkout.SessionCreateParams.LineItem.PriceData;
import com.stripe.param.checkout.SessionCreateParams.LineItem.PriceData.ProductData;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class StripePaymentService {

    @Value("${stripe.public.key}")
    private String stripePublicKey;

    @Value("${app.frontend.url:http://localhost:4200}")
    private String frontendUrl;

    public PaymentResponseDTO createCheckoutSession(PaymentRequestDTO request) {
        try {
            SessionCreateParams params = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setCustomerEmail(request.getCustomerEmail())
                    .setSuccessUrl(frontendUrl + "/payment/success?session_id={CHECKOUT_SESSION_ID}")
                    .setCancelUrl(frontendUrl + "/payment/cancel")
                    .addLineItem(
                            SessionCreateParams.LineItem.builder()
                                    .setQuantity(1L)
                                    .setPriceData(
                                            SessionCreateParams.LineItem.PriceData.builder()
                                                    .setCurrency(request.getCurrency() != null ? request.getCurrency() : "eur")
                                                    .setUnitAmount(request.getAmount().longValue() * 100)
                                                    .setProductData(
                                                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                    .setName(request.getDescription() != null ? request.getDescription() : "Car Rental Booking")
                                                                    .build()
                                                    )
                                                    .build()
                                    )
                                    .build()
                    )
                    .putMetadata("bookingId", request.getBookingId() != null ? request.getBookingId().toString() : "")
                    .build();

            Session session = Session.create(params);

            return new PaymentResponseDTO(
                    session.getId(),
                    session.getUrl(),
                    "created",
                    "Checkout session created successfully"
            );

        } catch (StripeException e) {
            return new PaymentResponseDTO(
                    null,
                    null,
                    "error",
                    "Payment error: " + e.getMessage()
            );
        }
    }

    public PaymentResponseDTO getSessionStatus(String sessionId) {
        try {
            Session session = Session.retrieve(sessionId);

            return new PaymentResponseDTO(
                    session.getId(),
                    null,
                    session.getPaymentStatus(),
                    "Session retrieved successfully"
            );

        } catch (StripeException e) {
            return new PaymentResponseDTO(
                    null,
                    null,
                    "error",
                    "Error retrieving session: " + e.getMessage()
            );
        }
    }

    public String getPublicKey() {
        return stripePublicKey;
    }
}*/