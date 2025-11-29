export type InvoiceStatus = 'DRAFT' | 'PENDING' | 'PAID';

export interface InvoiceItem {
    id: string;
    description: string;
    quantity: number;
    price: number;
}

export interface Invoice {
    id: string;
    customerId: string;
    customerName: string; // Denormalized for display
    status: InvoiceStatus;
    date: string;
    dueDate: string;
    items: InvoiceItem[];
    total: number;
    createdAt: string;
}

export type InvoiceInput = Omit<Invoice, 'id' | 'createdAt' | 'total' | 'customerName'>;
