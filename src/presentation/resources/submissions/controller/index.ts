import { Request, Response } from 'express';
import SubmissionService from '../../../../application/services/submissions';

export default class SubmissionsController {
  private readonly submissionService: SubmissionService;

  constructor({ submissionService }) {
    this.submissionService = submissionService;
    this.listByInstitutionId = this.listByInstitutionId.bind(this);
  }

  async listByInstitutionId(req: Request, res: Response) {
    try {
      const result = await this.submissionService.fetchByInstitutionId(req.params.institutionId);
      return res.json(result);
    } catch (ex) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  }
}
