import { createSchema, createYoga } from "graphql-yoga";
import express from "express";

const app = express();

const SERVER_PORT = 4001;

const typeDefs = /* GraphQL */ `
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello from GraphQL Yoga!",
  },
};

const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
});

app.use("/graphql", yoga);

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port: ${SERVER_PORT}`);
});
