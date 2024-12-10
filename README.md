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
            metadata?: any;
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
            notes?: Record<string, string>;
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
        payload: QueryRazorpayPlanDto | QueryStripePlanDto; // DTO for querying plans
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