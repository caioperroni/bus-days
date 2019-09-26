import { Module } from '@nestjs/common';
import { HolidayResolver } from './holiday.resolver';
import { HolidayService } from './holiday.service';
import { holidayProviders } from './holiday.providers';
import { databaseProviders } from '../database/database.providers';

@Module({
    imports: [],
    providers: [
        HolidayResolver,
        HolidayService,
        ...holidayProviders,
        ...databaseProviders,
    ],
})
export class HolidayModule { }
