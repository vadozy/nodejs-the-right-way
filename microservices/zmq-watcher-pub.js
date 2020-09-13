'use strict';
const fs = require('fs');
const zmq = require('zeromq');
const filename = process.argv[2];

const PORT = 60400;

(async function() {
  const publisher = new zmq.Publisher
 
  await publisher.bind(`tcp://127.0.0.1:${PORT}`)
  console.log(`Publisher bound to port ${PORT}`)
  console.log('Listening for zmq subscribers...');
 
  fs.watch(filename, () => {
  
    // Send a message to any and all subscribers.
    publisher.send(JSON.stringify({
      type: 'changed',
      file: filename,
      timestamp: Date.now()
    }));
    
  });

})();
