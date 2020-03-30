# TODO Node.js Application

This is an example of how the previous applications were built. In a real-world scenario,
you would distribute a `Dockerfile` that describes how the actual container is built.

In this case, we have a todo application that is built on node js. If we inspect the Dockerfile
we will see that we are installing the apps dependencies as well as telling the container how to
start the application.

```Dockerfile
FROM node:10-alpine
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "/app/src/index.js"]
EXPOSE 3000
```

## Build the container

Unlike the previous examples, an image for this application has not yet been built. Let's fix that. Let's use the `docker build` command to build our application into an image. We are going to use the `-t` flag to tag this image with a descriptive name.  We will add a `.` to indicate which directory the `Dockerfile` can be found.  `.` is shorthand for "the current directory".

```bash
docker build -t todoapp .
```