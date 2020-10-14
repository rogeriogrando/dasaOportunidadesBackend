import { Router } from 'express';

import AdminEmailController from './app/controllers/AdminEmailController';
import ActivateAccount from './app/controllers/ActivateAccount';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddlewarer from './app/middlewares/auth';
import ResetPassword from './app/controllers/ResetPassword';

import StudentPersonalDataController from './app/controllers/StudentPersonalDataController';
import StudentAddressController from './app/controllers/StudentAddressController';
import StudentAcademicEducationController from './app/controllers/StudentAcademicEducationController';
import StudentAdditionalTrainingController from './app/controllers/StudentAdditionalTrainingController';
import StudentProfessionalExperiencesController from './app/controllers/StudentProfessionalExperiencesController';
import StudentGenerateCurriculum from './app/controllers/StudentGenerateCurriculum';
import StudentsJobsController from './app/controllers/StudentsJobsController';

import CompanyJobsController from './app/controllers/CompanyJobsController';
import CompanyJobsInactiveController from './app/controllers/CompanyJobsInactiveController';

import StudentSendCurriculumController from './app/controllers/StudentSendCurriculumController';


import CompanyController from './app/controllers/CompanyController';

const routes = new Router();
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.post('/resetpassword', ResetPassword.store);
routes.put('/resetpassword', ResetPassword.update);
routes.put('/activateaccount/:token', ActivateAccount.update);

routes.post('/companies', CompanyController.store);
routes.get('/emails', AdminEmailController.index);

routes.use(authMiddlewarer);
routes.put('/users', UserController.update);
routes.get('/users', UserController.show);

routes.post('/students-personal-data', StudentPersonalDataController.store);
routes.get('/students-personal-data', StudentPersonalDataController.show);
routes.put('/students-personal-data', StudentPersonalDataController.update);

routes.post('/students-address', StudentAddressController.store);
routes.put('/students-address', StudentAddressController.update);
routes.get('/students-address', StudentAddressController.show);

routes.post(
  '/students-academic-education',
  StudentAcademicEducationController.store
);

routes.get(
  '/students-academic-education/:id',
  StudentAcademicEducationController.show
);

routes.get(
  '/students-academic-education',
  StudentAcademicEducationController.index
);
routes.delete(
  '/students-academic-education/:id',
  StudentAcademicEducationController.delete
);
routes.put(
  '/students-academic-education/:id',
  StudentAcademicEducationController.update
);

routes.post(
  '/students-additional-training',
  StudentAdditionalTrainingController.store
);

routes.get(
  '/students-additional-training',
  StudentAdditionalTrainingController.show
);

routes.put(
  '/students-additional-training',
  StudentAdditionalTrainingController.update
);

routes.post(
  '/students-profissional-experiences',
  StudentProfessionalExperiencesController.store
);

routes.put(
  '/students-profissional-experiences/:id',
  StudentProfessionalExperiencesController.update
);

routes.get(
  '/students-profissional-experiences/:id',
  StudentProfessionalExperiencesController.show
);

routes.delete(
  '/students-profissional-experiences/:id',
  StudentProfessionalExperiencesController.delete
);

routes.get(
  '/students-profissional-experiences',
  StudentProfessionalExperiencesController.index
);

routes.post('/student-jobs', StudentsJobsController.store);
routes.get('/students-generate-curriculum', StudentGenerateCurriculum.show);
routes.get('/student-jobs', StudentsJobsController.index);
routes.get('/student-jobs/:id', StudentsJobsController.show);

routes.post('/company-jobs', CompanyJobsController.store);
routes.delete('/company-jobs/:id', CompanyJobsController.delete);
routes.put('/company-jobs/:id', CompanyJobsController.update);
routes.get('/company-jobs', CompanyJobsController.index);
routes.get('/company-jobs/:id', CompanyJobsController.show);

routes.put('/company-jobs-inactive/:id', CompanyJobsInactiveController.update);
routes.get('/company-jobs-inactive', CompanyJobsInactiveController.index);
routes.get('/company-jobs-inactive/:id', CompanyJobsInactiveController.show);

routes.post('/student-send-curriculum', StudentSendCurriculumController.store);

export default routes;
