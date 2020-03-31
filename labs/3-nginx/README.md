# NGINX Web Server 

Now that we know how to build a container, let's deploy a webserver to the internet.

## Start the container 

NGINX is a very popular, super fast web server.  It's very popular for host static websites.
we are going to spun up an instance of that web server.

```bash
docker run -p 80:80 nginx
```

Notice the `-p` flag?  That means that we are exposing to a port inside the container to the outside world.  More specifically, we are binding our "host" port `80` to our "container" port `80`. So any traffic that our host receives on port `80` will be sent into the container on port `80`.  Which how we are able to see our web server on the internet.

## Open the browser

Play with Docker automatically gives us a link to the running process.

![](/assets/ngnix/port.png)


If we click that link we will see our published web server!

![](/assets/ngnix/webserver.png)

