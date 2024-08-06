/* Author: Sivaprkash Chittu Hariharan */
import { Router } from 'express';
import * as controller from '../../controllers/eventController.js';
import Auth from '../../middleware/auth.js';  


const router = Router();

// GET Methods
router
  .route('/getEvents')
  .get(Auth, controller.getAllEvents);

router
  .route('/getEvents/:id')
  .get(Auth, controller.getEventById);

// POST Methods
router
  .route('/createEvent')
  .post(Auth, controller.createEvent);

// PUT Methods
router
  .route('/updateEvent/:id')
  .put(Auth, controller.updateEvent);

// DELETE Methods
router
  .route('/deleteEvent/:id')
  .delete(Auth, controller.deleteEvent);
  
router
  .route('/getapplicants/:id')
  .get(Auth, controller.getApplicantsByEventId);

router
  .route('/events/apply')
  .post(Auth, controller.Eventcandidateapply);

export default router;
