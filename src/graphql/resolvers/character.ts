import { IResolvers } from "apollo-server-core/node_modules/graphql-tools";
import { ObjectID } from "bson";
import { Db } from "mongodb";
import data from "../../data/data.json";
import { CHARACTERS_COLLECTIONS, GAMES_COLLECTIONS } from "../../mongo/collections";
export const characterResolver: IResolvers = {
  Query: {
    
    getCharacters: async (root: void, args: void, context: Db) => {
      try {
        return await context.collection(CHARACTERS_COLLECTIONS).find().toArray()
      } catch (error) {
        console.log(error);
        
      }
    },
    getCharacter:async (root, args,context:Db) => {
      const {id}=args
      const characterFound=await context.collection(CHARACTERS_COLLECTIONS).findOne({_id:new ObjectID(id)})
      return characterFound ||null
    },
  },
  Mutation: {
    createCharacter:async (_, args,context:Db) => {
      try {
        console.log(args.character);
        
        await context.collection(CHARACTERS_COLLECTIONS).insertOne(args.character)
        return 'Exito al guardar'
      } catch (e) {
        console.log(e)
      }
    },
    editCharacter:async(_,args,context:Db)=>{
      try {
        const {id,character}=args
        const ch=await context.collection(CHARACTERS_COLLECTIONS).findOne({_id:new ObjectID(id) })
        
        if(ch){
          const editCharacter=await context.collection(CHARACTERS_COLLECTIONS).updateOne({_id:new ObjectID(id)},{$set:character})
        }
        return 'Character Encontrado'
      } catch (error) {
        console.log(error);
        return 'No encontrado'
      }  


    }
  },
  //campo calculado con lo apredndido en midudev
  Character: {
    games:async (root,args,context:Db) => {
      const {games}=root
      const gamesList=games?.map(async(idGame:string)=>{
       return await context.collection(GAMES_COLLECTIONS).findOne({_id:new ObjectID(idGame)})
      })
      return gamesList||[]
    },
    countGames: (root) => {
      return root.games?.length || 0;
    },
  },
};
