import SubmissionService from '..';
import Submission from '../../../../domain/entities/submission';

export default class FakeSubmissionService implements SubmissionService {
  fetchByInstitutionId(_: string): Promise<Submission[]> {
    throw new Error('Method not implemented.');
  }
}
