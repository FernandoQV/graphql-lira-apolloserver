import { IResolvers } from "apollo-server-core/node_modules/graphql-tools";
export const characterResolver: IResolvers = {
  Query: {
    hello: () => {
      return "Hello Wolr Tony";
    },
    getCharacter: () => {
      return [
        {
          id: 1,
          name: "Charcter 1",
          race: "Garrudo",
        },
        {
          id: 2,
          name: "Charcter 2",
          race: "Hylian",
        },
      ];
    },
  },
};
