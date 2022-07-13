
export default class PayWithNmi {
    constructor(order, axios) {
        this.order = order
        this.axios = axios
    }

    async pay() {
        try {
            let requestData = {
                'security_key': '2V64nHE6hudZc3QY86Bww7rGyhA9a2jb',
                'type': 'sale',
                'amount': this.order.total,
                'orderid': this.order.orderNo,
                'order_date': new Date(this.order.orderDate).toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                'order_description': 'Customer order',
                'tax': 0,
                'shipping': 0,
                'ponumber': '',
                'ipaddress': ''
            };

            requestData['first_name'] = this.order.billingInfo.firstName
            requestData['last_name'] = this.order.billingInfo.lastName
            requestData['address1'] = this.order.billingInfo.address1
            requestData['city'] = this.order.billingInfo.city
            requestData['state'] = this.order.billingInfo.state
            requestData['zip'] = this.order.billingInfo.zip
            requestData['shipping_first_name'] = this.order.shippingInfo.firstName
            requestData['shipping_last_name'] = this.order.shippingInfo.lastName
            requestData['shipping_address1'] = this.order.shippingInfo.address1
            requestData['shipping_city'] = this.order.shippingInfo.city
            requestData['shipping_state'] = this.order.shippingInfo.state
            requestData['shipping_zip'] = this.order.shippingInfo.zip
            requestData['ccnumber'] = this.order.ccDetail.ccNo
            requestData['ccexp'] = pad(this.order.ccDetail.ccExpiryMonth, 2) + this.order.ccDetail.ccExpiryYear.toString().substr(-2), //MMYY
            requestData['cvv'] = this.order.ccDetail.cvv

            for (let i = 0; i < this.order.items.length; i++) {
                requestData['item_product_code_' + (i + 1)] = this.order.items[i].product.code
                requestData['item_description_' + (i + 1)] = this.order.items[i].product.title + ' [' + this.order.items[i].size.title + ']'
                requestData['item_unit_of_measure_' + (i + 1)] = 'pc'
                requestData['item_unit_cost_' + (i + 1)] = this.order.items[i].price
                requestData['item_quantity_' + (i + 1)] = this.order.items[i].quantity
                requestData['item_total_amount_' + (i + 1)] = this.order.items[i].total
            }

            requestData = new URLSearchParams(requestData)
            let paymentResponse = await this.axios.post('/payment-nmi/', requestData, { timeout: 2 * 60 * 1000 })

            if (paymentResponse.status == 200) {
                let responseData = new URLSearchParams(paymentResponse.data)
                return parseInt(responseData.response) == 1
            }
        } catch (e) {
            console.log('Error occurred')
            console.error(e)
        }
        return false
    }
}