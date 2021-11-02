import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Ciudad, CiudadRelations, Clima} from '../models';
import {ClimaRepository} from './clima.repository';

export class CiudadRepository extends DefaultCrudRepository<
  Ciudad,
  typeof Ciudad.prototype.id,
  CiudadRelations
> {

  public readonly clima: HasOneRepositoryFactory<Clima, typeof Ciudad.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClimaRepository') protected climaRepositoryGetter: Getter<ClimaRepository>,
  ) {
    super(Ciudad, dataSource);
    this.clima = this.createHasOneRepositoryFactoryFor('clima', climaRepositoryGetter);
    this.registerInclusionResolver('clima', this.clima.inclusionResolver);
  }
}
