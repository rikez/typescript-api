import { Controller, Get, Post, Body, Param, HttpStatus, HttpException, Put, Delete, Req, HttpCode} from '@nestjs/common';
import { User } from './persistence/user';
import { UserService } from './user.service';
import { IUser } from './persistence/user.interface';

@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: User) {
      try {
        let userCreated: IUser = await this.userService.create(user);
        return { name: userCreated.name, email: userCreated.email, id: userCreated._id };
      } catch(e) {
        throw new HttpException(
          e.code == '11000' ? "Email indisponível para cadastro" : e.message, 
          HttpStatus.BAD_REQUEST
        );
      }
  }

  @Get('count')
  async count(@Req() request) {
    try {
      const userCount = await this.userService.count();
      return {quantity: userCount, label: "Users Available"};
    } catch(err) {
      console.log(err);
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll(): Promise<IUser[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  async findById(@Param() user: any): Promise<IUser> {
    return this.userService.findById(user.id);
  }

  @Put()
  async update(@Req()request, @Body() user: User): Promise<IUser> {
    try {
      return this.userService.update(user);
    } catch(e) {
      throw new HttpException(
        e.code == '11000' ? "Email indisponível para atualização" : e.message, 
        HttpStatus.BAD_REQUEST
      );
    }
  }


  @Delete('/:id')
  async delete(@Param() user: any): Promise<void> {
    try {
      await this.userService.delete(user.id);
    } catch(e) {
      throw new HttpException(
        e.message,
        HttpStatus.BAD_REQUEST
      );
    }
  }





}