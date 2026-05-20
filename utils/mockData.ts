export type IssueStatus = 
  | 'reported' 
  | 'verified' 
  | 'assigned' 
  | 'in-progress' 
  | 'resolved' 
  | 'awaiting-verification' 
  | 'closed'
  | 'rejected'
  | 'reopened';

export interface Issue {
  id: string;
  title: string;
  category: string;
  description: string;
  status: IssueStatus;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  studentName: string;
  studentId: string;
  room: string;
  block: string;
  assignedTo?: string;
  rejectionReason?: string;
  images?: string[];
  timeline: {
    date: string;
    action: string;
    user: string;
    status?: IssueStatus;
    note?: string;
  }[];
}

export interface Room {
  id: string;
  number: string;
  floor: number;
  block: string;
  capacity: number;
  occupied: number;
  beds: Bed[];
}

export interface Bed {
  id: string;
  number: number;
  status: 'occupied' | 'vacant' | 'maintenance';
  student?: Student;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  roomId?: string;
  bedId?: string;
}

export const mockIssues: Issue[] = [
  {
    id: 'ISS001',
    title: 'Broken Fan in Room',
    category: 'Electrical',
    description: 'The ceiling fan in my room has stopped working since yesterday morning.',
    status: 'in-progress',
    priority: 'high',
    createdAt: '2026-03-20T10:30:00',
    updatedAt: '2026-03-24T14:20:00',
    studentName: 'Rahul Kumar',
    studentId: 'STU001',
    room: '201',
    block: 'A',
    assignedTo: 'Rajesh Electrician',
    timeline: [
      { date: '2026-03-20T10:30:00', action: 'Issue reported by student', user: 'Rahul Kumar', status: 'reported' },
      { date: '2026-03-20T14:15:00', action: 'Issue verified by warden', user: 'Warden Singh', status: 'verified', note: 'Confirmed issue, will assign to electrician' },
      { date: '2026-03-21T09:15:00', action: 'Assigned to worker', user: 'Warden Singh', status: 'assigned' },
      { date: '2026-03-24T14:20:00', action: 'Work started', user: 'Rajesh Electrician', status: 'in-progress', note: 'Started inspection, needs new capacitor' }
    ]
  },
  {
    id: 'ISS002',
    title: 'Water Leakage in Bathroom',
    category: 'Plumbing',
    description: 'There is continuous water leakage from the tap in the bathroom. Water is dripping constantly and making noise at night.',
    status: 'verified',
    priority: 'medium',
    createdAt: '2026-03-22T15:45:00',
    updatedAt: '2026-03-23T10:30:00',
    studentName: 'Priya Sharma',
    studentId: 'STU002',
    room: '305',
    block: 'B',
    timeline: [
      { date: '2026-03-22T15:45:00', action: 'Issue reported by student', user: 'Priya Sharma', status: 'reported' },
      { date: '2026-03-23T10:30:00', action: 'Issue verified by warden', user: 'Warden Singh', status: 'verified', note: 'Valid complaint, will assign plumber' }
    ]
  },
  {
    id: 'ISS003',
    title: 'AC Not Cooling',
    category: 'Electrical',
    description: 'Air conditioner is running but not cooling properly. Room temperature remains high.',
    status: 'awaiting-verification',
    priority: 'high',
    createdAt: '2026-03-18T11:20:00',
    updatedAt: '2026-03-23T16:30:00',
    studentName: 'Amit Patel',
    studentId: 'STU003',
    room: '102',
    block: 'A',
    assignedTo: 'Rajesh Electrician',
    timeline: [
      { date: '2026-03-18T11:20:00', action: 'Issue reported by student', user: 'Amit Patel', status: 'reported' },
      { date: '2026-03-18T14:00:00', action: 'Issue verified by warden', user: 'Warden Singh', status: 'verified' },
      { date: '2026-03-18T15:30:00', action: 'Assigned to worker', user: 'Warden Singh', status: 'assigned' },
      { date: '2026-03-19T10:30:00', action: 'Work started', user: 'Rajesh Electrician', status: 'in-progress' },
      { date: '2026-03-23T16:30:00', action: 'Work completed', user: 'Rajesh Electrician', status: 'resolved', note: 'Cleaned filters and recharged gas' },
      { date: '2026-03-23T16:35:00', action: 'Awaiting student verification', user: 'System', status: 'awaiting-verification' }
    ]
  },
  {
    id: 'ISS004',
    title: 'Door Lock Issue',
    category: 'Maintenance',
    description: 'Room door lock is jammed and difficult to open. Sometimes takes 5-10 minutes to unlock.',
    status: 'reported',
    priority: 'low',
    createdAt: '2026-03-23T08:15:00',
    updatedAt: '2026-03-23T08:15:00',
    studentName: 'Sneha Reddy',
    studentId: 'STU004',
    room: '408',
    block: 'C',
    timeline: [
      { date: '2026-03-23T08:15:00', action: 'Issue reported by student', user: 'Sneha Reddy', status: 'reported' }
    ]
  },
  {
    id: 'ISS005',
    title: 'WiFi Connection Problem',
    category: 'Network',
    description: 'WiFi is not working in our room for the past 2 days. Unable to connect or very slow speeds.',
    status: 'assigned',
    priority: 'high',
    createdAt: '2026-03-21T19:00:00',
    updatedAt: '2026-03-23T11:00:00',
    studentName: 'Vikram Singh',
    studentId: 'STU005',
    room: '215',
    block: 'A',
    assignedTo: 'Network Team',
    timeline: [
      { date: '2026-03-21T19:00:00', action: 'Issue reported by student', user: 'Vikram Singh', status: 'reported' },
      { date: '2026-03-22T09:00:00', action: 'Issue verified by warden', user: 'Warden Singh', status: 'verified' },
      { date: '2026-03-23T11:00:00', action: 'Assigned to network team', user: 'Warden Singh', status: 'assigned' }
    ]
  },
  {
    id: 'ISS006',
    title: 'Broken Window Glass',
    category: 'Maintenance',
    description: 'Window glass has a large crack, safety concern.',
    status: 'rejected',
    priority: 'medium',
    createdAt: '2026-03-19T16:00:00',
    updatedAt: '2026-03-20T09:00:00',
    studentName: 'Karan Verma',
    studentId: 'STU006',
    room: '201',
    block: 'A',
    rejectionReason: 'Student admitted to causing damage during sports activity. Repair cost will be deducted from security deposit.',
    timeline: [
      { date: '2026-03-19T16:00:00', action: 'Issue reported by student', user: 'Karan Verma', status: 'reported' },
      { date: '2026-03-20T09:00:00', action: 'Issue rejected by warden', user: 'Warden Singh', status: 'rejected', note: 'Student admitted to causing damage during sports activity. Repair cost will be deducted from security deposit.' }
    ]
  },
  {
    id: 'ISS007',
    title: 'Light Bulb Not Working',
    category: 'Electrical',
    description: 'Main ceiling light stopped working yesterday evening.',
    status: 'closed',
    priority: 'low',
    createdAt: '2026-03-15T18:00:00',
    updatedAt: '2026-03-17T14:00:00',
    studentName: 'Ankit Sharma',
    studentId: 'STU008',
    room: '202',
    block: 'A',
    assignedTo: 'Rajesh Electrician',
    timeline: [
      { date: '2026-03-15T18:00:00', action: 'Issue reported by student', user: 'Ankit Sharma', status: 'reported' },
      { date: '2026-03-16T09:00:00', action: 'Issue verified by warden', user: 'Warden Singh', status: 'verified' },
      { date: '2026-03-16T10:00:00', action: 'Assigned to worker', user: 'Warden Singh', status: 'assigned' },
      { date: '2026-03-16T14:00:00', action: 'Work started', user: 'Rajesh Electrician', status: 'in-progress' },
      { date: '2026-03-16T15:00:00', action: 'Work completed', user: 'Rajesh Electrician', status: 'resolved', note: 'Replaced bulb' },
      { date: '2026-03-16T15:05:00', action: 'Awaiting student verification', user: 'System', status: 'awaiting-verification' },
      { date: '2026-03-17T14:00:00', action: 'Confirmed by student', user: 'Ankit Sharma', status: 'closed', note: 'Issue resolved, working fine now' }
    ]
  },
  {
    id: 'ISS008',
    title: 'Bathroom Drain Blocked',
    category: 'Plumbing',
    description: 'Water not draining properly from bathroom floor.',
    status: 'reopened',
    priority: 'medium',
    createdAt: '2026-03-14T10:00:00',
    updatedAt: '2026-03-24T08:00:00',
    studentName: 'Neha Kapoor',
    studentId: 'STU011',
    room: '306',
    block: 'B',
    assignedTo: 'Plumbing Team',
    timeline: [
      { date: '2026-03-14T10:00:00', action: 'Issue reported by student', user: 'Neha Kapoor', status: 'reported' },
      { date: '2026-03-14T14:00:00', action: 'Issue verified by warden', user: 'Warden Singh', status: 'verified' },
      { date: '2026-03-15T09:00:00', action: 'Assigned to plumber', user: 'Warden Singh', status: 'assigned' },
      { date: '2026-03-16T11:00:00', action: 'Work started', user: 'Plumbing Team', status: 'in-progress' },
      { date: '2026-03-16T15:00:00', action: 'Work completed', user: 'Plumbing Team', status: 'resolved', note: 'Cleared blockage' },
      { date: '2026-03-16T15:05:00', action: 'Awaiting student verification', user: 'System', status: 'awaiting-verification' },
      { date: '2026-03-17T10:00:00', action: 'Confirmed by student', user: 'Neha Kapoor', status: 'closed' },
      { date: '2026-03-24T08:00:00', action: 'Reopened by student', user: 'Neha Kapoor', status: 'reopened', note: 'Problem occurred again, water still not draining properly' }
    ]
  }
];

