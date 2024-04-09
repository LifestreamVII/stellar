import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export const socket = io("http://localhost:5000/events");

export default function useWebSocket() {

  const [isConnected, setIsConnected] = useState(false);

  const [status, setStatus] = useState<object | null>(null);
  const [uid, setUID] = useState<string | null>(null);

  function onData(data: any) {
    try {
      setStatus(data);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  function onUID(data: { userid: string }) {
    try {
      setUID(data.userid);
      console.log(data.userid);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  function onConnect() {
    console.log("Connected to SocketIO");
    setIsConnected(true);
}

function onDisconnect() {
    console.log("Disconnected from SocketIO");
    setIsConnected(false);
  }

  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("userid", onUID);
    socket.on("celerystatus", onData);
    return () => {
      socket.off("userid", onUID);
      socket.off("celerystatus", onData);
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return {
    status,
    uid,
    socket,
    isConnected,
  };
}