import { ApiProperty } from '@nestjs/swagger';
import { CreateProjectDto } from '../dto/create-cat.dto';

export class ProjectEntity extends CreateProjectDto {
  @ApiProperty({
    type: Date,
    description: 'The date when the project was created',
  })
  createdDateTime: Date;

  @ApiProperty({
    type: Date,
    description: 'The date when the project was last updated',
  })
  lastModifiedDateTime: Date;
}
