# Drupal

Often, a microservices will be made up of not one, but many containers network together.  In this example, we are spinning up an instance of Drupal using two separate containers.  A container running Drupal/PHP for the file system and web server, and a Postgres container for the database.

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

```bash
docker-compose up
```