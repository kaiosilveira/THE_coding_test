import { Request, Response } from 'express';

import InstitutionsController from '.';
import InstitutionService from '../../../../application/services/institutions';
import Institution from '../../../../domain/entities/institution';
import institution from '../../../../domain/entities/institution';
import FakeExpressResponse from '../../../../_test/fakes/express/response';

class FakeInstitutionService implements InstitutionService {
  list(): Promise<institution[]> {
    throw new Error('Method not implemented.');
  }
}

describe('InstitutionsController', () => {
  describe('fetchInstitutions', () => {
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

      const institutionsService = new FakeInstitutionService();
      jest.spyOn(institutionsService, 'list').mockReturnValue(Promise.resolve(payload));

      const ctrl = new InstitutionsController({ institutionsService });
      const req = {} as unknown as Request;
      const res = new FakeExpressResponse() as unknown as Response;
      const spyOnJson = jest.spyOn(res, 'json');

      await ctrl.fetchInstitutions(req, res);

      expect(spyOnJson).toHaveBeenCalledWith(payload);
    });

    it('should handle institutions service unexpected errors', async () => {
      const institutionsService = new FakeInstitutionService();
      jest.spyOn(institutionsService, 'list').mockImplementation(() => {
        throw new Error('Unexpected service error');
      });

      const ctrl = new InstitutionsController({ institutionsService });
      const req = {} as unknown as Request;
      const res = new FakeExpressResponse() as unknown as Response;
      const spyOnStatus = jest.spyOn(res, 'status');
      const spyOnJson = jest.spyOn(res, 'json');

      await ctrl.fetchInstitutions(req, res);

      expect(spyOnStatus).toHaveBeenCalledWith(500);
      expect(spyOnJson).toHaveBeenCalledWith({ msg: 'Internal server error' });
    });
  });
});
