import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Holiday } from '../holiday/schema/holiday.interface';
import { ResultType } from '../common/common.types';
import { HolidayService } from '../holiday/holiday.service';

@Injectable()
export class OperationBusiness {
    constructor(
        private readonly holidayService: HolidayService,
    ) { }

    async todayDiffBusinessDays(input) {
        return await 'oi';
    }

    async dateDiffBusinessDays(input) {
        return await 'oi';
    }

    async businessDaysDiffToday(input) {
        return await 'oi';
    }

    async businessDaysDiffDate(input) {
        return await 'oi';
    }
}
