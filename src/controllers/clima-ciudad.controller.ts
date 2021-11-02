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
  Clima,
  Ciudad,
} from '../models';
import {ClimaRepository} from '../repositories';

export class ClimaCiudadController {
  constructor(
    @repository(ClimaRepository) protected climaRepository: ClimaRepository,
  ) { }

  @get('/climas/{id}/ciudads', {
    responses: {
      '200': {
        description: 'Array of Clima has many Ciudad',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ciudad)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Ciudad>,
  ): Promise<Ciudad[]> {
    return this.climaRepository.ciudades(id).find(filter);
  }

  @post('/climas/{id}/ciudads', {
    responses: {
      '200': {
        description: 'Clima model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ciudad)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Clima.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudad, {
            title: 'NewCiudadInClima',
            exclude: ['id'],
            optional: ['climaId']
          }),
        },
      },
    }) ciudad: Omit<Ciudad, 'id'>,
  ): Promise<Ciudad> {
    return this.climaRepository.ciudades(id).create(ciudad);
  }

  @patch('/climas/{id}/ciudads', {
    responses: {
      '200': {
        description: 'Clima.Ciudad PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudad, {partial: true}),
        },
      },
    })
    ciudad: Partial<Ciudad>,
    @param.query.object('where', getWhereSchemaFor(Ciudad)) where?: Where<Ciudad>,
  ): Promise<Count> {
    return this.climaRepository.ciudades(id).patch(ciudad, where);
  }

  @del('/climas/{id}/ciudads', {
    responses: {
      '200': {
        description: 'Clima.Ciudad DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Ciudad)) where?: Where<Ciudad>,
  ): Promise<Count> {
    return this.climaRepository.ciudades(id).delete(where);
  }
}
