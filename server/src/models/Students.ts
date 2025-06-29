import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  matricula: string;
  nombre: string;
  APaterno: string;
  MPaterno: string;
  sexo: string;
  Telefono: string;
  CorreoElectrnico: string;
  PerfilFacebook: string;
  Instagram: string;
  TipoSangre: string;
  Contraseña: string;
  dCalle: string;
  Numero: string;
  Colonia: string;
  CodigoPostal: string;
  dNombreContacto: string;
  TelefonoContacto: string;
}

const StudentSchema: Schema = new Schema({
  matricula: { type: String, required: true },
  nombre: { type: String, required: true },
  APaterno: { type: String, required: true },
  MPaterno: { type: String, required: true },
  sexo: { type: String, required: true },
  Telefono: { type: String, required: true },
  CorreoElectrnico: { type: String, required: true, unique: true },
  PerfilFacebook: { type: String },
  Instagram: { type: String },
  TipoSangre: { type: String },
  Contraseña: { type: String, required: true },
  dCalle: { type: String },
  Numero: { type: String },
  Colonia: { type: String },
  CodigoPostal: { type: String },
  dNombreContacto: { type: String },
  TelefonoContacto: { type: String },
});

export default mongoose.model<IStudent>('Student', StudentSchema);
