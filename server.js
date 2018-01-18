 /**
  * http package importing will provide us the some functionality for spinning up the server.  
  */
 

const http = require('http');  
const app = require('./app');

/**
 * TO set on which port application should run we can set the environment variables or hardcode the port number.
 * process.env will accesses node.js environment variables.
 * */
const port = process.env.PORT || 3000; 

/**
 * we will create the server and store in the constant by using the http module and the createServer() command.
 * We will pass the listener to the createServer() command, which is essentially a function which is executed when received new a request or produce response.  
 */
const server = http.createServer(app);

// start the server by listening to the port declared. 
server.listen(port);