import { Request, Response } from 'express';

import InstitutionsController from '.';
import FakeInstitutionService from '../../../../application/services/institutions/fake';
import CovidReport from '../../../../domain/entities/covid-report';
import Institution from '../../../../domain/entities/institution';
import FakeExpressRequest from '../../../../_test/fakes/express/request';
import FakeExpressResponse from '../../../../_test/fakes/express/response';

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

  describe('fetchCovidReportByInstitutionId', () => {
    const institutionId = 'institution-id-1';

    it('should return 400 BAD REQUEST if institution id is undefined', async () => {
      const req = { params: { institutionId: 'undefined' } } as unknown as Request;
      const res = new FakeExpressResponse() as unknown as Response;
      const spyOnStatus = jest.spyOn(res, 'status');
      const spyOnJson = jest.spyOn(res, 'json');

      const institutionsService = new FakeInstitutionService();
      const ctrl = new InstitutionsController({ institutionsService });
      await ctrl.fetchCovidReportByInstitutionId(req, res);

      expect(spyOnStatus).toHaveBeenCalledWith(400);
      expect(spyOnJson).toHaveBeenCalledWith({
        msg: 'Invalid institution identifier',
      });
    });

    it('should return 400 BAD REQUEST if institution is does not exist in the database', async () => {
      const req = { params: { institutionId: 'inexistent-institution-id' } } as unknown as Request;
      const res = new FakeExpressResponse() as unknown as Response;
      const spyOnStatus = jest.spyOn(res, 'status');
      const spyOnJson = jest.spyOn(res, 'json');

      const institutionsService = new FakeInstitutionService();
      jest.spyOn(institutionsService, 'exists').mockReturnValue(Promise.resolve(false));

      const ctrl = new InstitutionsController({ institutionsService });
      await ctrl.fetchCovidReportByInstitutionId(req, res);

      expect(spyOnStatus).toHaveBeenCalledWith(400);
      expect(spyOnJson).toHaveBeenCalledWith({
        msg: 'Institution not found',
      });
    });

    it('should fetch the covid report for a given institution identifier', async () => {
      const covidReport = {
        institutionId,
        institutionName: 'Universidade Federal do ABC',
        totalCases: 200,
        cases2021: 100,
      } as CovidReport;

      const institutionsService = new FakeInstitutionService();
      jest.spyOn(institutionsService, 'exists').mockReturnValue(Promise.resolve(true));
      jest
        .spyOn(institutionsService, 'fetchCovidReport')
        .mockReturnValue(Promise.resolve(covidReport));

      const req = new FakeExpressRequest({ params: { institutionId } }) as unknown as Request;
      const res = { json: jest.fn() } as unknown as Response;

      const ctrl = new InstitutionsController({ institutionsService });
      await ctrl.fetchCovidReportByInstitutionId(req, res);

      expect(res.json).toHaveBeenCalledWith(covidReport);
    });
  });
});
