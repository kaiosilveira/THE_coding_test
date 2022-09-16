import { Request, Response } from 'express';
import InstitutionService from '../../../../application/services/institutions';

export type InstitutionsControllerProps = { institutionsService: InstitutionService };

export default class InstitutionsController {
  institutionsService: InstitutionService;

  constructor({ institutionsService }: InstitutionsControllerProps) {
    this.institutionsService = institutionsService;
    this.fetchInstitutions = this.fetchInstitutions.bind(this);
  }

  async fetchInstitutions(_: Request, res: Response) {
    const result = await this.institutionsService.list();
    return res.json(result);
  }
}
