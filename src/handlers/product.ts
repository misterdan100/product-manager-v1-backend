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