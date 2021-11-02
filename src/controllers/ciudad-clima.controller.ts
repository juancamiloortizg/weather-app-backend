import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Ciudad,
  Clima,
} from '../models';
import {CiudadRepository} from '../repositories';

export class CiudadClimaController {
  constructor(
    @repository(CiudadRepository) protected ciudadRepository: CiudadRepository,
  ) { }

  @get('/ciudads/{id}/clima', {
    responses: {
      '200': {
        description: 'Ciudad has one Clima',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Clima),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Clima>,
  ): Promise<Clima> {
    return this.ciudadRepository.clima(id).get(filter);
  }

  @post('/ciudads/{id}/clima', {
    responses: {
      '200': {
        description: 'Ciudad model instance',
        content: {'application/json': {schema: getModelSchemaRef(Clima)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Ciudad.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Clima, {
            title: 'NewClimaInCiudad',
            exclude: ['id'],
            optional: ['ciudadId']
          }),
        },
      },
    }) clima: Omit<Clima, 'id'>,
  ): Promise<Clima> {
    return this.ciudadRepository.clima(id).create(clima);
  }

  @patch('/ciudads/{id}/clima', {
    responses: {
      '200': {
        description: 'Ciudad.Clima PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Clima, {partial: true}),
        },
      },
    })
    clima: Partial<Clima>,
    @param.query.object('where', getWhereSchemaFor(Clima)) where?: Where<Clima>,
  ): Promise<Count> {
    return this.ciudadRepository.clima(id).patch(clima, where);
  }

  @del('/ciudads/{id}/clima', {
    responses: {
      '200': {
        description: 'Ciudad.Clima DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Clima)) where?: Where<Clima>,
  ): Promise<Count> {
    return this.ciudadRepository.clima(id).delete(where);
  }
}
