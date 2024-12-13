export class UpdateCustomerDto {
    customerId: string;
    email?: string;
    name?: string;
    phone?: string;
    address?: {
        line1?: string;
        line2?: string;
        city?: string;
        state?: string;
        postal_code?: string;
        country?: string;
    };
    description?: string;
    metadata?: { [key: string]: string };
}
