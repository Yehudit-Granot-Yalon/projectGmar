const { Server } = require("socket.io"),
    server = new Server(8000);
let conectToClient = new Map();
// event fired every time a new client connects:
server.on("connection", (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    // initialize this client's sequence number
    conectToClient.set(socket, 1);
// when socket disconnects, remove it from the list:
    socket.on("disconnect", () => {
        conectToClient.delete(socket);
        console.info(`Client gone [id=${socket.id}]`);
    });
});
var serialNumber = 0;
var east = 194478.807954692;
var north =690816.913414041;
var consecTrck = 1;
var coordinate = [serialNumber, consecTrck, 1, 2, 4, east, north, 79.1195212511709, 98.5, 0.138878751851735, -7.91738065332174, -0.186484577293029, 7.92079416566783, 6.5, -10.5, 15.0035758309174, 19.72, 73.9482064258576];
var spaceX = Math.floor((Math.random() * 20) + 10);
var spacey = Math.floor((Math.random() * 8) + 2);
var groupNumber = Math.floor((Math.random() * 8) + 4);
// sends each client its current sequence number
setInterval(() => {
    for (const [client, sequenceNumber] of conectToClient.entries()) {
        client.emit("seq-num", sequenceNumber);
        spaceX = Math.floor((Math.random() * 20) + 10);
        spacey = Math.floor((Math.random() * 8) + 2);
        coordinate[0] += 1;
        coordinate[5] += spaceX;
        coordinate[6] += spacey;
        conectToClient.set(client, coordinate);
        if (coordinate[0] % groupNumber== 0) {
            coordinate[1] += 1;
            groupNumber = Math.floor((Math.random() * 8) + 4);  
        }
 }
}, 3000);
