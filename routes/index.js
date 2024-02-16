const router = require('express').Router();

router.get('/', (req, res) => {res.send('Hello World');});

router.use('/customers', require('./customers'));

module.exports= router;