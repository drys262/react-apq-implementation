const { ApolloServer } = require('apollo-server');
const { RedisClusterCache } = require('apollo-server-cache-redis');

const typeDefs = `
  type Account @cacheControl(maxAge: 180) {
    name: String!
    email: String! 
  }

  type Query {
    hello(name: String): String
    accounts: [Account]
  }
`;

const resolvers = {
  Query: {
    hello: (_, args) => `Hello ${args.name || 'World'}!`,
    accounts: () => [
      {
        name: 'DK Chavez',
        email: 'dkchavez0987@gmail.com',
      },
      {
        name: 'Jahree Chavez',
        email: 'jlester@gmail.com',
      },
    ],
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cacheControl: { defaultMaxAge: 5 },
  persistedQueries: {
    cache: new RedisClusterCache(
      [
        {
          host: 'redis-node-01-host',
          // Options are passed through to the Redis cluster client
        },
      ],
      {
        // Cluster options are passed through to the Redis cluster client
      }
    ),
  },
});

// server.listen(() => console.log(`Server is running at http://localhost:4000`));
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
