import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import {Client} from "@/types/api";
import {Vehicle} from "@/types/api";

const user = JSON.parse(localStorage.getItem("user") || "{}");


const ShipmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedStatus, setSelectedStatus] = useState("En tránsito");
  const [deliveryConfirmed, setDeliveryConfirmed] = useState(false);
  const [observation, setObservation] = useState("");

  // Mock data - in real app would fetch based on id
  const shipment = {
    id: "ENV-001",
    tracking_code: "TRACK-439281",
    origin_address: "Carrera 78 #45-12, Medellín",
    destination_address: "Calle 100 #20-50, Bogotá",
    priority: "Alta",
    status: "En tránsito",
    weight: "25 kg",
    volume: "0.5 m³",
    client_id: "CLI-993", // <-- Solo el ID
    vehicle_id: "VEH-501", // <-- Solo el ID
  };

  const clientData = {
    id: "CLI-993",
    name: "Logística SA",
    email: "logistica@mail.com",
    phone: "+57 300 123 4567",
    address: "Av. Poblado #1-1, Medellín",
    registration_date: "2020-01-15",
};

  const vehicleData = {
    id: "VEH-501",
    plate: "ABC-123",
    model: "Renault Kangoo",
    maximum_capacity: 500, // kg
    available: false,
};
  const statusHistoryData = [
    {
        shipment_id: "ENV-001",
        old_status: "Pendiente",
        new_status: "En tránsito",
        change_date: "2025-10-24T10:30:00Z",
    },
    {
        shipment_id: "ENV-001",
        old_status: "",
        new_status: "Pendiente",
        change_date: "2025-10-23T07:15:00Z", 
    }
  ];
  const handleBack = () => {
    navigate("/shipments");
  };
  
  const canUpdateStatus = user.role === "Administrador" || user.role === "Conductor";

  const handleUpdateStatus = () => {
    // Check if delivery confirmation is required for "Entregado" status
    if (selectedStatus === "Entregado" && !deliveryConfirmed) {
      toast({
        variant: "destructive",
        title: "Confirmación requerida",
        description: "Debe confirmar la entrega para continuar"
      });
      return;
    }

    // Check if observation is required for "Novedad" status
    if (selectedStatus === "Novedad" && !observation.trim()) {
      toast({
        variant: "destructive",
        title: "Observación requerida",
        description: "Debe registrar una observación para continuar"
      });
      return;
    }

    // Mock update functionality - in real app would make API call
    const updateData = {
      status: selectedStatus,
      ...(selectedStatus === "Entregado" && { deliveryDate: new Date().toISOString() }),
      ...(selectedStatus === "Novedad" && { observation: observation.trim() })
    };
    
    console.log("Updating shipment:", updateData);
    
    // Show success message
    toast({
      title: "Estado actualizado",
      description: "El estado del envío ha sido actualizado con éxito"
    });

    // Reset form states after successful update
    if (selectedStatus === "Entregado") {
      setDeliveryConfirmed(false);
    }
    if (selectedStatus === "Novedad") {
      setObservation("");
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <h1 className="text-2xl font-bold">Detalle de envío</h1>
        </div>

{/* GRID PRINCIPAL: 2/3 (Izquierda) y 1/3 (Derecha) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Columna Izquierda Grande (Detalle, Cliente, Vehículo) */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* 1. Main Details Card (Detalle del envío) */}
                        <Card className="shadow-card">
                            <CardHeader>
                                <CardTitle>Información General</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-medium text-foreground mb-1">Origen:</h3>
                                            <p className="text-muted-foreground">{shipment.origin_address}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-foreground mb-1">Prioridad:</h3>
                                            <p className="text-muted-foreground">{shipment.priority}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-foreground mb-1">Peso y Volumen:</h3>
                                            <p className="text-muted-foreground">{shipment.weight} / {shipment.volume}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-medium text-foreground mb-1">Destino:</h3>
                                            <p className="text-muted-foreground">{shipment.destination_address}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-foreground mb-1">Estado:</h3>
                                            <Badge className="bg-status-transit text-white" variant="secondary">
                                                {shipment.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* SECCIÓN NUEVA: Cliente y Vehículo en un grid 2-columnas */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* 2. Card de Cliente */}
                            <Card className="shadow-card">
                                <CardHeader>
                                    <CardTitle className="text-xl">Cliente Asociado</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div><h4 className="font-medium">Nombre:</h4><p className="text-muted-foreground">{clientData.name}</p></div>
                                    <div><h4 className="font-medium">Teléfono:</h4><p className="text-muted-foreground">{clientData.phone}</p></div>
                                    <div><h4 className="font-medium">Dirección:</h4><p className="text-muted-foreground">{clientData.address}</p></div>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-medium text-foreground mb-1">Email:</h3>
                                            <p className="text-muted-foreground">{clientData.email}</p>
                                        </div>
                                      </div>
                                </CardContent>
                            </Card>

                            {/* 3. Card de Vehículo */}
                            {shipment.vehicle_id ? ( // Comprueba si hay un ID de vehículo
                                <Card className="shadow-card">
                                    <CardHeader>
                                        <CardTitle className="text-xl">Vehículo Asignado</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div><h4 className="font-medium">Placa:</h4><p className="text-muted-foreground">{vehicleData.plate}</p></div>
                                        <div><h4 className="font-medium">Modelo:</h4><p className="text-muted-foreground">{vehicleData.model}</p></div>
                                        <div><h4 className="font-medium">Capacidad Máx:</h4><p className="text-muted-foreground">{vehicleData.maximum_capacity} kg</p></div>
                                    </CardContent>
                                </Card>
                            ) : (
                                <Card className="shadow-card flex items-center justify-center p-6">
                                    <p className="text-muted-foreground">⚠️ Vehículo aún no asignado.</p>
                                </Card>
                            )}

                        </div> {/* Fin del sub-grid Cliente/Vehículo */}
                    </div>
          {/* Status Update Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-card">
              < CardHeader>
                <CardTitle>Actualizar Estado</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
              { canUpdateStatus ? (               
   <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                    <SelectItem value="En tránsito">En tránsito</SelectItem>
                    <SelectItem value="Entregado">Entregado</SelectItem>
                    <SelectItem value="Novedad">Novedad</SelectItem>
                  </SelectContent>
                </Select>
              ) : (  
                <div className="space-y-2">
                            <Label className="text-sm font-medium">Estado Actual</Label>
                            <div className="p-3 bg-muted rounded-md border border-input">
                                {/* Muestra el estado actual sin permitir la interacción */}
                                <span className="text-sm font-semibold">{selectedStatus || "Cargando estado..."}</span>
                            </div>
                        </div>
                        )}
                {/* Delivery confirmation for "Entregado" status */}
                {selectedStatus === "Entregado" && (
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="delivery-confirm" 
                      checked={deliveryConfirmed}
                      onCheckedChange={(checked) => setDeliveryConfirmed(!!checked)}
                    />
                    <Label htmlFor="delivery-confirm" className="text-sm">
                      Confirmar entrega del paquete
                    </Label>
                  </div>
                )}

                {/* Observation field for "Novedad" status */}
                {selectedStatus === "Novedad" && (
                  <div className="space-y-2">
                    <Label htmlFor="observation" className="text-sm font-medium">
                      Observación *
                    </Label>
                    <Textarea
                      id="observation"
                      placeholder="Describe la novedad (ej: dirección incorrecta, destinatario ausente...)"
                      value={observation}
                      onChange={(e) => setObservation(e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div>
                )}
                
                {(canUpdateStatus) && 
                (<Button className="w-full" onClick={handleUpdateStatus}>
                  Actualizar Estado
                </Button>)}
              </CardContent>
            </Card>
            <Card className="shadow-card">
            <CardHeader>
                <CardTitle className="text-xl">Historial de Estado</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {statusHistoryData
                        // Ordenar para que el más reciente esté arriba
                        .sort((a, b) => new Date(b.change_date).getTime() - new Date(a.change_date).getTime())
                        .map((history, index) => (
                            <div key={index} className="flex border-l-4 border-gray-300 pl-4 relative">
                                {/* Decoración de línea de tiempo */}
                                <span className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-primary ring-8 ring-white dark:ring-gray-900" />
                                
                                <div>
                                    <p className="text-sm font-semibold">
                                        {history.new_status}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {new Date(history.change_date).toLocaleString('es-CO', {
                                            day: '2-digit', month: 'short', year: 'numeric', 
                                            hour: '2-digit', minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    
                    {statusHistoryData.length === 0 && (
                        <p className="text-muted-foreground">No hay historial de estado registrado.</p>
                    )}
                </div>
            </CardContent>
        </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShipmentDetail;