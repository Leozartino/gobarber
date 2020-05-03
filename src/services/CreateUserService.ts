import { getRepository } from 'typeorm';
import User from '../models/User';

interface RequestBodyDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
  }: RequestBodyDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({ where: { email } });

    if (checkUserExists) {
      throw Error('Email adresss already used.');
    }

    // Nesta estapa ele não salva no banco (não assincrono), só cria uma instância
    const user = usersRepository.create({
      name,
      email,
      password,
    });
    // Momento de criação do usuário
    await usersRepository.save(user);

    return user;
  }
}
export default CreateUserService;
