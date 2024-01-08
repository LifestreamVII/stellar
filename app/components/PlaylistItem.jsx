import { useFetcher } from '@remix-run/react';
import React, { useEffect, useRef, useState } from 'react'
import LoadingSmall from "~/components/LoadingSmall";

const PlaylistItem = ({item, index}) => {

  function msToMinutesAndSeconds(ms) {
    let minutes = Math.floor(ms / 60000); // 1 minute = 60000 milliseconds
    let seconds = ((ms % 60000) / 1000).toFixed(0);
    return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  const [status, setStatus] = useState({
    percent: 255,
    action: "idle",
    message: "",
  });

  const lookupid = useFetcher({ key: "lookupid" });

  const initdl = useFetcher({ key: "initdl" });

  const getStatus = useFetcher({ key: "getstatus" });

  const [step, setStep] = useState(0);

  const refresh = useRef();

  useEffect(() => {
    if (lookupid.data) {
      console.log(lookupid.data);
      if (lookupid.data.id && step === 1) {
        setStep(2);
        initdl.load(`/api/init/deezer?id=${lookupid.data.id}`);
      } else if (!lookupid.data.id) {
            setStatus({
                percent: 0,
                action: lookupid.data.code === 69 ? "warning" : "error",
                message: lookupid.data.error,
            });
        }
    }

    if (initdl.data) {
      console.log(initdl.data);
      if (
        initdl.data.url &&
        initdl.data.url.split("/status/")[1] &&
        step === 2
      ) {
        setStep(3);
        getStatus.load(
          `/api/status?id=${initdl.data.url.split("/status/")[1]}`
        );
      }
      else if (!initdl.data.url) {
        setStatus({
            percent: 0,
            action: "error",
            message: initdl.data.error,
        });
      }
    }

    if (getStatus.data) {
      console.log(getStatus.data);
      if (
        getStatus.data.info &&
        Number.isInteger(getStatus.data.info.current) &&
        step === 3
      ) {
        console.log("set step 4");
        setStep(4);
        refresh.current = setInterval(() => {
          getStatus.load(
            `/api/status?id=${initdl.data.url.split("/status/")[1]}`
          );
        }, 600);
        setTimeout(() => {
          clearInterval(refresh.current);
          if (status.action !== "done") {
            setStatus({
              percent: 0,
              action: "error",
              message: "The operation timed out.",
            });
          }
        }, 60000);
      } else if (!getStatus.data.info) {
            setStatus({
                percent: 0,
                action: "error",
                message: getStatus.data.error,
            });
        }
    }

    if (getStatus.data && step === 4) {
      if (
        getStatus.data.info &&
        status.action !== "error" ) {
          console.log("refreshing");
        setStatus({
          percent: getStatus.data.info.current*100,
          action: getStatus.data.info.sate,
          message: getStatus.data.info.status,
        });
        if (getStatus.data.info.current == 100 || getStatus.data.info.state == "SUCCESS") {
            clearInterval(refresh.current);
            setStatus({
                percent: 100,
                action: "done",
                message: "The download is complete",
            });
        }
      }
    }
  }, [lookupid.data, initdl.data, getStatus.data]);

  useEffect(() => {
    if (lookupid.state === "submitting") {
      if (step === 0) {
        setStep(1);
        setStatus({ percent: 0, action: "pending" });
      }
    }
  }, [lookupid.state, initdl.state, getStatus.state]);

  return (
    <lookupid.Form
      className="playlist-content-item"
      method="get"
      action="/api/download"
    >
      <input type="submit" className="invisible" value={""} />
      <div class="playlist-content-item-details">
        <img
          src={item.track.album.images[0].url}
          width={50}
          height={50}
          alt=""
          srcset=""
        />
        <div className="playlist-content-item-title-artist">
          <span className="ml-es mb-none">{item.track.name}</span>
          <p className="ml-es mt-none mb-none">{item.track.artists[0].name}</p>
        </div>
      </div>
      <div className="download-indicator u__fs__small">
        {status.action === "idle" ? (
          msToMinutesAndSeconds(item.track.duration_ms)
        ) : (
          <LoadingSmall
            percent={status.percent}
            status={status.action}
            message={status.message}
          ></LoadingSmall>
        )}
      </div>
      <input readOnly type="text" hidden name="title" value={item.track.name} />
      <input
        readOnly
        type="text"
        hidden
        name="album"
        value={item.track.album.name}
      />
      <input
        readOnly
        type="text"
        hidden
        name="artist"
        value={item.track.artists[0].name}
      />
      <input
        readOnly
        type="number"
        hidden
        name="duration"
        value={item.track.duration_ms}
      />
    </lookupid.Form>
  );
};

export default PlaylistItem;
