export default interface CovidReport {
  date: Date;
  state: string;
  county: string;
  city: string;
  collegeId: string;
  collegeName: string;
  cases: number;
  cases2021: number;
}
