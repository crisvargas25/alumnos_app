import express from 'express';
import { addStudent, deleteStudent, getAllStudents, getStudentByMatricula, searchStudentsByName, updateStudent } from '../controllers/studentController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/agregar', addStudent)
router.get('/obtener', getAllStudents)
router.get('/getStudent/:matricula', getStudentByMatricula)
router.post('/studentName', searchStudentsByName)
router.put('/actualizar/:matricula', updateStudent)
router.delete('/eliminar/:matricula', deleteStudent)



export default router;