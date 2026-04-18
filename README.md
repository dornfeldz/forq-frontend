React frontend for [Forq](https://forq.online) — a stock price forecasting SaaS that uses an LSTM neural network to generate 5-day price predictions.

## Tech stack

- React (deployed on Vercel)
- Clerk — authentication and session management
- Stripe — subscription checkout and billing portal

## Features

- Sign up / sign in via Clerk
- Dashboard to track selected stocks (1 for free tier, up to 6 for premium)
- 5-day price prediction charts powered by the ML service
- Subscription management via Stripe

## Testing the subscription
 
Use Stripe's test card to upgrade to Premium without a real charge:
 
| Field | Value |
|---|---|
| Card number | `4242 4242 4242 4242` |
| Expiry | Any future date (e.g. `12/30`) |
| CVC | Any 3 digits (e.g. `123`) |
| Name | Anything |
 
> No real payment is processed — safe to use in the demo environment.
