import InstitutionServiceImpl from '.';
import Institution from '../../../../domain/entities/institution';
import FakeInstitutionsRepository, {
  DEFAULT_PAYLOAD as DEFAULT_INSTITUTION_LIST_PAYLOAD,
} from '../../../../data-access/repositories/institutions/fake';
import FakeCovidReportsRepository, {
  DEFAULT_PAYLOAD as DEFAULT_COVID_REPORT_PAYLOAD,
} from '../../../../data-access/repositories/covid/fake';

describe('InstitutionService', () => {
  describe('list', () => {
    it('should list all institutions', async () => {
      const payload = [
        {
          name: 'Harvard University',
          address: 'P.O. Box 114, 6922 Volutpat. Ave',
          country: 'United States',
          region: 'Middlesex, Cambridge, Massachusetts',
          id: 'EA8BBED7-4106-94AF-48DD-A1414E386AFB',
        } as Institution,
      ];

      const institutionsRepository = new FakeInstitutionsRepository();
      jest.spyOn(institutionsRepository, 'list').mockReturnValue(Promise.resolve(payload));

      const svc = new InstitutionServiceImpl({
        institutionsRepository,
        covidReportsRepository: new FakeCovidReportsRepository(),
      });
      const result = await svc.list();

      expect(result).toEqual(payload);
    });
  });

  describe('fetchCovidReport', () => {
    it('should fetch the covid report for a given institution identifier', async () => {
      const institutionId = 'institution-id-1';
      const report = DEFAULT_COVID_REPORT_PAYLOAD[0];
      const covidReportsRepository = new FakeCovidReportsRepository();
      jest
        .spyOn(covidReportsRepository, 'fetchByInstitutionId')
        .mockReturnValue(Promise.resolve(report));

      const svc = new InstitutionServiceImpl({
        covidReportsRepository,
        institutionsRepository: new FakeInstitutionsRepository(),
      });

      const result = await svc.fetchCovidReport({ institutionId });

      expect(result).toEqual(report);
    });
  });

  describe('exists', () => {
    it('should return true if the given institution identifier exists in the list of institutions', async () => {
      const institutionId = DEFAULT_INSTITUTION_LIST_PAYLOAD[0].id;
      const institutionsRepository = new FakeInstitutionsRepository();
      jest
        .spyOn(institutionsRepository, 'list')
        .mockReturnValue(Promise.resolve(DEFAULT_INSTITUTION_LIST_PAYLOAD));

      const svc = new InstitutionServiceImpl({
        institutionsRepository,
        covidReportsRepository: new FakeCovidReportsRepository(),
      });

      const exists = await svc.exists({ institutionId });
      expect(exists).toEqual(true);
    });

    it('should return false if the institution is not present in the list of institutions', async () => {
      const institutionId = 'inexistent-institution-id';
      const institutionsRepository = new FakeInstitutionsRepository();
      jest
        .spyOn(institutionsRepository, 'list')
        .mockReturnValue(Promise.resolve(DEFAULT_INSTITUTION_LIST_PAYLOAD));

      const svc = new InstitutionServiceImpl({
        institutionsRepository,
        covidReportsRepository: new FakeCovidReportsRepository(),
      });

      const exists = await svc.exists({ institutionId });
      expect(exists).toEqual(false);
    });
  });
});
