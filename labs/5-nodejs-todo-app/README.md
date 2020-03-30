# TODO Node.js Application

## Get the code

Create `ADD NEW INSTANCE` in the Docker Playground. Run the following command in the new instance console.

```bash
git clone https://github.com/heyMP/ist402-docker.git && cd ist402-docker/labs/5-nodejs-todo-app
```

Use the `ls -la` command to verify you are in the correct directory

```bash
ls -la
```

![](/assets/nodejs-todo-app/lookaround.png)


## Inspecting the Dockerfile

This is an example of how the previous applications were built. In a real-world scenario,
you would distribute a `Dockerfile` that describes how the actual container is built.

In this case, we have a todo application that is built on nodejs. If we inspect the Dockerfile
we will see that we are installing the apps dependencies as well as telling the container how to
start the application.

Let's look at our [Dockerfile](https://github.com/heyMP/ist402-docker/blob/master/labs/5-nodejs-todo-app/Dockerfile) for this application.

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

## Listing our images

Let's take a look at our images to see our new `todoapp` image.

```bash
docker images
```

![](/assets/nodejs-todo-app/images.png)

## Run the container

Now that we have our image, we can run an instance of our application by running a new container based on our new image.

```bash
docker run -p 3000:3000 todoapp
```