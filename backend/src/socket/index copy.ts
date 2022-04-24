// ini import
import { Request, Response } from "express";
import db from "../models";
const { User, Socket } = db;
const Op = db.Sequelize.Op;
import ip from "ip";
// ini socket
const socket = (io: any) => {
  // ini io conections
  io.on("connection", async (socket: any) => {
    // console.log(`Anonimos connect: ${socket.id}`);
    // user is join
    socket.on("userJoin", async (data: any) => {
      // create user in db
      Socket.findOne({
        where: {
          userSocketId: socket.id
        }
      }).then(async (userSocketId: any) => {
        if (!userSocketId) {
          await Socket.create({
            userOnline: data.userOnline,
            userUUID: data.userUUID,
            userSocketId: socket.id,
            userAuthId: data.userAuthId,
            userAuthUsername: data.userAuthUsername,
            userIp: ip.address(),
            userPath: data.userPath
          });
          // send list of users
          const usersList = await Socket.findAll({
            where: {
              userUUID: {
                [Op.ne]: data.userUUID
              }
            }
          });
          socket.emit("usersList", usersList);
          const usersJoinApp = await Socket.findOne({ where: { userSocketId: socket.id } });
          socket.broadcast.emit("userJoinApp", usersJoinApp);
        }
      });
    });

    // user update path
    socket.on("userPath", async (data: any) => {
      await Socket.update(
        {
          userPath: data.userPath
        },
        { where: { userSocketId: socket.id } }
      );
      const usersUpdatePath = await Socket.findOne({ where: { userSocketId: socket.id } });
      socket.broadcast.emit("usersPathList", usersUpdatePath);
    });

    // user update user auth
    socket.on("userUpdateAuth", async (data: any) => {
      await Socket.update(
        {
          userAuthId: data.userAuthId,
          userAuthUsername: data.userAuthUsername
        },
        { where: { userSocketId: socket.id } }
      );
      const usersUpdateAuth = await Socket.findOne({ where: { userSocketId: socket.id } });
      socket.broadcast.emit("usersUpdateAuth", usersUpdateAuth);
    });

    // user update Online
    socket.on("userOnline", async (data: any) => {
      await Socket.update(
        {
          userOnline: data
        },
        { where: { userSocketId: socket.id } }
      );
      const usersUpdateOnline = await Socket.findOne({ where: { userSocketId: socket.id } });
      socket.broadcast.emit("usersUpdateOnline", usersUpdateOnline);
    });
    /**
     * DISCONNECT
     * wen de user is disconnect
     */
    socket.on("disconnect", async () => {
      await Socket.destroy({ where: { userSocketId: socket.id } });
      socket.broadcast.emit("userRemove", socket.id);
    });

    socket.on("userDisconnect", async (data: any) => {
      if (data.socketId) {
        await Socket.destroy({ where: { userSocketId: data.userSocketId } });
      }
      socket.broadcast.emit("userRemove", data.userSocketId);
    });
  });
};
//* Export
export default socket;

// // sending to sender-client only
// socket.emit('message', "this is a test");

// // sending to all clients, include sender
// io.emit('message', "this is a test");

// // sending to all clients except sender
// socket.broadcast.emit('message', "this is a test");

// // sending to all clients in 'game' room(channel) except sender
// socket.broadcast.to('game').emit('message', 'nice game');

// // sending to all clients in 'game' room(channel), include sender
// io.in('game').emit('message', 'cool game');

// // sending to sender client, only if they are in 'game' room(channel)
// socket.to('game').emit('message', 'enjoy the game');

// // sending to all clients in namespace 'myNamespace', include sender
// io.of('myNamespace').emit('message', 'gg');

// // sending to individual socketid
// socket.broadcast.to(socketid).emit('message', 'for your eyes only');

// // list socketid
// for (var socketid in io.sockets.sockets) {}
//  OR
// Object.keys(io.sockets.sockets).forEach((socketid) => {});
