import { IResolvers } from "apollo-server-core/node_modules/graphql-tools";
import { ObjectID } from "bson";
import { Db } from "mongodb";
import { DEVELOPERS_COLLECTIONS } from "../../mongo/collections";

export const developerResolver: IResolvers = {
  Query: {
    getDevelopers: async (root:void, args:void, context: Db) => {
      try {
        return await context.collection(DEVELOPERS_COLLECTIONS).find().toArray();
        
      } catch (error) {
        console.log(error);
      }
    },
    getDeveloper: async (_, args, context: Db) => {
        try {
            const { id } = args;
            const [found] = await context
              .collection(DEVELOPERS_COLLECTIONS)
              .find({ _id:new ObjectID(id)})
              .toArray();
            return found;
            
        } catch (error) {
            console.log(error);
            
        }
    },
  },
  Mutation: {
    createDeveloper: async (_, args, context: Db) => {
      try {
         const newDeveloper=await context.collection(DEVELOPERS_COLLECTIONS).insertOne(args.dev);
         
         return {
           _id:newDeveloper.insertedId,
           username:args.dev.username
         }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
