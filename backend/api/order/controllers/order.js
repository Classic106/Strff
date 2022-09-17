"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findOne(ctx) {
    const { id } = ctx.params;

    const result = await strapi.services["order"].findOne({ id }, [
      "order_items.product",
      "order_items.product.image",
      "order_items.product.categories",
      "order_bundles.bundle",
      "order_bundles.bundle.products.image",
      "order_bundles.bundle.products.categories",
    ]);

    return result;
  },
  async create(ctx) {
    const { body } = ctx.request;
    const { orderItems, orderBundles } = body;

    const newOrderItems = [];
    const newOrderBundles = [];

    if (orderItems.length) {
      for (let k = 0; k < orderItems.length; k++) {
        const item = await strapi.services["order-item"].create(orderItems[k]);
        newOrderItems.push(item.id);
      }
    }

    if (orderBundles.length) {
      for (let k = 0; k < orderBundles.length; k++) {
        const bundle = await strapi.services["order-bundle"].create(
          orderBundles[k]
        );
        newOrderBundles.push(bundle.id);
      }
    }

    body.orderItems = newOrderItems;
    body.orderBundles = newOrderBundles;

    const result = await strapi.services.order.create(body);

    return result;
  },
  async delete(ctx) {
    const { id } = ctx.params;

    const order = await strapi.services["order"].findOne({ id });

    if (order) {
      const { orderItems, orderBundles } = order;

      if (orderItems.length) {
        for (let k = 0; k < orderItems.length; k++) {
          await strapi.services["order-item"].delete({ id: orderItems[k].id });
        }
      }

      if (orderBundles.length) {
        for (let k = 0; k < orderBundles.length; k++) {
          await strapi.services["order-bundle"].delete({
            id: orderBundles[k].id,
          });
        }
      }
    }
    const result = await strapi.services["order"].delete({
      id: order.id,
    });

    return result;
  },
  async addToCart(ctx) {
    let params = ctx.request.body;

    const product = await strapi.services.product.findOne({
      id: params.productId,
    });
    const size = await strapi.services.size.findOne({ id: params.sizeId });
    const cartStatus = await strapi.services["order-statuses"].findOne({
      code: "cart",
    });
    const purchaseType = await strapi.services["purchase-type"].findOne({
      id: params.purchaseTypeId,
    });
    let subscriptionType = null;
    if (params.subscriptionTypeId > 0) {
      subscriptionType = await strapi.services["subscription-type"].findOne({
        id: params.subscriptionTypeId,
      });
    }

    let options = null;
    if (params.userId > 0) {
      options = { "order_status.id": cartStatus.id, "user.id": params.userId };
    } else {
      options = {
        "order_status.id": cartStatus.id,
        cart_token: params.cartToken,
      };
    }
    let cart = await strapi.services.order.findOne(options);
    if (!cart) {
      cart = await strapi.services.order.create({
        order_no: null,
        order_date: Date.now(),
        order_items: [],
        total: product.price,
        order_status: cartStatus.id,
        user: params.userId,
        cart_token: params.cartToken,
      });
    } else {
      cart.total += params.quantity * product.price;
      cart.user = params.userId;
      cart.cart_token = params.cartToken;
      cart = await strapi.services.order.update({ id: cart.id }, cart);
    }
    if (cart.id) {
      let options = {
        "order.id": cart.id,
        "product.id": product.id,
        "purchase_type.id": purchaseType.id,
      };
      if (subscriptionType) {
        options["subscription_type.id"] = subscriptionType.id;
      }
      let cartItem = null;
      let cartItems = await strapi.services["order-item"].find(options);
      if (!cartItems.length) {
        cartItem = await strapi.services["order-item"].create({
          product: product.id,
          quantity: params.quantity,
          price: product.price,
          total: params.quantity * product.price,
          order: cart.id,
          size: size.id,
          purchase_type: purchaseType.id,
          subscription_type: subscriptionType ? subscriptionType.id : null,
        });
      } else {
        cartItem = cartItems[0];
        cartItem.quantity += params.quantity;
        cartItem.total = cartItem.quantity * cartItem.price;
        cartItem = await strapi.services["order-item"].update(
          { id: cartItem.id },
          cartItem
        );
      }
    }

    cart = await strapi.services.order.findOne({ id: cart.id }, [
      "order_status",
      "user",
      "order_items",
      "order_items.product",
      "order_items.size",
      "order_items.purchase_type",
      "order_items.subscription_type",
    ]);
    ctx.send(cart);
  },
  async removeFromCart(ctx) {
    let params = ctx.request.body;

    const product = await strapi.services.product.findOne({
      id: params.productId,
    });
    const size = await strapi.services.size.findOne({ id: params.sizeId });
    const cartStatus = await strapi.services["order-statuses"].findOne({
      code: "cart",
    });
    const purchaseType = await strapi.services["purchase-type"].findOne({
      id: params.purchaseTypeId,
    });
    let subscriptionType = null;
    if (params.subscriptionTypeId > 0) {
      subscriptionType = await strapi.services["subscription-type"].findOne({
        id: params.subscriptionTypeId,
      });
    }

    let options = null;
    if (params.userId > 0) {
      options = { "order_status.id": cartStatus.id, "user.id": params.userId };
    } else {
      options = {
        "order_status.id": cartStatus.id,
        cart_token: params.cartToken,
      };
    }
    let cart = await strapi.services.order.findOne(options);
    if (cart) {
      let options = {
        "order.id": cart.id,
        "product.id": product.id,
        "purchase_type.id": purchaseType.id,
      };
      if (subscriptionType) {
        options["subscription_type.id"] = subscriptionType.id;
      }
      let cartItem = null;
      let cartItems = await strapi.services["order-item"].find(options);
      if (cartItems.length) {
        cartItem = cartItems[0];
        cartItem.quantity -= params.quantity;
        cart.total -= params.quantity * cartItem.price;
        cartItem.total = cartItem.quantity * cartItem.price;
        if (cartItem.quantity > 0) {
          await strapi.services["order-item"].update(
            { id: cartItem.id },
            cartItem
          );
        } else {
          await strapi.services["order-item"].delete({ id: cartItem.id });
        }
        cart = await strapi.services.order.update({ id: cart.id }, cart);
      }

      cart = await strapi.services.order.findOne({ id: cart.id }, [
        "order_status",
        "user",
        "order_items",
        "order_items.product",
        "order_items.size",
        "order_items.purchase_type",
        "order_items.subscription_type",
      ]);
      ctx.send(cart);
    }
  },
  async emptyCart(ctx) {
    let params = ctx.request.body;

    const cartStatus = await strapi.services["order-statuses"].findOne({
      code: "cart",
    });

    let options = null;
    if (params.userId > 0) {
      options = { "order_status.id": cartStatus.id, "user.id": params.userId };
    } else {
      options = {
        "order_status.id": cartStatus.id,
        cart_token: params.cartToken,
      };
    }
    let cart = await strapi.services.order.findOne(options);
    if (cart) {
      let cartItems = await strapi.services["order-item"].find();
      if (cartItems.length) {
        for (let i = 0; i < cartItems.length; i++) {
          await strapi.services["order-item"].delete({ id: cartItems[i].id });
        }
      }
      cart = await strapi.services.order.findOne({ id: cart.id }, [
        "order_status",
        "user",
        "order_items",
        "order_items.product",
        "order_items.size",
        "order_items.purchase_type",
        "order_items.subscription_type",
      ]);
      ctx.send(cart);
    }
  },
  async releaseCart(ctx) {
    let params = ctx.request.body;

    const cartStatus = await strapi.services["order-statuses"].findOne({
      code: "cart",
    });
    const newCartStatus = await strapi.services["order-statuses"].findOne({
      code: "completed",
    });

    let options = null;
    if (params.userId > 0) {
      options = { "order_status.id": cartStatus.id, "user.id": params.userId };
    } else {
      options = {
        "order_status.id": cartStatus.id,
        cart_token: params.cartToken,
      };
    }
    let cart = await strapi.services.order.findOne(options);
    if (cart) {
      cart.order_status = newCartStatus.id;
      cart.order_no = params.orderNo;
      cart.order_date = params.orderDate;
      cart.billing_first_name = params.billingFirstName;
      cart.billing_last_name = params.billingLastName;
      cart.billing_company = params.billingCompany;
      cart.billing_address_1 = params.billingAddress1;
      cart.billing_city = params.billingCity;
      cart.billing_state = params.billingState;
      cart.billing_zip_code = params.billingZipCode;
      cart.billing_contact_no = params.billingContactNo;
      cart.billing_email = params.billingEmail;
      cart.shipping_first_name = params.shippingFirstName;
      cart.shipping_last_name = params.shippingLastName;
      cart.shipping_company = params.shippingCompany;
      cart.shipping_address_1 = params.shippingAddress1;
      cart.shipping_city = params.shippingCity;
      cart.shipping_state = params.shippingState;
      cart.shipping_zip_code = params.shippingZipCode;
      cart.shipping_contact_no = params.shippingContactNo;
      cart.shipping_email = params.shippingEmail;
      cart = await strapi.services.order.update({ id: cart.id }, cart);
    }
    ctx.send(null);
  },
  async getCart(ctx) {
    let params = ctx.request.query;
    const cart = await strapi.services.order.findOne(params, [
      "order_status",
      "user",
      "order_items",
      "order_items.product",
      "order_items.size",
      "order_items.purchase_type",
      "order_items.subscription_type",
    ]);
    ctx.send(cart);
  },
};