export const mockRooms: Room[] = [
  {
    id: 'R001',
    number: '201',
    floor: 2,
    block: 'A',
    capacity: 3,
    occupied: 3,
    beds: [
      { id: 'B001', number: 1, status: 'occupied', student: { id: 'STU001', name: 'Rahul Kumar', email: 'rahul@example.com', phone: '9876543210' } },
      { id: 'B002', number: 2, status: 'occupied', student: { id: 'STU006', name: 'Karan Verma', email: 'karan@example.com', phone: '9876543211' } },
      { id: 'B003', number: 3, status: 'occupied', student: { id: 'STU007', name: 'Rohit Gupta', email: 'rohit@example.com', phone: '9876543212' } }
    ]
  },
  {
    id: 'R002',
    number: '202',
    floor: 2,
    block: 'A',
    capacity: 3,
    occupied: 2,
    beds: [
      { id: 'B004', number: 1, status: 'occupied', student: { id: 'STU008', name: 'Ankit Sharma', email: 'ankit@example.com', phone: '9876543213' } },
      { id: 'B005', number: 2, status: 'occupied', student: { id: 'STU009', name: 'Vishal Jain', email: 'vishal@example.com', phone: '9876543214' } },
      { id: 'B006', number: 3, status: 'vacant' }
    ]
  },
  {
    id: 'R003',
    number: '305',
    floor: 3,
    block: 'B',
    capacity: 2,
    occupied: 2,
    beds: [
      { id: 'B007', number: 1, status: 'occupied', student: { id: 'STU002', name: 'Priya Sharma', email: 'priya@example.com', phone: '9876543215' } },
      { id: 'B008', number: 2, status: 'occupied', student: { id: 'STU010', name: 'Anjali Singh', email: 'anjali@example.com', phone: '9876543216' } }
    ]
  },
  {
    id: 'R004',
    number: '306',
    floor: 3,
    block: 'B',
    capacity: 2,
    occupied: 1,
    beds: [
      { id: 'B009', number: 1, status: 'occupied', student: { id: 'STU011', name: 'Neha Kapoor', email: 'neha@example.com', phone: '9876543217' } },
      { id: 'B010', number: 2, status: 'vacant' }
    ]
  },
  {
    id: 'R005',
    number: '102',
    floor: 1,
    block: 'A',
    capacity: 3,
    occupied: 2,
    beds: [
      { id: 'B011', number: 1, status: 'occupied', student: { id: 'STU003', name: 'Amit Patel', email: 'amit@example.com', phone: '9876543218' } },
      { id: 'B012', number: 2, status: 'vacant' },
      { id: 'B013', number: 3, status: 'maintenance' }
    ]
  },
  {
    id: 'R006',
    number: '408',
    floor: 4,
    block: 'C',
    capacity: 3,
    occupied: 3,
    beds: [
      { id: 'B014', number: 1, status: 'occupied', student: { id: 'STU004', name: 'Sneha Reddy', email: 'sneha@example.com', phone: '9876543219' } },
      { id: 'B015', number: 2, status: 'occupied', student: { id: 'STU012', name: 'Divya Rao', email: 'divya@example.com', phone: '9876543220' } },
      { id: 'B016', number: 3, status: 'occupied', student: { id: 'STU013', name: 'Kavya Nair', email: 'kavya@example.com', phone: '9876543221' } }
    ]
  },
  {
    id: 'R007',
    number: '215',
    floor: 2,
    block: 'A',
    capacity: 3,
    occupied: 3,
    beds: [
      { id: 'B017', number: 1, status: 'occupied', student: { id: 'STU005', name: 'Vikram Singh', email: 'vikram@example.com', phone: '9876543222' } },
      { id: 'B018', number: 2, status: 'occupied', student: { id: 'STU014', name: 'Arjun Mehta', email: 'arjun@example.com', phone: '9876543223' } },
      { id: 'B019', number: 3, status: 'occupied', student: { id: 'STU015', name: 'Ravi Kumar', email: 'ravi@example.com', phone: '9876543224' } }
    ]
  },
  {
    id: 'R008',
    number: '103',
    floor: 1,
    block: 'A',
    capacity: 2,
    occupied: 0,
    beds: [
      { id: 'B020', number: 1, status: 'vacant' },
      { id: 'B021', number: 2, status: 'vacant' }
    ]
  }
];

export const currentStudent: Student = {
  id: 'STU001',
  name: 'Rahul Kumar',
  email: 'rahul@example.com',
  phone: '9876543210',
  roomId: 'R001',
  bedId: 'B001'
};
