import { RazorPayPayment } from "./providers/razorpay.provider"

const razorPay = new RazorPayPayment({
    keyId : '',
    keySecret : ''
})

razorPay.createRazorPayPlans({
    billingFrequency : 'yearly',
    billingInterval : 1,
    currency : 'INR',
    name : 'Gold Plan',
    planDescription : 'This is a gold plan',
    planAmount : 1000
})

