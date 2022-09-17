import InstitutionsRepository from '..';
import institution from '../../../../domain/entities/institution';

export default class FakeInstitutionsRepository implements InstitutionsRepository {
  list(): Promise<institution[]> {
    throw new Error('Method not implemented.');
  }

  where(filterFn: (i: institution) => boolean): Promise<institution[]> {
    throw new Error('Method not implemented.');
  }
}
