import { Invoice } from '../types';

export const MOCK_INVOICES: Invoice[] = [
    {
        id: 'INV-001',
        customerId: '1',
        customerName: 'Acme Corp',
        status: 'PAID',
        date: '2023-10-01',
        dueDate: '2023-10-15',
        items: [
            { id: '1', description: 'Web Development', quantity: 1, price: 5000 },
            { id: '2', description: 'Hosting', quantity: 12, price: 50 },
        ],
        total: 5600,
        createdAt: '2023-10-01T10:00:00Z',
    },
    {
        id: 'INV-002',
        customerId: '2',
        customerName: 'Globex Corporation',
        status: 'PENDING',
        date: '2023-11-05',
        dueDate: '2023-11-19',
        items: [
            { id: '3', description: 'Consulting', quantity: 10, price: 150 },
        ],
        total: 1500,
        createdAt: '2023-11-05T14:30:00Z',
    },
    {
        id: 'INV-003',
        customerId: '1',
        customerName: 'Acme Corp',
        status: 'DRAFT',
        date: '2023-11-20',
        dueDate: '2023-12-04',
        items: [
            { id: '4', description: 'Maintenance', quantity: 5, price: 100 },
        ],
        total: 500,
        createdAt: '2023-11-20T09:15:00Z',
    },
];
