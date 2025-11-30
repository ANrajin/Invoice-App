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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../prisma"));
const router = (0, express_1.Router)();
// Get all customers
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield prisma_1.default.customer.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.json(customers);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch customers' });
    }
}));
// Get single customer
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = yield prisma_1.default.customer.findUnique({
            where: { id: req.params.id },
        });
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.json(customer);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch customer' });
    }
}));
// Create customer
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = yield prisma_1.default.customer.create({
            data: req.body,
        });
        res.json(customer);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create customer' });
    }
}));
// Update customer
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = yield prisma_1.default.customer.update({
            where: { id: req.params.id },
            data: req.body,
        });
        res.json(customer);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update customer' });
    }
}));
// Delete customer
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.default.customer.delete({
            where: { id: req.params.id },
        });
        res.json({ message: 'Customer deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete customer' });
    }
}));
exports.default = router;
