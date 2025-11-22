import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CitySelector } from "@/components/CitySelector";
import Layout from "@/components/Layout";

const user = JSON.parse(localStorage.getItem("user") || "{}");

const Shipments = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<any>(null);
  const [shipmentToDelete, setShipmentToDelete] = useState<any>(null);
  const [showActionLog, setShowActionLog] = useState(false);
  const [actionLogFilters, setActionLogFilters] = useState({
    user: "",
    date: "",
  });

  // Form states for create modal
  const [createForm, setCreateForm] = useState({
    origin: "",
    destination: "",
    weight: "",
    volume: "",
    priority: "Normal",
    driver: "",
  });

  // Mock drivers data - en producción vendría de la API
  const drivers = [
    { id: "2", name: "Usuario 1", vehicleModel: "Toyota Hilux", vehiclePlate: "ABC-123" },
    { id: "4", name: "Usuario 3", vehicleModel: "Chevrolet NPR", vehiclePlate: "XYZ-789" },
  ];

  // Mock action log data - en producción vendría de la API
  const actionLogs = [
    {
      id: "1",
      user: "Usuario",
      dateTime: "2025-11-12\n15:32:20",
      role: "Conductor",
      action: "Actualizar Estado",
      actionColor: "bg-orange-500",
      shipmentId: "ENV-045",
      details: "Actualizado de 'En transito' a 'Entregado'",
    },
    {
      id: "2",
      user: "Usuario 1",
      dateTime: "2025-11-10\n22:53:13",
      role: "Administrador",
      action: "Eliminar",
      actionColor: "bg-red-500",
      shipmentId: "ENV-050",
      details: "Envío eliminado",
    },
    {
      id: "3",
      user: "Usuario 2",
      dateTime: "2025-11-10\n09:45:33",
      role: "Operador",
      action: "Crear",
      actionColor: "bg-green-500",
      shipmentId: "ENV-056",
      details: "Nuevo envío creado",
    },
    {
      id: "4",
      user: "Usuario 3",
      dateTime: "2025-11-9\n12:15:45",
      role: "Administrador",
      action: "Editar",
      actionColor: "bg-blue-500",
      shipmentId: "ENV-038",
      details: "Dirección de destino actualizada",
    },
  ];

  const users = [
    { id: "1", name: "Usuario" },
    { id: "2", name: "Usuario 1" },
    { id: "3", name: "Usuario 2" },
    { id: "4", name: "Usuario 3" },
  ];

  // Form states for edit modal
  const [editForm, setEditForm] = useState({
    origin: "",
    destination: "",
    weight: "",
    volume: "",
    priority: "",
    status: "",
  });

  const [shipments] = useState([
    {
      id: "ENV-001",
      origin: "Medellín",
      destination: "Bogotá",
      weight: "25 kg",
      volume: "0.5 m³",
      priority: "Alta",
      status: "En tránsito",
      statusColor: "bg-status-transit",
    },
    {
      id: "ENV-002",
      origin: "Medellín",
      destination: "Cali",
      weight: "18 kg",
      volume: "0.05 m³",
      priority: "Normal",
      status: "Pendiente",
      statusColor: "bg-status-pending",
    },
    {
      id: "ENV-003",
      origin: "Cali",
      destination: "Bogotá",
      weight: "32 kg",
      volume: "0.2 m³",
      priority: "Normal",
      status: "Entregado",
      statusColor: "bg-status-delivered",
    },
    {
      id: "ENV-004",
      origin: "Medellín",
      destination: "Barranquilla",
      weight: "12 kg",
      volume: "0.08 m³",
      priority: "Normal",
      status: "Novedad",
      statusColor: "bg-status-novedad",
    },
  ]);

  const handleEdit = (shipment: any) => {
    setSelectedShipment(shipment);
    setEditForm({
      origin: shipment.origin,
      destination: shipment.destination,
      weight: shipment.weight,
      volume: shipment.volume,
      priority: shipment.priority,
      status: shipment.status,
    });
    setShowEditModal(true);
  };

  const handleCreateModalClose = () => {
    setShowCreateModal(false);
    setCreateForm({
      origin: "",
      destination: "",
      weight: "",
      volume: "",
      priority: "Normal",
      driver: "",
    });
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setEditForm({
      origin: "",
      destination: "",
      weight: "",
      volume: "",
      priority: "",
      status: "",
    });
  };

  const handleView = (shipmentId: string) => {
    navigate(`/shipments/${shipmentId}`);
  };

  const handleDeleteClick = (shipment: any) => {
    setShipmentToDelete(shipment);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    // Mock delete functionality - in real app would make API call
    console.log("Deleting shipment:", shipmentToDelete.id);
    
    toast({
      title: "Envío eliminado",
      description: "El envío ha sido eliminado con éxito"
    });

    setShowDeleteDialog(false);
    setShipmentToDelete(null);
  };

  const handleEditSave = () => {
    // Mock update functionality - in real app would make API call
    console.log("Updating shipment:", selectedShipment?.id, editForm);
    
    toast({
      title: "Envío actualizado",
      description: "El envío ha sido actualizado con éxito"
    });

    handleEditModalClose();
  };

  const handleCreateSave = () => {
    // Mock create functionality - in real app would make API call
    console.log("Creating shipment:", createForm);
    
    toast({
      title: "Envío creado",
      description: "El envío ha sido creado con éxito"
    });

    handleCreateModalClose();
  };

  const handleClearFilters = () => {
    setActionLogFilters({ user: "", date: "" });
  };

  const handleFilter = () => {
    // Mock filter functionality - in real app would filter the action logs
    console.log("Filtering with:", actionLogFilters);
    toast({
      title: "Filtros aplicados",
      description: "Los resultados han sido filtrados"
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Gestión de envíos</h1>
          <div className="flex gap-2">
            <Button 
              onClick={() => setShowActionLog(!showActionLog)} 
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Registro de acciones
            </Button>
            {(user.role === "Administrador"|| user.role === "Operador") && (
              <Button onClick={() => setShowCreateModal(true)} className="bg-status-delivered hover:bg-status-delivered/90">
                <Plus className="w-4 h-4 mr-2" />
                Crear envío
              </Button>
            )}
          </div>
        </div>

        {/* Shipments Table - only show when action log is not active */}
        {!showActionLog && (
          <Card className="shadow-card">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Origen</TableHead>
                    <TableHead>Destino</TableHead>
                    <TableHead>Peso y Volumen</TableHead>
                    <TableHead>Prioridad</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shipments.map((shipment) => (
                    <TableRow key={shipment.id}>
                      <TableCell className="font-medium">{shipment.id}</TableCell>
                      <TableCell>{shipment.origin}</TableCell>
                      <TableCell>{shipment.destination}</TableCell>
                      <TableCell>{shipment.weight}/ {shipment.volume}</TableCell>
                      <TableCell>{shipment.priority}</TableCell>
                      <TableCell>
                        <Badge className={`text-white ${shipment.statusColor}`} variant="secondary">
                          {shipment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleView(shipment.id)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {(user.role === "Administrador"|| user.role === "Operador") &&
                          (<Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(shipment)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>)}
                          {(user.role === "Administrador"|| (user.role === "Operador" && shipment.status === "Pendiente")) &&(<Button size="sm" variant="outline"
                           className="text-destructive" onClick={() => handleDeleteClick(shipment)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>)}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Action Log Section */}
        {showActionLog && (
          <>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Filtro de Búsqueda</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label>Usuario</Label>
                    <Select
                      value={actionLogFilters.user}
                      onValueChange={(value) => setActionLogFilters({ ...actionLogFilters, user: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione Usuario" />
                      </SelectTrigger>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Fecha</Label>
                    <Input
                      type="date"
                      value={actionLogFilters.date}
                      onChange={(e) => setActionLogFilters({ ...actionLogFilters, date: e.target.value })}
                      placeholder="dd/mm/aaaa"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={handleClearFilters}>
                    Limpiar Filtros
                  </Button>
                  <Button onClick={handleFilter} className="bg-blue-500 hover:bg-blue-600 text-white">
                    Filtrar
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Registro de acciones</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuario</TableHead>
                      <TableHead>Fecha/Hora</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Acción</TableHead>
                      <TableHead>ID-Envío</TableHead>
                      <TableHead>Detalles</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {actionLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">{log.user}</TableCell>
                        <TableCell className="whitespace-pre-line text-sm">{log.dateTime}</TableCell>
                        <TableCell>{log.role}</TableCell>
                        <TableCell>
                          <Badge className={`text-white ${log.actionColor}`} variant="secondary">
                            {log.action}
                          </Badge>
                        </TableCell>
                        <TableCell>{log.shipmentId}</TableCell>
                        <TableCell className="text-sm">{log.details}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        )}

        {/* Create Modal */}
        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Envío</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label>Origen</Label>
                <CitySelector
                  value={createForm.origin}
                  onValueChange={(value) => setCreateForm({ ...createForm, origin: value })}
                  placeholder="Seleccionar ciudad de origen"
                />
              </div>
              <div className="space-y-2">
                <Label>Destino</Label>
                <CitySelector
                  value={createForm.destination}
                  onValueChange={(value) => setCreateForm({ ...createForm, destination: value })}
                  placeholder="Seleccionar ciudad de destino"
                />
              </div>
              <div className="space-y-2">
                <Label>Prioridad</Label>
                <Select
                  value={createForm.priority}
                  onValueChange={(value) => setCreateForm({ ...createForm, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alta">Alta</SelectItem>
                    <SelectItem value="Normal">Normal</SelectItem>
                    <SelectItem value="Baja">Baja</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Estado</Label>
                <div className="p-3 bg-muted rounded-md">
                  <span className="text-sm text-muted-foreground">Pendiente (predeterminado)</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Peso</Label>
                <Input
                  placeholder="Peso en kg"
                  value={createForm.weight}
                  onChange={(e) => setCreateForm({ ...createForm, weight: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Volumen</Label>
                <Input
                  placeholder="Volumen en m³"
                  value={createForm.volume}
                  onChange={(e) => setCreateForm({ ...createForm, volume: e.target.value })}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Conductor</Label>
                <Select
                  value={createForm.driver}
                  onValueChange={(value) => setCreateForm({ ...createForm, driver: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el conductor" />
                  </SelectTrigger>
                  <SelectContent>
                    {drivers.map((driver) => (
                      <SelectItem key={driver.id} value={driver.id}>
                        {driver.name} - {driver.vehicleModel} ({driver.vehiclePlate})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCreateModalClose}>
                Cancelar
              </Button>
              <Button onClick={handleCreateSave}>
                Guardar
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Modal */}
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Editar envío {selectedShipment?.id}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label>Origen</Label>
                <CitySelector
                  value={editForm.origin}
                  onValueChange={(value) => setEditForm({ ...editForm, origin: value })}
                  placeholder="Seleccionar ciudad de origen"
                />
              </div>
              <div className="space-y-2">
                <Label>Destino</Label>
                <CitySelector
                  value={editForm.destination}
                  onValueChange={(value) => setEditForm({ ...editForm, destination: value })}
                  placeholder="Seleccionar ciudad de destino"
                />
              </div>
              <div className="space-y-2">
                <Label>Prioridad</Label>
                <Select
                  value={editForm.priority}
                  onValueChange={(value) => setEditForm({ ...editForm, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alta">Alta</SelectItem>
                    <SelectItem value="Normal">Normal</SelectItem>
                    <SelectItem value="Baja">Baja</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Estado</Label>
                <Select
                  value={editForm.status}
                  onValueChange={(value) => setEditForm({ ...editForm, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                    <SelectItem value="En tránsito">En tránsito</SelectItem>
                    <SelectItem value="Entregado">Entregado</SelectItem>
                    <SelectItem value="Novedad">Novedad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Peso</Label>
                <Input
                  placeholder="Peso en kg"
                  value={editForm.weight}
                  onChange={(e) => setEditForm({ ...editForm, weight: e.target.value })}
                />
              </div>
              <div className="space-y-2"> {/* Segundo div (Volumen) */}
                <Label>Volumen</Label>
                <Input
                    placeholder="Volumen en m³"
                    value={editForm.volume}
                    onChange={(e) => setEditForm({ ...editForm, volume: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleEditModalClose}>
                Cancelar
              </Button>
              {user.role === "Administrador"|| user.role === "Operador" &&(<Button onClick={handleEditSave}>
                Actualizar
              </Button>)}
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro de eliminar este envío?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción eliminará permanentemente:
                <br /><br />
                • Información de origen y destino<br />
                • Historial de seguimiento<br />
                • Documentos adjuntos
                <br /><br />
                Esta acción no se puede deshacer.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
};

export default Shipments;