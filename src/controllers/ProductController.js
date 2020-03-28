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

  /**
   * @swagger
   * /api/v1/products/{id}:
   *  get:
   *    description: Selecione um produto pelo id
   *    tags:
   *      - Products
   *    consumes:
   *      - application/json
   *    produces:
   *      - application/json
   *    parameters:
   *      - in: path
   *        name: id
   *        format: string
   *        schema:
   *          type: string
   *        required: true
   *        description: String id para selecionar Produtos
   *    responses:
   *       200:
   *         description:
   *         schema:
   *          $ref: '#/definitions/Product'
   *       400:
   *          description: "Invalid ID supplied"
   *       404:
   *          description: "Order not found"
   * definitions:
   *    Product:
   *       type: object
   *       properties:
   *         id:
   *            type: string
   *            example: "5e7d17bc9eb75d446aa078d5"
   *         title:
   *            type: string
   *            example: "Api nodeJS"
   *         description:
   *            type: string
   *            example: "Documentação Swagger"
   *         url:
   *            type: string
   *            example: "https://swagger.io/"
   *         createdAd:
   *            type: string
   *            format: date-time
   *       xml:
   *          name: 'Product'
   *
   */
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
