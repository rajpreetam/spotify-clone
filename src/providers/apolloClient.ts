import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://qiutouzhen.stepzen.net/api/youngling-hamster/__graphql',
  headers: {
    Authorization:
      'apikey qiutouzhen::stepzen.net+1000::928dd798812042709e6fe6a06c5c894b65cbfa33c8d8197935eb7787ea4bd2f6',
  },
  cache: new InMemoryCache(),
});
