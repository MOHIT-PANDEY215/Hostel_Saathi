'use client'
import { CheckCircle, Clock, AlertCircle, Package } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockIssues } from '@/utils/mockData';
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/navigation';
// import { useNavigate } from 'react-router';

export default function WorkerDashboard() {
  const navigate = useRouter();
  const workerName = 'Rajesh Electrician';
  
  const myTasks = mockIssues.filter(issue => issue.assignedTo === workerName);
  const pendingTasks = myTasks.filter(t => t.status === 'pending' || t.status === 'in-progress');
  const completedToday = myTasks.filter(t => {
    const issueDate = new Date(t.updatedAt);
    const today = new Date();
    return t.status === 'resolved' && issueDate.toDateString() === today.toDateString();
  }).length;

  const stats = [
    {
      title: 'Assigned Tasks',
      value: myTasks.length,
      icon: Package,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-500/10',
    },
    {
      title: 'Pending',
      value: pendingTasks.length,
      icon: Clock,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-500/10',
    },
    {
      title: 'Completed Today',
      value: completedToday,
      icon: CheckCircle,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-500/10',
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400';
      case 'medium': return 'bg-orange-100 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400';
      case 'low': return 'bg-gray-100 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400';
      default: return 'bg-gray-100 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
          Welcome back, {workerName}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Here are your assigned tasks for today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-gray-200 dark:border-gray-800 hover:shadow-md dark:hover:shadow-gray-900/50 transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-semibold text-gray-900 dark:text-white mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button 
          onClick={() => navigate.push('/worker/tasks')}
          className="p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-indigo-500 dark:hover:border-indigo-400 hover:shadow-lg dark:hover:shadow-indigo-900/20 transition-all text-left group bg-white dark:bg-gray-900"
        >
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Package className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">View All Tasks</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            See all your assigned maintenance tasks
          </p>
        </button>
        <button className="p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-green-500 dark:hover:border-green-400 hover:shadow-lg dark:hover:shadow-green-900/20 transition-all text-left group bg-white dark:bg-gray-900">
          <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Mark Completed</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Update task status and upload proof
          </p>
        </button>
        <button className="p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-orange-500 dark:hover:border-orange-400 hover:shadow-lg dark:hover:shadow-orange-900/20 transition-all text-left group bg-white dark:bg-gray-900">
          <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <AlertCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Report Issue</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Report problems that need escalation
          </p>
        </button>
      </div>

      {/* Today's Tasks */}
      <Card className="border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle>Today's Tasks</CardTitle>
          <CardDescription>Tasks that need your attention</CardDescription>
        </CardHeader>
        <CardContent>
          {pendingTasks.length > 0 ? (
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => navigate.push('/worker/tasks')}
                  className="group p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-indigo-500 dark:hover:border-indigo-400 hover:shadow-md dark:hover:shadow-indigo-900/20 transition-all cursor-pointer bg-white dark:bg-gray-900"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {task.title}
                        </h4>
                        <Badge className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                        <Badge className={getPriorityColor(task.priority)} variant="outline">
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {task.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>Room {task.room}, Block {task.block}</span>
                        <span>•</span>
                        <span>{task.category}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      #{task.id}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                All caught up!
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                No pending tasks for today. Great work!
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Completions */}
      <Card className="border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle>Recently Completed</CardTitle>
          <CardDescription>Your completed tasks</CardDescription>
        </CardHeader>
        <CardContent>
          {myTasks.filter(t => t.status === 'resolved').length > 0 ? (
            <div className="space-y-3">
              {myTasks.filter(t => t.status === 'resolved').slice(0, 3).map((task) => (
                <div
                  key={task.id}
                  className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {task.title}
                        </h4>
                        <Badge className={getStatusColor(task.status)}>
                          Completed
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 ml-8">
                        Room {task.room}, Block {task.block} • {formatDistanceToNow(new Date(task.updatedAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                No completed tasks yet
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
