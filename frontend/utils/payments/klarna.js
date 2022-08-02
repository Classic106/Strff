
export default class PayWithKlarna {
    constructor(order, axios) {
        this.order = order
        this.axios = axios
    }

    async pay() {
        try {
            let requestData = {
                "acquiring_channel": "ecommerce",
                "attachment": {
                    "body": "{\"customer_account_info\":[{\"unique_account_identifier\":\"test@gmail.com\",\"account_registration_date\":\"2017-02-13T10:49:20Z\",\"account_last_modified\":\"2019-03-13T11:45:27Z\"}]}",
                    "content_type": "application/vnd.klarna.internal.emd-v2+json"
                },
                "authorization_token": "string",
                "auto_capture": false,
                "billing_address": {
                    "attention": "Attn",
                    "city": this.order.billingInfo.city,
                    "country": "US",
                    "email": this.order.billingInfo.email,
                    "family_name": this.order.billingInfo.lastName,
                    "given_name": this.order.billingInfo.firstName,
                    "organization_name": this.order.billingInfo.company,
                    "phone": this.order.billingInfo.contactNo,
                    "postal_code": this.order.billingInfo.zip,
                    "region": "",
                    "street_address": this.order.billingInfo.address1,
                    "street_address2": this.order.billingInfo.address2,
                    "title": ""
                },
                "client_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJzZXNzaW9uX2lkIiA6ICIw",
                "custom_payment_method_ids": [
                    "string"
                ],
                "customer": {
                    "date_of_birth": "1978-12-31",
                    "gender": "male",
                    "last_four_ssn": "string",
                    "national_identification_number": "string",
                    "organization_entity_type": "LIMITED_COMPANY",
                    "organization_registration_id": "string",
                    "title": "Mr.",
                    "type": "organization",
                    "vat_id": "string"
                },
                "design": "string",
                "expires_at": "2038-01-19T03:14:07.000Z",
                "locale": "en-GB",
                "merchant_data": "{\"order_specific\":[{\"substore\":\"Women's Fashion\",\"product_name\":\"Women Sweatshirt\"}]}",
                "merchant_reference1": "ON4711",
                "merchant_reference2": "hdt53h-zdgg6-hdaff2",
                "merchant_urls": {
                    "confirmation": "https://...",
                    "notification": "https://...",
                    "push": "https://..."
                },
                "options": {
                    "color_border": "#FF9900",
                    "color_border_selected": "#FF9900",
                    "color_details": "#FF9900",
                    "color_text": "#FF9900",
                    "radius_border": "5px"
                },
                "order_amount": 2500,
                "order_lines": [
                    {
                        "image_url": "https://www.exampleobjects.com/logo.png",
                        "merchant_data": "{\"customer_account_info\":[{\"unique_account_identifier\":\"test@gmail.com\",\"account_registration_date\":\"2017-02-13T10:49:20Z\",\"account_last_modified\":\"2019-03-13T11:45:27Z\"}]}",
                        "name": "Running shoe",
                        "product_identifiers": {
                            "brand": "shoe-brand",
                            "category_path": "Shoes > Running",
                            "global_trade_item_number": "4912345678904",
                            "manufacturer_part_number": "AD6654412-334.22",
                            "color": "white",
                            "size": "small"
                        },
                        "product_url": "https://.../AD6654412.html",
                        "quantity": 1,
                        "quantity_unit": "pcs",
                        "reference": "AD6654412",
                        "tax_rate": 1900,
                        "total_amount": 2500,
                        "total_discount_amount": 500,
                        "total_tax_amount": 475,
                        "type": "physical",
                        "unit_price": 2500
                    }
                ],
                "order_tax_amount": 475,
                "payment_method_categories": [
                    {
                        "asset_urls": {
                            "descriptive": "https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.svg",
                            "standard": "https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.svg"
                        },
                        "identifier": "pay_later",
                        "name": "Pay Later"
                    }
                ],
                "purchase_country": "GB",
                "purchase_currency": "GBP",
                "shipping_address": {
                    "attention": "Attn",
                    "city": this.order.shippingInfo.city,,
                    "country": "US",
                    "email": this.order.shippingInfo.email,
                    "family_name": this.order.shippingInfo.lastName,
                    "given_name": this.order.shippingInfo.firstName,
                    "organization_name": this.order.shippingInfo.company,
                    "phone": this.order.shippingInfo.contactNo,
                    "postal_code": this.order.shippingInfo.zip,
                    "region": "",
                    "street_address": this.order.shippingInfo.address1,
                    "street_address2": this.order.shippingInfo.address2,
                    "title": ""
                },
                "status": "complete"
            }

            requestData = convertObjectToQueryUrl(requestData)
            console.log(requestData)

            let paymentResponse = await this.axios.post('/payment-klarna/', requestData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 2 * 60 * 1000
            })
            console.log(paymentResponse)

            if (paymentResponse.status == 200) {
                let responseData = paymentResponse.data
                return false
            }
        } catch (e) {
            console.log('Error occurred')
            console.error(e)
        }
        return false
    }
}