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

TIME=`date +'%s'`

youtube-dl -o "$TEMP/$TIME.mp4" -f "bestvideo[height<=360]" $URL

ffmpeg -ss $TIME -i "$TEMP/$TIME.mp4" -t $LEN -vf "fps=20" $DIR/$TIME.gif

rm "$TEMP/$TIME.mp4"

echo "$TIME.gif"
