import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'user',
  timestamps: true,
})
export class User {
  @Prop()
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
