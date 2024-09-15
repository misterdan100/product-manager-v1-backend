import { Router } from "express"
import { body } from 'express-validator'
import { createProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"

const router = Router()

//Routing 
router.get('/', (req, res) => {
    res.json('Desde GET')
})

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

router.put('/', (req, res) => {
    res.json('Desde PUT')
})

router.patch('/', (req, res) => {
    res.json('Desde PATCH')
})

router.delete('/', (req, res) => {
    res.json('Desde DELETE')
})

export default router

