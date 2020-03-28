const mongoose = require("mongoose");
const Product = mongoose.model("Product");

module.exports = {
  /**
   * @swagger
   * /api/v1/products:
   *  get:
   *    tags:
   *    - Products
   *    summary: Lista de produtos
   *    description: Lista de produtos
   *    consumes:
   *      - application/json
   *    produces:
   *      - application/json
   *    responses:
   *       200:
   *         description: "ok"
   *         schema:
   *          $ref: '#/definitions/ProductsSelect'
   *       400:
   *          description: "bad request"
   *       404:
   *          description: "order not found"
   * definitions:
   *    ProductsSelect:
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
   *         __v:
   *            type: integer
   *            format: 0
   *       xml:
   *          name: 'Products'
   *
   */
  async index(req, res) {
    try {
      const { page = 1 } = req.query;
      const products = await Product.paginate({}, { page, limit: 10 });

      return products == null
        ? res.status(404).json({ message: "order not found" })
        : res.status(200).json({ message: "ok", products });
    } catch (err) {
      return res.status(400).json({ message: "bad request" });
    }
  },

  /**
   * @swagger
   * /api/v1/products/{id}:
   *  get:
   *    tags:
   *    - Products
   *    summary: Selecione um produto pelo id
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
   *         description: "ok"
   *         schema:
   *          $ref: '#/definitions/ProductsSelectById'
   *       400:
   *          description: "bad resquest"
   *       404:
   *          description: "order not found"
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
   *         __v:
   *            type: integer
   *            format: 0
   *       xml:
   *          name: 'Products'
   *
   */
  async show(req, res) {
    try {
      const product = await Product.findById(req.params.id);

      return product == null
        ? res.status(404).json({ message: "order not found" })
        : res.status(200).json({ message: "ok" });
    } catch (err) {
      return res.status(400).json({ message: "bad request" });
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
   *         description: "ok"
   *         schema:
   *          $ref: '#/definitions/ProductsInsertModel'
   *       400:
   *          description: "bad request"
   *       404:
   *          description: "order not found"
   * definitions:
   *    ProductsInsertModel:
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
   *         __v:
   *            type: integer
   *            format: 0
   *       xml:
   *          name: 'Products'
   *
   */
  async store(req, res) {
    try {
      const product = await Product.create(req.body);
      return product == null
        ? res.status(404).json({ message: "order not found" })
        : res.status(201).json({ message: "ok" });
    } catch (err) {
      return res.status(400).json({ message: "bad request" });
    }
  },

  /**
   * @swagger
   * /api/v1/products/{id}:
   *  put:
   *    tags:
   *    - Products
   *    summary: 'Altere um produto pelo id'
   *    description: 'Altere um produto pelo id'
   *    produces:
   *    - application/json
   *    parameters:
   *    - name: id
   *      in: path
   *      description: ID do Produto que será alterado
   *      required: true
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
   *         description: "ok"
   *         schema:
   *          $ref: '#/definitions/ProductsUpdateModel'
   *       400:
   *          description: "bad resquest"
   *       404:
   *          description: "Order not found"
   * definitions:
   *    ProductsUpdateModel:
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
   *         __v:
   *            type: integer
   *            format: 0
   *       xml:
   *          name: 'Products'
   *
   */
  async update(req, res) {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });

      return product == null
        ? res.status(404).json({ message: "order not found" })
        : res.status(200).json({ message: "ok" });
    } catch (err) {
      return res.status(400).json({ message: "bad request" });
    }
  },

  /**
   * @swagger
   * /api/v1/products/{id}:
   *  delete:
   *    tags:
   *    - Products
   *    summary: Delete um produto pelo id
   *    description: Delete um produto pelo id
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
   *          description: "ok"
   *       400:
   *          description: "bad request"
   *       404:
   *          description: "order not found"
   */

  async destroy(req, res) {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);

      return product == null
        ? res.status(404).json({ message: "order not found" })
        : res.status(200).json({ message: "ok" });
    } catch (err) {
      return res.status(400).json({ message: "bad request" });
    }
  }
};
