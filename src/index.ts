import fs from 'fs';
import http from 'http';
import Express from 'express';
import * as Path from 'path';

import PresentationResourcesManager from './presentation/resources';

const submissions = JSON.parse(
  fs.readFileSync(Path.resolve(__dirname, './data-access/raw-data/submissions.json')).toString()
);

const institutions = JSON.parse(
  fs.readFileSync(Path.resolve(__dirname, './data-access/raw-data/institutions.json')).toString()
);

const rawCovidCasesTxt = fs
  .readFileSync(Path.resolve(__dirname, './data-access/raw-data/covid_cases.csv'))
  .toString();

const covidCases = rawCovidCasesTxt.split('\n').map(line => {
  const [date, state, county, city, collegeId, collegeName, cases, cases2021] = line.split(',');
  return { date, state, county, city, collegeId, collegeName, cases, cases2021 };
});

const PORT = 3000;
const app = Express();
const DATA = { institutions, submissions, covidCases };

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

app.use(PresentationResourcesManager.createConfiguredRouter({ data: DATA, express: Express }));

http.createServer(app).listen(PORT, () => console.log(`Server running at ${PORT} 🚀`));
