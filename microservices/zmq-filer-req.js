'use strict';

const zmq = require('zeromq');

const PORT = 60401;

const filename = process.argv[2];

(async function() {
  const requester = new zmq.Request
 
  await requester.connect(`tcp://127.0.0.1:${PORT}`)
  console.log(`Connected to port ${PORT}`)

  console.log(`Sending a request for ${filename}`);
  requester.send(JSON.stringify({ path: filename }));

  // for await (const data of requester) {
  //   const response = JSON.parse(data);
  //   console.log('Received response:', response);
  // }

  const data = await requester.receive();
  const response = JSON.parse(data);
  console.log('Received response:', response);

})();