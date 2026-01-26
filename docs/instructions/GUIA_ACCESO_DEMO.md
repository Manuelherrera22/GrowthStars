# Guía de Acceso: Growth Stars (Demo / Producción)

El sistema actualmente opera en **"Mock Mode"**. Esto significa que no necesitas una base de datos local ni real para ver cómo funciona; todos los datos son simulaciones inteligentes integradas en el código (hardcoded fixtures).

## 1. URLs de Acceso

Una vez desplegado en Netlify (o corriendo en local), usa estas rutas:

*   **Landing Page (Pública)**: `/`
*   **Login**: `/login` (Redirige aquí si intentas entrar a /admin protegida).

## 2. Credenciales de Acceso (Mock Auth)

El sistema de login es simulado. Solo valida que el email contenga ciertas palabras clave para redirigirte al rol correcto. No importa la contraseña.

### 👑 Rol: Artist Manager (Admin)
Acceso al Command Center completo.
*   **Email**: `admin@growthstars.com` (o cualquier email con la palabra "admin")
*   **Password**: `cualquiera`
*   **Redirige a**: `/admin`

### 💰 Rol: Inversionista (Investor)
Acceso al Dashboard de ROI y Portafolio.
*   **Email**: `investor@capital.com` (o cualquier email con la palabra "investor")
*   **Password**: `cualquiera`
*   **Redirige a**: `/investor`

## 3. Navegación Interna

Una vez dentro como **Admin**, puedes navegar libremente a los 3 motores usando la barra lateral o estos links directos:
*   `/admin/dashboard` - Centro de Comando
*   `/admin/audience` - CRM de Fans
*   `/admin/campaigns` - Motor de Marketing
*   `/admin/treasury` - Tesorería
*   `/admin/artists/1` - Detalle de Artista (Luna Eclipse)

## 4. Próximo Paso: Backend Real

En la **Fase 2**, reemplazaremos este "Mock Mode" por una conexión real a Supabase Auth y Base de Datos Postgre.
