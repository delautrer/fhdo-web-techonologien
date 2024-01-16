const http = require("http");
const router = require("./router")

const httpServer = http.createServer(router);

httpServer.listen(3000, () => {
    console.log("Server läuft auf Port 3000!");
});