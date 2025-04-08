import express from 'express';
import Invoice from '../models/invoiceModel.js';

const router = express.Router();

// Lấy danh sách tất cả hóa đơn
router.get('/', async (req, res) => {
    try {
        const invoices = await Invoice.find({})
            .populate('user', 'name email') // Lấy thông tin user
            .populate('items.productId', 'name price'); // Lấy thông tin sản phẩm
        res.send(invoices);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Lấy hóa đơn theo ID
router.get('/:id', async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id)
            .populate('user', 'name email')
            .populate('items.productId', 'name price');
        if (invoice) {
            res.send(invoice);
        } else {
            res.status(404).send({ message: 'Invoice not found' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Tạo hóa đơn mới
router.post('/', async (req, res) => {
    try {
        const invoice = new Invoice({
            user: req.body.userId,
            items: req.body.items,
            totalAmount: req.body.totalAmount,
            status: req.body.status || 'pending',
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod
        });
        const newInvoice = await invoice.save();
        res.status(201).send(newInvoice);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// Cập nhật hóa đơn
router.put('/:id', async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        console.log("req.body.put ===", req.body);
        if (invoice) {
            invoice.status = req.body.status || invoice.status;
            invoice.shippingAddress = req.body.shippingAddress || invoice.shippingAddress;
            invoice.paymentMethod = req.body.paymentMethod || invoice.paymentMethod;
            invoice.orderCode = req.body.orderCode || invoice.orderCode;
            const updatedInvoice = await invoice.save();
            res.send(updatedInvoice);
        } else {
            res.status(404).send({ message: 'Invoice not found' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Xóa hóa đơn
router.delete('/:id', async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (invoice) {
            await Invoice.deleteOne({ _id: req.params.id });
            res.send({ message: 'Invoice deleted successfully' });
        } else {
            res.status(404).send({ message: 'Invoice not found' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

export default router;