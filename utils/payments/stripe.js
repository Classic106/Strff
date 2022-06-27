
export default class PayWithStripe {
    constructor(order, axios) {
        this.order = order
        this.axios = axios
    }

    async pay() {
        try {
            let requestData = {
                'type': 'card',
                'card': {
                    'number': this.order.ccDetail.ccNo,
                    'exp_month': pad(this.order.ccDetail.ccExpiryMonth, 2),
                    'exp_year': this.order.ccDetail.ccExpiryYear,
                    'cvc': this.order.ccDetail.cvv
                }
            }

            requestData = convertObjectToQueryUrl(requestData)
            console.log(requestData)

            let paymentResponse = await this.axios.post('/payment-stripe/', requestData, {
                headers: {
                    'Authorization': 'Bearer sk_test_4eC39HqLyjWDarjtT1zdp7dc',
                    'Content-Type': 'application/x-www-form-urlencoded'
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