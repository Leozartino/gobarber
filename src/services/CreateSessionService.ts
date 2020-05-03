import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from '../models/User';

interface RequestBodyDTO {
  email: string;
  password: string;
}
interface ReponseAuth {
  user: User;
}
class CreateSessionService {
  public async execute({
    email,
    password,
  }: RequestBodyDTO): Promise<ReponseAuth> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorret email or password combination');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorret email or password combination');
    }
    return {
      user,
    };
  }
}

export default CreateSessionService;
