import InstitutionService from '..';
import Institution from '../../../../domain/entities/institution';

export default class FakeInstitutionService implements InstitutionService {
  list(): Promise<Institution[]> {
    throw new Error('Method not implemented.');
  }
}
