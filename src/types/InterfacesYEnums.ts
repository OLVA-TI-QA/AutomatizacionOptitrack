export const NambarOption = {
  Gestiones: 'Gestiones',
  Historial: 'Historial',
  Offline: 'Offline',
  Documentos: 'Documentos',
  Perfil: 'Perfil',
} as const;

export type NambarOption = typeof NambarOption[keyof typeof NambarOption];

export const TypeGestiones = {
  Entregas: 'Entregas',
  Recojos: 'Recojos',
  GuiasLocal: 'Guias Local',
  GuiasNacional: 'Guias Nacional',
  Todos: 'Todos',
} as const;

export type TypeGestiones = typeof TypeGestiones[keyof typeof TypeGestiones];

export const TypeEstado = {
  Parcial: 'PARCIAL',
  Recogido: 'RECOGIDO',
  NoRecogido: 'NO RECOGIDO',
  Registrado: 'REGISTRADO',
  Entregado: 'ENTREGADO',
  Motivado: 'MOTIVADO',
  Asignadp: 'ASIGNADO',
  EnProcesoVerificacionMesaPartes: 'EN PROCESO DE VERIFICACION POR MESA PARTES',
  Anulado: 'ANULADO',
  Todos: 'TODOS',
} as const;

export type TypeEstado = typeof TypeEstado[keyof typeof TypeEstado];
