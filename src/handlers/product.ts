import { Request, Response } from 'express'
import Product from '../models/Product.model'

export const getProducts = async ( req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            order: [
                ['price', 'DESC']
            ],
            attributes: {exclude: ['id']}
        })
        res.json({data: products})
    } catch (error) {
        console.log('[GETPRODUCTS]', error)
    }
}

export const getProductById = async ( req: Request, res: Response) => {
    try {
        const id = req.params.id
        const product = await Product.findByPk(id)
        if(!product) {
            return res.status(404).json({
                error: 'Product not found!'
            })
        }
        res.json({data: product})
    } catch (error) {
        console.log('[GETPRODUCTBYID]', error)
    }
}


export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body)
        res.json({data: product, message: 'Product created correctly!'})
    } catch (error) {
        console.log('[CREATEPRODUCT]', error)
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const product = await Product.findByPk(id)
        if(!product) { // Validate if product exist
            return res.status(404).json({
                error: 'Product not found!'
            })
        }

        await product.update(req.body)
        const response = await product.save()
        res.status(200).json({data: response})

    } catch (error) {
        console.log('[UPDATEPRODUCT]', error)
    }
}

export const updateAvailability = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const product = await Product.findByPk(id)
        if(!product) { // Validate if product exist
            return res.status(404).json({
                error: 'Product not found!'
            })
        }

        product.availability = !product.dataValues.availability
        const response = await product.save()
        res.status(200).json({data: response})

    } catch (error) {
        console.log('[UPDATEAVAILABILITY]', error)
    }
}