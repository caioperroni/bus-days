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
                res = res.overwrite(holiday);
                return await res.save().then(ret => {
                    return { status: 200, message: `Holiday updated with sucess!` };
                }).catch(error => {
                    return { status: 400, message: `Error when updating holiday: ${error}.` };
                });
            } else {
                const createdHoliday = new this.holidayModel(holiday);
                return await createdHoliday.save().then(ret => {
                    return { status: 200, message: `Holiday created with sucess!` };
                }).catch(error => {
                    return { status: 400, message: `Error when creating holiday: ${error}.` };
                });
            }
        }).catch(error => {
            return { status: 400, message: `Error when searching holiday: ${error}.` };
        });
    }

    async createOrUpdateHolidays(input: HolidaysInput): Promise<ResultType> {
        const rets = [];
        for (const holiday of input.holidays) {
            rets.push(await this.holidayModel.findOne({ date: holiday.date }).then(async res => {
                if (!!res) {
                    res = res.overwrite(holiday);
                    return await res.save().then(ret => {
                        return { status: 200, message: `Holidays updated with sucess!` };
                    }).catch(error => {
                        return { status: 400, message: `Error when updating holidays: ${error}.` };
                    });
                } else {
                    const createdHoliday = new this.holidayModel(holiday);
                    return await createdHoliday.save().then(ret => {
                        return { status: 200, message: `Holidays created with sucess!` };
                    }).catch(error => {
                        return { status: 400, message: `Error when creating holidays: ${error}.` };
                    });
                }
            }).catch(error => {
                return { status: 400, message: `Error when searching holidays: ${error}.` };
            }));
        }
        for (const ret of rets) {
            if (ret.status !== 200) {
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
                    return { status: 200, message: `Holiday ${!!res.active ? `activated` : `deactivated`} with sucess!` };
                }).catch(error => {
                    return { status: 400, message: `Error when ${!!res.active ? `activating` : `deactivating`} holiday: ${error}.` };
                });
            } else {
                return { status: 400, message: `Holiday not found!` };
            }
        }).catch(error => {
            return { status: 400, message: `Error when searching holiday: ${error}.` };
        });
    }

    async findAll(): Promise<HolidayType[]> {
        return await this.holidayModel.find().exec().then(r => r).catch(e => e);
    }

    async findOne(date): Promise<HolidayType> {
        return await this.holidayModel.findOne({ date }).exec().then(r => r).catch(e => e);
    }
}
