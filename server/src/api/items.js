const express = require('express');
const monk = require('monk');
const Joi = require('@hapi/joi');

const db = monk(process.env.MONGO_URI);
const items = db.get('items');

const schema = Joi.object({
    name: Joi.string().trim().required(),
    quantity: Joi.number().required()
})

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const item = await items.find({});
        res.json(item);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const {
            id
        } = req.params;
        const item = await items.findOne({
            _id: id,
        });
        if (!item) return next();
        return res.json(item);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const value = await schema.validateAsync(req.body);
        const inserted = await items.insert(value);
        res.json(inserted);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const {
            id
        } = req.params;
        const value = await schema.validateAsync(req.body);
        const item = await items.findOne({
            _id: id,
        });
        if (!item) return next();
        await items.update({
            _id: id,
        }, {
            $set: value,
        });
        res.json(value);
    } catch (error) {
        next(error);
    }
});

router.delete('/', async (req, res, next) => {
    try {
        await items.remove({});
        res.json({
            message: 'Success',
        });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const {
            id
        } = req.params;
        await items.remove({
            _id: id
        });
        res.json({
            message: 'Success',
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;