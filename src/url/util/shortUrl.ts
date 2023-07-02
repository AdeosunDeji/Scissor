import { randomInt } from 'crypto';

export function generateRandomId(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomId = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = randomInt(0, characters.length);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
}