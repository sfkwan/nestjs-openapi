import { ApiProperty } from '@nestjs/swagger';

export class SingleObjectDto<TData = any> {
  @ApiProperty({ description: 'The main value or entity returned by the API.' })
  value: TData;
}
// This class serves as a base DTO for responses, encapsulating the main value or entity.
