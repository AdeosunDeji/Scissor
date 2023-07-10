import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { Strategy, verifyCallback } from 'passport-google-oauth20'
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';

dotenv.config()


@Injectable()

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {
    super({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACKURL,
      scope: ['email', 'profile']
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: verifyCallback): Promise<any> {
    const user = await this.userModel.findOne({ email: profile.emails?.[0].value })
    if (user) {
      const userDetails = {
        email: user.email,
        username: user.username,
        password: user.password,
        accessToken
      }
      return done(null, userDetails)
    }
    if (!user) {
      const newUser = await this.userModel.create({
        googleId: profile.id,
        username: profile.name?.givenName,
        email: profile.emails?.[0].value,
        password: '',
        accessToken
      });
      if (newUser) {
        return done(null, newUser)
      }
    } else {
      done(null, user)
    }
  }
}