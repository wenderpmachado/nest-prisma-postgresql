import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

import { version } from '../package.json';

@ApiTags('health-check')
@Controller()
export class AppController {
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns the API Version, if everything is ok',
  })
  getHello(): string {
    return `API Version: ${version}`;
  }
}
