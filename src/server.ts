import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import './database';
import uploadConfig from './config/upload';

const app = express();
const port = 3333;

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port: ${port} 🎢`);
});
