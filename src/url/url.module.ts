import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { UrlSchema } from './schemas/url-schema';
import { UserSchema } from 'src/auth/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { QrcodeModule } from 'src/qrcode/qrcode.module';
import { QrcodeService } from 'src/qrcode/qrcode.service';

@Module({
  imports: [
    AuthModule,
    QrcodeModule,
    MongooseModule.forFeature([
      { name: 'Url', schema: UrlSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [UrlController],
  providers: [UrlService, QrcodeService],
})
export class UrlModule { }
