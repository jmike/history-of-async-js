import Hapi from 'hapi';
import Inert from 'inert';

const server = new Hapi.Server();
server.connection({port: parseInt(process.env.PORT, 10) || 5000});

server.register([Inert], (err) => {
  if (err) return console.error(err);

  server.route({
    method: 'GET',
    path: '/mirror',
    handler: (request, reply) => {
      setTimeout(() => {
        reply(request.query.q).type('text/plain');
      }, 5000 * Math.random());
    }
  });

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: `${__dirname}/public`
      }
    }
  });
});

server.start(() => {
  console.log(`Server listening on port ${server.info.port}`);
});

