import { IResolvers } from "apollo-server-core/node_modules/graphql-tools";
import data from "../../data/data.json";
export const characterResolver: IResolvers = {
  Query: {
    hello: () => {
      return "Hello Wolr Tony";
    },
    getCharacters: () => {
      return data.characters;
    },
    getCharacter:(root,args)=>{
      const [found]=data.characters.filter(ch=>ch._id=args.id)
      return found
    }
  },
  Mutation:{
      createCharacter:(_,args)=>{
        const {name,race,gender}=args.character
        const newCharacter={_id:data.characters.length.toString(),name,race,gender,games:[]}
        data.characters.push(newCharacter)
        return newCharacter
      }
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
