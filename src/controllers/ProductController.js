const mongoose = require("mongoose");

const Product = mongoose.model("Product");

module.exports = {
  /**
   * @swagger
   * /api/v1/products:
   *  get:
   *    description: Utilize para requisição de todos os produtos
   *    tags:
   *      - Products
   *    produces:
   *      - application/json
   *    responses:
   *      '200':
   *         description: products
   */
  async index(req, res) {
    const { page = 1 } = req.query;
    const products = await Product.paginate({}, { page, limit: 10 });

    return res.json(products);
  },

  async show(req, res) {
    const product = await Product.findById(req.params.id);

    return res.json(product);
  },

  async store(req, res) {
    const product = await Product.create(req.body);

    return res.json(product);
  },

  async update(req, res) {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    return res.json(product);
  },

  async destroy(req, res) {
    const product = await Product.findByIdAndDelete(req.params.id);

    return res.send();
  }
};
