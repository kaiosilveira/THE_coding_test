import CovidReportsRepository from '..';
import CovidReport from '../../../../domain/entities/covid-report';

export const DEFAULT_PAYLOAD = [
  {
    institutionId: '8C8A804F-7A43-5840-4296-8A01173212112',
    institutionName: 'Princeton University',
    totalCases: 300,
    cases2021: 139,
  } as CovidReport,
  {
    institutionId: '8C8A804F-7A43-5840-4296-8A01173212254',
    institutionName: 'New York University',
    totalCases: 2389,
    cases2021: 1599,
  } as CovidReport,
];

export default class FakeCovidReportsRepository implements CovidReportsRepository {
  fetchByInstitutionId(_: string): Promise<CovidReport | undefined> {
    throw new Error('Method not implemented.');
  }
}
