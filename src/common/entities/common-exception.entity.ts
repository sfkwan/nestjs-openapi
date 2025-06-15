import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';
import { BaseExceptionDto } from './base-exception.dto';

@ApiExtraModels()
export class CommonExceptionDto extends BaseExceptionDto {
  // [key: string]: any;

  @ApiProperty({
    required: false,
    type: [Object],
    description: 'Additional error details or fields',
    example: [
      {
        field: 'details',
        code: 'Field is mandatory',
        message: 'details must be filled in',
      },
      {
        field: 'extraDetails',
        code: 'Field is mandatory',
        message: 'extraDetails must be filled in',
      },
    ],
  })
  errors?: any[];

  @ApiProperty({
    required: false,
    type: Object,
    description: 'Inner error object',
    example: {
      code: 'PasswordTooShort',
      minLength: 6,
    },
  })
  innerError?: any;
}
