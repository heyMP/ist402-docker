# Ubuntu 

Let's start our journey with Docker by creating a container that uses the ubuntu image.

## Start the container 

To start a new container we use the `docker run` command. This command expects us to specify the image of this container; `ubuntu` in this case. We can then specify exactly which process we would like executed in the container with `/bin/bash`. As well as some arguments like `-t -i` which effectively allows us to see the output of the container process.

If terms ubuntu, `/bin/bash`, and the `-i -t` flags are confusing IT'S OK.  Those aren't important.  What you should be taking away from this example is that: 
  - We run containers using `docker run`.
  - Containers need images to know what to run.
  - Containers are not meant to live forever. They are ephemeral.

## Run the command

```bash
docker run -t -i ubuntu /bin/bash
```

At this point we are no longer in the Docker Playground console. We are actually inside of the container!

![](/assets/ubuntu/run.png)

Run the list all files command to see what our current directory inside of the container looks like

```bash
ls -la
```

## Destroy all the things!

Now let's do something crazy.  Lets destroy this thing! 

WARNING: never, ever, ever run the following command on your computer!

```bash
rm -rf /*
```

Now run our `ls -la` command to see what files are left.

```bash
ls -la
```

![](/assets/ubuntu/destroyed.png)

As you can see we don't even have access to the `ls` command.  We've officially destroyed our ubuntu server.  But don't worry.  Containers are meant to be thrown away.

Let's exit from the container and spin up a new version our ubuntu server.

```bash
exit
docker run -t -i ubuntu /bin/bash
ls -la
```

![](/assets/ubuntu/backagain.png)

Hey we're back in business!

## Main Takeaways

If ubuntu, /bin/bash, and the `-i -t` flags are confusing IT'S OK.  Those aren't important.  What you should be taking away from this example is that:

  - We run containers using `docker run`.
  - Containers need images to know what to run.
  - Containers are not meant to live forever; they are ephemeral.

It's important that you understand the difference between. An image and a container. To help, here is an analogy.

> If a Docker image is a digital photograph, a Docker container is like a printout of that photograph. In technical terms, we call it an “instance” of the image. 

[https://stackify.com/docker-image-vs-container-everything-you-need-to-know/](https://stackify.com/docker-image-vs-container-everything-you-need-to-know/)


