import {Entity, model, property, hasMany} from '@loopback/repository';
import {Ciudad} from './ciudad.model';

@model()
export class Clima extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  estado_clima: string;

  @property({
    type: 'number',
    required: true,
  })
  temperatura: number;

  @property({
    type: 'number',
    required: true,
  })
  probabilidad_lluvia: number;

  @property({
    type: 'string',
    required: true,
  })
  recomendaciones: string;

  @property({
    type: 'string',
  })
  ciudadId?: string;

  @hasMany(() => Ciudad)
  ciudades: Ciudad[];

  constructor(data?: Partial<Clima>) {
    super(data);
  }
}

export interface ClimaRelations {
  // describe navigational properties here
}

export type ClimaWithRelations = Clima & ClimaRelations;
