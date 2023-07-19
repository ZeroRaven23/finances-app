import { Controller, Get, Put, Headers } from '@nestjs/common';
import { AuthService } from '../../services/auth/authService';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StringResDTO } from 'src/dto/response/response-dto';

@ApiTags('Authentication')
@Controller('/auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}
  @ApiOkResponse({ type: [StringResDTO] })
  @ApiOperation({
    summary: 'Login user by e-mail',
  })
  @Get('')
  async getAuth(@Headers() input: any) {
    return await this.service.getUserAuth(input);
  }
  @ApiOkResponse({ type: [StringResDTO] })
  @ApiOperation({
    summary: 'Login user by e-mail',
  })
  @Put('/token/password')
  async putPassword(@Headers() input: any) {
    return await this.service.changePassword(input);
  }
}
