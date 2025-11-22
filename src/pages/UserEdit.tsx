import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    vehicleModel: "",
    vehiclePlate: "",
  });

  useEffect(() => {
    // Simular carga de datos del usuario
    // En producción, esto vendría de una API
    const mockUsers: Record<string, any> = {
      "1": { name: "Usuario", email: "usuario@example.com", phone: "123 456 7891", role: "Administrador", vehicleModel: "", vehiclePlate: "" },
      "2": { name: "Usuario 1", email: "usuario1@example.com", phone: "234 567 8912", role: "Conductor", vehicleModel: "Toyota Hilux", vehiclePlate: "ABC-123" },
      "3": { name: "Usuario 2", email: "usuario2@example.com", phone: "345 678 9123", role: "Operador", vehicleModel: "", vehiclePlate: "" },
      "4": { name: "Usuario 3", email: "usuario3@example.com", phone: "456 789 1234", role: "Conductor", vehicleModel: "Chevrolet NPR", vehiclePlate: "XYZ-789" },
    };

    if (id && mockUsers[id]) {
      setFormData({ ...mockUsers[id], password: "********" });
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Perfil de usuario editado",
      description: "La información de usuario ha sido editada con éxito",
    });
    
    navigate("/users");
  };

  const handleCancel = () => {
    navigate("/users");
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Editar Información de Usuario Existente</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Rol de usuario</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Administrador">Administrador</SelectItem>
                    <SelectItem value="Conductor">Conductor</SelectItem>
                    <SelectItem value="Operador">Operador</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  disabled
                  className="bg-muted"
                />
              </div>

              {formData.role === "Conductor" && (
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-base font-semibold">Datos de vehículo</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vehicleModel">Modelo</Label>
                      <Input
                        id="vehicleModel"
                        placeholder="Ingrese el modelo del vehículo"
                        value={formData.vehicleModel}
                        onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                        required={formData.role === "Conductor"}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vehiclePlate">Placa</Label>
                      <Input
                        id="vehiclePlate"
                        placeholder="Ingrese la placa del vehículo"
                        value={formData.vehiclePlate}
                        onChange={(e) => setFormData({ ...formData, vehiclePlate: e.target.value })}
                        required={formData.role === "Conductor"}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
                <Button type="submit">
                  Actualizar Datos
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default UserEdit;
