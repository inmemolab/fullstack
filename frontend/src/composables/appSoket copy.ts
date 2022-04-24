// ini import
import { reactive, computed } from "vue";
// import socket
import { io } from "socket.io-client";
// import uuid
import { v4 as uuidv4 } from "uuid";
// import ua-parser
import { UAParser } from "ua-parser-js";
// is Browser
const isBrowser = typeof window !== "undefined";
// ini socket
const socket = io(import.meta.env.VITE_APP_PORT_SERVER, {
  timeout: 10000,
  transports: ["websocket", "polling"],
  upgrade: false
});
// interface user
interface userList {
  userUUID: string;
  userSocketId: string;
  userAuthId: number;
  userAuthUsername: string;
  userIp: string;
  userPath: string;
}
// interface state
interface appSocketInterface {
  isLoading: boolean;
  error?: string;
  userOnline: boolean;
  usersJoin: boolean;
  usersList?: any;
  usersCount?: number;
  userUUID?: string;
  userSocketId?: string;
  userAuthId?: number;
  userAuthUsername?: string;
  userIp?: string;
  userPath?: string;
}
// state
const appSoketState = reactive<appSocketInterface>({
  isLoading: false,
  error: "",
  userOnline: true,
  usersJoin: false,
  usersList: [],
  usersCount: 0,
  userUUID: "",
  userSocketId: "",
  userAuthId: 0,
  userAuthUsername: "",
  userIp: "",
  userPath: "/"
});
// export
export default function appSoket() {
  // dev socket on any
  socket.onAny((event, ...args) => {
    console.log("Soket on any:" + event, args);
  });
  // ini socket on connect
  socket.once("connect", () => {
    // call setSocketId
    setSocketId();
    // set list of users
    socket.on("usersList", (dataList) => {
      // change state
      appSoketState.usersList = dataList;
      // console.log("List users", dataList);
    });
    // Update user Join
    socket.on("userJoinApp", (data: any) => {
      // change state
      appSoketState.usersList.push(data);
      // console.log("userJoinApp-!: " + data);
    });
    // Update user Path
    socket.on("usersPathList", (data: any) => {
      // const for update info
      const updateSocket = data.userSocketId;
      const updatePath = data.userPath;
      // map for change info
      const objIndex = appSoketState.usersList.findIndex(
        (obj) => obj.userSocketId === updateSocket
      );
      // update info
      appSoketState.usersList[objIndex].userPath = updatePath;
      // console.log("Before update: ", appSoketState.usersList[objIndex]);
    });
    // Update user Auth
    socket.on("usersUpdateAuth", (data: any) => {
      // const for update info
      const updateSocket = data.userSocketId;
      const updateAuthId = data.userAuthId;
      const updateAuthUsername = data.userAuthUsername;
      // map for change info
      const objIndex = appSoketState.usersList.findIndex(
        (obj) => obj.userSocketId === updateSocket
      );
      // update info
      appSoketState.usersList[objIndex].userAuthId = updateAuthId;
      appSoketState.usersList[objIndex].userAuthUsername = updateAuthUsername;
      // console.log("Before update: ", appSoketState.usersList[objIndex]);
    });
    // Update user Online
    socket.on("usersUpdateOnline", (data: any) => {
      // const for update info
      const updateSocket = data.userSocketId;
      const updateOnline = data.userOnline;
      // map for change info
      const objIndex = appSoketState.usersList.findIndex(
        (obj) => obj.userSocketId === updateSocket
      );
      // update info
      appSoketState.usersList[objIndex].userOnline = updateOnline;
      // console.log("Before update: ", appSoketState.usersList[objIndex]);
    });
    // remove user in a list
    socket.on("userRemove", (data: any) => {
      // find index
      const removeIndex = appSoketState.usersList
        .map(function (item) {
          return item.userSocketId;
        })
        .indexOf(data);
      // remove object
      appSoketState.usersList.splice(removeIndex, 1);
      // console.log("userRemove-!: " + data);
    });
  });
  // set socketId
  const setSocketId = () => {
    // get from localstarage
    const isBrowser = typeof window !== "undefined";
    if (isBrowser) {
      const dataSocketId = socket.id;
      // const dataSocketIdState = appSoketState.userSocketId;
      // const dataSocketIdLocal = localStorage.getItem("socketId");
      appSoketState.userSocketId = dataSocketId;
      localStorage.setItem("socketId", dataSocketId);
    }
    // call uuid function
    setUserUUID();
  };
  // Set user UUID
  const setUserUUID = () => {
    // get from localstarage
    const isBrowser = typeof window !== "undefined";
    const uuidToUse = uuidv4();
    // if is browser
    if (isBrowser) {
      const uuidLocal = localStorage.getItem("userUUID");
      if (uuidLocal) {
        appSoketState.userUUID = uuidLocal;
      } else {
        appSoketState.userUUID = uuidToUse;
        localStorage.setItem("userUUID", uuidToUse);
      }
    }
    if (appSoketState.userUUID) {
      // call join function
      setUserJoin();
    }
  };
  // Set user ini app
  const setUserJoin = () => {
    // change state
    appSoketState.usersJoin = true;
    // send data
    const dataJoin = {
      userOnline: appSoketState.userOnline,
      userUUID: appSoketState.userUUID,
      userSocketId: appSoketState.userSocketId,
      userAuthId: appSoketState.userAuthId,
      userAuthUsername: appSoketState.userAuthUsername,
      userIp: appSoketState.userIp,
      userPath: appSoketState.userPath
    };
    // emit to socket
    socket.emit("userJoin", dataJoin);
    console.log(appSoketState.userIp);
  };
  // Set user path
  const setUserPath = (data: any) => {
    // change state
    appSoketState.userPath = data;
    // if user is join
    if (appSoketState.usersJoin === true) {
      // send data
      const dataPath = {
        userUUID: appSoketState.userUUID,
        userSocketId: appSoketState.userSocketId,
        userAuthId: appSoketState.userAuthId,
        userPath: data
      };
      // emit to socket
      socket.emit("userPath", dataPath);
    }
  };
  // Set user auth id
  const setUserid = (id: number, username: string) => {
    // vars for info set
    let dataId;
    let dataUser;
    // if id is undefined
    if (id === undefined) {
      dataId = 0;
      dataUser = "";
    } else {
      dataId = id;
      dataUser = username;
    }
    // change state
    appSoketState.userAuthId = dataId;
    appSoketState.userAuthUsername = dataUser;
    // if user is join
    if (appSoketState.usersJoin === true) {
      const dataUserId = {
        userUUID: appSoketState.userUUID,
        userSocketId: appSoketState.userSocketId,
        userAuthId: dataId,
        userAuthUsername: dataUser
      };
      // emit to socket
      socket.emit("userUpdateAuth", dataUserId);
    }
  };
  if (isBrowser) {
    window.addEventListener("offline", function (e) {
      appSoketState.userOnline = false;
      socket.emit("userOnline", false);
    });

    window.addEventListener("online", function (e) {
      appSoketState.userOnline = true;
      socket.emit("userOnline", true);
    });
  }
  // Set user ini app
  const setUserSoketDisconect = () => {
    const dataDisconect = {
      userSocketId: appSoketState.userSocketId,
      userUUID: appSoketState.userUUID
    };
    // emit to socket
    socket.emit("userDisconnect", dataDisconect);
    // remove in state and localstorage
    appSoketState.usersJoin = false;
    appSoketState.userSocketId = "";
    localStorage.removeItem("socketId");
  };
  // return
  return {
    socket,
    appSoketState,
    setSocketId,
    setUserUUID,
    setUserJoin,
    setUserPath,
    setUserid,
    setUserSoketDisconect
  };
}
