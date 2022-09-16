import Institution from '../../../domain/entities/institution';

export default interface InstitutionService {
  list(): Promise<Institution[]>;
}
