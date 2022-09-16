import InstitutionServiceImpl from '../../application/services/institutions/implementation';
import SubmissionServiceImpl from '../../application/services/submissions/implementation';
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
      }),
    });

    const submissionsCtrl = new SubmissionsController({
      submissionService: new SubmissionServiceImpl({
        submissionsRepository: new SubmissionsRepositoryImpl({ rawData: data.submissions }),
      }),
    });

    mainRouter.route('/institutions').get(institutionsCtrl.fetchInstitutions);
    mainRouter
      .route('/institutions/:institutionId/submissions')
      .get(submissionsCtrl.listByInstitutionId);

    return mainRouter;
  }
}
