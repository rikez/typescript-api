import * as Joi from 'joi';
import { BaseValidation } from '../../../helpers/validation.base'

export class UserValidation extends BaseValidation {

    createValidation() {
        return {
            name: Joi.string().min(2).max(50).required(),
            email: Joi.string().email().required(),
            dateOfBirth: Joi.string().regex(/^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/).required(),
            password: Joi.string().min(6).max(30).required(),
            roles: Joi.array().items(Joi.number()).max(2)
        }
    }

    updateValidation() {
        let updateVal: any = this.createValidation();
        updateVal._id = Joi.string().required();
        return updateVal;
    }

    credentialsValidation() {
        return {
            email: Joi.string().email().required(),
            password: Joi.string().min(6).max(30).required(),
        }
    }
}



