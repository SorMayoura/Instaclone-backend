import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

const dirname = process.cwd();

const loadedType = loadFilesSync(`${dirname}/**/*.typeDefs.js`);
const loadedResolvers = loadFilesSync([`${dirname}/**/*.resolvers.js`]);

export const typeDefs = mergeTypeDefs(loadedType);
export const resolvers = mergeResolvers(loadedResolvers); 
