
export default class PayWithPaypal {
    constructor(order, axios) {
        this.order = order
        this.axios = axios
    }

    async pay() {
        try {
            let items = []
            for (let i = 0; i < this.order.items.length; i++) {
                items.push({
                    'name': this.order.items[i].product.title,
                    'description': this.order.items[i].product.title,
                    'quantity': this.order.items[i].quantity,
                    'price': this.order.items[i].price,
                    'tax': '0.0',
                    'sku': '',
                    'currency': 'USD'
                })
            }

            let requestData = {
                'intent': 'sale',
                'payer': {
                    'payment_method': 'paypal'
                },
                'transactions': [
                    {
                        'amount': {
                            'total': this.order.total,
                            'currency': 'USD',
                            'details': {
                                'subtotal': this.order.total,
                                'tax': '0.0',
                                'shipping': '0.0',
                                'handling_fee': '0.00',
                                'shipping_discount': '0.00',
                                'insurance': '0.00'
                            }
                        },
                        'description': 'Order ' + this.order.orderNo + ' payment.',
                        'custom': 'EBAY_EMS_90048630024435',
                        'invoice_number': this.order.orderNo,
                        'payment_options': {
                            'allowed_payment_method': 'INSTANT_FUNDING_SOURCE'
                        },
                        'soft_descriptor': 'ECHI5786786',
                        'item_list': {
                            'items': items,
                            'shipping_address': {
                                'recipient_name': his.shippingInfo.firstName + ' ' + this.order.shippingInfo.lastName,
                                'line1': this.order.shippingInfo.address1,
                                'line2': '',
                                'city': this.order.shippingInfo.city,
                                'country_code': 'US',
                                'postal_code': this.order.shippingInfo.zip,
                                'phone': this.order.shippingInfo.contactNo,
                                'state': this.order.shippingInfo.state
                            }
                        }
                    }
                ],
                'note_to_payer': 'Contact us for any questions on your order.'
            }

            let paymentResponse = await this.axios.post('/payment-paypal/', requestData, {
                headers: {
                    'Authorization': 'Bearer [token]',
                    'Content-Type': 'application/json'
                },
                timeout: 2 * 60 * 1000
            })
            console.log(paymentResponse)

            if (paymentResponse.status == 200) {
                let responseData = paymentResponse.data
                return typeof responseData.error == 'undefined'
            }
        } catch (e) {
            console.log('Error occurred')
            console.error(e)
        }
        return false
    }
}