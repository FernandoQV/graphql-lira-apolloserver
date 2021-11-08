import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import depthLimit from 'graphql-depth-limit'
import { schema } from "./graphql";
import MongoLib from './mongo'
import config from './config'
const app = express();
app.use(cors());

const server = new ApolloServer({
  schema,
  playground: true,
  introspection: true,
  context:async()=>new MongoLib().connect(),
  validationRules:[
    depthLimit(3)]
});

server.applyMiddleware({ app });

app.listen(config.port, () => {
  console.log(`Escuchando desde puerto ${config.port}`);
});
