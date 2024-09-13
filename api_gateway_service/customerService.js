import { from } from 'rxjs';
import fetch from 'node-fetch';

const CUSTOMER_SERVICE_URL = "http://customer_service:8082";

export const getCustomer = (customerId) => {
  return from(
    fetch(`${CUSTOMER_SERVICE_URL}/customers/${customerId}`)
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