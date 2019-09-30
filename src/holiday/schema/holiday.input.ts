
import { InputType, Field } from 'type-graphql';

@InputType()
export class HolidayInput {
    @Field()
    date: Date;
    @Field()
    desc: string;
    @Field(() => [String])
    calendars: [string];
    @Field()
    active: boolean;
}

@InputType()
export class HolidaysInput {
    @Field(() => [HolidayInput])
    holidays: [HolidayInput];
}
