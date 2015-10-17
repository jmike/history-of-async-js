import Hapi from 'hapi';

const server = new Hapi.Server();
server.connection({port: parseInt(process.env.PORT, 10) || 5000});

server.route([
  {
    method: 'GET',
    path: '/mirror',
    handler: (request, reply) => {
      setTimeout(() => {
        reply(request.query.q).type('text/plain');
      }, 3000 * Math.random());
    }
  }
]);

server.start(() => {
  console.log(`Server listening on port ${server.info.port}`);
});

