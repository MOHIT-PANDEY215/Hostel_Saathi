'use client'
import { AlertCircle, CheckCircle, Clock, Home } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockIssues, mockRooms, currentStudent } from "@/utils/mockData";
import { formatDistanceToNow } from 'date-fns';
import { useAuthStore } from '@/stores/authStore';

export default function StudentDashboard() {
  const {user} = useAuthStore();
  console.log(user)
  const myIssues = mockIssues.filter(issue => issue.studentId === currentStudent.id);
  const myRoom = mockRooms.find(room => room.id === currentStudent.roomId);
  const myBed = myRoom?.beds.find(bed => bed.id === currentStudent.bedId);

  const stats = [
    {
      title: 'Active Issues',
      value: myIssues.filter(i => i.status !== 'resolved').length,
      icon: AlertCircle,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-500/10',
    },
    {
      title: 'Resolved Issues',
      value: myIssues.filter(i => i.status === 'resolved').length,
      icon: CheckCircle,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-500/10',
    },
    {
      title: 'My Room',
      value: myRoom?.number || 'N/A',
      icon: Home,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-500/10',
      subtitle: `Block ${myRoom?.block} • Bed ${myBed?.number}`,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
      case 'in-progress': return 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400';
      case 'resolved': return 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400';
      default: return 'bg-gray-100 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
          Welcome back, {user?.fullName}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Here's what's happening with your hostel today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-gray-200 dark:border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-semibold text-gray-900 dark:text-white mt-2">
                    {stat.value}
                  </p>
                  {stat.subtitle && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {stat.subtitle}
                    </p>
                  )}
                </div>
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Issues */}
        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle>Recent Issues</CardTitle>
            <CardDescription>Your recently reported issues</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {myIssues.slice(0, 3).map((issue) => (
              <div
                key={issue.id}
                className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {issue.title}
                  </h4>
                  <Badge className={getStatusColor(issue.status)}>
                    {issue.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {issue.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="w-3 h-3" />
                  {formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}
                </div>
              </div>
            ))}
            {myIssues.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                No issues reported yet
              </p>
            )}
          </CardContent>
        </Card>

        {/* Roommates */}
        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle>Your Roommates</CardTitle>
            <CardDescription>People sharing your room</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {myRoom?.beds
              .filter(bed => bed.status === 'occupied' && bed.student?.id !== currentStudent.id)
              .map((bed) => (
                <div
                  key={bed.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium">
                    {bed.student?.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {bed.student?.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Bed {bed.number}
                    </p>
                  </div>
                  <Badge variant="outline">Roommate</Badge>
                </div>
              ))}
            {myRoom?.beds.filter(bed => bed.status === 'occupied' && bed.student?.id !== currentStudent.id).length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                No roommates assigned
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks you might want to perform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all text-left group">
              <AlertCircle className="w-6 h-6 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 mb-2" />
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                Report New Issue
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Submit a maintenance or complaint request
              </p>
            </button>
            <button className="p-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all text-left group">
              <Home className="w-6 h-6 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 mb-2" />
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                View Room Details
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Check your room and bed information
              </p>
            </button>
            <button className="p-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all text-left group">
              <CheckCircle className="w-6 h-6 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 mb-2" />
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                Track Issues
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                View status of your reported issues
              </p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
