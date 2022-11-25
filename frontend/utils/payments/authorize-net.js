
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
            for (let i = 0; i < this.order.order_items.length; i++) {
                lineItems.push({
                    'lineItem': {
                        'itemId': i + 1,
                        'name': this.order.order_items[i].product.title,
                        'quantity': this.order.order_items[i].quantity,
                        'unitPrice': this.order.order_items[i].price
                    }
                });
            }

            var requestData = {
                'createTransactionRequest': {
                    'merchantAuthentication': {
                        'name': this.apiLoginId,
                        'transactionKey': this.apiTransactionKey
                    },
                    'refId': this.order.order_no,
                    'transactionRequest': {
                        'transactionType': 'authCaptureTransaction',
                        'amount': this.order.total,
                        'payment': {
                            'creditCard': {
                                'cardNumber': this.order.card_no,
                                'expirationDate': this.order.card_expiry, //YYYY-MM
                                'cardCode': this.order.card_security_code
                            }
                        },
                        'lineItems': lineItems,
                        'poNumber': this.order.order_no,
                        'customer': {
                            'id': this.loggedUser.id,
                            'email': this.loggedUser.email
                        },
                        'billTo': {
                            'firstName': this.order.billing_first_name,
                            'lastName': this.order.billing_last_name,
                            'company': this.order.billing_company,
                            'address': this.order.billing_address_1,
                            'city': this.order.billing_city,
                            'state': this.order.billing_state,
                            'zip': this.order.billing_zip_code,
                            'country': 'US'
                        },
                        'shipTo': {
                            'firstName': this.order.shipping_first_name,
                            'lastName': this.order.shipping_last_name,
                            'company': this.order.shipping_company,
                            'address': this.order.shipping_address_1,
                            'city': this.order.shipping_city,
                            'state': this.order.shipping_state,
                            'zip': this.order.shipping_zip_code,
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