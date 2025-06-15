import {
  IsOptional,
  IsInt,
  Min,
  Max,
  IsString,
  IsArray,
  IsDateString,
  IsBoolean,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DateSortFilterDto {
  @ApiPropertyOptional({
    description: 'Start date filter (ISO 8601)',
    example: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  })
  @IsOptional()
  @IsDateString()
  $startDate?: string;

  @ApiPropertyOptional({
    description: 'End date filter (ISO 8601)',
    example: new Date().toISOString(),
  })
  @IsOptional()
  @IsDateString()
  $endDate?: string;
}

export class PaginationQueryDto extends DateSortFilterDto {
  @ApiPropertyOptional({
    description: 'Filtered by project status',
    example: 'Draft',
    default: 'Draft',
    enum: ['Draft', 'Submitted', 'Ready for IT Supplement'],
    enumName: 'ProjectStatus',
    required: false,
    type: String,
  })
  @IsString()
  $projectStatus: string;

  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional({
    type: [String],
    description: 'Order by fields, e.g. [updatedDateTime desc, name asc]',
    example: ['updatedDateTime desc', 'name asc'],
    required: false,
    default: ['updatedDateTime:desc'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  $orderBy?: string[];

  @ApiProperty({
    description: 'Filters in JSON format',
    example: {
      userType: { ne: 'guest' },
      age: { gt: 25 },
      status: { eq: 'active' },
    },
  })
  filter: Record<string, any>; // Parsed as a JSON object

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(500)
  @ApiPropertyOptional({
    description:
      'The number of items to skip before starting to collect the result ',
    example: 0,
    minimum: 0,
    maximum: 500,
    default: 0,
  })
  $offset?: number = 0;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Max(50)
  @Min(1)
  @ApiPropertyOptional({
    description: 'The numbers of items to return',
    example: 1,
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  $limit?: number = 10;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value === 'true' || value === '1';
    }
    return Boolean(value);
  })
  @IsBoolean()
  @ApiPropertyOptional({
    description: 'If true, return total count of items',
    example: true,
    default: false,
  })
  $count?: boolean = false;
}
