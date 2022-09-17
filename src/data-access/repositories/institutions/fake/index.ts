import InstitutionsRepository from '..';
import Institution from '../../../../domain/entities/institution';
import institution from '../../../../domain/entities/institution';

export const DEFAULT_PAYLOAD = [
  {
    name: 'Harvard University',
    address: 'P.O. Box 114, 6922 Volutpat. Ave',
    country: 'United States',
    region: 'Middlesex, Cambridge, Massachusetts',
    id: 'EA8BBED7-4106-94AF-48DD-A1414E386AFB',
  } as Institution,
];

export default class FakeInstitutionsRepository implements InstitutionsRepository {
  list(): Promise<institution[]> {
    throw new Error('Method not implemented.');
  }

  where(filterFn: (i: institution) => boolean): Promise<institution[]> {
    throw new Error('Method not implemented.');
  }
}
