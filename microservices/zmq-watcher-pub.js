/***
 * Excerpted from "Node.js 8 the Right Way",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/jwnode2 for more book information.
***/
'use strict';
const fs = require('fs');
const zmq = require('zeromq');
const filename = process.argv[2];

(async function() {
  const publisher = new zmq.Publisher
 
  await publisher.bind("tcp://127.0.0.1:60400")
  console.log("Publisher bound to port 60400")
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


