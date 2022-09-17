import CovidReport from '../../../domain/entities/covid-report';

export default interface CovidReportsRepository {
  fetchByInstitutionId(institutionId: string): Promise<CovidReport | undefined>;
}
