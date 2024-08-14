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

const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
});

app.use("/graphql", yoga);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Handle React routing, return all requests to the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port: ${SERVER_PORT}`);
});
