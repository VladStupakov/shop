import stripe from 'stripe'

class PaymentService {
    constructor() {
        this.stripe = stripe(process.env.STRIPE_KEY)
    }

    async createPayment() {
        const payment = await this.stripe.charges.create(
            {
                source: req.body.tokenId,
                amount: req.body.amount,
                currency: "usd",
            }
        );
    }
}

export default new PaymentService()