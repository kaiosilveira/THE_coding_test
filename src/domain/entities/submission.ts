import SubmissionSubject from '../value-objects/submission-subject';

export type SubmissionProps = {
  id: string;
  institutionId: string;
  year: number;
  studentsTotal: number;
  undergraduatesTotal: number;
  postgraduatesTotal: number;
  staffTotal: number;
  academicPapers: number;
  institutionIncome: number;
  subjects: Array<SubmissionSubject>;
};

export class SubmissionImpl {
  id: string;
  institutionId: string;
  year: number;
  studentsTotal: number;
  undergraduatesTotal: number;
  postgraduatesTotal: number;
  staffTotal: number;
  academicPapers: number;
  institutionIncome: number;
  subjects: Array<SubmissionSubject>;

  constructor({
    id,
    institutionId,
    year,
    studentsTotal,
    undergraduatesTotal,
    postgraduatesTotal,
    staffTotal,
    academicPapers,
    institutionIncome,
    subjects,
  }: SubmissionProps) {
    this.id = id;
    this.institutionId = institutionId;
    this.year = year;
    this.studentsTotal = studentsTotal;
    this.undergraduatesTotal = undergraduatesTotal;
    this.postgraduatesTotal = postgraduatesTotal;
    this.staffTotal = staffTotal;
    this.academicPapers = academicPapers;
    this.institutionIncome = institutionIncome;
    this.subjects = subjects;
  }
}

export default interface Submission {
  id: string;
  institutionId: string;
  year: number;
  studentsTotal: number;
  undergraduatesTotal: number;
  postgraduatesTotal: number;
  staffTotal: number;
  academicPapers: number;
  institutionIncome: number;
  subjects: Array<SubmissionSubject>;
}
