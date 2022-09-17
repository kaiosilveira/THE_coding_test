import { Request, Response } from 'express';

import SubmissionsController from '.';
import FakeSubmissionService from '../../../../application/services/submissions/fake';
import FakeExpressResponse from '../../../../_test/fakes/express/response';

describe('SubmissionsController', () => {
  describe('listByInstitutionId', () => {
    const institutionId = 'institution-id-1';

    it('should list all submissions for a given institution id', async () => {
      const payload = [
        {
          institutionId,
          id: 'id',
          year: 2022,
          studentsTotal: 100,
          undergraduatesTotal: 50,
          postgraduatesTotal: 50,
          staffTotal: 15,
          academicPapers: 300,
          institutionIncome: 300000,
          subjects: [],
        },
      ];

      const submissionService = new FakeSubmissionService();
      jest
        .spyOn(submissionService, 'fetchByInstitutionId')
        .mockReturnValue(Promise.resolve(payload));

      const req = { params: { institutionId } } as unknown as Request;
      const res = { json: jest.fn() } as unknown as Response;

      const ctrl = new SubmissionsController({ submissionService });
      await ctrl.listByInstitutionId(req, res);

      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(payload);
    });

    it('should handle submissions service unexpected errors', async () => {
      const submissionService = new FakeSubmissionService();
      jest.spyOn(submissionService, 'fetchByInstitutionId').mockImplementation(() => {
        throw new Error('Unexpected service error');
      });

      const req = { params: { institutionId } } as unknown as Request;
      const res = new FakeExpressResponse() as unknown as Response;
      const spyOnStatus = jest.spyOn(res, 'status');
      const spyOnJson = jest.spyOn(res, 'json');

      const ctrl = new SubmissionsController({ submissionService });
      await ctrl.listByInstitutionId(req, res);

      expect(spyOnStatus).toHaveBeenCalledWith(500);
      expect(spyOnJson).toHaveBeenCalledWith({ msg: 'Internal server error' });
    });
  });
});
