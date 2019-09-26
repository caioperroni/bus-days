import { Connection } from 'mongoose';
import { HolidaySchema } from '../holiday/schema/holiday.schema';

export const holidayProviders = [
    {
        provide: 'HOLIDAY_MODEL',
        useFactory: (connection: Connection) => connection.model('Holiday', HolidaySchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
