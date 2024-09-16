import {exit} from 'node:process'
import db from '../config/db'

const clearDB = async () => {
    try {
        await db.sync({force: true})
        console.log('Data deleted correctly!')
        exit(0) // "0" or "" = finish the program without errors

    } catch (error) {
        console.log('[CLEARDB]', error)
        exit(1) // "1" = finish the program with errors
    }
}

if(process.argv[2] === '--clear') {
    clearDB()
}