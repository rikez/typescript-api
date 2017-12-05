import { Middleware, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken'
import * as Joi from 'joi';
const env = require('../../../env.json')['token'];

@Middleware()
export class PermissionMiddleware implements NestMiddleware {

    resolve(): (req, res, next) => void {
        return async (req, res, next) => {
            let token = req.headers['authorization'] || req.body['authorization'];
            if(!token) throw new HttpException("Access Denied", HttpStatus.UNAUTHORIZED)

            let tokenData = await verify(token, env['secret']);
            if(tokenData) {
                req.user = tokenData;
                next();
                return;
            }

            throw new HttpException("Access Denied", HttpStatus.UNAUTHORIZED)
        }
    }
}