# News API Microservice

Now that we have a good understanding about the role of Docker in packaging and deploying applications, let's take a look at an example microservice. This demo should help you understand microservices and how we use Docker to help them communicate with our applications.

Take a look at how our application is structured: https://github.com/heyMP/news-api-workshop

Our application is a decoupled news service.  It allows us to pull up to the minute news articles, filtered by topic, and display them on any site using a web component.  We can see that our application is broken into two distinct parts.

- Server (API)
- Component (Web component)

The servers job is recieve HTTP requests that are asking for results on a given topic, make an authenticated request to newsapi.org, and respond to the original HTTP requester with a list of relevant articles.

The components job is to listen for changes to the `topic` attribute on the web component, make a request to the API server, and print out the list of news article to website.

This pattern is really the polor opposite of a monolithic application. We've broken out the news service functionlity into it's own microservice so that we can easily add news to any website. Behold the power of microservices and web components.

So where does Docker come into play with this microservices architecture? Docker makes it possible to deploy as many of these news services that we need quickly and reliably at scale.

OK, enough chit chat. Lets run this thing!

## Setup

Create `ADD NEW INSTANCE` in the Docker Playground. Run the following command in the new instance console.

```bash
git clone https://github.com/heyMP/news-api-workshop && cd news-api-workshop
```

## Configure

Before we ran any Drupal commands, we need to configure our custom settings for this application. These settings will be an API key and the url of your Play With Docker instance.

Run the following command to set up a fresh copy of your environment settings.

```bash
cp dot.env.example dot.env
```

What we just done is created a new file called `dot.env`. Following the [configuration as code](https://12factor.net/config) principle, we are going to add our applications custom settings via environment variables. Docker relys on this pattern to ensure the application thats running inside of it is [stateless](https://www.contino.io/insights/stateless-vs-stateful-containers-whats-the-difference-and-why-does-it-matter).

Now we need to populate those settings.

## Open the editor

Play With Docker has a built-in editor that we will use to edit our environment settings. Click the "Editor" button.

![](/assets/newsapi/editor.png)

A diolog will appear allowing you to navigate the servers filesystem. Navigate to the `dot.env` file and click on it.

![](/assets/newsapi/editor-2.png)

Now that we have this editor open we need to get an API Key and a public url. The next steps will show you how.

## Get News API Key

Go to newsapi.org, login, and generate an API Key. This will be your unique "password" for requesting news articles.

![](/assets/newsapi/keygen.png)

Once you have your access token from newsapi.org you will need to add it to the dot.env file.

```
NEWS_SERVICE_API_KEY=XXXXXXXXXXXXXXXXXX
```

Now onto the public url.

## Get public url

Ok, Play With Docker is a little weird for this next one so bear with me. We need to ask Play With Docker what the public url of the microservice is going to be so we can add it to our dot.env file. We know that our API server is running on port `4000`.

Click the "Open Port" button in Play With Docker console.

![](/assets/newsapi/open-button.png)

Type `4000` into the prompt and click "Ok".

![](/assets/newsapi/add-port.png)

You should see a new page that is blank since there is no running application yet. COPY the url that blank page. That's were our server will be accessible when we get this thing running.

![](/assets/newsapi/copy-url.png)

Now that we have the public url we can add it to our dot.env and click "Save"

```
NEWS_ENDPOINT=http://ip172-18-0-43-c1n4qo1bqvp0009l4nf0-4000.direct.labs.play-with-docker.com
```

## Run the application

Now we can finally play the game! Let's start this thing up!

```
docker-compose up
```

You'll see that we are building two different docker images. The first is based on the "node:12" Docker image. This is going to run our backend server which is a [GraphQL API](https://GraphQL.org/) running on [Node.js](https://nodejs.org/en/). The second is an [Nginx](https://www.nginx.com/) based image which will run our front-end application. Once each of those images have been built the docker-compose command will spin up a container for each.

![](/assets/newsapi/active-ports.png)

We can see that our containers are running and exposed on port `80` (front-end) and port `4000`(backend). Let's click on port `80` and see our running application.

![](/assets/newsapi/frontend.png)

If everything went to plan you should be seeing a list of news items. This means our web component is successfully communicating with our backend microservice, and our microservice is communicating with newsapi.org.

![](/assets/newsapi/itworked.gif)

## Exploring our microservice API

I mentioned that our backend is a GraphQL API. GraphQL stands for Graphical Query Language. It's a hip new way that many companies are using to expose there data and microservices to the world; a next generation alternative to [REST APIs](https://www.redhat.com/en/topics/api/what-is-a-rest-api).

GraphQL provides us with an interface were we can see how our API is structured. Click on the port `4000` button. This will launch a new URL that goes to an empty page. In your url bar, add `/graphql` to the end of your url and hit "enter". That will take you to your GraphQL sandbox.

![](/assets/newsapi/gql-sandbox-1.png)

You can see on the right hand side of the page there are tabs for "DOCS" and "SCHEMA". GraphQL allows you to easily explore how every peice of data is structured. This makes it super simple for outside developers to work with your API.

Let's manually query the data.

Copy and paste the following into the left hand portion of the sandbox:

```graphql
# Write your query or mutation here.
query {
  news(tag:"tesla") {
    title
    author
    url
  }
}
```

Now click the "play" button in the middle of the screen.

![](/assets/newsapi/gql-sandbox-2.png)

You should be seeing your news feed! Congratulations, you have a kick-ass news API microservice!

![](/assets/newsapi/bill.gif)
