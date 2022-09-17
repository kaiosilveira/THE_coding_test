import fs from 'fs';
import * as Path from 'path';

export default class DataLoader {
  static load() {
    const submissions = JSON.parse(
      fs.readFileSync(Path.resolve(__dirname, './data-access/raw-data/submissions.json')).toString()
    );

    const institutions = JSON.parse(
      fs
        .readFileSync(Path.resolve(__dirname, './data-access/raw-data/institutions.json'))
        .toString()
    );

    const rawCovidCasesTxt = fs
      .readFileSync(Path.resolve(__dirname, './data-access/raw-data/covid_cases.csv'))
      .toString();

    const covidCases = rawCovidCasesTxt.split('\n').map(line => {
      const [date, state, county, city, collegeId, collegeName, cases, cases2021] = line.split(',');
      return { date, state, county, city, collegeId, collegeName, cases, cases2021 };
    });

    return { institutions, submissions, covidCases };
  }
}
