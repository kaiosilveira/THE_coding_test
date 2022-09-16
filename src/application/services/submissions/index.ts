import Submission from '../../../domain/entities/submission';

export default interface SubmissionService {
  fetchByInstitutionId(institutionId: string): Promise<Submission[]>;
}
