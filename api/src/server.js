const server = require("./app");
const { sequelize } = require("./db");
/* const saveApiData = require("./controllers/saveApiData") */
const PORT = 3001;

server.listen(PORT, async () => {
  await sequelize.sync({ force: true });
  /* await saveApiData(); */
  console.log("Server raised in port => " + PORT);
});