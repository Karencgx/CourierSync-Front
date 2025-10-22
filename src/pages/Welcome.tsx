import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Package } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    // Redirigir automáticamente al dashboard después de 2 segundos
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Card className="w-full max-w-2xl p-12 text-center shadow-elevated">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center">
              <Package className="w-12 h-12 text-primary-foreground" />
            </div>
          </div>
          
          <h1 className="text-2xl font-semibold mb-4">
            ¡Bienvenido/a a Courier Sync, {user.role}!
          </h1>
          
          <p className="text-muted-foreground leading-relaxed">
            Has iniciado sesión exitosamente. Courier Sync es tu plataforma integral para la gestión y
            seguimiento de envíos en tiempo real.
          </p>
        </Card>
      </div>
    </Layout>
  );
};

export default Welcome;
