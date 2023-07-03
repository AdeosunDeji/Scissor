import { ConflictException, Injectable, NotFoundException, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Url } from './schemas/url-schema';
import { Model } from 'mongoose';
import { CreateUrlDto } from './dto/create-url.dto';
import { generateRandomId } from './util/shortUrl';
import { User } from 'src/auth/schemas/user.schema';
import { QrcodeService } from 'src/qrcode/qrcode.service';

@Injectable()
export class UrlService {
  constructor(
    @InjectModel(Url.name)
    private urlModel: Model<Url>,
    @InjectModel(User.name)
    private userModel: Model<User>,
    private qrCodeService: QrcodeService,
  ) { }

  async createshortUrl(
    { generateQRCode, ...createUrlDto }: CreateUrlDto,
    headers: any,
    userId: string) {

    const { title, longUrl } = createUrlDto;
    const urlExist = await this.urlModel.findOne({ longUrl })
    if (urlExist) {
      throw new ConflictException('URL has already been shortened. Enter a new URL.')
    }

    const shortCode = generateRandomId(4)
    const shortUrl = `${headers.host}/url/${shortCode}`;
    const qrCode = generateQRCode ? await this.qrCodeService.generateQrCode(shortUrl) : undefined
    const user = await this.userModel.findById(userId);

    const newUrl = await this.urlModel.create({
      title,
      longUrl,
      shortCode,
      shortUrl,
      qrCode,
      userId: user._id
    })

    return newUrl;
  }

  async redirect(shortCode: string) {
    const url = await this.urlModel.findOne({ shortCode });

    if (!url) {
      throw new NotFoundException('Not found.')
    }

    // Increment clickCount by 1
    url.clickCount += 1;
    await url.save();

    return url.longUrl;
  }

  async getUrlById(id: string): Promise<Url> {
    try {
      const url = await this.urlModel.findById(id).exec();

      if (!url) {
        throw new NotFoundException('URL does not exist.');
      }

      return url;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new NotFoundException('Invalid URL ID.');
      }
      throw error;
    }
  }




}
