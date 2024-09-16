import request from 'supertest'
import server from '../../server'
import { response } from 'express'

describe('POST /api/products', () => {
    test('Should display validation errors', async () => {
        const response = await request(server).post('/api/products').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)

        expect(response.status).not.toBe(401)
        expect(response.body.errors).not.toHaveLength(3)
    })

    test('Price should be a greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Timer - testing",
            price: -1,
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(401)
        expect(response.body.errors).not.toHaveLength(3)
    })

    test('Should create a new product', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Timer - testing",
            price: 15,
          })
          expect(response.status).toBe(201)
          expect(response.body).toHaveProperty('data')

          // what should not be
          expect(response.status).not.toEqual(200)
          expect(response.status).not.toEqual(404)
          expect(response.body).not.toHaveProperty('errors')
    })
})

describe('GET /api/products', () => {
    test('should check if api/products url exists', async () => {
        const res = await request(server).get('/api/products')
        expect(res.status).not.toBe(404)
    })

    test('GET a JSON response with products', async () => {
        const res = await request(server).get('/api/products')
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/) // check if the response is a json
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toHaveLength(1)
        
        expect(res.body).not.toHaveProperty('errors')
    })
})

describe('GET /api/products/:id', () => {
    test('Should return a 404 response for a non-existent product', async () => {
        const productId = 2000
        const res = await request(server).get(`/api/products/${productId}`)
        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toBe('Product not found!')

    })

    it('should check a valid ID in the URL', async () => {
        const res = await request(server).get('/api/products/not-valid-url')
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0].msg).toBe("Invalid id")
    })

    it('get a JSON response for a single product', async () => {
        const res = await request(server).get('/api/products/1')
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('data')
    })
})

describe('PUT /api/products/:id', () => {

    it('should check a valid ID in the URL', async () => {
        const res = await request(server)
                            .put('/api/products/not-valid-id')
                            .send({
                                name: "Keyboard Logitech",
                                price: 500,
                                availability: true
                            })
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0].msg).toBe("Invalid id")
    })
    it('should display validation error messages when updating a product', async () => {
        const res = await request(server).put('/api/products/1').send({})


        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toBeTruthy() // a object with info
        expect(res.body.errors).toHaveLength(5)

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')
    })

    it('should validate that the price is greater than 0', async () => {
        const res = await request(server)
                            .put('/api/products/1')
                            .send({
                                name: "Keyboard Logitech",
                                price: -500,
                                availability: true
                            })
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toBeTruthy() // a object with info
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0].msg).toBe("Invalid price!")

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')
    })

    it('should return a 404 response for a non-existent product', async () => {
        const productId = 2000
        const res = await request(server)
                            .put(`/api/products/${productId}`)
                            .send({
                                name: "Keyboard Logitech",
                                price: 500,
                                availability: true
                            })
        expect(res.status).toBe(404)
        expect(res.body.errors).toBe("Product not found!")

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')
    })

    it('should update an existing product with valid data', async () => {
        const res = await request(server)
                            .put(`/api/products/1`)
                            .send({
                                name: "Keyboard Logitech",
                                price: 200,
                                availability: true
                            })
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('data')


        expect(res.status).not.toBe(400)
        expect(res.body).not.toHaveProperty('errors')
    })


})

describe('PATCH /api/products/:id', () => {
    it('should return a 404 response for a non-existent product', async () => {
        const productId = 2000
        const res = await request(server).patch(`/api/products/${productId}`)
        expect(res.status).toBe(404)
        expect(res.body.errors).toBe("Product not found!")
        
        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty("data")
        
    })

    it('should return a 404 response for a non-existent product', async () => {
        const res = await request(server).patch(`/api/products/1`)
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty("data")
        expect(res.body.data.availability).toBe(false)
        
        expect(res.status).not.toBe(404)
        expect(res.body).not.toHaveProperty("errors")
        
    })
})

describe('DELETE /api/products/id', () => {
    test('should check a valid ID', async () => {
        const res = await request(server).delete('/api/products/not-valid-url')
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors[0].msg).toBe("Invalid id")
    })
    
    it('shuld return a 404 response for a non-existent product', async () => {
        const productId = 2000
        const res = await request(server).delete(`/api/products/${productId}`)
        
        expect(res.status).toBe(404)
        expect(res.body.errors).toBe("Product not found!")
        expect(res.status).not.toBe(200)
        
    })
    
    it('should delete a product', async () => {
        const res = await request(server).delete('/api/products/1')
        expect(res.status).toBe(200)
        expect(res.body.data).toBe('Product deleted.')
        expect(res.status).not.toBe(404)
        expect(res.status).not.toBe(400)
    })
})