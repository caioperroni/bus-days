
## Description

bus-days is a tool to manage holidays within diferent calendars and provide a solution for business days dates most common operations.

Developed for a GFT's Tech Talk by Caio Perroni Gnecco - COGC
Techs: Node.js (Nest Framework), GraphQL and MongoDB (mongoose).


## Installation

### Pre-reqs

This application requires a standalone local MongoDB server running at mongodb://localhost/.

### Install dependencies

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode # requires MongoDB server configuration
$ npm run start:prod
```

## Playground

As any GraphQL application there's no Swagger or endpoints, but Resolvers.

Resolvers are Queries and Mutations that can be used trough:

```
http://localhost:3000/graphql
```

This URL, when reched through a browser loads a Playground, app that allows you to test all Queries and Mutations. 

The API supports 'application/graphql' requests.

## Serving over HTTP

You can use GraphQL with HTTP also. Read:

```
https://graphql.org/learn/serving-over-http/
```

## Stay in touch

- Author - [Caio Perroni Gnecco](https://www.linkedin.com/in/caiognecco/)

## License

  Nest is [MIT licensed](LICENSE).
