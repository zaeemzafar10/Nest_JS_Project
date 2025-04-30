import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Query } from './query.schema';

@Injectable()
export class QueryService {
    constructor(
        @InjectModel(Query.name)
        private queryModel: mongoose.Model<Query>,
    ) {}

    async createQuery(query: Query): Promise<Query> {
        return this.queryModel.create(query);
    }
    async getAllQueries(): Promise<Query[]> {
        return this.queryModel.find();
    }
}
