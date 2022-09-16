export type SubmissionSubjectProps = {
  name: string;
  academicPapers: number;
  studentsTotal: number;
  studentRating: number;
};

export default class SubmissionSubject {
  name: string;
  academicPapers: number;
  studentsTotal: number;
  studentRating: number;

  constructor(props: SubmissionSubjectProps) {
    this.name = props.name;
    this.academicPapers = props.academicPapers;
    this.studentsTotal = props.studentsTotal;
    this.studentRating = props.studentRating;
  }
}
