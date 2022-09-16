import SubmissionsRepositoryImpl from '.';
import Submission from '../../../../domain/entities/submission';

describe('SubmissionsRepositoryImpl', () => {
  describe('list', () => {
    it('should map all submissions on construction time and then return it', async () => {
      const rawItem = {
        id: '3A5EBCAC-3455-F4E5-C978-4A1CC1AA1D80',
        institution_id: 'DEA4606B-4A21-D497-40E9-A5FB7589B536',
        year: 2017,
        students_total: 7994,
        undergraduates_total: 7212,
        postgraduates_total: 782,
        staff_total: 158,
        academic_papers: 6852,
        institution_income: 87167524,
        subjects: [
          {
            name: 'Maths',
            academic_papers: 6852,
            students_total: 7994,
            student_rating: 4.4,
          },
        ],
      };
      const rawData = [rawItem];

      const repo = new SubmissionsRepositoryImpl({ rawData });
      const result = await repo.list();

      expect(result).toHaveLength(1);

      const firstItem = result[0];
      expect(firstItem.id).toEqual(rawItem.id);
      expect(firstItem.institutionId).toEqual(rawItem.institution_id);
      expect(firstItem.year).toEqual(rawItem.year);
      expect(firstItem.studentsTotal).toEqual(rawItem.students_total);
      expect(firstItem.undergraduatesTotal).toEqual(rawItem.undergraduates_total);
      expect(firstItem.postgraduatesTotal).toEqual(rawItem.postgraduates_total);
      expect(firstItem.staffTotal).toEqual(rawItem.staff_total);
      expect(firstItem.academicPapers).toEqual(rawItem.academic_papers);
      expect(firstItem.institutionIncome).toEqual(rawItem.institution_income);

      expect(firstItem.subjects).toHaveLength(1);

      const firstSubject = firstItem.subjects[0];
      expect(firstSubject.name).toEqual(rawItem.subjects[0].name);
      expect(firstSubject.academicPapers).toEqual(rawItem.subjects[0].academic_papers);
      expect(firstSubject.studentsTotal).toEqual(rawItem.subjects[0].students_total);
      expect(firstSubject.studentRating).toEqual(rawItem.subjects[0].student_rating);
    });
  });

  describe('where', () => {
    it('should return all items matching a given criteria', async () => {
      const rawData = [
        {
          id: '3A5EBCAC-3455-F4E5-C978-4A1CC1AA1D80',
          institution_id: 'DEA4606B-4A21-D497-40E9-A5FB7589B536',
          year: 2017,
          students_total: 7994,
          undergraduates_total: 7212,
          postgraduates_total: 782,
          staff_total: 158,
          academic_papers: 6852,
          institution_income: 87167524,
          subjects: [
            {
              name: 'Maths',
              academic_papers: 6852,
              students_total: 7994,
              student_rating: 4.4,
            },
          ],
        },
        {
          id: '3A5EBCAC-3455-F4E5-C978-4A1CC1AA1D80',
          institution_id: 'DEA4606B-4A21-D497-40E9-A5FB7589B535',
          year: 2018,
          students_total: 8122,
          undergraduates_total: 7345,
          postgraduates_total: 785,
          staff_total: 162,
          academic_papers: 4932,
          institution_income: 37347888,
          subjects: [
            {
              name: 'Maths',
              academic_papers: 4932,
              students_total: 8122,
              student_rating: 4.4,
            },
          ],
        },
      ];

      const repo = new SubmissionsRepositoryImpl({ rawData });
      const result = await repo.where(
        (s: Submission) => s.institutionId === 'DEA4606B-4A21-D497-40E9-A5FB7589B535'
      );

      expect(result).toHaveLength(1);

      const firstItem = result[0];
      expect(firstItem.institutionId).toEqual('DEA4606B-4A21-D497-40E9-A5FB7589B535');
    });
  });
});
