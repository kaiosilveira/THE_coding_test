import InstitutionServiceImpl from '../../application/services/institutions/implementation';
import SubmissionServiceImpl from '../../application/services/submissions/implementation';
import CovidReportsRepositoryImpl from '../../data-access/repositories/covid/implementation';
import InstitutionsRepositoryImpl from '../../data-access/repositories/institutions/implementation';
import SubmissionsRepositoryImpl from '../../data-access/repositories/submissions/implementation';
import InstitutionsController from './institutions/controller';
import SubmissionsController from './submissions/controller';

export default class PresentationResourcesManager {
  static createConfiguredRouter({ data, express }) {
    const mainRouter = express.Router();

    const institutionsCtrl = new InstitutionsController({
      institutionsService: new InstitutionServiceImpl({
        institutionsRepository: new InstitutionsRepositoryImpl({ rawData: data.institutions }),
        covidReportsRepository: new CovidReportsRepositoryImpl({ rawData: data.covidCases }),
      }),
    });

    const submissionsCtrl = new SubmissionsController({
      submissionService: new SubmissionServiceImpl({
        submissionsRepository: new SubmissionsRepositoryImpl({ rawData: data.submissions }),
      }),
    });

    mainRouter.get('/institutions', institutionsCtrl.fetchInstitutions);
    mainRouter.get('/institutions/:institutionId/submissions', submissionsCtrl.listByInstitutionId);
    mainRouter.get(
      '/institutions/:institutionId/covid-report',
      institutionsCtrl.fetchCovidReportByInstitutionId
    );

    return mainRouter;
  }
}
