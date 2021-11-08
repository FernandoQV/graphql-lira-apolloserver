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
    getPersons: (_, args: void) => {
      return data.people || null;
    },
  },
  Person: {
    __resolveType(obj: any) {
      return obj.age ? "Male" : "Female";
    },
  },
  Male: {
    countries: (root) => {
      const countries: any = [];
      data.countries.forEach(({_id}) => {
        countries.push(...data.countries.filter((c) => c._id === _id));
      });
      return countries;
    },
  },
  Country: {
    people:(root)=>{
      const people:any=[]
      data.people.forEach(({_id}) => {
        people.push(...data.people.filter(p=>p._id===_id))
      });
      return people||null
    }
  },
};
