#!/bin/sh

ffpb -i /tmp/2020/original/file.mp3 \
    -b:a:0 128k -b:a:1 256k -b:a:2 320k \
    -map 0:a -map 0:a -map 0:a \
    -f hls \
    -var_stream_map "a:0,agroup:audio_low a:1,agroup:audio_medium a:2,agroup:audio_high" \
    -master_pl_name /tmp/2020/original/master.m3u8 \
    /tmp/2020/original/out_%v.m3u8

exit