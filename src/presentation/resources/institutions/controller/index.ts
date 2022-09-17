import { Request, Response } from 'express';
import InstitutionService from '../../../../application/services/institutions';

export type InstitutionsControllerProps = { institutionsService: InstitutionService };

export default class InstitutionsController {
  private readonly institutionsService: InstitutionService;

  constructor({ institutionsService }: InstitutionsControllerProps) {
    this.institutionsService = institutionsService;
    this.fetchInstitutions = this.fetchInstitutions.bind(this);
    this.fetchCovidReportByInstitutionId = this.fetchCovidReportByInstitutionId.bind(this);
  }

  async fetchInstitutions(_: Request, res: Response) {
    try {
      const result = await this.institutionsService.list();
      return res.json(result);
    } catch (ex) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  }

  async fetchCovidReportByInstitutionId(req: Request, res: Response) {
    const institutionId = req.params.institutionId;
    if (institutionId === 'undefined') {
      return res.status(400).json({ msg: 'Invalid institution identifier' });
    }

    const institutionExists = await this.institutionsService.exists({ institutionId });
    if (!institutionExists) {
      return res.status(400).json({ msg: 'Institution not found' });
    }

    const report = await this.institutionsService.fetchCovidReport({ institutionId });
    return res.json(report);
  }
}
