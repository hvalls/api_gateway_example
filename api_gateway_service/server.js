import express from 'express';
import { switchMap, map } from 'rxjs/operators';
import * as orderService from './orderService.js';
import * as customerService from './customerService.js';

const app = express();

app.get('/orders/:orderId', (req, res) => {
  orderService.getOrder(req.params.orderId)
    .pipe(
      switchMap(order =>
        customerService.getCustomer(order.customerId).pipe(
          map(customer => {
            delete order.customerId;
            order.customer = customer;
            return order;
          })
        )
      )
    )
    .subscribe({
      next: (order) => res.json(order),
      error: (err) => {
        res.json({ error: err.message });
      }
    });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`API Gateway started at port ${port}`));