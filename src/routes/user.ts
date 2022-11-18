import express from 'express';
import controller from '../controllers/user';

const router = express.Router();

router.get('', controller.getAllUsers);
router.post('', controller.createUser);
router.patch('', controller.updateUser);
router.get('/:id', controller.getUserByID);
router.delete('/:id', controller.deleteUserByID);

export = router;
