# Simple TCP Socket Chat Server

## Overview
This project is a simple **TCP-based chat server** built using **Node.js standard libraries only**.  
It allows multiple users to connect, log in with a username, and chat with each other in real time.

- No HTTP
- No database
- No external libraries
- Pure TCP sockets

---

## Requirements
- **Node.js** (v14 or later recommended)
- Any TCP client such as:
  - `nc` (netcat)
  - `telnet`
  - Custom Node.js TCP client

---

## How to Run the Server

1. Clone or download the project.
2. Navigate to the project directory.
3. Start the server:

```bash
node server.js
```

By default, the server runs on **port 4000**.

You can also specify a custom port:

```bash
PORT=5000 node server.js
```

Server output:
```
Chat server running on port 4000
```

---

## How to Connect to the Server

### Using netcat (Linux / macOS / Git Bash)
```bash
nc localhost 4000
```

### Using telnet (Windows)
```cmd
telnet localhost 4000
```

> Note: On some Windows systems, the built-in Telnet client may behave inconsistently.
> For demonstration and testing, a simple Node.js TCP client (client.js) was also used.

### Using Node.js TCP Client
```bash
node client.js
```

---

## Supported Commands

### Login
```
LOGIN <username>
```

Server response:
```
OK
```
or
```
ERR username-taken
```

---

### Send Message
```
MSG <text>
```

Broadcast format:
```
MSG <username> <text>
```

---

### List Active Users 
```
WHO
```

Response:
```
USER <username>
```

---

### Private Message 
```
DM <username> <text>
```

---

### Heartbeat 
```
PING
```

Response:
```
PONG
```

---
### Idle Timeout
If a connected user remains inactive for 60 seconds, the server will automatically disconnect the client.

The remaining users are notified with:
```
INFO <username> disconnected

```
This helps prevent idle connections from staying open indefinitely.

## Example Chat Session

### Client 1
```
LOGIN Naman
OK
MSG hi everyone!
MSG how are you?
```

### Client 2
```
LOGIN Yudi
OK
MSG hello Naman!
```

### Client 1 Sees
```
MSG Yudi hello Naman!
```

### Client 2 Sees
```
MSG Naman hi everyone!
MSG Naman how are you?
```

### When Client 1 Disconnects
```
INFO Naman disconnected
```

---

## Bonus Features Implemented
- WHO command (list active users)
- DM command (private messaging)
- PING / PONG heartbeat
- Idle Timeout
---

## Screen Recording
A short screen recording (1–2 minutes) demonstrates:
- Server startup
- Two clients connecting
- Live message exchange
- Client disconnect handling
- link: https://drive.google.com/file/d/1qb8MnsnVFKr-y_LZlixqBBDEUrS3vXXJ/view?usp=sharing
---

## Notes
- This project uses **only Node.js standard libraries**
- Designed to match the assignment protocol exactly
- Tested with multiple concurrent clients

---


