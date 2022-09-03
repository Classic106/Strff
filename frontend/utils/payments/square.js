import { loadSquare } from 'square-web-sdk'

export default class PayWithSquare {
    constructor(order, axios) {
        this.order = order
        this.axios = axios
        this.payments = undefined
        this.card = undefined
        this.ach = undefined
        this.googlePay = undefined
        this.applePay = undefined
        this.giftCard = undefined
        this.afterpayClearpay = undefined
    }

    async initialize() {
        await loadSquare(true)
        if (!Square) {
            throw new Error('Square payment failed to load properly')
        }
        this.payments = await Square.payments('sandbox-sq0idb-V_-VwDQJNlqo6srQOiNGsg', 'LJY2B01WR0KBY')

        // Creditcard
        this.card = await this.payments.card()
        this.card.attach('#card-container')

        // ACH
        this.ach = await this.payments.ach()

        // ApplePay
        let requestApplePay = this.payments.paymentRequest({
            countryCode: 'US',
            currencyCode: 'USD',
            total: { amount: this.order.total.toString(), label: 'Total' }
        })
        // this.applePay = await this.payments.applePay(requestApplePay)

        // GooglePay
        let requestGooglePay = this.payments.paymentRequest({
                countryCode: 'US',
                currencyCode: 'USD',
                total: { amount: this.order.total.toString(), label: 'Total' }
        })
        this.googlePay = await this.payments.googlePay(requestGooglePay)
        this.googlePay.attach('#googlePay', { buttonColor: 'default', buttonType: 'long' })

        // Giftcard
        this.giftCard = await this.payments.giftCard()
        await this.giftCard.attach('#gift-card-container')

        // Afterpay/Clearpay
        let paymentRequest = this.payments.paymentRequest({
            countryCode: 'US',
            currencyCode: 'USD',
            total: {
                amount: this.order.total.toString(),
                label: 'Total',
            },
            requestShippingContact: true,
        });
        this.afterpayClearpay = await this.payments.afterpayClearpay(paymentRequest)
        await this.afterpayClearpay.attach('#afterpay')
    }

    async pay() {
        try {
            const result = null
            if (this.selectedPaymentMethod == 1) { // Card
                result = await this.card.tokenize()
            } else if (this.selectedPaymentMethod == 2) { // ACH
                result = await this.ach.tokenize({
                    accountHolderName: 'John Doe',
                })
            } else if (this.selectedPaymentMethod == 3) { // Applepay
                result = await this.applePay.tokenize()
            } else if (this.selectedPaymentMethod == 4) { // Googlepay
                result = await this.googlePay.tokenize()
            } else if (this.selectedPaymentMethod == 5) { // Giftcard
                result = await this.giftCard.tokenize()
            } else if (this.selectedPaymentMethod == 6) { // Afterpay/Clearpay
                result = await this.afterpayClearpay.tokenize()
            }
            if (result.status === 'OK') {
                var requestData = {
                    source_id: result.token,
                    idempotency_key: uuidv4(),
                    amount_money: {
                        amount: Math.round(this.order.total),
                        currency: 'USD'
                    }
                }
                let paymentResponse = await this.$axios.post('/payment-square/', requestData, {
                    headers: {
                        'Square-Version': '2022-03-16',
                        'Authorization': 'Bearer EAAAECwUttX7mxQ8PmTSPmxS3LoVRUJWhW9pVLfYSYe2xTcP554zwX-FNGR1NUsj',
                        'Content-Type': 'application/json'
                    },
                    timeout: 2 * 60 * 1000
                })

                if (paymentResponse.status == 200) {
                    let responseData = paymentResponse.data
                    if (responseData.payment.status == 'COMPLETED'
                        && responseData.payment.card_details.status == 'CAPTURED') {
                        return true
                    }
                }
                return false
            }
        } catch (e) {
            console.log('Error occurred')
            console.error(e)
        }
        return false
    }
}