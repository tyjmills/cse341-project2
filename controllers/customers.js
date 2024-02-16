const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('customers').find();
    result.toArray().then((customers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(customers);
    });
};

const getSingle = async (req, res) => {
    const customerId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('customers').find({ _id: customerId});
    result.toArray().then((customers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(customers[0]);
    });
};

module.exports = {
    getAll,
    getSingle
};