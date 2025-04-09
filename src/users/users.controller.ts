import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Query,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidatePaginationPipe } from './pipes/validate-pagination/validate-pagination.pipe';
import { ApiTags } from '@nestjs/swagger';

@Controller({})
@ApiTags('Users')
export class UsersController {
  constructor(private userService: UsersService) {
    this.userService = userService;
  }
  @Get('/me')
  getMe() {
    return this.userService.getMe();
  }
  @Get('/users')
  getAllUsers(
    @Query(ValidatePaginationPipe) pagination: { page: number; limit: number },
  ) {
    return this.userService.getAllUsers(pagination);
  }

  @Get('/users/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @Post('/user')
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Put('/user')
  updateUser(@Body() user: UpdateUserDto) {
    return this.userService.updateUser(user);
  }

  @Get('/user/:id/teams')
  getUserTeams() {
    return this.userService.getUserTeams();
  }
}
