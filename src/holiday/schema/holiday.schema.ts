import * as mongoose from 'mongoose';

export const HolidaySchema = new mongoose.Schema({
    date: Date!,
    desc: String!,
    active: Boolean!,
});
