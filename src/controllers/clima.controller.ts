import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Clima} from '../models';
import {ClimaRepository} from '../repositories';

export class ClimaController {
  constructor(
    @repository(ClimaRepository)
    public climaRepository : ClimaRepository,
  ) {}

  @post('/climas')
  @response(200, {
    description: 'Clima model instance',
    content: {'application/json': {schema: getModelSchemaRef(Clima)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Clima, {
            title: 'NewClima',
            exclude: ['id'],
          }),
        },
      },
    })
    clima: Omit<Clima, 'id'>,
  ): Promise<Clima> {
    return this.climaRepository.create(clima);
  }

  @get('/climas/count')
  @response(200, {
    description: 'Clima model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Clima) where?: Where<Clima>,
  ): Promise<Count> {
    return this.climaRepository.count(where);
  }

  @get('/climas')
  @response(200, {
    description: 'Array of Clima model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Clima, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Clima) filter?: Filter<Clima>,
  ): Promise<Clima[]> {
    return this.climaRepository.find(filter);
  }

  @patch('/climas')
  @response(200, {
    description: 'Clima PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Clima, {partial: true}),
        },
      },
    })
    clima: Clima,
    @param.where(Clima) where?: Where<Clima>,
  ): Promise<Count> {
    return this.climaRepository.updateAll(clima, where);
  }

  @get('/climas/{id}')
  @response(200, {
    description: 'Clima model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Clima, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Clima, {exclude: 'where'}) filter?: FilterExcludingWhere<Clima>
  ): Promise<Clima> {
    return this.climaRepository.findById(id, filter);
  }

  @patch('/climas/{id}')
  @response(204, {
    description: 'Clima PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Clima, {partial: true}),
        },
      },
    })
    clima: Clima,
  ): Promise<void> {
    await this.climaRepository.updateById(id, clima);
  }

  @put('/climas/{id}')
  @response(204, {
    description: 'Clima PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() clima: Clima,
  ): Promise<void> {
    await this.climaRepository.replaceById(id, clima);
  }

  @del('/climas/{id}')
  @response(204, {
    description: 'Clima DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.climaRepository.deleteById(id);
  }
}
