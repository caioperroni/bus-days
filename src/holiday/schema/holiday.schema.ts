import * as mongoose from 'mongoose';

export const HolidaySchema = new mongoose.Schema({
    date: Date!,
    desc: String!,
    calendar: String!,
    active: Boolean!,
});
