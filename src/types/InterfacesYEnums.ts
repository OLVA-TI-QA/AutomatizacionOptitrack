export const NambarOption = {
  Gestiones: 'Gestiones',
  Historial: 'Historial',
  Offline: 'Offline',
  Documentos: 'Documentos',
  Perfil: 'Perfil',
} as const;

export type NambarOption = typeof NambarOption[keyof typeof NambarOption];