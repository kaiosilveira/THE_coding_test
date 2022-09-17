import SubmissionServiceImpl from '.';
import FakeSubmissionsRepository, {
  DEFAULT_PAYLOAD,
} from '../../../../data-access/repositories/submissions/fake';

describe('SubmissionService', () => {
  describe('fetchByInstitutionId', () => {
    it('should list all submissions for a given institution id', async () => {
      const institutionId = 'institution-id-1';

      const submissionsRepository = new FakeSubmissionsRepository();
      jest.spyOn(submissionsRepository, 'where').mockReturnValue(Promise.resolve(DEFAULT_PAYLOAD));

      const svc = new SubmissionServiceImpl({ submissionsRepository });
      const result = await svc.fetchByInstitutionId(institutionId);

      expect(result).toEqual(DEFAULT_PAYLOAD);
    });
  });
});
