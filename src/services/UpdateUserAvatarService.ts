import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/User';
import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';

interface RequestDTO {
  user_id: string;
  avatar_filename: string;
}

class UpdateUserAvatarService {
  public async execute({
    user_id,
    avatar_filename,
  }: RequestDTO): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { user_id } });

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      // Deletar avatar anterior
      const userAvtarFilePath = path.join(uploadConfig.directory, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvtarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvtarFilePath);
      }
    }

    user.avatar = avatar_filename;

    // sobrescreve as informações já existentes e atualiza o que for diferente

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
