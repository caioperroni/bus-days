
import { Resolver, Query, Args } from '@nestjs/graphql';
import { OperationInput } from './schema/operation.input';
import { OperationBusiness } from './operation.business';

@Resolver('Operation')
export class OperationResolver {
    constructor(
        private readonly operationBusiness: OperationBusiness,
    ) { }

    @Query(() => String)
    async todayDiffBusinessDays(@Args('input') input: OperationInput) {
        return await this.operationBusiness.todayDiffBusinessDays(input).then(r => r).catch(e => e);
    }

    @Query(() => String)
    async dateDiffBusinessDays(@Args('input') input: OperationInput) {
        return await this.operationBusiness.dateDiffBusinessDays(input).then(r => r).catch(e => e);
    }

    @Query(() => String)
    async businessDaysDiffToday(@Args('input') input: OperationInput) {
        return await this.operationBusiness.businessDaysDiffToday(input).then(r => r).catch(e => e);
    }

    @Query(() => String)
    async businessDaysDiffDate(@Args('input') input: OperationInput) {
        return await this.operationBusiness.businessDaysDiffDate(input).then(r => r).catch(e => e);
    }
}
