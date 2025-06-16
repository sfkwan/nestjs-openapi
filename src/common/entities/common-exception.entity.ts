import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';
import { BaseExceptionDto } from './base-exception.dto';

class ErrorObject extends BaseExceptionDto {
  @ApiProperty({
    required: false,
    type: [Object],
    description:
      'Additional error details or fields.  This is not strictly required, but can be used to provide more context about the error.',
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
    description:
      'Inner error object.  This is not strictly required, but can provide additional context about the error.',
    example: {
      code: 'PasswordTooShort',
      minLength: 6,
    },
  })
  innerError?: any;
}

@ApiExtraModels()
export class CommonExceptionDto {
  @ApiProperty({
    description: 'Error object containing exception details',
    type: () => ErrorObject,
  })
  error: ErrorObject;
}
