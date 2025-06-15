import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

@ApiSchema({ description: 'Description of the CreateProjectDto schema' })
export class CreateProjectDto {
  @ApiProperty({ description: 'Project status', example: 'In Progress' })
  @IsString()
  projectStatus: string;

  @ApiProperty({ description: 'Project name', example: 'Kitty' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The age of the Project',
    example: 2,
    minimum: 1,
    default: 1,
  })
  @IsNumber()
  age: number;

  @ApiProperty({ description: 'The breed of the Project', example: 'Persian' })
  @IsString()
  breed: string;

  @ApiProperty({
    description: 'Nicknames for the Project',
    example: ['Kit', 'Catster'],
    type: [String],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  nicknames: string[];
}
