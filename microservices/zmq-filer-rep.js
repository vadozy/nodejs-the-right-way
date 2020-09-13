'use strict';

const fs = require('fs');
const zmq = require('zeromq');

const PORT = 60401;

(async function() {
  const responder = new zmq.Reply
 
  await responder.bind(`tcp://127.0.0.1:${PORT}`)
  console.log(`Reply bound to port ${PORT}`)
  console.log('Listening for zmq requester...');

  // Close the responder when the Node process ends.
  process.on('SIGINT', () => {
    console.log('Shutting down...');
    responder.close();
  });

  for await (const data of responder) {
    const request = JSON.parse(data);
    console.log(`Received request to get: ${request.path}`);

    fs.readFile(request.path, (err, content) => {
      console.log('Sending response content.');
      responder.send(JSON.stringify({
        content: content.toString(),
        timestamp: Date.now(),
        pid: process.pid
      }));
    });
  }

})();


