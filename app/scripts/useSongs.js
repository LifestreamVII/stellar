import { useState, useEffect} from 'react';
import { db, storage } from '~/utils/firebase.config';
import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { useActionData, useFetcher, useTransition } from '@remix-run/react';

const useSongs = (fetcher, playlistID, offset=0) => {

  const extractID = (string) => {
    const STR_LENGTH = 22; // Expected length
    try {
        let res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if (res !== null) {
          const prefix = "/playlist/";
          const startIndex = new URL(string).pathname.indexOf(prefix) + prefix.length;
          return startIndex >= prefix.length ? new URL(string).pathname.substr(startIndex, STR_LENGTH) : null;        
        } else {
          if (string.length == STR_LENGTH) return string;
          else if (string.length > STR_LENGTH) return string.substr(0, STR_LENGTH) ?? null;
          else throw new Error("Invalid URL");
        }
    } catch (e) {
      throw e;
    }
  }

  const fetchSongs = () => {
    try {

      const ID = extractID(playlistID);

      fetcher.submit(
        {
          plID: ID,
          offset: offset,
        }, {
        method: "POST",
      });

      return true;

    } catch (err) {
        throw err;
    }
  };

  return fetchSongs();
};

export default useSongs;