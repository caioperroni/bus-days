import * as mongoose from 'mongoose';

export const HolidaySchema = new mongoose.Schema({
    date: Date!,
    desc: String!,
    calendars: [String]!,
    active: Boolean!,
});
