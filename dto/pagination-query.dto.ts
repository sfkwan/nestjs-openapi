import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsInt, Min, IsArray, IsString } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;

  @ApiProperty({
    description: 'Order by fields, e.g. ["name:asc", "age:desc"]',
    isArray: true,
    example: ['name:asc', 'age:desc'],
    required: false,
    type: String,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  orderBy?: string[];
}
