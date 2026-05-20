'use client'
import { useState } from 'react';
import { Bed, Users, Plus, Search, Filter, UserPlus, UserMinus, Edit } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { mockRooms, Room, Bed as BedType } from '@/utils/mockData';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface DraggableStudentProps {
  name: string;
  id: string;
}

const DraggableStudent = ({ name, id }: DraggableStudentProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'student',
    item: { id, name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 cursor-move hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <p className="text-sm font-medium text-gray-900 dark:text-white">{name}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">ID: {id}</p>
    </div>
  );
};

interface DroppableBedProps {
  bed: BedType;
  roomNumber: string;
  onDrop: (studentId: string, bedId: string) => void;
}

const DroppableBed = ({ bed, roomNumber, onDrop }: DroppableBedProps) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'student',
    drop: (item: { id: string; name: string }) => {
      if (bed.status === 'vacant') {
        onDrop(item.id, bed.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const getBedColor = () => {
    if (bed.status === 'occupied') {
      return 'border-green-500 bg-green-50 dark:bg-green-500/10';
    } else if (bed.status === 'maintenance') {
      return 'border-red-500 bg-red-50 dark:bg-red-500/10';
    } else {
      return isOver
        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10'
        : 'border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800';
    }
  };

  return (
    <div
      ref={drop}
      className={`p-3 rounded-lg border-2 transition-all ${getBedColor()}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Bed className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Bed {bed.number}
          </span>
        </div>
        {bed.status === 'occupied' && bed.student && (
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <UserMinus className="w-3 h-3" />
          </Button>
        )}
      </div>
      {bed.status === 'occupied' && bed.student ? (
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {bed.student.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {bed.student.id}
          </p>
        </div>
      ) : bed.status === 'vacant' ? (
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Drag student here
        </p>
      ) : (
        <p className="text-xs text-red-600 dark:text-red-400">
          Under maintenance
        </p>
      )}
    </div>
  );
};

function RoomAllocationContent() {
  const [selectedBlock, setSelectedBlock] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFloor, setSelectedFloor] = useState<string>('all');

  const filteredRooms = mockRooms.filter(room => {
    const matchesBlock = selectedBlock === 'all' || room.block === selectedBlock;
    const matchesSearch = room.number.includes(searchQuery);
    const matchesFloor = selectedFloor === 'all' || room.floor.toString() === selectedFloor;
    return matchesBlock && matchesSearch && matchesFloor;
  });

  const totalBeds = mockRooms.reduce((sum, room) => sum + room.capacity, 0);
  const occupiedBeds = mockRooms.reduce((sum, room) => sum + room.occupied, 0);
  const vacantBeds = totalBeds - occupiedBeds;

  const unassignedStudents = [
    { id: 'STU016', name: 'Aditya Kumar' },
    { id: 'STU017', name: 'Siddharth Joshi' },
    { id: 'STU018', name: 'Pooja Desai' },
  ];

  const handleStudentDrop = (studentId: string, bedId: string) => {
    console.log(`Assigning student ${studentId} to bed ${bedId}`);
    // In a real app, this would update the state/backend
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Room Allocation
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage room and bed assignments
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Room
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Room</DialogTitle>
              <DialogDescription>
                Create a new room in the hostel
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Room Number</Label>
                <Input placeholder="e.g., 401" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Block</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select block" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">Block A</SelectItem>
                      <SelectItem value="B">Block B</SelectItem>
                      <SelectItem value="C">Block C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Floor</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select floor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Floor 1</SelectItem>
                      <SelectItem value="2">Floor 2</SelectItem>
                      <SelectItem value="3">Floor 3</SelectItem>
                      <SelectItem value="4">Floor 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Number of Beds</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select capacity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 beds</SelectItem>
                    <SelectItem value="3">3 beds</SelectItem>
                    <SelectItem value="4">4 beds</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Create Room
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-gray-200 dark:border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Beds
                </p>
                <p className="text-3xl font-semibold text-gray-900 dark:text-white mt-2">
                  {totalBeds}
                </p>
              </div>
              <Bed className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200 dark:border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Occupied
                </p>
                <p className="text-3xl font-semibold text-green-600 dark:text-green-400 mt-2">
                  {occupiedBeds}
                </p>
              </div>
              <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200 dark:border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Vacant
                </p>
                <p className="text-3xl font-semibold text-orange-600 dark:text-orange-400 mt-2">
                  {vacantBeds}
                </p>
              </div>
              <Bed className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200 dark:border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Occupancy
                </p>
                <p className="text-3xl font-semibold text-indigo-600 dark:text-indigo-400 mt-2">
                  {((occupiedBeds / totalBeds) * 100).toFixed(0)}%
                </p>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-indigo-600 dark:border-indigo-400 flex items-center justify-center">
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  {((occupiedBeds / totalBeds) * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Unassigned Students Sidebar */}
        <Card className="border-gray-200 dark:border-gray-800 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Unassigned Students</CardTitle>
            <CardDescription>Drag to assign beds</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {unassignedStudents.map(student => (
              <DraggableStudent key={student.id} name={student.name} id={student.id} />
            ))}
            {unassignedStudents.length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
                No unassigned students
              </p>
            )}
          </CardContent>
        </Card>

        {/* Room Grid */}
        <div className="lg:col-span-3 space-y-6">
          {/* Filters */}
          <Card className="border-gray-200 dark:border-gray-800">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search rooms..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedBlock} onValueChange={setSelectedBlock}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="All Blocks" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Blocks</SelectItem>
                    <SelectItem value="A">Block A</SelectItem>
                    <SelectItem value="B">Block B</SelectItem>
                    <SelectItem value="C">Block C</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedFloor} onValueChange={setSelectedFloor}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="All Floors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Floors</SelectItem>
                    <SelectItem value="1">Floor 1</SelectItem>
                    <SelectItem value="2">Floor 2</SelectItem>
                    <SelectItem value="3">Floor 3</SelectItem>
                    <SelectItem value="4">Floor 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Rooms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRooms.map(room => (
              <Card key={room.id} className="border-gray-200 dark:border-gray-800">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Room {room.number}</CardTitle>
                      <CardDescription>
                        Block {room.block} • Floor {room.floor}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={
                          room.occupied === room.capacity
                            ? 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400'
                            : room.occupied === 0
                            ? 'bg-gray-100 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400'
                            : 'bg-orange-100 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400'
                        }
                      >
                        {room.occupied}/{room.capacity}
                      </Badge>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {room.beds.map(bed => (
                    <DroppableBed
                      key={bed.id}
                      bed={bed}
                      roomNumber={room.number}
                      onDrop={handleStudentDrop}
                    />
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <Card className="border-gray-200 dark:border-gray-800">
        <CardContent className="p-4">
          <div className="flex items-center gap-6">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Legend:
            </span>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-green-500 bg-green-50 dark:bg-green-500/10" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Occupied</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Vacant</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-red-500 bg-red-50 dark:bg-red-500/10" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Maintenance</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function WardenRoomAllocation() {
  return (
    <DndProvider backend={HTML5Backend}>
      <RoomAllocationContent />
    </DndProvider>
  );
}
