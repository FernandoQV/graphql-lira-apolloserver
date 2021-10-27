import GMR from "graphql-merge-resolvers";
import { character } from "./character";
import { game } from "./game";
export const resolvers: any = GMR.merge([character, game]);
