import { Document } from 'mongoose';

export interface HolidayInterface {
    date: Date;
    desc: string;
    calendar: string;
    active: boolean;
}

export interface Holiday extends HolidayInterface, Document { }
