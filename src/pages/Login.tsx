import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const testAccounts = [
    { email: "admin@example.com", password: "AdminPass123!", role: "Administrador" },
    { email: "driver@example.com", password: "DriverPass123!", role: "Conductor" },
    { email: "operador@example.com", password: "OperadorPass123!", role: "Operador" }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar credenciales
    const account = testAccounts.find(
      acc => acc.email === email && acc.password === password
    );

    if (account) {
      // Guardar usuario en localStorage
      localStorage.setItem("user", JSON.stringify({ 
        email: account.email, 
        role: account.role,
        name: account.role
      }));
      
      // Redirigir a la página de bienvenida
      navigate("/welcome");
    } else {
      toast({
        variant: "destructive",
        title: "Error de autenticación",
        description: "Credenciales incorrectas. Verifica tu email y contraseña.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-card">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold text-foreground">
            CourierSync
          </CardTitle>
          <CardDescription className="text-base">
            Acceder a CourierSync
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="usuario@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="Mínimo 8 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="h-11"
              />
            </div>
            
            <Button type="submit" className="w-full h-11 text-base">
              Acceder
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t">
            <p className="text-sm font-semibold mb-3">Cuentas de prueba:</p>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• admin@example.com / AdminPass123!</li>
              <li>• driver@example.com / DriverPass123!</li>
              <li>• operador@example.com / OperadorPass123!</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
