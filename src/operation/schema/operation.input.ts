
import { InputType, Field } from 'type-graphql';

@InputType()
export class OperationInput {
    @Field({ nullable: true })
    dateFrom: Date;
    @Field({ nullable: true })
    dateTo: Date;
    @Field({ nullable: true })
    nDays: number;
    @Field(() => [String], { nullable: true })
    calendars: [string];
}
