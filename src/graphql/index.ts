import { GraphQLSchema } from "graphql";
import "graphql-import-node";
import character from "./schemas/character.graphql";
import game from "./schemas/game.gql";
import {resolvers} from "./resolvers";
import { mergeSchemas } from "apollo-server-core/node_modules/graphql-tools";
export const schema: GraphQLSchema = mergeSchemas({
  schemas: [character,game],
  resolvers,
});
