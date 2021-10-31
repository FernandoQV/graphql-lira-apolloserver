import { GraphQLSchema } from "graphql";
import "graphql-import-node";
import character from "./schemas/character.graphql";
import game from "./schemas/game.gql";
import developer from "./schemas/developer.gql";
import { mergeSchemas } from "apollo-server-core/node_modules/graphql-tools";
import { gameResolver } from "./resolvers/game";
import { characterResolver } from "./resolvers/character";
import { developerResolver } from "./resolvers/developer";
export const schema: GraphQLSchema = mergeSchemas({
  schemas: [character,game,developer],
  resolvers:[
    gameResolver,
    characterResolver,
    developerResolver
  ],//el weon de mlira alucion y dijo que no habia forma nativa de hacer merge y no se dio cuenta o nos dimos cuenta, que el puto modulo dice MERGE
});
