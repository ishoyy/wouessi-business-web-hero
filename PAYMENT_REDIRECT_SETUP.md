# Payment Redirect Setup (Stripe + PayPal)

## Stripe Payment Links
For each Stripe Payment Link, set:
- Success URL:
  https://YOURDOMAIN/thank-you?provider=stripe&session_id={CHECKOUT_SESSION_ID}
- Cancel URL:
  https://YOURDOMAIN/services?payment=cancelled

## PayPal
Set Return/Redirect URL to:
  https://YOURDOMAIN/thank-you?provider=paypal

## Data paths
- Leads: /data/leads.json
- Onboarding records: /data/onboarding.json
- Onboarding uploads: /data/onboarding/<onboardingId>/
- Payment confirmations: /data/payments.json
