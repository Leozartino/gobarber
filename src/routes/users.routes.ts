import { Router } from 'express';
/* import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/CreateUserService';
 */

const usersRouter = Router();

usersRouter.post('/', (request, response) => {
  try {
    const { name, email, password } = request.body;

    return response.send({});
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default usersRouter;
