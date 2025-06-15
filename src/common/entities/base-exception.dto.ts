import { ApiProperty } from '@nestjs/swagger';

export class BaseExceptionDto {
  @ApiProperty({ example: 'INTERNAL_ERROR', description: 'Error code' })
  code: string;

  @ApiProperty({
    example: 'Something went wrong',
    description: 'Error message',
  })
  message: string;
}
