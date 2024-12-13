# UnifyPay

A unified library for managing multiple payment gateways like Stripe and Razorpay with support for **Orders**, **Plans**, and **Subscriptions**. Designed for developers who need a seamless and scalable integration solution across various payment providers.

---

## Features

- **Unified API**: One interface to manage multiple gateways.
- **Strong Typing**: Full TypeScript support with clearly defined input and return types.
- **Extensibility**: Easily add more gateways or methods.
- **Error Handling**: Consistent error responses for easier debugging.
- **Multi-Gateway Support**: Use multiple gateways in a single instance.

---

## Installation

Install the library using npm or yarn:

```bash
npm install unify-pay
# or
yarn add unify-pay
```

---

## Supported Gateways

### Stripe

- **Configuration**:
    ```typescript
    interface StripeCredentials {
        apiKey: string;
        apiVersion?: any;
        appInfo?: any;
        host?: string;
        stripeAccount?: string;
        maxRetries?: number;
        timeout?: number;
        port?: number;
    }
    ```

### Razorpay

- **Configuration**:
    ```typescript
    interface RazorPayCredentials {
        keyId: string;
        keySecret: string;
    }
    ```

### Gateway Provider Enum

```typescript
enum GatewayProvider {
    Razorpay = 'Razorpay',
    Stripe = 'Stripe',
}
```

---

## Usage Example

### Initialization

Create an instance of `UnifyPay` by passing in an array of <b>provider that you want to use</b>. Each provider requires specific configurations to be passed in.:

```typescript
import { GatewayProvider } from './common/types/providers.types';
import { UnifyPay } from './main';

const unify = new UnifyPay([
    {
        config: {
            apiKey: '<stripe-api-key>',
            // Add more Stripe configurations here
        },
        type: GatewayProvider.Stripe,
    },
    {
        type: GatewayProvider.Razorpay,
        config: {
            keyId: '<razorpay-key-id>',
            keySecret: '<razorpay-key-secret>',
        },
    },
]);
```

### Example: Creating Plans

Here’s how you can create plans for both Stripe and Razorpay:

```typescript
async function createPlan() {
    try {
        const stripePlan = await unify.plans.create({
            provider: GatewayProvider.Stripe,
            payload: {
                name: 'Pro Plan',
                currency: 'USD',
                active: true,
                amount: 2000,
                metadata: { feature: 'advanced' },
                nickname: 'Pro',
                interval: 'month',
                intervalCount: 1,
                stripeExtraParams: {
                    payment_method_types: ['card'],
                    client_reference_id: '<YOUR_REFERENCE_ID>',
                },
                stripeExtraOptions: {
                    idempotencyKey: 'unique_key_123',
                }
            },
        });

        const razorpayPlan = await unify.plans.create({
            provider: GatewayProvider.Razor
            payload: {
                name: 'Basic Plan',
                billingFrequency: 'monthly',
                billingInterval: 1,
                currency: 'INR',
                planAmount: 1000,
                planDescription: 'Test Plan Description',
            },
        });

    } catch (error) {
        console.error('Error creating plans:', error);
    }
}

createPlan();
```

---

## API Reference

### Plans API

#### `create`

**Description**: Creates a new plan in the specified gateway.

