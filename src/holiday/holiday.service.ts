import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Holiday } from './schema/holiday.interface';
import { HolidayInput } from './schema/holiday.input';
import { HolidaysInput } from './schema/holiday.input';
import { ResultType } from 'src/common/common.types';
import { HolidayType } from './schema/holiday.types';

@Injectable()
export class HolidayService {
    constructor(
        @Inject('HOLIDAY_MODEL')
        private readonly holidayModel: Model<Holiday>,
    ) { }

    async createOrUpdateHoliday(holiday: HolidayInput): Promise<ResultType> {
        // const createdHoliday = new this.holidayModel(holiday);
        // return await createdHoliday.save();
        return await { status: 200, message: 'OK' };
    }

    async createOrUpdateHolidays(holidays: HolidaysInput): Promise<ResultType> {
        // const createdHoliday = new this.holidayModel(holiday);
        // return await createdHoliday.save();
        return await { status: 200, message: 'OK' };
    }

    async findAll(): Promise<HolidayType[]> {
        return await this.holidayModel.find().exec();
    }
}
