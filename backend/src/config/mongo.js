import mongoose from 'mongoose';

const connectMongo = async () => {
  if (!process.env.MONGO_URI) {
    console.warn('⚠️  MONGO_URI no está definida: bitácora/auditoría en Mongo deshabilitadas.');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 8000 });
    console.log('MongoDB Atlas conectado exitosamente 🍃');
  } catch (error) {
    // No se detiene el servidor: login, solicitudes, pagos, etc. usan MySQL
    console.error('⚠️  No se pudo conectar a MongoDB (el servidor sigue activo):', error.message);
  }
};

export default connectMongo;
