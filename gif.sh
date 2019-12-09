#!/bin/bash
#
# file:    yougif.sh
# author:  Maxime Desmet Vanden Stock
#


URL=$1
START=$2
DURATION=$3
TIMESTAMP=`date +'%s'`

youtube-dl -q -o "./temp/$TIMESTAMP.mp4" -f 'bestvideo[height<=360]' $URL

ffmpeg -loglevel quiet -ss $START -i "./temp/$TIMESTAMP.mp4" -t $DURATION -vf "fps=15" ./public/gif/$TIMESTAMP.gif

rm -f "./temp/$TIMESTAMP.mp4"

printf "$TIMESTAMP.gif"
