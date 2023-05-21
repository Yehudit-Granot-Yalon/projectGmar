// Importing necessary modules
const io = require("socket.io-client"),
     fs = require('fs')

// Define the file to read/write data to
const fileName = './data.json';

// Read data from the file
const data = require(fileName);

// Initialize the "points" array to be empty
data.points = [];

// Connect to the server
var ioClient = io.connect("http://localhost:8000");

// Listen for a "seq-num" event from the server
ioClient.on("seq-num", (msg) => {

     // Print the message received from the server
     console.info(msg);

     // If the message is not equal to 1, update the "points" array with the received coordinates
     if (msg != 1) {
          data.points[0]=msg;

          // Write the updated data to the file
          fs.writeFile(fileName, JSON.stringify(data), function writeJSON(err) {
             if (err) return console.info(err);
         });
     }
});
