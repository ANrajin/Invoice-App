import { Customer } from '../types';

export const MOCK_CUSTOMERS: Customer[] = [
    {
        id: '1',
        name: 'Acme Corp',
        email: 'contact@acme.com',
        phone: '+1 555-0123',
        address: '123 Business Rd, Tech City',
        createdAt: '2023-01-15T10:00:00Z',
    },
    {
        id: '2',
        name: 'Globex Corporation',
        email: 'info@globex.com',
        phone: '+1 555-0124',
        address: '456 Global Ave, Enterprise City',
        createdAt: '2023-02-20T14:30:00Z',
    },
    {
        id: '3',
        name: 'Soylent Corp',
        email: 'sales@soylent.com',
        phone: '+1 555-0125',
        address: '789 Future Blvd, Innovation Park',
        createdAt: '2023-03-10T09:15:00Z',
    },
];
