import rx from 'rx';
import http from 'http';

export const getCustomer = customerId => {
  return rx.Observable.create((observer) => {
    const req = http.get({
      hostname: 'customer_service',
      port: 8082,
      path: `/customers/${customerId}`
    }, (res) => {
      var body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        observer.onNext(JSON.parse(body));
        observer.onCompleted();
      });
    });
    req.on('error', (err) => {
      observer.onError(err);
    });
  }).catch(err => {
    return rx.Observable.just({});
  });
}