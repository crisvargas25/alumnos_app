import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Student from '../models/Students';



export const addStudent = async (req: Request, res: Response) => {
  try {
    const { Contraseña, ...studentData } = req.body;

    // Verificar si ya existe el correo electrónico
    const existing = await Student.findOne({ CorreoElectrnico: studentData.CorreoElectrnico });
    if (existing) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(Contraseña, 10); // 10 es el saltRounds

    const newStudent = new Student({
      ...studentData,
      Contraseña: hashedPassword,
    });

    await newStudent.save();
    res.status(201).json({ message: 'Student created successfully' });
  } catch (error: any) {
    console.error('Error creating student:', error);

    if (error.code === 11000) {
      res.status(400).json({ message: 'Duplicate field error' });
    } else {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};


export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await Student.find();
    res.status(200).json({ status: 200, result: students });
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Error al obtener los alumnos.', error });
  }
};


export const getStudentByMatricula = async (req: Request, res: Response) => {
  try {
    const { matricula } = req.params;
    const student = await Student.findOne({ matricula });

    if (!student) {
      return res.status(404).json({ status: 404, message: 'Alumno no encontrado.' });
    }

    res.status(200).json({ status: 200, data: student });
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Error al buscar al alumno.', error });
  }
};


export const searchStudentsByName = async (req: Request, res: Response) => {
  try {
    const nombre = req.params.nombre.trim();
    const students = await Student.find({ nombre: { $regex: nombre, $options: 'i' } });

    if (students.length === 0) {
      return res.status(404).json({ status: 404, message: 'No se encontraron alumnos con ese nombre.' });
    }

    res.status(200).json({ status: 200, result: students });
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Error al buscar alumnos.', error });
  }
};



export const updateStudent = async (req: Request, res: Response) => {
  try {
    const { matricula, ...updates } = req.body;

    if (!matricula) {
      return res.status(400).json({ status: 400, message: 'La matrícula es obligatoria para modificar al alumno.' });
    }

    const updated = await Student.findOneAndUpdate({ matricula }, updates, { new: true });

    if (!updated) {
      return res.status(404).json({ status: 404, message: 'Alumno no encontrado.' });
    }

    res.status(200).json({ status: 200, message: 'Alumno modificado correctamente.', result: updated });
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Error al modificar el alumno.', error });
  }
};



export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { matricula } = req.params;

    if (!matricula) {
      return res.status(400).json({
        status: 100,
        message: 'La matrícula es requerida para eliminar al alumno.'
      });
    }

    const student = await Student.findOne({ matricula });

    if (!student) {
      return res.status(404).json({
        status: 101,
        message: 'No se encontró ningún alumno con esa matrícula.'
      });
    }

    const deleted = await Student.findOneAndDelete({ matricula });

    res.status(200).json({
      status: 200,
      message: 'Alumno eliminado correctamente.',
      result: deleted
    });
  } catch (error) {
    res.status(500).json({
      status: 100,
      message: 'Error interno al eliminar al alumno.',
      error
    });
  }
};

