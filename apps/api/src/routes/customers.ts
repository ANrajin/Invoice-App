import { Router } from 'express';
import prisma from '../prisma';

const router = Router();

// Get all customers
router.get('/', async (req, res) => {
    try {
        const customers = await prisma.customer.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch customers' });
    }
});

// Get single customer
router.get('/:id', async (req, res) => {
    try {
        const customer = await prisma.customer.findUnique({
            where: { id: req.params.id },
        });
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch customer' });
    }
});

// Create customer
router.post('/', async (req, res) => {
    try {
        const customer = await prisma.customer.create({
            data: req.body,
        });
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create customer' });
    }
});

// Update customer
router.put('/:id', async (req, res) => {
    try {
        const customer = await prisma.customer.update({
            where: { id: req.params.id },
            data: req.body,
        });
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update customer' });
    }
});

// Delete customer
router.delete('/:id', async (req, res) => {
    try {
        await prisma.customer.delete({
            where: { id: req.params.id },
        });
        res.json({ message: 'Customer deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete customer' });
    }
});

export default router;
