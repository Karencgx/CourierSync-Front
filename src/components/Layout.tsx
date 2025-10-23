import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Obtener el usuario guardado en localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-primary">CourierSync</h1>

              <nav className="flex space-x-4">
                <Button
                  variant={isActive("/dashboard") ? "default" : "ghost"}
                  onClick={() => navigate("/dashboard")}
                  size="sm"
                >
                  Dashboard
                </Button>

                <Button
                  variant={isActive("/shipments") ? "default" : "ghost"}
                  onClick={() => navigate("/shipments")}
                  size="sm"
                >
                  Envíos
                </Button>

                {/* 🔹 Mostrar solo si el usuario es administrador */}
                {user.role === "Administrador" && (
                  <Button
                    variant={isActive("/users") ? "default" : "ghost"}
                    onClick={() => navigate("/users")}
                    size="sm"
                  >
                    Gestión de Usuarios
                  </Button>
                )}
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Conectado como:{" "}
                <span className="font-medium text-foreground">{user.name}</span>
                <Badge variant="secondary" className="ml-2">
                  {user.role}
                </Badge>
              </span>

              <Button variant="outline" size="sm" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
