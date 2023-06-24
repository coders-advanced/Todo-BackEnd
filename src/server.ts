import express from "express";
import fs from "fs";
import YAML from "yaml";
import swaggerUI from "swagger-ui-express";
import { join } from "path";
import router from "./Application/Routes/router";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const ymlDoc = fs.readFileSync(join(__dirname, "swagger", "doc.yml"), "utf8");
const swaggerDoc = YAML.parse(ymlDoc);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

const PORT = process.env.PORT ?? 3000;

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
