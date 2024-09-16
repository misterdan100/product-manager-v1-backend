import request from "supertest";
import server, { connectDB } from "../server";
import db from "../config/db";

describe('GET /api', () => {
    test('should send back a json response', async () => {
        const res = await request(server).get('/api')
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body.msg).toBe('From API')

        expect(res.status).not.toBe(404)
        expect(res.body.msg).not.toBe('from api')
    })
})

// mock to force a test in db
jest.mock('../config/db')
describe('connectDB', () => {
    it('should handle database connection error', async () => {
        jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error('error desde el mock en la base de datos'))
        const consoleSpy = jest.spyOn(console, 'log')

        await connectDB()
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('[CONNECTDB]')
        )
    })
})