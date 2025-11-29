import { Router } from 'express';
import prisma from '../prisma';

const router = Router();

// Get all invoices
router.get('/', async (req, res) => {
    try {
        const invoices = await prisma.invoice.findMany({
            include: { customer: true, items: true },
            orderBy: { createdAt: 'desc' },
        });

        // Transform to match frontend expected format
        const formattedInvoices = invoices.map(inv => ({
            ...inv,
            customerName: inv.customer.name,
        }));

        res.json(formattedInvoices);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch invoices' });
    }
});

// Get single invoice
router.get('/:id', async (req, res) => {
    try {
        const invoice = await prisma.invoice.findUnique({
            where: { id: req.params.id },
            include: { customer: true, items: true },
        });
        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        res.json({ ...invoice, customerName: invoice.customer.name });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch invoice' });
    }
});

// Create invoice
router.post('/', async (req, res) => {
    try {
        const { items, customerId, ...invoiceData } = req.body;

        const invoice = await prisma.invoice.create({
            data: {
                ...invoiceData,
                customerId,
                items: {
                    create: items.map((item: any) => ({
                        description: item.description,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                },
            },
            include: { items: true },
        });
        res.json(invoice);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create invoice' });
    }
});

// Update invoice
router.put('/:id', async (req, res) => {
    try {
        const { items, customerId, ...invoiceData } = req.body;

        // Transaction to update invoice and replace items
        const invoice = await prisma.$transaction(async (tx) => {
            // Delete existing items
            await tx.invoiceItem.deleteMany({
                where: { invoiceId: req.params.id },
            });

            // Update invoice and create new items
            return tx.invoice.update({
                where: { id: req.params.id },
                data: {
                    ...invoiceData,
                    customerId,
                    items: {
                        create: items.map((item: any) => ({
                            description: item.description,
                            quantity: item.quantity,
                            price: item.price,
                        })),
                    },
                },
                include: { items: true },
            });
        });

        res.json(invoice);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update invoice' });
    }
});

// Delete invoice
router.delete('/:id', async (req, res) => {
    try {
        await prisma.invoice.delete({
            where: { id: req.params.id },
        });
        res.json({ message: 'Invoice deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete invoice' });
    }
});

export default router;
