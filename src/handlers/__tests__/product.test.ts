import resquest from 'supertest'
import server from '../../server'

describe('POST /api/products', () => {
    test('Should display validation errors', async () => {
        const response = await resquest(server).post('/api/products').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)

        expect(response.status).not.toBe(401)
        expect(response.body.errors).not.toHaveLength(3)
    })

    test('Price should be a greater than 0', async () => {
        const response = await resquest(server).post('/api/products').send({
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
        const response = await resquest(server).post('/api/products').send({
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