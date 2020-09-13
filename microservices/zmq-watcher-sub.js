'use strict';
// const zmq = require('zeromq');

// // Create subscriber endpoint.
// const subscriber = zmq.socket('sub');

// // Subscribe to all messages.
// subscriber.subscribe('');

// // Handle messages from the publisher.
// subscriber.on('message', data => {
//   const message = JSON.parse(data);
//   const date = new Date(message.timestamp);
//   console.log(`File "${message.file}" changed at ${date}`);
// });

// // Connect to publisher.
// subscriber.connect("tcp://localhost:60400");


const zmq = require("zeromq")
 
async function run() {
  const sock = new zmq.Subscriber
 
  sock.connect("tcp://127.0.0.1:60400")
  sock.subscribe("")
  console.log("Subscriber connected to port 60400")
 
  for await (const data of sock) {
    const message = JSON.parse(data);
    const date = new Date(message.timestamp);
    console.log(`File "${message.file}" changed at ${date}`);
  }
}
 
run()
