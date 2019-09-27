import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Holiday } from './schema/holiday.interface';
import { HolidayInput } from './schema/holiday.input';
import { HolidaysInput } from './schema/holiday.input';
import { ResultType } from '../common/common.types';
import { HolidayType } from './schema/holiday.types';

@Injectable()
export class HolidayService {
    constructor(
        @Inject('HOLIDAY_MODEL')
        private readonly holidayModel: Model<Holiday>,
    ) { }

    async createOrUpdateHoliday(holiday: HolidayInput): Promise<ResultType> {
        return await this.holidayModel.findOne({ date: holiday.date }).then(async res => {
            if (!!res) {
                res = holiday as Holiday;
                return await res.save().then(ret => {
                    return { status: 200, message: 'OK' };
                }).catch(error => {
                    return { status: 400, message: 'NOK' };
                });
            } else {
                const createdHoliday = new this.holidayModel(holiday);
                return await createdHoliday.save().then(ret => {
                    return { status: 200, message: 'OK' };
                }).catch(error => {
                    return { status: 400, message: 'NOK' };
                });
            }
        }).catch(error => {
            return { status: 400, message: 'NOK' };
        });
    }

    async createOrUpdateHolidays(input: HolidaysInput): Promise<ResultType> {
        const rets = [];
        for (const holiday of input.holidays) {
            rets.push(this.holidayModel.findOne({ date: holiday.date }).then(async res => {
                if (!!res) {
                    res = holiday as Holiday;
                    return await res.save().then(ret => {
                        return { status: 200, message: 'OK' };
                    }).catch(error => {
                        return { status: 400, message: 'NOK' };
                    });
                } else {
                    const createdHoliday = new this.holidayModel(holiday);
                    return await createdHoliday.save().then(ret => {
                        return { status: 200, message: 'OK' };
                    }).catch(error => {
                        return { status: 400, message: 'NOK' };
                    });
                }
            }).catch(error => {
                return { status: 400, message: 'NOK' };
            }));
        }
        for (const ret of rets) {
            if (ret.statusCode !== 200) {
                return ret;
            }
        }
        return rets[0];
    }

    async switchHoliday(date): Promise<ResultType> {
        return await this.holidayModel.findOne({ date }).then(async res => {
            if (!!res) {
                res.active = !res.active;
                return await res.save().then(ret => {
                    return { status: 200, message: 'OK' };
                }).catch(error => {
                    return { status: 400, message: 'NOK' };
                });
            } else {
                return { status: 400, message: 'NOK' };
            }
        }).catch(err => {
            return { status: 400, message: 'NOK' };
        });
    }

    async findAll(): Promise<HolidayType[]> {
        return await this.holidayModel.find().exec().then(r => r).catch(e => e);
    }

    async findOne(date): Promise<HolidayType> {
        return await this.holidayModel.findOne({ date }).exec().then(r => r).catch(e => e);
    }
}
