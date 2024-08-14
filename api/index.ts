import express from "express";
import { createYoga, createSchema } from "graphql-yoga";
import path from "path";

const app = express();
const PORT = process.env.PORT || 4001;

// GraphQL setup
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
app.use(express.static(path.join(__dirname, "./build")));

// Handle React routing, return all requests to the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
