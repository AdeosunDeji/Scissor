import { Body, Controller, Get, Post, Res, Param, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('url')
export class UrlController {
  constructor(private urlService: UrlService) { }

  @Post('/create')
  @UseGuards(AuthGuard())
  createUrl(@Body() creatUrlDto: CreateUrlDto, @Req() req: any) {
    const userId = req.user.id;
    const headers = req.headers;

    const newUrl = this.urlService.createshortUrl(creatUrlDto, headers, userId)

    return newUrl;
  }

  @Get('/:shortCode')
  @UseGuards(AuthGuard())
  async redirect(@Res() res, @Param('shortCode') shortCode: string) {
    const url = await this.urlService.redirect(shortCode)

    res.redirect(url)
  }

  @Get('/id/:id')
  @UseGuards(AuthGuard())
  async getUrlById(@Param('id') id: string) {
    const url = await this.urlService.getUrlById(id);

    return url;
  }


}
