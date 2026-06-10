export interface Mission {
  id: string;
  organization_id: string;
  title: string;
  points: number;
  status: 'available' | 'submitted';
}
