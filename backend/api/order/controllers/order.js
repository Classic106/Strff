'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async addProduct(ctx) {
        let params = ctx.request.body;

        const product = await strapi.services.product.findOne({ id: params.productId });
        const orderStatus = await strapi.services['order-statuses'].findOne({ code: 1 });

        let size = null;
        if (params.sizeId) {
            size = await strapi.services.size.findOne({ id: params.sizeId });
        }
        let purchaseType = null;
        if (params.purchaseTypeId) {
            purchaseType = await strapi.services['purchase-type'].findOne({ id: params.purchaseTypeId });
        }
        let subscriptionType = null;
        if (params.subscriptionTypeId) {
            subscriptionType = await strapi.services['subscription-type'].findOne({ id: params.subscriptionTypeId });
        }

        let options = null;
        if (params.userId) {
            options = { 'order_status.id': orderStatus.id, 'user.id': params.userId };
        } else {
            options = { 'order_status.id': orderStatus.id, 'order_token': params.orderToken };
        }
        let order = await strapi.services.order.findOne(options);
        if (!order) {
            order = await strapi.services.order.create({
                order_no: null,
                order_date: Date.now(),
                order_items: [],
                total: product.price,
                order_status: orderStatus.id,
                user: params.userId,
                order_token: params.orderToken
            });
        } else {
            order.user = params.userId;
            order.order_token = params.orderToken;
            order = await strapi.services.order.update({ id: order.id }, order);
        }
        if (order.id) {
            let options = {
                'order.id': order.id,
                'product.id': product.id,
                'purchase_type.id': purchaseType? purchaseType.id: null
            };
            if (subscriptionType) {
                options['subscription_type.id'] = subscriptionType? subscriptionType.id: null;
            }
            let orderItem = null;
            let orderItems = await strapi.services['order-item'].find(options);
            if (!orderItems.length) {
                orderItem = await strapi.services['order-item'].create({
                    product: product.id,
                    quantity: params.quantity,
                    price: product.price,
                    total: params.quantity * product.price,
                    order: order.id,
                    size: size? size.id: null,
                    purchase_type: purchaseType? purchaseType.id: null,
                    subscription_type: subscriptionType? subscriptionType.id: null
                });
            } else {
                orderItem = orderItems[0];
                orderItem.quantity += params.quantity;
                orderItem.total = orderItem.quantity * orderItem.price;
                orderItem = await strapi.services['order-item'].update({ id: orderItem.id }, orderItem);
            }
            await this.recomputeOrder(order.id);
        }

        order = await this.pullOrder(order.id);
        ctx.send(order);
    },
    async removeProduct(ctx) {
        let params = ctx.request.body;

        const product = await strapi.services.product.findOne({ id: params.productId });
        const orderStatus = await strapi.services['order-statuses'].findOne({ code: 1 });

        let size = null;
        if (params.sizeId) {
            size = await strapi.services.size.findOne({ id: params.sizeId });
        }
        let purchaseType = null;
        if (params.purchaseTypeId) {
            purchaseType = await strapi.services['purchase-type'].findOne({ id: params.purchaseTypeId });
        }
        let subscriptionType = null;
        if (params.subscriptionTypeId) {
            subscriptionType = await strapi.services['subscription-type'].findOne({ id: params.subscriptionTypeId });
        }

        let options = null;
        if (params.userId) {
            options = { 'order_status.id': orderStatus.id, 'user.id': params.userId };
        } else {
            options = { 'order_status.id': orderStatus.id, 'order_token': params.orderToken };
        }
        let order = await strapi.services.order.findOne(options);
        if (order) {
            let options = {
                'order.id': order.id,
                'product.id': product.id
            };
            if (purchaseType) {
                options['purchase_type.id'] = purchaseType.id;
            }
            if (subscriptionType) {
                options['subscription_type.id'] = subscriptionType.id;
            }
            let orderItems = await strapi.services['order-item'].find(options);
            if (orderItems && orderItems.length) {
                let orderItem = orderItems[0];
                orderItem.quantity -= params.quantity;
                orderItem.total = orderItem.quantity * orderItem.price;
                if (orderItem.quantity > 0) {
                    await strapi.services['order-item'].update({ id: orderItem.id }, orderItem);
                } else {
                    await strapi.services['order-item'].delete({ id: orderItem.id });
                }
                await this.recomputeOrder(order.id);
            }

            order = await this.pullOrder(order.id);
            ctx.send(order);
        }
    },
    async removeItem(ctx) {
        let params = ctx.request.body;

        await strapi.services['order-item'].delete({ id: params.id });
        await this.recomputeOrder(params.orderId);

        let order = await this.pullOrder(params.orderId);
        ctx.send(order);
    },
    async updateItem(ctx) {
        let params = ctx.request.body;

        let orderItem = await strapi.services['order-item'].findOne({ id: params.id });
        if (orderItem) {
            orderItem.quantity = params.quantity;
            orderItem.purchase_type = params.purchaseTypeId;
            orderItem.subscription_type = params.subscriptionTypeId;
            await strapi.services['order-item'].update({ id: orderItem.id }, orderItem);
            await this.recomputeOrder(orderItem.order.id);
        }
        ctx.send(orderItem);
    },
    async addBundle(ctx) {
        let params = ctx.request.body;

        const bundle = await strapi.services.bundle.findOne({ id: params.bundleId });
        const orderStatus = await strapi.services['order-statuses'].findOne({ code: 1 });

        let options = null;
        if (params.userId) {
            options = { 'order_status.id': orderStatus.id, 'user.id': params.userId };
        } else {
            options = { 'order_status.id': orderStatus.id, 'order_token': params.orderToken };
        }
        let order = await strapi.services.order.findOne(options);
        if (!order) {
            order = await strapi.services.order.create({
                order_no: null,
                order_date: Date.now(),
                order_items: [],
                total: bundle.price,
                order_status: orderStatus.id,
                user: params.userId,
                order_token: params.orderToken
            });
        } else {
            order.user = params.userId;
            order.order_token = params.orderToken;
            order = await strapi.services.order.update({ id: order.id }, order);
        }
        if (order.id) {
            let orderBundle = await strapi.services['order-bundle'].create({
                bundle: bundle.id,
                order: order.id,
                price: bundle.price
            });
            await this.recomputeOrder(order.id);
        }

        order = await this.pullOrder(order.id);
        ctx.send(order);
    },
    async removeBundle(ctx) {
        let params = ctx.request.body;

        await strapi.services['order-bundle'].delete({ id: params.id });
        await this.recomputeOrder(params.orderId);

        let order = await this.pullOrder(params.orderId);
        ctx.send(order);
    },
    async emptyOrder(ctx) {
        let params = ctx.request.body;

        const orderStatus = await strapi.services['order-statuses'].findOne({ code: 1 });

        let options = null;
        if (params.userId > 0) {
            options = { 'order_status.id': orderStatus.id, 'user.id': params.userId };
        } else {
            options = { 'order_status.id': orderStatus.id, 'order_token': params.orderToken };
        }
        let order = await strapi.services.order.findOne(options);
        if (order) {
            let orderItems = await strapi.services['order-item'].find();
            if (orderItems.length) {
                for (let i = 0; i < orderItems.length; i++) {
                    await strapi.services['order-item'].delete({ id: orderItems[i].id });
                }
            }
            await this.recomputeOrder(order.id);

            order = await this.pullOrder(order.id);
            ctx.send(order);
        }
    },
    async placeOrder(ctx) {
        let params = ctx.request.body;

        const orderStatus = await strapi.services['order-statuses'].findOne({ code: 1 });
        const newOrderStatus = await strapi.services['order-statuses'].findOne({ code: 'completed' });

        let options = null;
        if (params.userId > 0) {
            options = { 'order_status.id': orderStatus.id, 'user.id': params.userId };
        } else {
            options = { 'order_status.id': orderStatus.id, 'order_token': params.orderToken };
        }
        let order = await strapi.services.order.findOne(options);
        if (order) {
            order.order_status = newOrderStatus.id;
            order.order_no = params.orderNo;
            order.order_date = params.orderDate;
            order.billing_first_name = params.billingFirstName;
            order.billing_last_name = params.billingLastName;
            order.billing_company = params.billingCompany;
            order.billing_address_1 = params.billingAddress1;
            order.billing_city = params.billingCity;
            order.billing_state = params.billingState;
            order.billing_zip_code = params.billingZipCode;
            order.billing_contact_no = params.billingContactNo;
            order.billing_email = params.billingEmail;
            order.shipping_first_name = params.shippingFirstName;
            order.shipping_last_name = params.shippingLastName;
            order.shipping_company = params.shippingCompany;
            order.shipping_address_1 = params.shippingAddress1;
            order.shipping_city = params.shippingCity;
            order.shipping_state = params.shippingState;
            order.shipping_zip_code = params.shippingZipCode;
            order.shipping_contact_no = params.shippingContactNo;
            order.shipping_email = params.shippingEmail;
            order = await strapi.services.order.update({ id: order.id }, order);
        }
        ctx.send(null);
    },
    async getOrder(ctx) {
        let params = ctx.request.query;
        const order = await this.pullOrder(params.id);
        ctx.send(order);
    },
    async pullOrder(id) {
        const order = await strapi.services.order.findOne({ id: id}, [
            'order_status',
            'user',
            'order_items',
            'order_items.product',
            'order_items.product.image',
            'order_items.product.categories',
            'order_items.size',
            'order_items.purchase_type',
            'order_items.subscription_type',
            'order_bundles',
            'order_bundles.bundle',
            'order_bundles.bundle.products',
            'order_bundles.bundle.products.image'
        ]);
        return order;
    },
    async recomputeOrder(id) {
        let order = await strapi.services.order.findOne({ id: id});
        if (order) {
            let total = 0;
            let orderItems = await strapi.services['order-item'].find({ 'order.id': order.id });
            if (orderItems) {
                for (let i = 0; i < orderItems.length; i++) {
                    total += (orderItems[i].quantity * orderItems[i].price);
                }
            }
            let orderBundles = await strapi.services['order-bundle'].find({ 'order.id': order.id });
            if (orderBundles) {
                for (let i = 0; i < orderBundles.length; i++) {
                    total += orderBundles[i].price;
                }
            }
            order.total = total;
            await strapi.services.order.update({ id: order.id }, order);
        }
    }
};
