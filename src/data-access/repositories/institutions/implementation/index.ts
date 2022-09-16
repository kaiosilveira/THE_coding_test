import Institution, { InstitutionImpl } from '../../../../domain/entities/institution';
import Repository from '../../_abstract';

export default class InstitutionsRepositoryImpl implements Repository<Institution> {
  _data: Array<Institution>;

  constructor({ rawData }) {
    this._data = rawData.map(i => new InstitutionImpl(i));
  }

  list(): Promise<Institution[]> {
    return Promise.resolve(this._data);
  }

  async where(filterFn: (Institution) => boolean): Promise<Institution[]> {
    const allItems = await this.list();
    return allItems.filter(filterFn);
  }
}
