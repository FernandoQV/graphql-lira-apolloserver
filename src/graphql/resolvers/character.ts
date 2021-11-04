import { IResolvers } from "apollo-server-core/node_modules/graphql-tools";
import { ObjectID } from "bson";
import { Db } from "mongodb";
import data from "../../data/data.json";
import { ICharacter } from "../../interfaces/iCharacter";
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
        const regexp=new RegExp(args.character.name,'i')
        const exits=await context.collection(CHARACTERS_COLLECTIONS).findOne({name:regexp})
        console.log(exits);
        if(exits){
          throw new Error("Character ya exite");
          
        }
        await context.collection(CHARACTERS_COLLECTIONS).insertOne(args.character)
        return 'Exito al guardar'
      } catch (error:any) {
        return error.message
      }
    },//una manera de destruccturar en typescript con graphql en los args
    editCharacter:async(_,{id,character}:{id:string,character:ICharacter},context:Db)=>{
      try {
        
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
    games:async (root:ICharacter,args,context:Db) => {
      const {games}=root
      const gamesList=games?.map(async(idGame)=>{
       return await context.collection(GAMES_COLLECTIONS).findOne({_id:new ObjectID(idGame)})
      })
      return gamesList||[]
    },
    countGames: (root) => {
      return root.games?.length || 0;
    },
  },
};
