//* Ini Import
import { Request, Response } from "express";
import db from "../models";
const { User, Socket } = db;
// import chalk from "chalk";
import ip from "ip";
//* Ini socket
const socket = (io: any) => {
  //* Cantidad de usuarios conectados
  let numUsers = 0;
  io.on("connection", (socket: any) => {
    const users = [];
    for (const [id, socket] of io.of("/").sockets) {
      users.push({
        userID: id,
        path: "",
        username: socket.username
      });
    }
    console.log(users);
    socket.emit("users", users);

    //* Aviso de conexion con el socket id
    console.log(`Socket id connected: ${socket.id}`);
    // Cuando se desconecta el usuario
    socket.on("disconnect", () => {
      numUsers = numUsers - 1;
      console.log(`Socket id disconnected: ${socket.id}`);
      Socket.destroy({ where: { socketId: socket.id } });
      updateNumUsers();
    });
    //* Set new user online
    const dataSocketUser = {
      msg: "Hola Socket Activado en la ip",
      ip: ip.address(),
      idSocket: socket.id
    };
    socket.on("iniApp", (data: any) => {
      console.log("message: " + data.msg);
      io.emit("newUserIP", dataSocketUser);
    });
    //* Craemos en base de datos el nuevo id
    Socket.findOne({
      where: {
        socketId: socket.id
      }
    }).then(async (id: any) => {
      if (!id) {
        await Socket.create({
          path: "http",
          socketId: socket.id,
          userId: 0
        });
      }
    });
    //* Num users
    numUsers = numUsers + 1;
    //*Actualizamos la cantidad de usuarios
    updateNumUsers();
    console.log("Usuarios: " + numUsers);
    //* Set Path
    socket.on("userSetPath", async (data: any) => {
      if (data.socketId) {
        await Socket.update(
          {
            path: data.path,
            socketId: data.socketId
          },
          { where: { socketId: data.socketId } }
        );
      }
      // io.emit("newUserIP", dataSocketUser);
    });
    //* Set User Id
    socket.on("userSetId", async (data: any) => {
      if (data.socketId) {
        await Socket.update(
          {
            userId: data.userId
          },
          { where: { socketId: data.socketId } }
        );
      }
      // io.emit("newUserIP", dataSocketUser);
    });

    function updateNumUsers() {
      console.log("Usuarios: " + numUsers);
      socket.emit("numUsers", numUsers);
      socket.broadcast.emit("numUsers", numUsers);
    }
  });
};
//* Export
export default socket;
