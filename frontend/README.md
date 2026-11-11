# Frontend · LIMS Nutricional (SENA)

Vue 3 + Vite + Vue Router + Pinia + Axios. Consume la API `backend/` (`/api/v1`).

## Puesta en marcha
```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```
El backend debe estar corriendo en `http://localhost:4000` (Vite hace proxy de `/api` y `/uploads`).

## Estructura
```
src/
├── api/          # un archivo por recurso del backend + cliente axios (http.js)
├── assets/styles # estilos globales
├── components/common  # sidebar, navbar, badges, toasts
├── layouts/      # AuthLayout (login/registro) y DashboardLayout (sidebar)
├── router/       # rutas + guardas por rol
├── stores/       # Pinia: auth (sesión/JWT) y ui (toasts)
├── utils/        # constantes (roles, estados) y formateadores
└── views/
    ├── auth/         Login, Registro
    ├── cliente/      Mis solicitudes, Nueva solicitud, Detalle
    ├── laboratorio/  Gestión de solicitudes, Inconformidades (Admin/Personal)
    ├── admin/        Usuarios, Tipos de muestra (Admin)
    └── shared/       Dashboard, Perfil, 403, 404
```

## Roles → vistas
| Rol | Acceso |
|---|---|
| Cliente | Mis solicitudes, nueva solicitud, detalle (muestras, pago, resultados, inconformidad) |
| Personal | Lo anterior + gestión de solicitudes, cambio de estado, subir resultados, verificar pagos, inconformidades |
| Administrador | Todo + usuarios y tipos de muestra |
