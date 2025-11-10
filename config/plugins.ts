export default {
  graphql: {
    enabled: true,
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,      
      depthLimit: 7,
      amountLimit: 100,
      apolloServer: {
        introspection: true,  
      },
    },
  },
};
