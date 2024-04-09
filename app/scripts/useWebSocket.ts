import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Id, toast } from "react-toastify";
import { io } from "socket.io-client";
import ToastSpinner from "~/components/ToastSpinner";

type status = {
  current: number,
  total: number, 
  status: string,
  userid: string
}

export default function useWebSocket(uid: string = "", reportMethod: string = "toast") {
  

  const [isConnected, setIsConnected] = useState(false);
  
  const [status, setStatus] = useState<status | null>(null);
  const [sid, setSID] = useState<string | null>(null);
  const notify = useRef<Id | null>(null);
  const socket = io("http://localhost:5000/events", {query: {"userid": uid}, autoConnect: false, forceNew: true});

  function onData(data: any) {
    try {
      setStatus(data);
      console.log(data);
      if (notify.current && reportMethod) {
        toast.update(notify.current, {render: data.current == 100 ? data.status : ToastSpinner(data.status), progress: data.current == 100 ? undefined : data.current / 100, autoClose: 3000});
      } else {
        notify.current = toast(ToastSpinner(data.status), {progress: 0, autoClose: false, theme: 'dark'});
      }
    } catch (e: unknown) {
      console.error(e);
    }
  }

  function onSession(data: { userid: string, sessionid: string } ) {
    try {
      setSID(data.sessionid);
      console.log(data.userid);
      console.log(data.sessionid);
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

  socket.on("connect", onConnect);
  socket.on("disconnect", onDisconnect);
  socket.on("session", onSession);
  socket.on("celerystatus", onData);
  
  return {
    status,
    sid,
    socket,
    isConnected,
  };
}