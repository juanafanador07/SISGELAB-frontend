import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DEMO_ADMIN_EMAIL, DEMO_ADMIN_PASSWORD } from "@/lib/config";

export default function DemoAlert() {
  return (
    <Alert variant="info">
      <AlertTitle>Aplicación en modo demo</AlertTitle>
      <AlertDescription>
        <p className="mb-2">
          Puedes acceder como administrador con las siguientes credenciales:
        </p>
        <div className="space-y-1 font-mono text-sm">
          <p>
            <strong>Correo:</strong> {DEMO_ADMIN_EMAIL}
          </p>
          <p>
            <strong>Contraseña:</strong> {DEMO_ADMIN_PASSWORD}
          </p>
        </div>
        <p>
          Para ingresar como participante, usa la opción de inicio de sesión con
          Google
        </p>
      </AlertDescription>
    </Alert>
  );
}
