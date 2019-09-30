import { Document } from 'mongoose';

export interface HolidayInterface {
    date: Date;
    desc: string;
    calendars: [string];
    active: boolean;
}

export interface Holiday extends HolidayInterface, Document { }
