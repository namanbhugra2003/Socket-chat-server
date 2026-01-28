const net = require("net");

const client = net.createConnection({ port: 4000 }, () => {
  console.log("Connected to server");
});

client.on("data", (data) => {
  process.stdout.write(data.toString());
});

client.on("close", () => {
  console.log("\nDisconnected from server");
});

process.stdin.on("data", (data) => {
  client.write(data);
});
