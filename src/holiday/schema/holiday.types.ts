
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class HolidayType {
    @Field()
    date: Date;
    @Field()
    desc: string;
    @Field(() => [String])
    calendars: [string];
    @Field()
    active: boolean;
}
