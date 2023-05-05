import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TemporaryUser } from './entities/temporary-user.entity';

@Injectable()
export class TemporaryUsersService {
    constructor(
        @InjectRepository(TemporaryUser)
        private readonly temporaryUserRepository: Repository<TemporaryUser>,
    ) { }

    async create(email: string): Promise<TemporaryUser> {
        return await this.temporaryUserRepository.save({email});
    }

    async findById(id: number): Promise<TemporaryUser> {
        return await this.temporaryUserRepository.findOneBy({ id });
    }

    async findByEmail(email: string): Promise<TemporaryUser> {
        return await this.temporaryUserRepository.findOneBy({ email });
    }

    async deleteTemporaryUsers(): Promise<void> {
        const temporaryUsers = await this.temporaryUserRepository.find({
            where: { isDeleted: true },
        });

        await this.temporaryUserRepository.remove(temporaryUsers);
    }
}
