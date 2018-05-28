const express = require('express');
const app = express();

app.get('/customers/:customerId', (req, res) => {
    return res.json({
        id: req.params.customerId,
        name: 'John Doe',
        email: 'john@protonmail.com'
    });
});

app.listen(8082);