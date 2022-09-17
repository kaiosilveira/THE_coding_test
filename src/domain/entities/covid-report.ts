export class CovidReportImpl implements CovidReport {
  institutionId: string;
  institutionName: string;
  totalCases: number;
  cases2021: number;

  constructor({ institutionId, institutionName, totalCases, cases2021 }) {
    this.institutionId = institutionId;
    this.institutionName = institutionName;
    this.totalCases = totalCases;
    this.cases2021 = cases2021;
  }
}

export default interface CovidReport {
  institutionId: string;
  institutionName: string;
  totalCases: number;
  cases2021: number;
}
