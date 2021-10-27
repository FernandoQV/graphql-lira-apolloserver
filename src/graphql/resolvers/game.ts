import { IResolvers } from "apollo-server-core/node_modules/graphql-tools";

export const game: IResolvers = {
  Query: {
   helloGame:()=>{return 'Hola Gmae'},
    getGame: () => {
      return [
        {
          id: 1,
          name: "Game 1",
          desc: "Big Big Amazing",
        },
        {
          id: 2,
          name: "Game 2",
          desc: "Game very fast",
        },
      ];
    },
  },
};


