import { ApiProperty } from '@nestjs/swagger';

export class PaginatedDto<TData> {
  @ApiProperty({
    type: 'integer',
    example: 100,
    minimum: 0,
    description: 'Total number of items available',
  })
  total?: number;

  @ApiProperty({
    type: 'integer',
    example: 10,
    minimum: 1,
    maximum: 100,
    description: 'Number of items per page',
  })
  limit: number;

  @ApiProperty({
    type: 'integer',
    example: 0,
    minimum: 0,
    maximum: 100,
    description: 'Offset for pagination, starting from 0',
  })
  offset: number;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'generic',
      description: 'Array of items',
    },
  })
  value: TData[];
}
