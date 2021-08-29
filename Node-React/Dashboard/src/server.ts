/* eslint-disable no-console */
import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3001, () => {
  console.log(`Example app listening at ${3001}`);
});
