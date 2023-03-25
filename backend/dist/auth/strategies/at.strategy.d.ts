import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
declare const AtStrategy_base: new (...args: any[]) => Strategy;
export declare class AtStrategy extends AtStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(req: Request, payload: any): any;
}
export {};
