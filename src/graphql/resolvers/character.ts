import { IResolvers } from "apollo-server-core/node_modules/graphql-tools";
import { Db } from "mongodb";
import data from "../../data/data.json";
export const characterResolver: IResolvers = {
  Query: {
    hello: () => {
      return "Hello Wolr Tony";
    },
    getCharacters: async (root: void, args: void, context: Db) => {
      try {
        return await context.collection('characters').find().toArray()
      } catch (error) {
        console.log(error);
        
      }
    },
    getCharacter: (root, args) => {
      const [found] = data.characters.filter((ch) => (ch._id = args.id));
      return found;
    },
  },
  Mutation: {
    createCharacter:async (_, args,context:Db) => {
      try {
        await context.collection('characters').insertOne(args.character)
        return 'Exito al guardar'
      } catch (e) {
        console.log(e)
      }
    },
  },
  //campo calculado con lo apredndido en midudev
  Character: {
    games: (root) => {
      const gamesList: Array<any> = [];
      root.games.map((idGame: string) => {
        gamesList.push(...data.games.filter((game) => game._id === idGame));
      });
      return gamesList;
    },
    countGames: (root) => {
      return root.games.length;
    },
  },
};
