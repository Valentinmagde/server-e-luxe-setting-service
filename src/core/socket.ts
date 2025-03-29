// import { Server as SocketIOServer } from "socket.io";
// import { Server as HTTPServer } from "http";
import config from "../config";

// let io: SocketIOServer;

// /**
//  * Initializes the Socket.IO server and handles client connections.
//  *
//  * This function sets up a Socket.IO server on the provided HTTP server instance, enabling
//  * WebSocket communication. It listens for client connections and disconnects, and logs
//  * the connection status to the console.
//  *
//  * @author Valentin Magde <valentinmagde@gmail.com>
//  * @since 2025-03-29
//  *
//  * @param {HTTPServer} server - The HTTP server instance that will be used for WebSocket connections.
//  * @returns {SocketIOServer} The initialized Socket.IO server instance.
//  * @example
//  * // Initialize Socket.IO with an existing HTTP server instance
//  * initializeSocket(httpServer);
//  */
// export const initializeSocket = (server: HTTPServer) => {
//   io = new SocketIOServer(server, {
//     cors: {
//       origin: [config.apiGatewayUrl],
//       methods: ["PUT", "GET", "POST", "DELETE", "PATCH", "OPTIONS"],
//     },
//   });

//   io.on("connection", (socket) => {
//     console.log(`Client connecté : ${socket.id}`);

//     socket.on("disconnect", () => {
//       console.log(`Client déconnecté : ${socket.id}`);
//     });
//   });
// };

// /**
//  * Gets the Socket.IO server instance.
//  *
//  * This function returns the initialized Socket.IO server instance. If Socket.IO has not
//  * been initialized, it throws an error.
//  *
//  * @author Valentin Magde <valentinmagde@gmail.com>
//  * @since 2025-03-29
//  *
//  * @returns {SocketIOServer} The Socket.IO server instance.
//  * @throws {Error} Throws an error if Socket.IO is not initialized.
//  *
//  * @example
//  * // Get the Socket.IO server instance after initialization
//  * const socketServer = getIO();
//  */
// export const getIO = (): SocketIOServer => {
//   if (!io) {
//     throw new Error("Socket.IO is not initialized");
//   }
//   return io;
// };

import { io } from 'socket.io-client';

// Se connecter au serveur Socket.IO de l'API Gateway
export const socket = io(config.apiGatewayUrl);

socket.on('connect', () => {
  console.log('Connecté à l\'API Gateway', socket.id, config.apiGatewayUrl);
});

socket.on('disconnect', () => {
  console.log('Déconnecté de l\'API Gateway');
});

socket.on('error', (error) => {
  console.error('Erreur lors de la connexion à l\'API Gateway :', error);
});
