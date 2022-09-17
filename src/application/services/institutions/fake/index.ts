import InstitutionService from '..';
import CovidReport from '../../../../domain/entities/covid-report';
import Institution from '../../../../domain/entities/institution';

export default class FakeInstitutionService implements InstitutionService {
  fetchCovidReport(_: { institutionId: string }): Promise<CovidReport | undefined> {
    throw new Error('Method not implemented.');
  }

  list(): Promise<Institution[]> {
    throw new Error('Method not implemented.');
  }
}
