import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateUrlDto {

  @IsString()
  readonly title: string

  @IsUrl({}, { message: 'Please enter a valid URL.' })
  @IsString()
  @IsNotEmpty()
  readonly longUrl: string

  @IsOptional()
  readonly shortCode: string

  @IsOptional()
  readonly shortUrl: string

  generateQRCode?: boolean;
}