#!/bin/sh

if [ "$#" -eq 0 ]; then
    echo "usage) nsl naver.com"
    echo "usage) nsl https://naver.com"
    exit
fi

cd /Users/jane_/workspace/hana8/java/hello

java src/main/java/com/hana8/hello/io/Nsl.java $1
