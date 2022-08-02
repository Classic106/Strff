'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async getIncrementalValue(ctx) {
        let params = ctx.request.body

        let incrementalValue = await strapi.services['incremental-values'].findOne({ code: params.code })
        let value = incrementalValue.value
        incrementalValue.value = parseInt(incrementalValue.value) + 1
        await strapi.services['incremental-values'].update({ id: incrementalValue.id }, incrementalValue)

        value = value.toString();
        while (value.length < incrementalValue.digit_length) value = '0' + value;
        if (incrementalValue.prefix && incrementalValue.prefix.length) {
            value = incrementalValue.prefix + value
        }
        if (incrementalValue.suffix && incrementalValue.suffix.length) {
            value = value + incrementalValue.suffix
        }

        ctx.send(value)
    }
};
