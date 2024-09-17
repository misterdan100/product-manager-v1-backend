import { connectDB } from "../server";
import db from "../config/db";

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