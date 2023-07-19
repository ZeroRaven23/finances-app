import { Controller, Put, Headers } from '@nestjs/common';
import { TokenService } from '../../services/token/token';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StringResDTO } from 'src/dto/response/response-dto';

@ApiTags('Token')
@Controller('/token')
export class TokenController {
  constructor(private service: TokenService) {}
  @ApiOkResponse({ type: [StringResDTO] })
  @ApiOperation({
    summary: 'Login user by e-mail',
  })
  @Put('')
  putToken(@Headers() input: any) {
    return this.service.newSendToken(input);
  }
}
