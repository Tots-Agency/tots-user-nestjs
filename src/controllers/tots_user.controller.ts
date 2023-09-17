import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { TotsSequelizeQuery } from '@tots/sequelize-query';
import { HashHelper, SuccessDto } from '@tots/core-nestjs';
import { TotsUserDto } from '../dtos/tots_user.dto';
import { TotsUserRepository } from '../repositories/tots_user.repository';
import { TotsUser } from '../models/tots_user.model';

export class TotsUserController {

  constructor(private readonly userRepository: TotsUserRepository) {}

  @Post()
  async create(@Body() request: TotsUserDto) {
    request.password = await HashHelper.encrypt(request.password);
    
    let user: TotsUser = await this.userRepository.create(request);

    return TotsUserDto.fromModel(user);
  }

  @Get()
  async findAll(@Query('page') page: number = 1, @Query('per_page') pageSize: number = 10, @Query('filters') filters: string = '') {
    let filter = new TotsSequelizeQuery(this.userRepository.getModel(), filters);
    return await filter.paginate(page, pageSize);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let user: TotsUser = await this.userRepository.findByIdOrFail(+id);
    return TotsUserDto.fromModel(user);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: TotsUserDto) {
    let user: TotsUser = await this.userRepository.update(+id, updateDto);
    return TotsUserDto.fromModel(user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.userRepository.removeById(+id);
    return new SuccessDto();
  }
}
