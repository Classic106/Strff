
export default class ShipWithStamps {
    constructor(order, axios) {
        this.order = order
        this.axios = axios
    }

    async ship() {
        try {
            let requestData = {};

            let paymentResponse = await this.axios.post('/url/', requestData, { timeout: 2 * 60 * 1000 })

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