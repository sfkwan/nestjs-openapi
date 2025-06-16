import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateProjectDto } from './dto/create-cat.dto';
import { UpdateProjectDto } from './dto/update-cat.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ProjectEntity } from './entities/project.entity';
import { PaginatedDto } from './dto/paginated.dto';
import { PaginationQueryDto } from '../dto/pagination-query.dto';
import { CommonExceptionDto } from '../common/entities/common-exception.entity';
import { BaseDto } from './dto/base.dto';

@Controller('projects')
@ApiTags('projects')
@ApiExtraModels(PaginatedDto, BaseDto, ProjectEntity)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    schema: {
      allOf: [
        { $ref: getSchemaPath(BaseDto) },
        {
          properties: {
            value: { $ref: getSchemaPath(ProjectEntity) },
          },
        },
      ],
    },
  })
  async create(
    @Body() createCatDto: CreateProjectDto,
  ): Promise<BaseDto<ProjectEntity>> {
    return this.catsService.create(createCatDto);
  }

  @Get()
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(PaginatedDto) },
        {
          properties: {
            value: {
              type: 'array',
              items: { $ref: getSchemaPath(ProjectEntity) },
            },
          },
        },
      ],
    },
  })
  findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<PaginatedDto<ProjectEntity>> {
    return this.catsService.findAll(query);
  }

  @Get(':projectId')
  findOne(@Param('projectId') id: string) {
    return this.catsService.findOne(+id);
  }

  @Patch(':projectId')
  update(
    @Param('projectId') id: string,
    @Body() updateCatDto: UpdateProjectDto,
  ) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':projectId/restart')
  @ApiUnprocessableEntityResponse({
    description: 'The provided id must not be greater than 10.',
    type: CommonExceptionDto,
    schema: {
      example: {
        code: 'ID_TOO_LARGE',
        message: 'The provided id must not be greater than 10.',
        innererror: {
          code: 'PasswordTooShort',
          minLength: 6,
        },
        errors: [
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
      },
    },
  })
  remove(@Param('projectId') id: string) {
    return this.catsService.remove(+id);
  }
}
