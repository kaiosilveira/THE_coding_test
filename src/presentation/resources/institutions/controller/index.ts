import { Request, Response } from 'express';
import InstitutionService from '../../../../application/services/institutions';

export type InstitutionsControllerProps = { institutionsService: InstitutionService };

export default class InstitutionsController {
  private readonly institutionsService: InstitutionService;

  constructor({ institutionsService }: InstitutionsControllerProps) {
    this.institutionsService = institutionsService;
    this.fetchInstitutions = this.fetchInstitutions.bind(this);
  }

  async fetchInstitutions(_: Request, res: Response) {
    try {
      const result = await this.institutionsService.list();
      return res.json(result);
    } catch (ex) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  }
}
