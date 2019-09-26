
import { Resolver, Query, Args } from '@nestjs/graphql';
import { HolidayService } from './holiday.service';
import { ResultType } from '../common/common.types';

@Resolver('Holiday')
export class HolidayResolver {
    constructor(
        private readonly holidayService: HolidayService,
    ) { }

    @Query(() => ResultType)
    async findAll() {
        return await this.holidayService.findAll();
    }
}
