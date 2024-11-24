#!/bin/sh

docker build -t password-generator:latest .
docker run -it --rm --init -p 3000:3000 password-generator:latest
