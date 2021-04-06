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

In this case, we have a todo application that is built on nodejs. If we inspect the [Dockerfile](https://github.com/heyMP/ist402-docker/blob/master/labs/5-nodejs-todo-app/Dockerfile)
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

## Listing our images

Let's take a look at our images to see our new `todoapp` image.

```bash
docker images
```

![](/assets/nodejs-todo-app/images.png)

## Run the container

Now that we have our image, we can run an instance of our application by running a new container based on our new image.

```bash
docker run -d -p 3000:3000 todoapp
```

## Run multiple todo apps

So can't I just spin up as many containers as I want?  YES! Now that you have containerized your application you can create as many todoapps as you want!

```bash
docker run -d -p 3001:3000 todoapp
docker run -d -p 3002:3000 todoapp
docker run -d -p 3003:3000 todoapp
```

## Adding database persistance

One thing you might be wondering about is, "these containers are ephimeral, won't I lose my data every time I stop the container?."  That is a fantastic question!  The answer is shockingly, yes. By default, containers are meant to be "stateless".  This simply means no long-term data is persisted in them. That's what makes them so fast and scalable.

So how do we save our data? We do that by explicitly adding directories that we want saved. We can specify persistant files and directories by using the docker `volume` flag. We typically use the shorthand `-v`.

Lets persist the todo app database.

```bash
docker run -d -p 3004:3000 --name todoapp -v $(pwd)/data/todo.db:/etc/todos/todo.db todoapp
```
