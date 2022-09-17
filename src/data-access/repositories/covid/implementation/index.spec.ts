import CovidReportsRepositoryImpl from '.';

describe('CovidReportsRepository', () => {
  describe('fetchByInstitutionId', () => {
    it('should list all covid reports for a given institution id', async () => {
      const institutionId = '8C8A804F-7A43-5840-4296-8A01173212112';
      const rawData = [
        {
          date: '2021-05-26',
          state: 'New Jersey',
          county: 'Mercer',
          city: 'Princeton',
          collegeId: '8C8A804F-7A43-5840-4296-8A01173212112',
          collegeName: 'Princeton University',
          cases: '300',
          cases2021: '139',
        },
        {
          date: '2021-05-26',
          state: 'New York',
          county: 'New York City',
          city: 'New York City',
          collegeId: '8C8A804F-7A43-5840-4296-8A01173212254',
          collegeName: 'New York University',
          cases: '2389',
          cases2021: '1599',
        },
      ];

      const repo = new CovidReportsRepositoryImpl({ rawData });
      const result = await repo.fetchByInstitutionId(institutionId);
      expect(result?.institutionId).toEqual(institutionId);
    });
  });
});
