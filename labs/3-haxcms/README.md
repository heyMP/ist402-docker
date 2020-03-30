# HAXcms Docker

## Get the code

Create `ADD NEW INSTANCE` in the Docker Playground. Run the following command in the new instance console.

```bash
git clone https://github.com/heyMP/ist402-docker.git && cd ist402-docker/labs/3-haxcms
```

Use the `ls -la` command to verify you are in the correct directory

```bash
ls -la
```

## Spin up a new HAXcms server

```bash
docker run -p 80:80 elmsln/haxcms:latest
```