- **Parameters**:

    ```typescript
    {
        provider: GatewayProvider; // Gateway type (e.g., Razorpay, Stripe)
        payload: CreateRazorPayPlanDto | CreateStripePlanDto; // DTO for each provider
    }
    ```

    - **Stripe**:

        ```typescript
        {
            name: string;
            currency: Currency;
            active: boolean;
            amount: number;
            metadata?: Record<string, any>;
            nickname?: string;
            interval: StripeBillingFrequency;
            intervalCount?: number;
            stripeExtraParams?: Record<string, any>;
            stripeExtraOptions?: Record<string, any>;
        }
        ```

        **Stripe Billing Frequency**:

        - `day`
        - `week`
        - `month`
        - `year`

        **Stripe Extra Params**:

        - [Stripe Params Documentation - Create Price](https://stripe.com/docs/api/prices/create)

    - **Razorpay**:

        ```typescript
        {
            billingFrequency: RazorPayBillingFrequency;
            billingInterval: number;
            name: string;
            planAmount: number;
            currency: Currency;
            planDescription?: string;
            notes?: Record<string, any>;
        }
        ```

        **Razorpay Billing Frequency**:

        - `daily`
        - `weekly`
        - `monthly`
        - `yearly`

        **Note**: The billing frequency and interval are combined to create the plan's billing cycle. For example, a billing frequency of `monthly` and an interval of `3` would create a quarterly plan.

- **Returns**:

    - Stripe: `Stripe.Price`

        [Stripe Documentation - Price Object](https://docs.stripe.com/api/prices/object)

    - Razorpay: `Plans.RazorPayPlans`

        [Razorpay Documentation - Create Plan](https://razorpay.com/docs/api/payments/plans/create-plan/)

    **Note**: The return type may vary based on the gateway provider.

- **Example**:

    ```typescript
    const stripePlan = await unify.plans.create({
        provider: GatewayProvider.Stripe,
        payload: { ... },
    });

    const razorpayPlan = await unify.plans.create({
        provider: GatewayProvider.Razorpay,
        payload: { ... },
    });
    ```

#### `getAll`

**Description**: Fetches all plans from the specified gateway.

- **Parameters**:

    ```typescript
    {
        provider: GatewayProvider; // Gateway type
        payload?: QueryRazorpayPlanDto | QueryStripePlanDto; // DTO for querying plans
    }
    ```

    - **Stripe**:

        ```typescript
        {
            active?: boolean;
            currency?: Currency;
            plansFromDate?: Date; // Inclusive
            plansTillDate?: Date; // Inclusive
            limit?: number;
            lastRecordId?: string;
            stripeExtraParams?: Record<string, any>;
            stripeExtraOptions?: Record<string, any>;
        }
        ```

        **Stripe Extra Params**:

        - [Stripe Params Documentation - Get Plan List](https://docs.stripe.com/api/prices/list)

    - **Razorpay**:
        ```typescript
        {
            plansFromDate?: Date;
            plansTillDate?: Date;
            numberOfPlansToFetch?: number;
            skipNumberOfPlans?: number;
        }
        ```

- **Returns**:

    - Stripe: `Stripe.ApiList<Stripe.Price>`
      [Stripe Documentation - List Prices](https://docs.stripe.com/api/prices/list)

    - Razorpay:
        ```typescript
        {
            entity: string;
            count: string;
            items: Array<Plans.RazorPayPlans>;
        }
        ```
        [Razorpay Documentation - Fetch Plans](https://razorpay.com/docs/api/payments/plans/fetch-plans/)

- **Example**:

    ```typescript
    const stripePlans = await unify.plans.getAll({
    provider: GatewayProvider.Stripe,
    payload: { ... },
    });

    const razorpayPlans = await unify.plans.getAll({
        provider: GatewayProvider.Razorpay,
        payload: { ... },
    });
    ```

#### `get`

**Description**: Fetches a plan by ID from the specified gateway.

- **Parameters**:

    ```typescript
    {
        provider: GatewayProvider; // Gateway type
        payload: QueryRazorpayOnePlanDto | QueryStripeOnePlanDto; // DTO for querying a single plan
    }
    ```

    - **Stripe**:

        ```typescript
        {
            planId: string;
            stripeExtraParams?: Record<string, any>;
            stripeExtraOptions?: Record<string, any>;
        }
        ```

        **Stripe Extra Params**:

        - [Stripe Params Documentation - Retrieve Price](https://stripe.com/docs/api/prices/retrieve)

    - **Razorpay**:

        ```typescript
        {
            planId: string;
        }
        ```

- **Returns**:

    - Stripe: `Stripe.Price`

        [Stripe Documentation - Retrieve Price](https://stripe.com/docs/api/prices/retrieve)

    - Razorpay: `Plans.RazorPayPlans`
      [Razorpay Documentation - Fetch Plan](https://razorpay.com/docs/api/payments/plans/fetch-a-plan)

- **Example**:

    ```typescript
    const stripePlan = await unify.plans.get({
        provider: GatewayProvider.Stripe,
        payload: { ... },
    });

    const razorpayPlan = await unify.plans.get({
        provider: GatewayProvider.Razorpay,
        payload: { ... },
    });
    ```

#### `update`

**Disclaimer**: This method is only available for Stripe.

**Description**: Updates a plan by ID.

- **Parameters**:

    ```typescript
    {
        planId: string;
        active?: boolean;
        metadata?: Record<string, any>;
        nickname?: string;
        stripeExtraParams?: Record<string, any>;
        stripeExtraOptions?: Record<string, any>;
    }
    ```

    **Stripe Billing Frequency**:

    - `day`
    - `week`
    - `month`
    - `year`

    **Stripe Extra Params**:

    - [Stripe Params Documentation - Update Price](https://stripe.com/docs/api/prices/update)

- **Returns**:

    - Stripe: `Stripe.Price`

        [Stripe Documentation - Update Price](https://stripe.com/docs/api/prices/update)

- **Example**:
    ```typescript
    const stripePlan = await unify.stripe.updateStripePlan({
        planId: '<stripe-plan-id>',
        // Add more Stripe parameters here
    });
    ```

---

### Orders API

#### `create`

**Description**: Creates a new order in the specified gateway.

- **Parameters**:

    ```typescript
    {
        provider: GatewayProvider; // Gateway type
        payload: CreateRazorPayOrderDto | CreateStripeOrderDto; // DTO for each provider
    }
    ```

    - **Stripe**:

        ```typescript
        {
            amount: number; // pass the amount in paise, e.g., 29900 for 299
            currency: Currency; // ISO currency code
            customerEmail?: string;
            metadata?: Record<string, any>;
            name?: string;
            quantity?: number;
            uiMode?: 'embedded' | 'hosted'; // Default: 'embedded'
            successUrl?: string; // required for hosted mode
            cancelUrl?: string; // required for hosted mode
            returnUrl?: string; // required for embedded mode
            stripeExtraParams?: Record<string, any>;
            stripeExtraOptions?: Record<string, any>;
        }
        ```

        **Stripe Extra Params**:

        - [Stripe Params Documentation - Create Order](https://stripe.com/docs/api/orders/create)

    - **Razorpay**:

        ```typescript
        {
            amount: number;
            // ISO currency code
            currency: Currency;
            // can have max 40 characters
            receipt?: string;
            notes?: Record<string, any>;
            partialPayment?: boolean;
            first_payment_min_amount?: number;
            businessName?: string;
            description?: string;
            imageUrl?: string;
            callBackUrl?: string;
            customerInfo?: {
                name?: string;
                email?: string;
                contact?: string;
            };
            theme?: {
                color?: string;
            };
        }
        ```

- **Returns**:

    - Stripe: `Stripe.Order`

        [Stripe Documentation - Create Order](https://docs.stripe.com/api/checkout/sessions/create)

    - Razorpay: `Orders.RazorPayOrder`

        [Razorpay Documentation - Create Order](https://razorpay.com/docs/api/orders/create/)

    **Note**: The return type may vary based on the gateway provider.

- **Example**:

    ```typescript
    const stripeOrder = await unify.orders.create({
        provider: GatewayProvider.Stripe,
        payload: { ... },
    });

    const razorpayOrder = await unify.orders.create({
        provider: GatewayProvider.Razorpay,
        payload: { ... },
    });
    ```

#### `getAll`

**Description**: Fetches all orders from the specified gateway.

- **Parameters**:

    ```typescript
    {
        provider: GatewayProvider; // Gateway type
        payload?: QueryRazorpayOrderDto | QueryStripeOrderDto; // DTO for querying orders
    }
    ```

    - **Stripe**:

        ```typescript
        {
            limit?: number; // Maximum number of order to fetch
            lastRecordId?: string; // ID of the last order fetched
            customerId?: string; // Filter order by customer ID
            orderFromTime?: Date;
            orderUntilTime?: Date;
            stripeExtraParams?: Partial<Stripe.Checkout.SessionListParams>;
            stripeExtraOptions?: Stripe.RequestOptions;
        }
        ```

        **Stripe Extra Params**:

        - [Stripe Params Documentation - List Orders](https://docs.stripe.com/api/checkout/sessions/list)

    - **Razorpay**:

        ```typescript
        {
            authorized?: AuthorizedStatus;
            receipt?: string;
            orderFromTime?: Date | string;
            orderUntilTime?: Date | string;
            ordersToFetch?: number;
            skipOrders?: number;
        }
        ```

        **Razorpay Authorized Status**:

        ```typescript
        {
            AUTHORIZED_PAYMENT = 0,
            UNAUTHORIZED_PAYMENT = 1,
        }
        ```

- **Returns**:

    - Stripe: `Stripe.ApiList<Stripe.Order>`

        [Stripe Documentation - List Orders](https://stripe.com/docs/api/orders/list)

    - Razorpay:
        ```typescript
        {
            entity: string;
            count: string;
            items: Array<Orders.RazorPayOrder>;
        }
        ```
        [Razorpay Documentation - Fetch Orders](https://razorpay.com/docs/api/orders/fetch-all)

- **Example**:

    ```typescript
    const stripeOrders = await unify.orders.getAll({
        provider: GatewayProvider.Stripe,
        payload: { ... },
    });

    const razorpayOrders = await unify.orders.getAll({
        provider: GatewayProvider.Razorpay,
        payload: { ... },
    });
    ```

#### `get`

**Description**: Fetches an order by ID from the specified gateway.

- **Parameters**:

    ```typescript
    {
        provider: GatewayProvider; // Gateway type
        payload: QueryRazorpayOneOrderDto | QueryStripeOneOrderDto; // DTO for querying a single order
    }
    ```

    - **Stripe**:

        ```typescript
        {
            orderId: string;
            stripeExtraOptions?: Record<string, any>;
        }
        ```

    - **Razorpay**:

        ```typescript
        {
            orderId: string;
        }
        ```

- **Returns**:

    - Stripe: `Stripe.Order`

        [Stripe Documentation - Retrieve Order](https://stripe.com/docs/api/checkout/sessions/retrieve)

    - Razorpay: `Orders.RazorPayOrder`

        [Razorpay Documentation - Fetch Order](https://razorpay.com/docs/api/orders/fetch-with-id)

- **Example**:

    ```typescript
    const stripeOrder = await unify.orders.get({
        provider: GatewayProvider.Stripe,
        payload: {
            orderId: '<stripe-order-id>',
        },
    });

    const razorpayOrder = await unify.orders.get({
        provider: GatewayProvider.Razorpay,
        payload: {
            orderId: '<razorpay-order-id>',
        },
    });
    ```

#### `update`

**Description**: Updates an order by ID.

- **Parameters**:

    ```typescript
    {
        provider: GatewayProvider; // Gateway type
        payload: UpdateRazorPayOrderDto | UpdateStripeOrderDto; // DTO for each provider
    }
    ```

    - **Stripe**:

        ```typescript
        {
            orderId: string;
            metadata?: Record<string, any>;
            stripeExtraParams?: Record<string, any>;
            stripeExtraOptions?: Record<string, any>;
        }
        ```

        **Stripe Extra Params**:

        - [Stripe Params Documentation - Update Order](https://stripe.com/docs/api/checkout/sessions/update)

    - **Razorpay**:

        ```typescript
        {
            orderId: string;
            notes: Record<string, any>;
        }
        ```

- **Returns**:

    - Stripe: `Stripe.Order`

        [Stripe Documentation - Update Order](https://stripe.com/docs/api/checkout/sessions/update)

    - Razorpay: `Orders.RazorPayOrder`

        [Razorpay Documentation - Update Order](https://razorpay.com/docs/api/orders/update/)

    **Note**: The return type may vary based on the gateway provider.

- **Example**:

    ```typescript
    const stripeOrder = await unify.orders.update({
        provider: GatewayProvider.Stripe,
        payload: { ... },
    });

    const razorpayOrder = await unify.orders.update({
        provider: GatewayProvider.Razorpay,
        payload: { ... },
    });
    ```

---

### Subscriptions API

#### `create`

**Description**: Creates a new subscription in the specified gateway.

- **Parameters**:

    ```typescript
    {
        provider: GatewayProvider; // Gateway type
        payload: CreateRazorPaySubscriptionDto | CreateStripeSubscriptionDto; // DTO for each provider
    }
    ```

    - **Stripe**:

        ```typescript
        {
            customerId?: string;
            customerName?: string;
            customerEmail?: string;
            customerPhone?: string;
            priceId: string;
            description?: string;
            offerId?: string;
            planQuantity?: number;
            metadata?: Record<string, any>;
            metadata?: Record<string, any>;
            stripeExtraParams?: Record<string, any>;
            stripeExtraOptions?: Record<string, any>;
            stripeCustomerExtraParams?: Record<string, any>;
        }
        ```

        **Stripe Extra Params**:

        - [Stripe Params Documentation - Create Subscription](https://stripe.com/docs/api/subscriptions/create)

        - [Stripe Customer Params Documentation](https://stripe.com/docs/api/customers/create)

    - **Razorpay**:

        ```typescript
        {
            planId: string;
            totalBillingCycles: number;
            planQuantity?: number;
            planStartAt?: Date;
            paymentExpiry?: Date;
            notifyCustomer?: boolean;
            upfrontAddonsList?: UpFrontAmountDto[];
            offerId?: string;
            notes?: Record<string, any>;
        }
        ```

        **Upfront Amount DTO**:

        ```typescript
        {
            name?: string;
            amount?: number;
            currency?: Currency;
        }
        ```

- **Returns**:

    - Stripe: `Stripe.Subscription`

        [Stripe Documentation - Create Subscription](https://stripe.com/docs/api/subscriptions/create)

    - Razorpay: `Subscriptions.RazorPaySubscription`

        [Razorpay Documentation - Create Subscription](htthttps://razorpay.com/docs/api/payments/subscriptions/create-subscription/)

    **Note**: The return type may vary based on the gateway provider.

- **Example**:

    ```typescript
    const stripeSubscription = await unify.subscriptions.create({
        provider: GatewayProvider.Stripe,
        payload: { ... },
    });

    const razorpaySubscription = await unify.subscriptions.create({
        provider: GatewayProvider.Razorpay,
        payload: { ... },
    });
    ```

- **Extras**

    - **Stripe**:
      Please refer to the [Stripe Github Example](https://github.com/stripe-samples/subscription-use-cases/tree/main/fixed-price-subscriptions) for client side implementation.

#### `getAll`

**Description**: Fetches all subscriptions from the specified gateway.

- **Parameters**:

    ```typescript
    {
        provider: GatewayProvider; // Gateway type
        payload?: QueryRazorpaySubscriptionDto | QueryStripeSubscriptionDto; // DTO for querying subscriptions
    }
    ```

    - **Stripe**:

        ```typescript
        {
            priceId?: string;
            subscritptionsFromDate?: Date | string;
            subscriptionsTillDate?: Date | string;
            limit?: number;
            lastRecordId?: string;
            stripeExtraParams?: Record<string, any>;
            stripeExtraOptions?: Record<string, any>;
        }
        ```

        **Stripe Extra Params**:

        - [Stripe Params Documentation - List Subscriptions](https://stripe.com/docs/api/subscriptions/list)

    - **Razorpay**:

        ```typescript
        {
            planId?: string;
            subscritptionsFromDate?: Date | string;
            subscriptionTillDate?: Date | string;
            totalSubscription?: number;
            skipSubscription?: number;
        }
        ```

- **Returns**:

    - Stripe: `Stripe.ApiList<Stripe.Subscription>`

        [Stripe Documentation - List Subscriptions](https://stripe.com/docs/api/subscriptions/list)

    - Razorpay:
        ```typescript
        {
            entity: string;
            count: number;
            items: Array<Subscriptions.RazorPaySubscription>;
        }
        ```
        [Razorpay Documentation - Fetch Subscriptions](https://razorpay.com/docs/api/payments/subscriptions/fetch-subscriptions)

- **Example**:

    ```typescript
    const stripeSubscriptions = await unify.subscriptions.getAll({
        provider: GatewayProvider.Stripe,
        payload: { ... },
    });

    const razorpaySubscriptions = await unify.subscriptions.getAll({
        provider: GatewayProvider.Razorpay,
        payload: { ... },
    });
    ```

#### `get`

**Description**: Fetches a subscription by ID from the specified gateway.

- **Parameters**:

    ```typescript
    {
        provider: GatewayProvider; // Gateway type
        payload: QueryRazorpayOneSubscriptionDto | QueryStripeOneSubscriptionDto; // DTO for querying a single subscription
    }
    ```

    - **Stripe**:

        ```typescript
        {
            subscriptionId: string;
            stripeExtraParams?: Record<string, any>;
            stripeExtraOptions?: Record<string, any>;
        }
        ```

        **Stripe Extra Params**:

        ```typescript
        {
            expand?: string[];
        }
        ```

    - **Razorpay**:

        ```typescript
        {
            subscriptionId: string;
        }
        ```

- **Returns**:

    - Stripe: `Stripe.Subscription`

        [Stripe Documentation - Retrieve Subscription](https://stripe.com/docs/api/subscriptions/retrieve)

    - Razorpay: `Subscriptions.RazorPaySubscription`

        [Razorpay Documentation - Fetch Subscription](https://razorpay.com/docs/api/payments/subscriptions/fetch-subscription-id)

- **Example**:

    ```typescript
    const stripeSubscription = await unify.subscriptions.get({
        provider: GatewayProvider.Stripe,
        payload: { ... },
    });

    const razorpaySubscription = await unify.subscriptions.get({
        provider: GatewayProvider.Razorpay,
        payload: { ... },
    });
    ```

#### `update`

**Description**: Updates a subscription by ID.

- **Parameters**:

    ```typescript
    {
        provider: GatewayProvider; // Gateway type
        payload: UpdateRazorPaySubscriptionDto | UpdateStripeSubscriptionDto; // DTO for each provider
    }
    ```

    - **Stripe**:

        ```typescript
        {
            subscriptionId: string;
            metadata?: Record<string, any>;
            planQuantity?: number;
            priceId?: string;
            offerId?: string;
            stripeExtraParams?: Record<string, any>;
            stripeExtraOptions?: Record<string, any>;
        }
        ```

        **Stripe Extra Params**:

        - [Stripe Params Documentation - Update Subscription](https://stripe.com/docs/api/subscriptions/update)

    - **Razorpay**:

        ```typescript
        {
            subscriptionId: string;
            planId?: string;
            offerId?: string;
            planQuantity?: number;
            totalBillingCycles?: number;
            subscriptionStartAt?: Date;
            scheduleChangeAt?: Date;
            customerNotify?: boolean;
        }
        ```

- **Returns**:

    - Stripe: `Stripe.Subscription`

        [Stripe Documentation - Update Subscription](https://stripe.com/docs/api/subscriptions/update)

    - Razorpay: `Subscriptions.RazorPaySubscription`

        [Razorpay Documentation - Update Subscription](https://razorpay.com/docs/api/payments/subscriptions/update-subscription)

    **Note**: The return type may vary based on the gateway provider.

- **Example**:

    ```typescript
    const stripeSubscription = await unify.subscriptions.update({
        provider: GatewayProvider.Stripe,
        payload: { ... },
    });

    const razorpaySubscription = await unify.subscriptions.update({
        provider: GatewayProvider.Razorpay,
        payload: { ... },
    });
    ```

#### `cancel`

**Description**: Cancels a subscription by ID.

- **Parameters**:

    ```typescript
    {
        provider: GatewayProvider; // Gateway type
        payload: CancelRazorPaySubscriptionDto | CancelStripeSubscriptionDto; // DTO for each provider
    }
    ```

    - **Stripe**:

        ```typescript
        {
            subscriptionId: string;
            stripeExtraParams?: Record<string, any>;
            stripeExtraOptions?: Record<string, any>;
        }
        ```

        **Stripe Extra Params**:

        - [Stripe Params Documentation - Cancel Subscription](https://stripe.com/docs/api/subscriptions/cancel)

    - **Razorpay**:

        ```typescript
        {
            subscriptionId: string;
            cancelAtCycleEnd?: boolean;
        }
        ```

- **Returns**:

    - Stripe: `Stripe.Subscription`

        [Stripe Documentation - Cancel Subscription](https://stripe.com/docs/api/subscriptions/cancel)

    - Razorpay: `Subscriptions.RazorPaySubscription`

        [Razorpay Documentation - Cancel Subscription](https://razorpay.com/docs/api/payments/subscriptions/cancel-subscription)

    **Note**: The return type may vary based on the gateway provider.

- **Example**:

    ```typescript
    const stripeSubscription = await unify.subscriptions.cancel({
        provider: GatewayProvider.Stripe,
        payload: { ... },
    });

    const razorpaySubscription = await unify.subscriptions.cancel({
        provider: GatewayProvider.Razorpay,
        payload: { ... },
    });
    ```

#### `pause`

**Description**: Pauses collection for subscription by ID. Pausing payment collection is often used to temporarily offer your services for free. This is sometimes referred to as a “grace period” if a customer needs additional time to pay or can’t pay for one or more billing cycles.

**Note**:

`Stripe`: This will not change subscription status to pause. It just pause collection for that subscription. For more information, please read this [Stripe Pause Collection Documentation](https://docs.stripe.com/billing/subscriptions/pause-payment)

- **Parameters**:

    ```typescript
    {
        provider: GatewayProvider; // Gateway type
        payload: PauseRazorPaySubscriptionDto | PauseStripeSubscriptionDto; // DTO for each provider
    }
    ```

    - **Stripe**:

        ```typescript
        {
            subscriptionId: string;
            behaviour?: 'keep_as_draft' | 'mark_uncollectible' | 'void'; // default void
            stripeExtraParams?: Record<string, any>;
            stripeExtraOptions?: Record<string, any>;
        }
        ```

        **Stripe Extra Params**:

        - [Stripe Params Documentation - Pause Subscription](https://docs.stripe.com/api/subscriptions/update#update_subscription-pause_collection)

    - **Razorpay**:

        ```typescript
        {
            subscriptionId: string;
            razorpayExtraParams?: {
                pause_at: 'now';
            }
        }
        ```

- **Returns**:

    - Stripe: `Stripe.Subscription`

        [Stripe Documentation - Pause Subscription](https://docs.stripe.com/api/subscriptions/update)

    - Razorpay: `Subscriptions.RazorPaySubscription`

        [Razorpay Documentation - Pause Subscription](https://razorpay.com/docs/api/payments/subscriptions/pause-subscription)

    **Note**: The return type may vary based on the gateway provider.

- **Example**:

    ```typescript
    const stripeSubscription = await unify.subscriptions.pause({
        provider: GatewayProvider.Stripe,
        payload: { ... },
    });

    const razorpaySubscription = await unify.subscriptions.pause({
        provider: GatewayProvider.Razorpay,
        payload: { ... },
    });
    ```

#### `resume`

**Description**: Resumes a paused collection subscription by ID.

**Note**:

`Stripe`: This is not resume subscription api of stripe. This will resume collection for that subscription.

- **Parameters**:

    ```typescript
    {
        provider: GatewayProvider; // Gateway type
        payload: ResumeRazorPaySubscriptionDto | ResumeStripeSubscriptionDto; // DTO for each provider
    }
    ```

    - **Stripe**:

        ```typescript
        {
            subscriptionId: string;
            stripeExtraParams?: Record<string, any>;
            stripeExtraOptions?: Record<string, any>;
        }
        ```

        **Stripe Extra Params**:

        - [Stripe Params Documentation - Resume Subscription](https://docs.stripe.com/api/subscriptions/update)

    - **Razorpay**:

        ```typescript
        {
            subscriptionId: string;
            razorpayExtraParams?: {
                resume_at: 'now';
            }
        }
        ```

- **Returns**:

    - Stripe: `Stripe.Subscription`

        [Stripe Documentation - Resume Subscription](https://stripe.com/docs/api/subscriptions/update)

    - Razorpay: `Subscriptions.RazorPaySubscription`

        [Razorpay Documentation - Resume Subscription](https://razorpay.com/docs/api/payments/subscriptions/resume-subscription)

        **Note**: The return type may vary based on the gateway provider.

- **Example**:

    ```typescript
    const stripeSubscription = await unify.subscriptions.resume({
        provider: GatewayProvider.Stripe,
        payload: { ... },
    });

    const razorpaySubscription = await unify.subscriptions.resume({
        provider: GatewayProvider.Razorpay,
        payload: { ... },
    });
    ```

#### `deleteOffer`

**Description**: Deletes an offer from subscription by ID.

- **Parameters**:

    ```typescript
    {
        provider: GatewayProvider; // Gateway type
        payload: DeleteOfferRazorPaySubscriptionDto | DeleteOfferStripeSubscriptionDto; // DTO for each provider
    }
    ```

    - **Stripe**:

        ```typescript
        {
            subscriptionId: string;
            stripeExtraParams?: Record<string, any>;
            stripeExtraOptions?: Record<string, any>;
        }
        ```

        **Stripe Extra Params**:

        - [Stripe Params Documentation - Delete Offer](https://docs.stripe.com/api/discounts/subscription_delete)

    - **Razorpay**:

        ```typescript
        {
            subscriptionId: string;
            offerId: string;
        }
        ```

- **Returns**:

    - Stripe: `Stripe.Subscription`

        [Stripe Documentation - Delete Offer](https://stripe.com/docs/api/subscriptions/delete_discount)

    - Razorpay: `Subscriptions.RazorPaySubscription`

        [Razorpay Documentation - Delete Offer](https://razorpay.com/docs/api/payments/subscriptions/delete-offer)

    **Note**: The return type may vary based on the gateway provider.

- **Example**:

    ```typescript
    const stripeSubscription = await unify.subscriptions.deleteOffer({
        provider: GatewayProvider.Stripe,
        payload: { ... },
    });

    const razorpaySubscription = await unify.subscriptions.deleteOffer({
        provider: GatewayProvider.Razorpay,
        payload: { ... },
    });
    ```

---

## Dependencies

This library integrates with the following services:

- [Stripe API](https://stripe.com/docs/api) - Used for managing Stripe-related payment operations.
- [Razorpay API](https://razorpay.com/docs/api) - Used for managing Razorpay-related payment operations.

**Note**: This library is not affiliated with or endorsed by Stripe or Razorpay. It simply leverages their APIs for functionality.

---

## Contribution

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch.
3. Submit a pull request.

---

## License

This project is licensed under the MIT License.

---

## Support

For any issues or feature requests, create an issue on [GitHub](https://github.com/your-repo/unify-pay/issues).

---
