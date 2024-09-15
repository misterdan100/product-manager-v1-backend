import { Router } from "express"
import { body, param } from 'express-validator'
import { createProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"

const router = Router()

//Routing 
router.get('/', getProducts)
router.get('/:id', 
    param('id').isInt().withMessage('Invalid id') ,
    handleInputErrors,
    getProductById)

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

router.patch('/:id', 
    param('id').isInt().withMessage('Invalid id') ,
    // body('availability')
    //     .isBoolean().withMessage('Availability value not valid'),
    handleInputErrors,
    updateAvailability
)

router.delete('/', (req, res) => {
    res.json('Desde DELETE')
})

export default router

