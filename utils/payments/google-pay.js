
export default class PayWithGooglePay {
    constructor(order, axios) {
        this.order = order
        this.axios = axios
    }

    async initialize(elementId) {
        let recaptchaScript = document.createElement('script')
        recaptchaScript.async = true
        recaptchaScript.src = 'https://pay.google.com/gp/p/js/pay.js'
        document.head.appendChild(recaptchaScript)

        recaptchaScript.onload = () => {
            const baseRequest = {
                apiVersion: 2,
                apiVersionMinor: 0
            }

            const tokenizationSpecification = {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                    'gateway': 'example',
                    'gatewayMerchantId': 'exampleGatewayMerchantId'
                }
            }

            const allowedCardNetworks = ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "MIR", "VISA"]
            const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"]

            const baseCardPaymentMethod = {
                type: 'CARD',
                parameters: {
                    allowedAuthMethods: allowedCardAuthMethods,
                    allowedCardNetworks: allowedCardNetworks
                }
            }

            const cardPaymentMethod = Object.assign(
                { tokenizationSpecification: tokenizationSpecification },
                baseCardPaymentMethod
            )

            const paymentsClient = new google.payments.api.PaymentsClient({ environment: 'TEST' })

            const isReadyToPayRequest = Object.assign({}, baseRequest)
            isReadyToPayRequest.allowedPaymentMethods = [baseCardPaymentMethod]

            paymentsClient.isReadyToPay(isReadyToPayRequest)
                .then(function (response) {
                    if (response.result) {
                        console.log('add a Google Pay payment button')

                        const button = paymentsClient.createButton({
                            onClick: () => console.log('TODO: click handler'),
                            allowedPaymentMethods: [baseCardPaymentMethod]
                        })
                        document.getElementById(elementId).appendChild(button)
                    }
                })
                .catch(function (err) {
                    console.error(err);
                })
        }
    }

    async pay() {
    }
}