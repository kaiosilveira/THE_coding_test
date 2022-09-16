import InstitutionsRepository from '.';
import Institution from '../../../../domain/entities/institution';

describe('InstitutionsRepository', () => {
  describe('list', () => {
    it('should return a list of all institutions', async () => {
      const rawItem = {
        name: 'Massachusetts Institute of Technology',
        address: '380-7690 Sem Rd.',
        country: 'United States',
        region: 'Middlesex, Cambridge, Massachusetts',
        id: 'DEA4606B-4A21-D497-40E9-A5FB7589B536',
      };

      const repo = new InstitutionsRepository({ rawData: [rawItem] });
      const result = await repo.list();

      expect(result).toHaveLength(1);
      const item = result[0];

      expect(item.name).toEqual(rawItem.name);
      expect(item.address).toEqual(rawItem.address);
      expect(item.country).toEqual(rawItem.country);
      expect(item.region).toEqual(rawItem.region);
      expect(item.id).toEqual(rawItem.id);
    });
  });

  describe('where', () => {
    it('should list all items matching a given criteria', async () => {
      const rawData = [
        {
          name: 'Harvard University',
          address: 'P.O. Box 114, 6922 Volutpat. Ave',
          country: 'United States',
          region: 'Middlesex, Cambridge, Massachusetts',
          id: 'EA8BBED7-4106-94AF-48DD-A1414E386AFB',
        },
        {
          name: 'Massachusetts Institute of Technology',
          address: '380-7690 Sem Rd.',
          country: 'United States',
          region: 'Middlesex, Cambridge, Massachusetts',
          id: 'DEA4606B-4A21-D497-40E9-A5FB7589B535',
        },
        {
          name: 'Universidade Federal do ABC',
          address: 'Avenida dos Estados',
          country: 'Brazil',
          region: 'Santo André, ABC, São Paulo',
          id: 'DEA4606B-4A21-D497-40E9-A5FB7589B533',
        },
      ];

      const repo = new InstitutionsRepository({ rawData });
      const result = await repo.where((i: Institution) => i.country === 'Brazil');

      expect(result).toHaveLength(1);

      const firstItem = result[0];
      expect(firstItem.name).toEqual('Universidade Federal do ABC');
    });
  });
});
