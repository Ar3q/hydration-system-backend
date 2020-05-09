import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    console.log('Hello world :)');
    return 'Hello world';
  }
}
