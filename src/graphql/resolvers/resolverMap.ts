import { IResolvers } from 'apollo-server-core/node_modules/graphql-tools'

const resolvers:IResolvers={
    Query:{
        hello:()=>{
            return 'Hello Wolr Tony'
        },
        getCharacter:()=>{
            
            return [
                {
                    id:1,
                    name:'Charcter 1',
                    race:'Races1'
                },
                {
                    id:2,
                    name:'Charcter 2',
                    race:'Races2'
                },
            ]
        }
    }
}

export default resolvers