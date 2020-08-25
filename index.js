import { ApolloServer } from 'apollo-server-express';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/schema';
import express from 'express';
import expressPlayground from 'graphql-playground-middleware-express';
import { sendMessage } from './graphql/db';

const server = new ApolloServer({ typeDefs, resolvers });

const app = express()

server.applyMiddleware({ app })

app.get('/', (req, res)=>res.end('Messenger App API'));
app.get('/playground', expressPlayground({endpoint: '/graphql'}));

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)