# Serverless-Offline-Docker

### Description

This is a simple Dockerized node app, that reads through your `serverless.yml` file, then creates endpoints for corresponding
serverless functions

### How it works

In order for the app to work, you need to give it a volume in docker by the `--volume` flag. Docker will then copy your project files into the container before starting. Afterwards it'll serve your function endpoints. See below

### Usage

You don't need to do a whole lot with the repo itself. Feel free to build a docker image first by running `docker build -t aFancyName .` in this directory.

After you've built the image, go to the root folder of a project that has serverless functions you wish to use. Then there, run `docker run --volume $(pwd):/app -p 8080:7777 aFancyName`

What this does is that, first we give the container a volume by assigning the current working directory to `/app` of the container. Then we assign the host port `8080` to container port `7777`

Your serverless functions will be listed one by one with their corresponding endpoints

[![asciicast](https://asciinema.org/a/304417.png)](https://asciinema.org/a/304417)
