import { Component, Inject } from '@nestjs/common';
import { Model, Document } from 'mongoose';

@Component()
export abstract class BaseRepository<T extends Document>{

    protected readonly entity: Model<T>

    constructor(entity: Model<T>) {
        this.entity = entity;
    }

    async findAll(fields? : any): Promise<T[]> {
        if(fields)
            return await this.entity.find().select(fields).exec();

        return await this.entity.find().exec();
    }

    async findById(id: string, fields? : any): Promise<T> {
        if(fields)
            return await this.entity.findById(id).select(fields).exec();

        return await this.entity.findById(id).exec();
    }

    async findOneBy(conditions: Object, fields? : any): Promise<T> {
        if(fields)
            return await this.entity.findOne(conditions).select(fields).exec()

        return await this.entity.findOne(conditions).exec()
    }

    async findBy(conditions: Object, fields? : any): Promise<T[]> {
        if(fields)
            return await this.entity.find(conditions).select(fields).exec()

        return await this.entity.find(conditions).exec()
    }

    async count(): Promise<number> {
        return await this.entity.find().count().exec();
    }
}