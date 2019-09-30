import { Model } from 'mongoose';
import { Injectable, Inject, HttpException } from '@nestjs/common';
import { Holiday } from '../holiday/schema/holiday.interface';
import { OperationInput } from './schema/operation.input';

@Injectable()
export class OperationBusiness {
    constructor(
        @Inject('HOLIDAY_MODEL')
        private readonly holidayModel: Model<Holiday>,
    ) { }

    secMargin = 100;

    async todayDiffBusinessDays(input: OperationInput): Promise<Date> {
        if (!!input.nDays) {
            const sign = Math.sign(input.nDays);
            let secMargin = sign * this.secMargin;
            const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
            today.setUTCHours(0, 0, 0, 0);
            const dateTo = new Date(today);
            dateTo.setUTCDate(dateTo.getUTCDate() + (input.nDays + secMargin));
            const query = {
                date: {
                    $gte: input.nDays >= 0 ? today : dateTo,
                    $lte: input.nDays >= 0 ? dateTo : today,
                },
                active: true,
                ['calendars']: !!input.calendars ? { $in: input.calendars } : { $exists: true }
            }
            return await this.holidayModel.find(query).then(async r => {
                while (input.nDays !== sign * -1) {
                    const idx = r.findIndex(el => el.date.valueOf() === today.valueOf());
                    if (idx < 0 && today.getUTCDay() !== 0 && today.getUTCDay() !== 6) {
                        input.nDays += (sign * -1);
                    }
                    if (input.nDays !== sign * -1) {
                        today.setUTCDate(today.getUTCDate() + sign);
                    }
                }
                return await today;
            }).catch(e => {
                throw new HttpException(`Erro ao buscar feriados: ${e}.`, 500);
            });
        } else {
            throw new HttpException(`Campo nDays é obrigatório!`, 403);
        }
    }

    async dateDiffBusinessDays(input: OperationInput): Promise<Date> {
        if (!!input.nDays && !!input.dateFrom) {
            const sign = Math.sign(input.nDays);
            let secMargin = sign * this.secMargin;
            const dateFrom = new Date(input.dateFrom.getUTCFullYear(), input.dateFrom.getUTCMonth(), input.dateFrom.getUTCDate());
            dateFrom.setUTCHours(0, 0, 0, 0);
            const dateTo = new Date(dateFrom);
            dateTo.setUTCDate(dateTo.getUTCDate() + (input.nDays + secMargin));
            const query = {
                date: {
                    $gte: input.nDays >= 0 ? dateFrom : dateTo,
                    $lte: input.nDays >= 0 ? dateTo : dateFrom,
                },
                active: true,
                ['calendars']: !!input.calendars ? { $in: input.calendars } : { $exists: true }
            }

            return await this.holidayModel.find(query).then(async r => {
                while (input.nDays !== sign * -1) {
                    const idx = r.findIndex(el => el.date.valueOf() === dateFrom.valueOf());
                    if (idx < 0 && dateFrom.getUTCDay() !== 0 && dateFrom.getUTCDay() !== 6) {
                        input.nDays += (sign * -1);
                    }
                    if (input.nDays !== sign * -1) {
                        dateFrom.setUTCDate(dateFrom.getUTCDate() + sign);
                    }
                }
                return await dateFrom;
            }).catch(e => {
                throw new HttpException(`Erro ao buscar feriados: ${e}.`, 500);
            });
        } else {
            throw new HttpException(`Campos nDays e dateFrom são obrigatórios!`, 403);
        }
    }

    async businessDaysDiffToday(input: OperationInput): Promise<Number> {
        if (!!input.dateTo) {
            const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
            today.setUTCHours(0, 0, 0, 0);
            const dateTo = new Date(input.dateTo.getUTCFullYear(), input.dateTo.getUTCMonth(), input.dateTo.getUTCDate());
            dateTo.setUTCHours(0, 0, 0, 0);
            const sign = today > dateTo ? -1 : 1;
            let nDays = 0;
            const query = {
                date: {
                    $gte: sign >= 0 ? today : dateTo,
                    $lte: sign >= 0 ? dateTo : today,
                },
                active: true,
                ['calendars']: !!input.calendars ? { $in: input.calendars } : { $exists: true }
            }
            return await this.holidayModel.find(query).then(async r => {
                while (today.valueOf() !== dateTo.valueOf()) {
                    const idx = r.findIndex(el => el.date.valueOf() === today.valueOf());
                    today.setUTCDate(today.getUTCDate() + sign);
                    if (idx < 0 && today.getUTCDay() !== 0 && today.getUTCDay() !== 6) {
                        nDays += sign;
                    }
                }
                return await nDays;
            }).catch(e => {
                throw new HttpException(`Erro ao buscar feriados: ${e}.`, 500);
            });
        } else {
            throw new HttpException(`Campo dateTo é obrigatório!`, 403);
        }
    }

    async businessDaysDiffDate(input: OperationInput): Promise<Number> {
        if (!!input.dateTo && !!input.dateFrom) {
            const dateFrom = new Date(input.dateFrom.getUTCFullYear(), input.dateFrom.getUTCMonth(), input.dateFrom.getUTCDate());
            dateFrom.setUTCHours(0, 0, 0, 0);
            const dateTo = new Date(input.dateTo.getUTCFullYear(), input.dateTo.getUTCMonth(), input.dateTo.getUTCDate());
            dateTo.setUTCHours(0, 0, 0, 0);
            const sign = dateFrom > dateTo ? -1 : 1;
            let nDays = 0;
            const query = {
                date: {
                    $gte: sign >= 0 ? dateFrom : dateTo,
                    $lte: sign >= 0 ? dateTo : dateFrom,
                },
                active: true,
                ['calendars']: !!input.calendars ? { $in: input.calendars } : { $exists: true }
            }
            return await this.holidayModel.find(query).then(async r => {
                while (dateFrom.valueOf() !== dateTo.valueOf()) {
                    const idx = r.findIndex(el => el.date.valueOf() === dateFrom.valueOf());
                    dateFrom.setUTCDate(dateFrom.getUTCDate() + sign);
                    if (idx < 0 && dateFrom.getUTCDay() !== 0 && dateFrom.getUTCDay() !== 6) {
                        nDays += sign;
                    }
                }
                return await nDays;
            }).catch(e => {
                throw new HttpException(`Erro ao buscar feriados: ${e}.`, 500);
            });
        } else {
            throw new HttpException(`Campo dateTo é obrigatório!`, 403);
        }
    }
}
