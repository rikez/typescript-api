import { Get, Controller, Body, Post, HttpException, HttpStatus, Req, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/persistence/user';
import { IUserCredentials } from '../user/persistence/user.interface';

@Controller('authenticate')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @HttpCode(200)
    @Post()
    async logIn(@Req() request, @Body() user: IUserCredentials): Promise<any> {
        try {
            const data = await this.authService.logIn(user);
            if(!data.token) throw new HttpException("Bad credentials", HttpStatus.UNAUTHORIZED);

            return { message: `Welcome, ${data.name}` , token: data.token};

        } catch(err) {
            throw new HttpException(err.response || err.message, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
