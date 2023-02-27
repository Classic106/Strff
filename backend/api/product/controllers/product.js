const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async find(ctx) {
    const entity = await strapi.services.product.find(ctx.query);
    return sanitizeEntity(entity, { model: strapi.models.product });
  },
  async findOne(ctx) {
    const { slug } = ctx.params;

    const entity = await strapi.services.product.findOne({ id: slug });
    return sanitizeEntity(entity, { model: strapi.models.product });
  },
  async update(ctx) {
    const { id } = ctx.params;
    const { body } = ctx.request;
    const { image, newImages, width, lengthy, height } = body;

    const product = await strapi.services.product.findOne({
      id,
      _publicationState: "preview",
    });

    const productImage = product.image.map((image) => image.id);

    const difference = productImage.filter((x) => !image.includes(x));

    if (difference.length && image >= 1 && newImages) {
      for (let k = 0; k < difference.length; k++) {
        const id = difference[k];
        await strapi.plugins["upload"].services.upload.remove({ id });
      }
    }

    const { width: w, lengthy: l, height: h, volume: v } = product;
    let volume = v;

    if (width !== w || lengthy !== l || height !== h) {
      volume = w * l * h;
    }

    const data = { ...body, image: [...image, ...(newImages || [])], volume };

    const updatedProduct = await strapi.services.product.update({ id }, data);

    return updatedProduct;
  },
  async delete(ctx) {
    const { ids } = ctx.params;

    const delteItems = ids.split(",");

    const deletedProducts = await Promise.all(
      delteItems.map(async (id) => {
        const product = await strapi.services["product"].findOne({ id });

        if (product) {
          const { image } = product;

          if (image.length) {
            for (let k = 0; k < image.length; k++) {
              const { id } = image[k];
              await strapi.plugins["upload"].services.upload.remove({ id });
            }
          }
        }
        await strapi.services["product"].delete({ id });
      })
    );

    return deletedProducts;
  },
};
