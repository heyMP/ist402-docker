# Drupal

Often, a microservices will be made up of not one, but many containers network together.  In this example, we are spinning up an instance of Drupal using two separate containers.  A container running Drupal/PHP for the file system and web server, and a Postgres container for the database.

## Get the code

Create `ADD NEW INSTANCE` in the Docker Playground. Run the following command in the new instance console.

```bash
git clone https://github.com/heyMP/ist402-docker.git && cd ist402-docker/labs/4-drupal
```

Use the `ls -la` command to verify you are in the correct directory

```bash
ls -la
```

![](/assets/drupal/lookaround.png)

## Docker-compose

Instead of typing out a very long docker command each time we want to run these containers, docker provides us with `docker-compose`.  Docker-compose allows us to define multiple containers, networks, and volumes in a configuration file.  We can then use the `docker-compose` command line interface (CLI) tool to build our configuration.

```yaml
version: '3.3'
services:

  drupal:
    image: drupal:latest
    ports:
      - 80:80
    restart: always

  postgres:
    image: postgres:10
    environment:
      POSTGRES_PASSWORD: your_postgres_password
    volumes:
        - db_data:/var/lib/postgresql/data
    restart: always

volumes:
  db_data:
```

## Use docker-compose to build the Drupal instance

So how do we run this configuration file?  We can use the `docker-compose up` command.

```bash
docker-compose up
```

This will download both the drupal and postgres images to your server.  It will then spin up one container for each service.  You can see the logs of both the drupal and postgres containers in your terminal.

![](/assets/drupal/output.png)

## Open the Drupal container in the browser

![](/assets/drupal/port.png)

Congratulations, you have a fresh instance of Drupal 8! How easy was that?

## Install Drupal

Now lets finish the installation Drupal by following these instructions.

![](/assets/drupal/install.png)

- Select your language of choice

- Select `Standard` installation profile
- Select `PostgreSQL` database type
  - Database name: `postgres`
  - Database username: `postgres`
  - Database password: `postgres`
  - Select `Advanced Options`
    - Host: `postgres`

You should see the installation starting

![](/assets/drupal/install-start.png)

## Add Credentials and finish installation

Now you're installation is almost complete. Finish by entering your information like email, which username you would like and what password you would like for this Drupal site.

Congratulations, you've deployed a Drupal site! Something that took me months of trial and error a decade ago. :P