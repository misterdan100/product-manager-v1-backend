import server from "./server";
import colors from 'colors'

// define a conection / port for server // this active the port
const port = process.env.PORT || 4000
server.listen(port, () => {
    console.log(colors.cyan.bold(`REST API en el puerto ${port}`))
})