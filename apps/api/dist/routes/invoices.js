"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../prisma"));
const router = (0, express_1.Router)();
// Get all invoices
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invoices = yield prisma_1.default.invoice.findMany({
            include: { customer: true, items: true },
            orderBy: { createdAt: 'desc' },
        });
        // Transform to match frontend expected format
        const formattedInvoices = invoices.map((inv) => (Object.assign(Object.assign({}, inv), { customerName: inv.customer.name })));
        res.json(formattedInvoices);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch invoices' });
    }
}));
// Get single invoice
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invoice = yield prisma_1.default.invoice.findUnique({
            where: { id: req.params.id },
            include: { customer: true, items: true },
        });
        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        res.json(Object.assign(Object.assign({}, invoice), { customerName: invoice.customer.name }));
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch invoice' });
    }
}));
// Create invoice
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { items, customerId } = _a, invoiceData = __rest(_a, ["items", "customerId"]);
        const invoice = yield prisma_1.default.invoice.create({
            data: Object.assign(Object.assign({}, invoiceData), { customerId, items: {
                    create: items.map((item) => ({
                        description: item.description,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                } }),
            include: { items: true },
        });
        res.json(invoice);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create invoice' });
    }
}));
// Update invoice
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { items, customerId } = _a, invoiceData = __rest(_a, ["items", "customerId"]);
        // Transaction to update invoice and replace items
        const invoice = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            // Delete existing items
            yield tx.invoiceItem.deleteMany({
                where: { invoiceId: req.params.id },
            });
            // Update invoice and create new items
            return tx.invoice.update({
                where: { id: req.params.id },
                data: Object.assign(Object.assign({}, invoiceData), { customerId, items: {
                        create: items.map((item) => ({
                            description: item.description,
                            quantity: item.quantity,
                            price: item.price,
                        })),
                    } }),
                include: { items: true },
            });
        }));
        res.json(invoice);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update invoice' });
    }
}));
// Delete invoice
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.default.invoice.delete({
            where: { id: req.params.id },
        });
        res.json({ message: 'Invoice deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete invoice' });
    }
}));
exports.default = router;
