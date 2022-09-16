import InstitutionService from '..';
import InstitutionsRepository from '../../../../data-access/repositories/institutions/implementation';
import Institution from '../../../../domain/entities/institution';

export default class InstitutionServiceImpl implements InstitutionService {
  institutionsRepository: InstitutionsRepository;

  constructor({ institutionsRepository }) {
    this.institutionsRepository = institutionsRepository;
    this.list = this.list.bind(this);
  }

  async list(): Promise<Institution[]> {
    return await this.institutionsRepository.list();
  }
}
