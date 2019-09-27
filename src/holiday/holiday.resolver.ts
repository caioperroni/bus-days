
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { HolidayService } from './holiday.service';
import { ResultType } from '../common/common.types';
import { HolidayInput, HolidaysInput } from './schema/holiday.input';
import { HolidayType } from './schema/holiday.types';

@Resolver('Holiday')
export class HolidayResolver {
    constructor(
        private readonly holidayService: HolidayService,
    ) { }

    @Query(() => [HolidayType])
    async findAll() {
        return await this.holidayService.findAll().then(r => r).catch(e => e);
    }

    @Query(() => HolidayType)
    async findOne(@Args('date') date: Date) {
        return await this.holidayService.findOne(date).then(r => r).catch(e => e);
    }

    @Mutation(() => ResultType)
    async createOrUpdateHoliday(@Args('holiday') holiday: HolidayInput) {
        return await this.holidayService.createOrUpdateHoliday(holiday).then(r => r).catch(e => e);
    }

    @Mutation(() => ResultType)
    async createOrUpdateHolidays(@Args('input') input: HolidaysInput) {
        return await this.holidayService.createOrUpdateHolidays(input).then(r => r).catch(e => e);

    }

    @Mutation(() => ResultType)
    async switchHoliday(@Args('date') date: Date) {
        return await this.holidayService.switchHoliday(date).then(r => r).catch(e => e);

    }
}
