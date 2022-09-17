import SubmissionsRepository from '..';
import Submission, { SubmissionImpl } from '../../../../domain/entities/submission';
import SubmissionSubject from '../../../../domain/value-objects/submission-subject';

export default class SubmissionsRepositoryImpl implements SubmissionsRepository {
  private readonly _data: Array<Submission>;

  constructor({ rawData }) {
    this._data = rawData.map(s => {
      const subjects = s.subjects.map(
        subject =>
          new SubmissionSubject({
            name: subject.name,
            academicPapers: subject.academic_papers,
            studentsTotal: subject.students_total,
            studentRating: subject.student_rating,
          })
      );

      return new SubmissionImpl({
        id: s.id,
        institutionId: s.institution_id,
        year: s.year,
        studentsTotal: s.students_total,
        undergraduatesTotal: s.undergraduates_total,
        postgraduatesTotal: s.postgraduates_total,
        staffTotal: s.staff_total,
        academicPapers: s.academic_papers,
        institutionIncome: s.institution_income,
        subjects,
      });
    });
  }

  async list(): Promise<Submission[]> {
    return Promise.resolve(this._data);
  }

  async where(filterFn: (s: Submission) => boolean): Promise<Submission[]> {
    const result = await this.list();
    return Promise.resolve(result.filter(filterFn));
  }
}
