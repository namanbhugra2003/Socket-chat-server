
const net = require("net");

const PORT = process.env.PORT || process.argv[2] || 4000;


const clients = new Map();

function broadcast(message, exceptSocket = null) {
  for (const socket of clients.keys()) {
    if (socket !== exceptSocket) {
      socket.write(message + "\n");
    }
  }
}

const server = net.createServer((socket) => {
  socket.setEncoding("utf8");


  
  socket.setTimeout(60000);


  socket.on("timeout", () => {
    socket.write("INFO disconnected due to inactivity\n");
    socket.end();
  });
 

  let username = null;
  let buffer = "";



  socket.on("data", (data) => {
    buffer += data;
    const lines = buffer.split("\n");
    buffer = lines.pop();

    for (let line of lines) {
      line = line.trim();
      if (!line) continue;

    
      if (!username) {
        const upper = line.toUpperCase();

       if (upper.startsWith("LOGIN ")) {
  const requestedName = line.slice(6).trim();

  // Check if username already exists
  let taken = false;
  for (const existingUser of clients.values()) {
    if (existingUser === requestedName) {
      taken = true;
      break;
    }
  }

  if (taken) {
    socket.write("ERR username-taken\n");
    continue;
  }

          username = requestedName;
          clients.set(socket, username);
          socket.write("OK\n");
        } else {
       
          socket.write("ERR please-login-first\n");
        }
        continue;
      }

    

      if (line === "PING") {
        socket.write("PONG\n");
        continue;
      }

      if (line === "WHO") {
        for (const user of clients.values()) {
          socket.write(`USER ${user}\n`);
        }
        continue;
      }

      if (line.startsWith("DM ")) {
        const parts = line.split(" ");
        const targetUser = parts[1];
        const text = parts.slice(2).join(" ");

        for (const [clientSocket, clientUser] of clients.entries()) {
          if (clientUser === targetUser) {
            clientSocket.write(`DM ${username} ${text}\n`);
            break;
          }
        }
        continue;
      }

     if (line.startsWith("MSG ")) {
  const text = line.slice(4).trim();
 
  broadcast(`MSG ${username} ${text}`, socket); 
}
    }
  });

  socket.on("close", () => {
    if (username) {
      clients.delete(socket);
      broadcast(`INFO ${username} disconnected`);
    }
  });

  socket.on("error", () => {});
});

server.listen(PORT, () => {
  console.log(`Chat server running on port ${PORT}`);
});
