'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

 module.exports = {
    async generate(ctx) {
        let params = ctx.request.body;

        let reference = await strapi.services['reference'].findOne({ code: params.code });
        let value = reference.value;
        reference.value = parseInt(reference.value) + 1;
        await strapi.services['reference'].update({ id: reference.id }, reference);

        value = value.toString();
        while (value.length < reference.digit_length) value = '0' + value;
        if (reference.prefix && reference.prefix.length) {
            value = reference.prefix + value;
        }
        if (reference.suffix && reference.suffix.length) {
            value = value + reference.suffix;
        }

        ctx.send(value);
    }
};
