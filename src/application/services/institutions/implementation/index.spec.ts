import InstitutionServiceImpl from '.';
import FakeInstitutionsRepository from '../../../../data-access/repositories/institutions/fake';
import Institution from '../../../../domain/entities/institution';

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

      const svc = new InstitutionServiceImpl({ institutionsRepository });
      const result = await svc.list();

      expect(result).toEqual(payload);
    });
  });
});
