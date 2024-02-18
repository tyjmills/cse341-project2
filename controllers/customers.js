const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Customers']
    const result = await mongodb.getDatabase().db().collection('customers').find();
    result.toArray().then((customers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(customers);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Customers']
    const customerId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('customers').find({ _id: customerId});
    result.toArray().then((customers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(customers[0]);
    });
};

const createCustomer = async (req, res) => {
    //#swagger.tags=['Customers']
    const customer = {
        username: req.body.username,
        phone: req.body.phone,
        email: req.body.email,
        fullname: req.body.fullname,
        favcolor: req.body.favcolor,
        state: req.body.state
    };
    const response = await mongodb.getDatabase().db().collection('customer').insertOne(customer);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the customer.');
    }
};

const  updateCustomer = async (req, res) => {
    //#swagger.tags=['Customers']
    const customerId = new ObjectId(req.params.id);
    const customer = {
        username: req.body.username,
        phone: req.body.phone,
        email: req.body.email,
        fullname: req.body.fullname,
        favcolor: req.body.favcolor,
        state: req.body.state
    };
    const response = await mongodb.getDatabase().db().collection('customers').replaceOne({ _id: customerId }, customer);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the customer.');
    }
};

const deleteCustomer = async (req, res) => {
    //#swagger.tags=['Customers']
    const customerId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('customers').deleteOne({ _id: customerId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the customer.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createCustomer,
    updateCustomer,
    deleteCustomer
};