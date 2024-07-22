// cart.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CreateCartItemDto } from './dtos/cartItems.dto';


@Schema()
export class Cart extends Document {
  @Prop({ required: true })
  userId: string; // Assuming userId is used for identifying the user

  @Prop({ type: [CreateCartItemDto], default: [] })
  items: CreateCartItemDto[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
