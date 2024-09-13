import { from } from 'rxjs';
import fetch from 'node-fetch';

const ORDER_SERVICE_URL = "http://order_service:8081";

export const getOrder = (orderId) => {
  return from(
    fetch(`${ORDER_SERVICE_URL}/orders/${orderId}`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return await response.json();
      })
      .catch((err) => {
        throw new Error(`Fetch error: ${err.message}`);
      })
  );
};