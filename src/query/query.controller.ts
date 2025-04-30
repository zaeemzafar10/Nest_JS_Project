import { 
    Body, Controller, Get, Post , Put , UsePipes, 
    ValidationPipe , Param, Delete} from '@nestjs/common';
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
    @Get(':id')
    async getQueryById(
        @Param('id') id: string
    ) : Promise<Query | null> {
        return this.queryService.getQueryById(id);
    }
    @Delete(':id')
    async deleteQuery(
        @Param('id') id: string
    ) : Promise<{message : string ; data :Query | null}> {
        return this.queryService.deleteQuery(id);
    }


    @Put(':id')
    @UsePipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }))
    async updateQuery(
        @Param('id') id: string,
        @Body() query : QueryDto
    ) : Promise<{message : string , data : Query | null}> {
        return this.queryService.updateQuery(id ,query);
    }
 

    @Post()
    @UsePipes(new ValidationPipe({
        whitelist: true, // fields are required but not in payload
        forbidNonWhitelisted: true, // fields are not in schema and dto
        transform: true,
      }))
    async createQuery(
        @Body() query : QueryDto
    ) : Promise<Query> {
        return this.queryService.createQuery(query);
    }
    

}
