import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import auth from '../config/auth';

interface RequestBodyDTO {
  email: string;
  password: string;
}
interface ReponseAuth {
  user: User;
  token: string;
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

    const token = sign({}, auth.jwt.secret, {
      subject: user.id,
      expiresIn: auth.jwt.expiresIn,
    });
    return {
      user,
      token,
    };
  }
}

export default CreateSessionService;
