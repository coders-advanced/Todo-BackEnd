import express from "express";
import fs from "fs";
import YAML from "yaml";
import swaggerUI from "swagger-ui-express";
import { join } from "path";
import router from "./Application/Routes/router";

const app = express();

const ymlDoc = fs.readFileSync(join(__dirname, "swagger", "doc.yml"), "utf8");
const swaggerDoc = YAML.parse(ymlDoc);
app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

const PORT = process.env.PORT ?? 3000;

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
