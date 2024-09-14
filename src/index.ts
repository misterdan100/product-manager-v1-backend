import server from "./server";

// define a conection / port for server // this active the port
server.listen(4000, () => {
    console.log('REST API en el puerto 4000')
})