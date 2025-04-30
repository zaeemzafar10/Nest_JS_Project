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

    async getAllQueries(): Promise<{ status: boolean; message: string; total: number; data: Query[]}> {
        const queries = await this.queryModel.find();
        return {
            status: true,
            message: 'Queries fetched successfully',
            total: queries.length,
            data: queries,
          };
    }

    async getQueryById(id: string): Promise<Query | null> {
        const detailQuery = await this.queryModel.findById(id);
        return detailQuery;
    }

    async deleteQuery(id: string): Promise<{message : string ; data :Query | null}> {
        const deletedQuery = await this.queryModel.findByIdAndDelete(id);
        if (!deletedQuery) {
            return {
                message: 'No Query Found',
                data: null,
            };
        }
        return {
            message: 'Query deleted successfully',
            data: deletedQuery,
        }
    }

    async updateQuery(id: string, query: Query): Promise<{message : string , data : Query | null}> {
        const updatedQuery = await this.queryModel.findByIdAndUpdate(id, query, {
            new: true,
            runValidators: true,
        });
        return {
            message: 'Query updated successfully',
            data: updatedQuery,
        }
    }
}
