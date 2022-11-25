
export default class PayWithAuthorizeNet {
    constructor(order, axios) {
        this.order = order;
        this.axios = axios;
        this.isTestMode = true;
        this.apiLoginId = '28L598hq2TPH';
        this.apiTransactionKey = '8Hp5QcxHPZ9598vj';
        this.apiEndpoint = this.isTestMode? '/payment-authorize-net-test/' : '/payment-authorize-net/';
    }

    async pay() {
        try {
            var lineItems = [];
            for (let i = 0; i < this.order.items.length; i++) {
                lineItems.push({
                    'lineItem': {
                        'itemId': i + 1,
                        'name': this.order.items[i].product.title,
                        'quantity': this.order.items[i].quantity,
                        'unitPrice': this.order.items[i].price
                    }
                });
            }

            var requestData = {
                'createTransactionRequest': {
                    'merchantAuthentication': {
                        'name': this.apiLoginId,
                        'transactionKey': this.apiTransactionKey
                    },
                    'refId': this.order.orderNo,
                    'transactionRequest': {
                        'transactionType': 'authCaptureTransaction',
                        'amount': this.order.total,
                        'payment': {
                            'creditCard': {
                                'cardNumber': this.order.ccDetail.ccNo,
                                'expirationDate': this.order.ccDetail.ccExpiryYear + '-' + pad(this.order.ccDetail.ccExpiryMonth, 2), //YYYY-MM
                                'cardCode': this.order.ccDetail.cvv
                            }
                        },
                        'lineItems': lineItems,
                        'poNumber': this.order.orderNo,
                        'customer': {
                            'id': this.loggedUser.id,
                            'email': this.loggedUser.email
                        },
                        'billTo': {
                            'firstName': this.order.billingInfo.firstName,
                            'lastName': this.order.billingInfo.lastName,
                            'company': this.order.billingInfo.company,
                            'address': this.order.billingInfo.address1,
                            'city': this.order.billingInfo.city,
                            'state': this.order.billingInfo.state,
                            'zip': this.order.billingInfo.zip,
                            'country': 'US'
                        },
                        'shipTo': {
                            'firstName': this.order.shippingInfo.firstName,
                            'lastName': this.order.shippingInfo.lastName,
                            'company': this.order.shippingInfo.company,
                            'address': this.order.shippingInfo.address1,
                            'city': this.order.shippingInfo.city,
                            'state': this.order.shippingInfo.state,
                            'zip': this.order.shippingInfo.zip,
                            'country': 'US'
                        },
                        'transactionSettings': {
                            'setting': {
                                'settingName': 'testRequest',
                                'settingValue': 'false'
                            }
                        },
                        'processingOptions': {
                            'isSubsequentAuth': 'true'
                        },
                        'authorizationIndicatorType': {
                            'authorizationIndicator': 'final'
                        }
                    }
                }
            };

            let paymentResponse = await this.axios.post(this.apiEndpoint, requestData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 2 * 60 * 1000
            });
            console.log(paymentResponse);

            if (paymentResponse.status == 200) {
                let responseData = paymentResponse.data;
                return parseInt(responseData.transactionResponse.responseCode) == 1;
            }
        } catch (e) {
            console.log('Error occurred');
            console.error(e);
        }
        return false;
    }
}