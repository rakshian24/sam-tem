import { createSchema, createYoga } from "graphql-yoga";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";

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

// Since we are using E6 modules for NodeJS, __dirname will not be present for modules, we need to do some work around as below for making __dirname to work
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
});

app.use("/graphql", yoga);

app.use(express.static(path.resolve(__dirname, "..", "frontend", "build")));
app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "..", "frontend", "build", "index.html")
  );
});

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port: ${SERVER_PORT}`);
});
