// Import necessary dependencies
import Express from 'express';
import bodyParser from 'body-parser';
import Boom from '@hapi/boom';
import { startConnection } from './src/mongo/index.mjs';
import FiltersRouter from './src/handlers/filters/index.mjs';
import { PORT } from './src/commons/env.mjs';
import buildContainer from './src/container/buildContainer.mjs';

const app = Express();

app.use(bodyParser.json());
app.use(buildContainer);

app.get('/', (req, res) => {
  res.send('OK');
});

app.use('/images', FiltersRouter);

// Define a GET endpoint that retrieves a document by ID
app.get('/images/:id', async (req, res, next) => {
  try {
    const { id } = req.params; // Get the ID from the URL
    // Replace 'YourModel' with the actual model you're using to interact with MongoDB
    const document = await YourModel.findById(id);

    if (!document) {
      // If the document doesn't exist, return an error
      const error = Boom.notFound('Object not found in MongoDB');
      return res.status(error.output.statusCode).json(error.output.payload);
    }

    // If the document exists, return it
    res.json(document);
  } catch (error) {
    // Handle any other errors that may occur
    next(error);
  }
});

app.use((error, req, res, next) => {
  if (error) {
    const err = Boom.isBoom(error) ? error : Boom.internal(error);
    const { statusCode } = err.output;
    const { payload } = err.output;
    const response = { ...payload, stack: err.stack };
    return res.status(statusCode).json(response);
  }

  return next();
});

const startServer = async () => {
  await startConnection();

  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
};

startServer();