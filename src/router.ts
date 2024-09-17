import { Router } from "express"
import { body, param } from 'express-validator'
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"

const router = Router()

/**
 * @swagger
 * components:
 *  schemas:
 *      Product:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: The Product ID
 *                  example: 1
 *              name:
 *                  type: string
 *                  description: The Product name
 *                  example: Curve Monitor
 *              price:
 *                  type: number
 *                  description: The Product price
 *                  example: 300
 *              availability:
 *                  type: boolean
 *                  description: The Product availability
 *                  example: true
 */

/**
 * @swagger
 *  /api/products:
 *      get: 
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses: 
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */

//Routing 
router.get('/', getProducts)

/**
 * @swagger
 *  /api/products/{id}:
 *      get: 
 *          summary: Get a product by ID
 *          tags:
 *              - Products
 *          description: Return a product based on its unique ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Not Found
 *              400:
 *                  description: Bad Request = Invalid ID
 */
router.get('/:id', 
    param('id').isInt().withMessage('Invalid id') ,
    handleInputErrors,
    getProductById)

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new product
 *      tags: 
 *          - Products
 *      description: Returns a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:         
 *                          name:
 *                              type: string
 *                              example: "Mouse MX Pro"
 *                          price:
 *                              type: number
 *                              example: 399
 *      responses:
 *          201:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - invalid data
 * 
 *     
 */
router.post('/', 
    body('name') // validation with express-validator
        .notEmpty().withMessage("Name product can't be empty"),
    body('price') // validation with express-validator
        .isNumeric().withMessage("Invalid price!")
        .notEmpty().withMessage("Price product can't be empty")
        .custom(value => value > 0).withMessage("Invalid price!"),
        handleInputErrors, 
    createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      description: Return the updated product
 *      parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:         
 *                          name:
 *                              type: string
 *                              example: "Mouse MX Pro"
 *                          price:
 *                              type: number
 *                              example: 399
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Product Not Found
 *          400:
 *              description: Bad Request - Invalid ID or Invalid input data
 * 
 * 
 */
router.put('/:id', 
    param('id').isInt().withMessage('Invalid id') ,
    body('name') // validation with express-validator
        .notEmpty().withMessage("Name product can't be empty"),
    body('price') // validation with express-validator
        .isNumeric().withMessage("Invalid price!")
        .notEmpty().withMessage("Price product can't be empty")
        .custom(value => value > 0).withMessage("Invalid price!"),
    body('availability')
        .isBoolean().withMessage('Availability value not valid'),
    handleInputErrors,
    updateProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update Product availability
 *      tags:
 *          - Products
 *      description: Returns the updated availability
 *      parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:         
 *                          name:
 *                              type: string
 *                              example: "Mouse MX Pro"
 *                          price:
 *                              type: number
 *                              example: 399
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Product Not Found
 *          400:
 *              description: Bad Request - Invalid ID or Invalid input data
 *      
 */
router.patch('/:id', 
    param('id').isInt().withMessage('Invalid id') ,
    handleInputErrors,
    updateAvailability
)

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Deletes a product by a given ID
 *      tags:
 *          - Products
 *      description: Returns a confirmation message
 *      parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to delete
 *              required: true
 *              schema:
 *                  type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: 'Product deleted'
 *          404:
 *              description: Product Not Found
 *          400:
 *              description: Bad Request - Invalid ID or Invalid input data
 */
router.delete('/:id', 
    param('id').isInt().withMessage('Invalid id'),
    handleInputErrors,
    deleteProduct
)

export default router

