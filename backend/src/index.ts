import { env } from './config';

export function sampleFunction (x: string): string {
  return x + x;
}

console.log(`port env variable:  ${env.PORT}`);

console.log(sampleFunction('something'));
