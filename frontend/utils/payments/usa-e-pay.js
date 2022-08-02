
export default class PayWithUsaEPay {
    constructor(order, axios) {
        this.order = order
        this.axios = axios
    }

    async pay() {
        try {
            let requestData = {
                'command': 'cc:sale',
                'amount': this.order.total,
                'creditcard': {
                    'cardholder': this.order.billingInfo.firstName + ' ' + this.order.billingInfo.lastName,
                    'number': this.order.ccDetail.ccNo,
                    'expiration': pad(this.order.ccDetail.ccExpiryMonth, 2) + this.order.ccDetail.ccExpiryYear.toString().substr(-2), //MMYY
                    'cvc': this.order.ccDetail.cvv
                },
                'invoice': this.order.orderNo
            }
            let paymentResponse = await this.axios.post('/payment-usa-epay/', requestData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 2 * 60 * 1000
            })
            console.log(paymentResponse)

            if (paymentResponse.status == 200) {
                let responseData = paymentResponse.data
                return responseData.result == 'Approved'
            }
        } catch (e) {
            console.log('Error occurred')
            console.error(e)
        }
        return false
    }
}