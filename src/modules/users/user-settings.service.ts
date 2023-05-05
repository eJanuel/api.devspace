import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSettings } from './entities/user-settings.entity';

@Injectable()
export class UserSettingsService {
    constructor(
        @InjectRepository(UserSettings)
        private readonly userSettingsRepository: Repository<UserSettings>,
    ) { }

    async create(visibility: 'private' | 'public'): Promise<UserSettings> {
        const settings = new UserSettings();
        settings.visibility = visibility;
        return this.userSettingsRepository.save(settings);
    }
}
