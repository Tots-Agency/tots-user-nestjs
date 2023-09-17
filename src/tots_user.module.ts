import { Module } from '@nestjs/common';

/** Others libraries */
import { SequelizeModule } from '@nestjs/sequelize';

/** Models */
import { TotsUser } from './models/tots_user.model';

/** Repositories */
import { TotsUserRepository } from './repositories/tots_user.repository';

@Module({
    imports: [
        SequelizeModule.forFeature([TotsUser])
    ],
    providers: [TotsUserRepository],
    exports: [SequelizeModule, TotsUserRepository]
})
export class TotsUserModule {}