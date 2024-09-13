import express from 'express';
const app = express();

app.get('/orders/:orderId', (req, res) => {

    return res.json({
        id: req.params.orderId,
        description: "This is the order's description",
        customerId: 56,
        lines: [
          { description: "item 1", price: 3.5 },
          { description: "item 2", price: 2 }  
        ]
    });

});

app.listen(8081);