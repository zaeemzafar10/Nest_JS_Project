import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'query',
  timestamps: true,
})
export class Query {
  @Prop()
  title: string;

  @Prop()
  subject: string;

  @Prop()
  description: string;
}

export const QuerySchema = SchemaFactory.createForClass(Query);
