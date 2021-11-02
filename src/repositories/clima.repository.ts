import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Clima, ClimaRelations, Ciudad} from '../models';
import {CiudadRepository} from './ciudad.repository';

export class ClimaRepository extends DefaultCrudRepository<
  Clima,
  typeof Clima.prototype.id,
  ClimaRelations
> {

  public readonly ciudades: HasManyRepositoryFactory<Ciudad, typeof Clima.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>,
  ) {
    super(Clima, dataSource);
    this.ciudades = this.createHasManyRepositoryFactoryFor('ciudades', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudades', this.ciudades.inclusionResolver);
  }
}
