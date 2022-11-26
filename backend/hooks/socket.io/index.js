module.exports = (strapi) => {
  return {
    async initialize() {
      const ioServer = require("socket.io")(strapi.server, {
        cors: {
          origin: process.env["FRONT_APP_URL"] || "http://localhost:3001",
        },
      });

      ioServer.on("connection", async function (socket) {
        //count connections
        //const sockets = await ioServer.engine.clientsCount;
        socket.on("addVisitor", async function (visitor) {
          const queryData = {
            ...visitor,
            _sort: `created_at:DESC`,
          };

          const current_visitor = await strapi.services.visitor.find(queryData);

          if (current_visitor[0]) {
            const { created_at } = current_visitor[0];
            const current_date_minus30min = new Date().setMinutes(
              new Date().getMinutes() - 30
            );
            if (new Date(created_at) < current_date_minus30min) {
              await strapi.services.visitor.create({
                ...visitor,
                visits: 1,
              });
            } else {
              const { id, visits } = current_visitor[0];
              await strapi.services.visitor.update(
                { id },
                { visits: visits + 1 }
              );
            }
          }
        });
      });

      /* HANDLE CLIENT SOCKET LOGIC HERE */

      // store the server.io instance to global var to use elsewhere
      strapi.services.ioServer = ioServer;
    },
  };
};
