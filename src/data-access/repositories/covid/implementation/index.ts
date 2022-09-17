import CovidReportsRepository from '..';
import CovidReport, { CovidReportImpl } from '../../../../domain/entities/covid-report';

export default class CovidReportsRepositoryImpl implements CovidReportsRepository {
  private readonly _data: Array<CovidReport>;

  constructor({ rawData }) {
    this._data = rawData.map(
      cr =>
        new CovidReportImpl({
          institutionId: cr.collegeId,
          institutionName: cr.collegeName,
          totalCases: Number(cr.cases),
          cases2021: Number(cr.cases2021),
        })
    );
  }

  async fetchByInstitutionId(institutionId: string): Promise<CovidReport | undefined> {
    return Promise.resolve(this._data.find(cr => cr.institutionId === institutionId));
  }
}
