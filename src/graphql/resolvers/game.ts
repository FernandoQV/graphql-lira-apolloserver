import { IResolvers } from "apollo-server-core/node_modules/graphql-tools";
import { ObjectID } from "bson";
import { Db } from "mongodb";
import {
  DEVELOPERS_COLLECTIONS,
  GAMES_COLLECTIONS,
} from "../../mongo/collections";

export const gameResolver: IResolvers = {
  Query: {
    getGames: async (root, args, context: Db) => {
      try {
        return await context.collection(GAMES_COLLECTIONS).find().toArray();
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    createGame: async (_, args, context: Db) => {
      try {
        const { game } = args;
        const newGame = await context
          .collection(GAMES_COLLECTIONS)
          .insertOne(game);
        return { _id: newGame.insertedId, ...game };
      } catch (error) {
        console.log(error);
      }
    },
    editGame: async (_, args, context: Db) => {
      const { id, game } = args;
      const gameEdited = await context.collection(GAMES_COLLECTIONS).updateOne(
        { _id: new ObjectID(id) },
        {
          $set: game,
        }
      );
      return gameEdited.modifiedCount > 0 ? "Exitoo" : "No se pudo modificar";
    },
  },
  Game: {
    developers: async (root, args, context: Db) => {
      const { developers } = root;
      const developersList = developers.map(async (devId: string) => {
        return await context
          .collection(DEVELOPERS_COLLECTIONS)
          .findOne({ _id: new ObjectID(devId) });
        //graphql se esperaa a que se recuelva la promesa y nos dara el valor, sin importar que aun no se hay resuelto en consola
      });
      return developersList;
    },
  },
};
