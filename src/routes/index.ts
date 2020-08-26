import { Router } from 'express';
import appointmentsRoutes from './appointments.routes';
import usersRoutes from './users.routes';

const routes = Router();

// routes.use('/', (request, response) => {
//   return response.json({ name: 'teste' });
// });
routes.use('/appointments', appointmentsRoutes);
routes.use('/users', usersRoutes);

routes.get('/', (request, response) => {
    return response.json({ project: { name: 'Go Barber' } });
});
export default routes;
