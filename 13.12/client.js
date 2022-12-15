const io = require("socket.io-client"),
    fs = require('fs')
const fileName = './data.json';
const data = require(fileName);

data.points = [];
var ioClient = io.connect("http://localhost:8000");//Listening on port 8000

ioClient.on("seq-num", (msg) => {
    console.info(msg);
    if (msg != 1) {
         data.points[0]=msg//Updates the data file with the coordinate from the server
      fs.writeFile(fileName, JSON.stringify(data), function writeJSON(err) {
            if (err) return console.info(err);

        });
    }


}
);
