const mongoose = require("mongoose");
const Product = mongoose.model("Product");

module.exports = {
  /**
   * @swagger
   * /api/v1/products:
   *  get:
   *    tags:
   *    - Products
   *    description: Lista de produtos
   *    consumes:
   *      - application/json
   *    produces:
   *      - application/json
   *    responses:
   *       200:
   *         description:
   *         schema:
   *          $ref: '#/definitions/ProductsLista'
   *       400:
   *          description: "Invalid ID supplied"
   *       404:
   *          description: "Order not found"
   * definitions:
   *    ProductsLista:
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
   *          name: 'Products'
   *
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
   *    tags:
   *    - Products
   *    description: Selecione um produto pelo id
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
   *          $ref: '#/definitions/ProductsSelectById'
   *       400:
   *          description: "ID Invalido"
   *       404:
   *          description: "Nada encontrado"
   * definitions:
   *    ProductsSelectById:
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
   *          name: 'Products'
   *
   */
  async show(req, res) {
    try {
      const product = await Product.findById(req.params.id);

      return product == null
        ? res.status(404).json({ message: "nada encontrado" })
        : res.json({ message: "sucesso", product });
    } catch (err) {
      return res.status(400).json({ message: "ID Invalido" });
    }
  },

  /**
   * @swagger
   * /api/v1/products:
   *  post:
   *    tags:
   *    - Products
   *    summary: 'Insere um novo produto'
   *    description: 'Insere um novo produto'
   *    produces:
   *    - application/json
   *    parameters:
   *    - in: body
   *      name: body
   *      description: Insere um novo produto
   *      required: true
   *      schema:
   *        type: object
   *        properties:
   *          title:
   *             type: string
   *             example: "Api nodeJS"
   *          description:
   *             type: string
   *             example: "Documentação Swagger"
   *          url:
   *             type: string
   *             example: "https://swagger.io/"
   *    responses:
   *       201:
   *         description:
   *         schema:
   *          $ref: '#/definitions/ProductsInsereModel'
   *       400:
   *          description: "Erro ao salvar produto"
   *       404:
   *          description: "Order not found"
   * definitions:
   *    ProductsInsereModel:
   *       type: object
   *       properties:
   *         _id:
   *            type: string
   *            example: 5e7fa629382a536b82e142cf
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
   *          name: 'Products'
   *
   */
  async store(req, res) {
    try {
      const product = await Product.create(req.body);

      return res.status(201).json(product);
    } catch (err) {
      res.status(400).json({ message: "Erro ao salvar produto" });
    }
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
