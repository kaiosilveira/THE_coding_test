import http from 'http';
import Express from 'express';

import DataLoader from './data-loader';
import PresentationResourcesManager from './presentation/resources';

const PORT = 3000;
const app = Express();
const DATA = DataLoader.load();

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

app.use(PresentationResourcesManager.createConfiguredRouter({ data: DATA, express: Express }));

http.createServer(app).listen(PORT, () => console.log(`Server running at ${PORT} 🚀`));
