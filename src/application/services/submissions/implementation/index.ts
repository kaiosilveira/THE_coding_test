import SubmissionService from '..';
import SubmissionsRepository from '../../../../data-access/repositories/submissions';
import Submission from '../../../../domain/entities/submission';

export type SubmissionServiceProps = { submissionsRepository: SubmissionsRepository };
export default class SubmissionServiceImpl implements SubmissionService {
  private readonly submissionsRepository: SubmissionsRepository;

  constructor({ submissionsRepository }: SubmissionServiceProps) {
    this.submissionsRepository = submissionsRepository;
    this.fetchByInstitutionId = this.fetchByInstitutionId.bind(this);
  }

  async fetchByInstitutionId(institutionId: string): Promise<Submission[]> {
    return await this.submissionsRepository.where(s => s.institutionId === institutionId);
  }
}
