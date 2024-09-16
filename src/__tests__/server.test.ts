import request from "supertest";
import server from "../server";

describe('GET /api', () => {
    test('should send back a json response', async () => {
        const res = await request(server).get('/api')
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body.msg).toBe('From API')

        expect(res.status).not.toBe(404)
        expect(res.body.msg).not.toBe('from api')
    })
})