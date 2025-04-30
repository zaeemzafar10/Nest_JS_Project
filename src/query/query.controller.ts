import { Body, Controller, Get, Post , UsePipes, ValidationPipe } from '@nestjs/common';
import { QueryService } from './query.service';
import { Query } from './query.schema';
import { QueryDto } from './query.dto';
@Controller('query')
export class QueryController {
    constructor(private queryService : QueryService) {}

    @Get()
    async getAllQueries() {
        return this.queryService.getAllQueries();
    }

    @Post()
    @UsePipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }))
    async createQuery(
        @Body() query : QueryDto
    ) : Promise<Query> {
        return this.queryService.createQuery(query);
    }
    
}
