'use client';

import {
  Home,
  Users,
  Bed,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// replace later with API
import { mockRooms, currentStudent } from '@/utils/mockData';

export default function StudentRoomSection() {
  const myRoom = mockRooms.find(
    (room) => room.id === currentStudent.roomId
  );

  const myBed = myRoom?.beds.find(
    (bed) => bed.id === currentStudent.bedId
  );

  const roommates = myRoom?.beds.filter(
    (bed) =>
      bed.status === 'occupied' &&
      bed.student?.id !== currentStudent.id
  );

  if (!myRoom) {
    return (
      <div className="p-6">
        <Card className="border-gray-200 dark:border-gray-800">
          <CardContent className="p-12 text-center">
            <Home className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No room assigned yet</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
          My Room
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Your room details and roommate information
        </p>
      </div>

      {/* Room Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle>Room Details</CardTitle>
            <CardDescription>Your allocated room information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-500/10">
                <Home className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Room Number</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                  {myRoom.number}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-500/10">
                <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Block</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                  {myRoom.block}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-500/10">
                <Bed className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Your Bed</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                  {myBed?.number}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-green-50 dark:bg-green-500/10">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400 mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Occupancy</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                  {myRoom.occupied}/{myRoom.capacity}
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                Bed Arrangement
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {myRoom.beds.map((bed) => (
                  <div
                    key={bed.id}
                    className={`p-4 rounded-xl border-2 ${
                      bed.id === myBed?.id
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10'
                        : bed.status === 'occupied'
                        ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                        : 'border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Bed className="w-5 h-5 text-gray-400" />
                      {bed.id === myBed?.id && (
                        <Badge className="bg-indigo-500 text-white">You</Badge>
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Bed {bed.number}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {bed.status === 'occupied' 
                        ? bed.student?.name 
                        : bed.status === 'vacant' 
                        ? 'Vacant' 
                        : 'Maintenance'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Info */}
        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle>Quick Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Floor</p>
              <p className="font-medium text-gray-900 dark:text-white">
                Floor {myRoom.floor}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Hostel Block</p>
              <p className="font-medium text-gray-900 dark:text-white">
                Block {myRoom.block}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Room Capacity</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {myRoom.capacity} beds
              </p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Status</p>
              <Badge className="bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400">
                Active
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Roommates */}
      <Card className="border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle>Roommates</CardTitle>
          <CardDescription>
            People sharing your room ({roommates?.length || 0} roommate{roommates?.length !== 1 ? 's' : ''})
          </CardDescription>
        </CardHeader>
        <CardContent>
          {roommates && roommates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roommates.map((bed) => (
                <div
                  key={bed.id}
                  className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                      {bed.student?.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {bed.student?.name}
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          Bed {bed.number}
                        </Badge>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Mail className="w-3.5 h-3.5" />
                          <span className="truncate">{bed.student?.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Phone className="w-3.5 h-3.5" />
                          <span>{bed.student?.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                You don't have any roommates yet
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}