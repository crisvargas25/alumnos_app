import express from 'express';
import { addStudent, deleteStudent, getAllStudents, getStudentByMatricula, searchStudentsByName, updateStudent } from '../controllers/studentController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/agregar', addStudent)
router.post('/obtener', getAllStudents)
router.get('/getStudent/:matricula', getStudentByMatricula)
router.post('/agregar', searchStudentsByName)
router.post('/agregar', updateStudent)
router.delete('/eliminar/:matricula', deleteStudent)



export default router;