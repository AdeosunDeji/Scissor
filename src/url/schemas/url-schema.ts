import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { User } from "../../auth/schemas/user.schema";

@Schema({
  timestamps: true
})
export class Url extends Document {

  @Prop({ type: String })
  Title: string;

  @Prop({ type: String })
  longUrl: string;

  @Prop({ type: String, unique: true })
  shortCode: string;

  @Prop({ type: String, unique: true })
  shortUrl: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "User" }) // Reference to the User schema
  userId: User;

  @Prop({ type: Number, default: 0 })
  clickCount: number;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
