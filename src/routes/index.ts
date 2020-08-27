import { Router } from 'express';
import appointmentsRoutes from './appointments.routes';
import usersRoutes from './users.routes';
import sessionsRoutes from './sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRoutes);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);

routes.get('/', (request, response) => {
    return response.json({ project: { name: 'Go Barber' } });
});
export default routes;
