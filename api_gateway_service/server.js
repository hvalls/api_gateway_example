import express from 'express';
import * as orderService from './orderService.js';
import * as customerService from './customerService.js';

const app = express();

app.get('/orders/:orderId', (req, res) => {

  orderService.getOrder(req.params.orderId)
    .flatMap(
      order => customerService.getCustomer(order.customerId),
      (order, customer) => {
        delete order.customerId;
        order.customer = customer;
        return order;
      }
    ).subscribe(
      order => {
        return res.json(order);
      },
      error => {
        console.error(error);
        return res.json({ error });
      }
    );

});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`API Gateway started at port ${port}`));