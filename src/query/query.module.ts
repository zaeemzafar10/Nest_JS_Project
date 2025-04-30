import { Module } from '@nestjs/common';
import { QueryController } from './query.controller';
import { QueryService } from './query.service';
import { QuerySchema } from './query.schema';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Query', schema: QuerySchema }])],
  controllers: [QueryController],
  providers: [QueryService],
})
export class QueryModule {}
