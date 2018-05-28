const rx = require("rx");
const http = require("http");

exports.getOrder = getOrder = orderId => {
    return rx.Observable.create((observer) => {
        const req = http.get({
            hostname: 'order_service',
            port: 8081,
            path: `/orders/${orderId}`
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
    });
}