
import app from "./app.js";
import { sequelize } from "./config/database.js";
import { env } from "./config/env.js";

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    await sequelize.sync();

    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();