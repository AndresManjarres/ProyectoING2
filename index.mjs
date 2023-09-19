import Express from "express";
import bodyParser from "body-parser";
import { startConnection } from "./src/mongo/index.mjs";
import FiltersRouter from "./src/handlers/filters/index.mjs";
import Boom from "@hapi/boom";
import { PORT } from "./src/commons/env.mjs";

import multer from "multer"; //Tareas

const app = Express();
app.use(bodyParser.json());

const upload = multer({ dest: "uploads/" }); // Define la carga de archivos en la carpeta

// Se borro const PORT = 3000;
app.get("/", (req, res) => {
  res.send("OK");
});

// Endpoint POST para recibir form data con files[] y filters
app.post("/upload", upload.array("files"), (req, res) => {
  
  // Se usa req.files para accedes a los archivos
  const files = req.files;
  const filters = req.body.filters;

  console.log("Hola ya estas en upload")

  // Estado de la respuesta
  res.status(200).json({ message: "Archivos subidos y procesados con éxito" });
});

app.use("/images", FiltersRouter);

app.use((error, req, res, next) => {
  if (error) {
    let err = Boom.isBoom(error) ? error : Boom.internal(error);
    const statusCode = err.output.statusCode;
    const payload = err.output.payload;
    return res.status(statusCode).json(payload);
  }

  return next;
});

const startServer = async () => {
  await startConnection();

  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
};

startServer();
