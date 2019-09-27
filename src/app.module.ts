import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { HolidayModule } from './holiday/holiday.module';
import { Mongoose } from 'mongoose';
import { DatabaseModule } from './database/database.module';
import { OperationsModule } from './operation/opertation.module';

@Module({
  imports: [
    DatabaseModule,
    GraphQLModule.forRoot({
      autoSchemaFile: '/dist/schema.gql',
    }),
    HolidayModule,
    OperationsModule,
  ],
  providers: [],
})
export class AppModule { }
