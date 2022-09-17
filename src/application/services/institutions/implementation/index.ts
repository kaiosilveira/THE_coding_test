import InstitutionService from '..';
import CovidReportsRepository from '../../../../data-access/repositories/covid';
import InstitutionsRepository from '../../../../data-access/repositories/institutions/implementation';
import CovidReport from '../../../../domain/entities/covid-report';
import Institution from '../../../../domain/entities/institution';

export default class InstitutionServiceImpl implements InstitutionService {
  private readonly institutionsRepository: InstitutionsRepository;
  private readonly covidReportsRepository: CovidReportsRepository;

  constructor({ institutionsRepository, covidReportsRepository }) {
    this.institutionsRepository = institutionsRepository;
    this.covidReportsRepository = covidReportsRepository;
    this.list = this.list.bind(this);
    this.fetchCovidReport = this.fetchCovidReport.bind(this);
  }

  async list(): Promise<Institution[]> {
    return await this.institutionsRepository.list();
  }

  async fetchCovidReport({
    institutionId,
  }: {
    institutionId: string;
  }): Promise<CovidReport | undefined> {
    return await this.covidReportsRepository.fetchByInstitutionId(institutionId);
  }
}
