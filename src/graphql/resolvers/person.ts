import { IResolvers } from "apollo-server-core/node_modules/graphql-tools";
import data from "../../data/data.json";
import { iPerson } from "../../interfaces/iPerson";
export const personResolvers: IResolvers = {
  Query: {
    getPerson: (_, args) => {
      const { id } = args;
      const [foundPerson] = data.people.filter((p: iPerson) => p._id === id);

      return foundPerson || null;
    },
  },
  Person: {
    __resolveType(obj: any) {
      return obj.age?'Male':'Female'
    },
  },
};
