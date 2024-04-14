#!/bin/sh

FILEPATH="$1"

# Get the directory containing the FILEPATH
DIRECTORY=$(dirname "$FILEPATH")

# Create output folder if it doesn't exist
mkdir -p "$DIRECTORY/output" || exit 1

# Change directory to the directory containing the FILEPATH
cd "$DIRECTORY/output" || exit 1

# Run ffpb command
ffpb -i "$FILEPATH" \
    -b:a:0 128k -b:a:1 256k -b:a:2 320k \
    -map 0:a -map 0:a -map 0:a \
    -f hls \
    -var_stream_map "a:0,agroup:audio_low a:1,agroup:audio_medium a:2,agroup:audio_high" \
    -master_pl_name "master.m3u8" \
    -hls_list_size 0 \
    -hls_time 10 \
    -hls_segment_filename %v_%03d.ts "%v.m3u8" \
    -report

exit