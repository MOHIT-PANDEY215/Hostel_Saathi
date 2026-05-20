export interface Hostel {
  id: string;
  name: string;
  location: string;
  totalRooms: number;
  totalBeds: number;
  occupiedBeds: number;
  warden: string;
  wardenEmail: string;
  wardenPhone: string;
  activeIssues: number;
  revenue: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  hostel: string;
  user: string;
  action: string;
  type: 'issue' | 'room' | 'user' | 'system';
  timestamp: string;
}

export const mockHostels: Hostel[] = [
  {
    id: 'H001',
    name: 'Sunrise Boys Hostel',
    location: 'North Campus',
    totalRooms: 50,
    totalBeds: 150,
    occupiedBeds: 135,
    warden: 'Warden Singh',
    wardenEmail: 'singh@hostel.com',
    wardenPhone: '+91 9876543210',
    activeIssues: 5,
    revenue: 450000,
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: 'H002',
    name: 'Lakeview Girls Hostel',
    location: 'South Campus',
    totalRooms: 40,
    totalBeds: 120,
    occupiedBeds: 110,
    warden: 'Priya Sharma',
    wardenEmail: 'priya@hostel.com',
    wardenPhone: '+91 9876543211',
    activeIssues: 3,
    revenue: 380000,
    status: 'active',
    createdAt: '2024-02-20',
  },
  {
    id: 'H003',
    name: 'Tech Tower Hostel',
    location: 'East Campus',
    totalRooms: 60,
    totalBeds: 180,
    occupiedBeds: 165,
    warden: 'Rajesh Kumar',
    wardenEmail: 'rajesh@hostel.com',
    wardenPhone: '+91 9876543212',
    activeIssues: 8,
    revenue: 520000,
    status: 'active',
    createdAt: '2023-11-10',
  },
  {
    id: 'H004',
    name: 'Green Valley Hostel',
    location: 'West Campus',
    totalRooms: 35,
    totalBeds: 105,
    occupiedBeds: 85,
    warden: 'Anjali Verma',
    wardenEmail: 'anjali@hostel.com',
    wardenPhone: '+91 9876543213',
    activeIssues: 2,
    revenue: 290000,
    status: 'active',
    createdAt: '2024-03-01',
  },
];

export const mockActivityLogs: ActivityLog[] = [
  {
    id: 'LOG001',
    hostel: 'Sunrise Boys Hostel',
    user: 'Warden Singh',
    action: 'Assigned room 201 to student Rahul Kumar',
    type: 'room',
    timestamp: '2026-03-24T10:30:00',
  },
  {
    id: 'LOG002',
    hostel: 'Lakeview Girls Hostel',
    user: 'Rajesh Electrician',
    action: 'Completed electrical issue #ISS001',
    type: 'issue',
    timestamp: '2026-03-24T09:15:00',
  },
  {
    id: 'LOG003',
    hostel: 'Tech Tower Hostel',
    user: 'Priya Sharma',
    action: 'Created new issue for Room 305',
    type: 'issue',
    timestamp: '2026-03-24T08:45:00',
  },
  {
    id: 'LOG004',
    hostel: 'Green Valley Hostel',
    user: 'System',
    action: 'Monthly report generated',
    type: 'system',
    timestamp: '2026-03-24T00:00:00',
  },
  {
    id: 'LOG005',
    hostel: 'Sunrise Boys Hostel',
    user: 'Warden Singh',
    action: 'Added new user Amit Patel',
    type: 'user',
    timestamp: '2026-03-23T16:20:00',
  },
];
