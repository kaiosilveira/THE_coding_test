import SubmissionService from '..';
import SubmissionsRepository from '../../../../data-access/repositories/submissions';
import Submission from '../../../../domain/entities/submission';

export default class SubmissionServiceImpl implements SubmissionService {
  submissionsRepository: SubmissionsRepository;

  constructor({ submissionsRepository }) {
    this.submissionsRepository = submissionsRepository;
    this.fetchByInstitutionId = this.fetchByInstitutionId.bind(this);
  }

  async fetchByInstitutionId(institutionId: string): Promise<Submission[]> {
    const submissions = await this.submissionsRepository.list();
    return submissions.filter(s => s.institutionId === institutionId);
  }
}
