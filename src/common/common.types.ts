
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class ResultType {
    @Field()
    status: number;
    @Field()
    message: string;
}
