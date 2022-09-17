[![Continuous Integration](https://github.com/kaiosilveira/THE_coding_test/actions/workflows/ci.yml/badge.svg)](https://github.com/kaiosilveira/THE_coding_test/actions/workflows/ci.yml)

# Times Higher Education take home test

This repository is a proposed implementation for [THE's tech test](https://github.com/THE-Engineering/THE_coding_test).

## Proposed implementation

My proposed implementation focused more on exposing the data provided via the JSON files (`institutions.json` and `submissions.json`) in a simple and standard way using Typescript and Express.

### Application structure

The application structure for this project was inspired by a previous study of mine on layered nodejs applications (see [kaiosilveira/nodejs-layered-app](https://github.com/kaiosilveira/nodejs-layered-app) for more details). It basically contains four layers: Domain, Data Access, Application and Presentation. Each of them briefly described below:

| Layer        | Description                                                                                                                                    |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Domain       | Holds the definition of entities and value objects used throughout the application                                                             |
| Data Access  | Abstract the data transformations done on the raw JSON files and transform them into classes, exposed via repositories.                        |
| Application  | Defines services and possibly other form of utilities to interact with the data and compute derivate results on top of what's in the database. |
| Presentation | Specifies controllers to serve as the entry point for clients to access the API.                                                               |

In a good OO spirit, this implementation relies heavily on the use of interfaces in order to decouple the dependencies between classes in different layers. Therefore, the instantiation of concrete classes was shifted to the core configuration files, which usually runs at bootstrap time (e.g. [PresentationResourcesManager.createConfiguredRouter](src/presentation/resources/index.ts), which basically binds the controllers to the specified routes). This approach provided for an easy and straightforward unit testing approach using dummies (see Fowler's [TestDouble](https://martinfowler.com/bliki/TestDouble.html)). These dummies are named fakes as they're intended to actually hold some functionality in the feature. For now, though, it's up to the developer to use `jest` to override the behavior of a given Dummy class and provide the desired implementation / return value. Example:

```typescript
const submissionService = new FakeSubmissionService();
jest.spyOn(submissionService, 'fetchByInstitutionId').mockReturnValue(Promise.resolve(payload));
```

### Endpoints

Due to the suggested time constraints, only three endpoints where implemented:

| method | url                                         | description                                        | payload                                                                                   |
| ------ | ------------------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| GET    | `/institutions`                             | Lists all registered institutions                  | `Array<Institution>` (see [institution.ts](./src/domain/entities/institution.ts))         |
| GET    | `/institutions/:institutionId/submissions`  | List all submissions for a given `institutionId`   | `Array<Submission>` (see [submission.ts](./src/domain/entities/submission.ts))            |
| GET    | `/institutions/:institutionId/covid-report` | Returns a covid report for a given `institutionId` | `CovidReport \| undefined` (see [covid-report.ts](./src/domain/entities/covid-report.ts)) |

### Testing

Most of the important files were covered by unit tests, including repositories, services and controllers. Due to time constraints, acceptance testing was left out of this implementation, but it could be easily implemented by spinning up a version of the API using chai-http or some similar testing framework.

Additionally, a Continuous Integration pipeline was added to the project. This pipeline runs for every push on the `main` branch and it basically builds the application and runs the unit tests (see [ci.yml](.github/workflows/ci.yml) for more details).

### Scripts

- `start`: spins up the application in-memory using `ts-node`
- `build`: transpiles the TS code into JS code and write it into the `/dist` directory
- `test:unit`: run all unit tests

### Is it production ready?

Of course it's not. It's missing a decent level of logging coverage (incoming requests and outgoing responses specially), some containerization approach (probably Docker?) to allow it to be automatically deployable and a good layer of (at least) acceptance tests. Also, a better, more durable solution for storage is needed.

### Next steps

With more time, it would be interesting to create some analytics endpoints with trends for each institution, such as the number of undergraduate students in a given year or even the correlation between covid cases and the number of published papers for a given year.
