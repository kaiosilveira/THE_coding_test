import SubmissionsRepository from '..';
import Submission from '../../../../domain/entities/submission';
import submission from '../../../../domain/entities/submission';
import SubmissionSubject from '../../../../domain/value-objects/submission-subject';

export const DEFAULT_PAYLOAD = [
  {
    id: '3A5EBCAC-3455-F4E5-C978-4A1CC1AA1D80',
    institutionId: 'DEA4606B-4A21-D497-40E9-A5FB7589B536',
    year: 2017,
    studentsTotal: 7994,
    undergraduatesTotal: 7212,
    postgraduatesTotal: 782,
    staffTotal: 158,
    academicPapers: 6852,
    institutionIncome: 87167524,
    subjects: [
      {
        name: 'Maths',
        academicPapers: 6852,
        studentsTotal: 7994,
        studentRating: 4.4,
      } as SubmissionSubject,
    ],
  } as Submission,
];

export default class FakeSubmissionsRepository implements SubmissionsRepository {
  list(): Promise<submission[]> {
    throw new Error('Method not implemented.');
  }

  where(filterFn: (i: submission) => boolean): Promise<submission[]> {
    return Promise.resolve(DEFAULT_PAYLOAD);
  }
}
