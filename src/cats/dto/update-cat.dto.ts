import { PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from './create-cat.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
