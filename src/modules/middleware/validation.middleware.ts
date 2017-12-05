import { Middleware, NestMiddleware, HttpException } from '@nestjs/common';
import * as Joi from 'joi';
import { BaseValidation } from '../../helpers/validation.base';

@Middleware()
export class ValidateBodyMiddleware implements NestMiddleware {
    resolve(validation: BaseValidation | Function): (req, res, next) => void {
        return async (req, res, next) => {
            let schema = null;
            if(validation instanceof BaseValidation) {
                schema = req.method == 'PUT' ?
                validation.updateValidation() : validation.createValidation();
            } else if (validation instanceof Function) {
                schema = validation();
            }


            Joi.validate(req.body, schema, (err, val) => {
                if(err) throw new HttpException({errors: err.details, payload: err._object}, 400);
                next();
            })
        }
    }
}