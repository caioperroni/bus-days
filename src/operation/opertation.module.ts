import { Module } from '@nestjs/common';
import { HolidayService } from '../holiday/holiday.service';
import { holidayProviders } from '../holiday/holiday.providers';
import { databaseProviders } from '../database/database.providers';
import { OperationResolver } from './operation.resolver';
import { OperationBusiness } from './operation.business';

@Module({
    imports: [],
    providers: [
        OperationResolver,
        OperationBusiness,
        HolidayService,
        ...holidayProviders,
        ...databaseProviders,
    ],
})
export class OperationsModule { }
