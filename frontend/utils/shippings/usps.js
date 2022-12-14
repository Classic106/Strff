const xml2json = require('xml2json');

export default class ShipWithUsps {
    constructor(order, axios) {
        this.order = order
        this.axios = axios
        this.isTestMode = true;
        this.userId = '';
        this.apiEndpoint = this.isTestMode? '/shipping-usps-test/': '/shipping-usps/';
    }

    async ship() {
        
    }

    async cityStateLookup(zipCode) {
        try {
            let xml = xml2json.toXml({
                CityStateLookupRequest: {
                    USERID: this.userId,
                    ZipCode: [{
                        ID: 0,
                        Zip5: zipCode
                    }]
                }
            });
            let baseUrl = this.apiEndpoint + '?API=CityStateLookup' + '&XML=' + encodeURIComponent(xml);
            let paymentResponse = await this.axios.post(baseUrl, null, { timeout: 2 * 60 * 1000 });
            paymentResponse = JSON.parse(xml2json.toJson(paymentResponse));

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

    async zipCodeLookup(zipCode) {
        try {
            let xml = xml2json.toXml({
                ZipCodeLookupRequest: {
                    USERID: this.userId,
                    Address: [{
                        ID: 1,
                        Zip5: zipCode
                    }]
                }
            });
            let baseUrl = this.apiEndpoint + '?API=ZipCodeLookup' + '&XML=' + encodeURIComponent(xml);
            let paymentResponse = await this.axios.post(baseUrl, null, { timeout: 2 * 60 * 1000 });
            paymentResponse = JSON.parse(xml2json.toJson(paymentResponse));

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