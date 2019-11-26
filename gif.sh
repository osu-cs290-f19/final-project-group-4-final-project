#!/bin/bash -
#
# file: gif.sh
#
#==============================================================================

DIR="./public/gif"
TEMP="./temp"

URL=$1
TIME=$2
LEN=$3
RES=$4

TIME=`date +'%s'`

youtube-dl -q  -o "$TEMP/$TIME.mp4" -f "bestvideo[height<=360]" $URL

ffmpeg -loglevel quiet -ss $TIME -i "$TEMP/$TIME.mp4" -t $LEN -vf "fps=20,scale=$RES" $DIR/$TIME.gif

rm "./temp/$TIME.mp4"

echo "$TIME.gif"
