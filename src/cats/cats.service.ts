import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-cat.dto';
import { UpdateProjectDto } from './dto/update-cat.dto';
import { ProjectEntity } from './entities/project.entity';
import { PaginatedDto } from './dto/paginated.dto';
import { PaginationQueryDto } from '../dto/pagination-query.dto';
import { SingleObjectDto } from './dto/singleObject.dto';

@Injectable()
export class CatsService {
  create(
    createCatDto: CreateProjectDto,
  ): Promise<SingleObjectDto<ProjectEntity>> {
    return Promise.resolve({
      value: {
        ...createCatDto,
        createdDateTime: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        lastModifiedDateTime: new Date(),
      },
    });
  }

  findAll(query: PaginationQueryDto): Promise<PaginatedDto<ProjectEntity>> {
    const sampleCats: ProjectEntity[] = [
      {
        name: 'Kitty',
        age: 2,
        breed: 'Persian',
        nicknames: ['Kit', 'Catster'],
        projectStatus: 'Draft',
        createdDateTime: query.startDate
          ? new Date(query.startDate)
          : new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        lastModifiedDateTime: query.endDate
          ? new Date(query.endDate)
          : new Date(),
      },
      {
        name: 'Peter',
        age: 10,
        breed: 'Siamese',
        nicknames: ['Tommy'],
        projectStatus: 'Submitted',
        createdDateTime: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        lastModifiedDateTime: new Date(Date.now()),
      },
    ];

    let paginated: PaginatedDto<ProjectEntity> = {
      offset: 1,
      limit: 10,
      value: sampleCats,
    };
    console.log('query', query);

    if (query.count === true /* || query.$count === true */) {
      paginated = {
        total: sampleCats.length,
        ...paginated,
      };
    }
    return Promise.resolve(paginated);
  }

  findOne(id: number) {
    return `This action returns a #${id} cat`;
  }

  update(id: number, updateCatDto: UpdateProjectDto) {
    throw new Error('Update exeception happended');

    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    if (id > 10) {
      throw new UnprocessableEntityException({
        code: 'ID_TOO_LARGE_111',
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
      });
    }
    return `This action removes a #${id} project`;
  }
}
