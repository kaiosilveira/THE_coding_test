import CovidReport from '../../../domain/entities/covid-report';
import Institution from '../../../domain/entities/institution';

export default interface InstitutionService {
  list(): Promise<Institution[]>;
  exists(props: { institutionId: string }): Promise<boolean>;
  fetchCovidReport(props: { institutionId: string }): Promise<CovidReport | undefined>;
}
