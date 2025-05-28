import { useEffect, useRef } from "react";

export default function PaypalButton({ total, onSuccess }) {
  const paypalRef = useRef();

  useEffect(() => {
    const existing = document.querySelector("script[src*='paypal.com/sdk']");
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=ATLxX-g9vs3BMDen37ZvLBqviGOsQph4ecD70DqD0JUJ_wtPUwIwKHE1qwZYFTYXh8g7yL4v3Cup4670`;
    script.addEventListener("load", () => {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: total.toFixed(2),
              },
            }],
          });
        },
        onApprove: async (data, actions) => {
          await actions.order.capture();
          onSuccess(); 
        },
        onError: (err) => {
          console.error("Error con PayPal:", err);
          alert("Hubo un problema con PayPal.");
        }
      }).render(paypalRef.current);
    });

    document.body.appendChild(script);
  }, [total, onSuccess]);

  return <div ref={paypalRef} />;
}
