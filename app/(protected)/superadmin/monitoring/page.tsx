'use client'
import { useState } from 'react';
import { Search, Filter, Activity, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockIssues } from '@/utils/mockData';
import { mockActivityLogs } from '@/utils/superAdminMockData';
import { formatDistanceToNow } from 'date-fns';

export default function SuperAdminMonitoring() {
  const [searchQuery, setSearchQuery] = useState('');
  const [hostelFilter, setHostelFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activityTypeFilter, setActivityTypeFilter] = useState<string>('all');

  // Add hostel info to issues (mock)
  const issuesWithHostel = mockIssues.map(issue => ({
    ...issue,
    hostel: issue.block === 'A' ? 'Sunrise Boys Hostel' : issue.block === 'B' ? 'Lakeview Girls Hostel' : 'Tech Tower Hostel',
  }));

  const filteredIssues = issuesWithHostel.filter(issue => {
    const matchesSearch = 
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesHostel = hostelFilter === 'all' || issue.hostel === hostelFilter;
    const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
    return matchesSearch && matchesHostel && matchesStatus;
  });

  const filteredLogs = mockActivityLogs.filter(log => {
    const matchesHostel = hostelFilter === 'all' || log.hostel === hostelFilter;
    const matchesType = activityTypeFilter === 'all' || log.type === activityTypeFilter;
    const matchesSearch = 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesHostel && matchesType && matchesSearch;
  });

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

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case 'issue': return 'bg-orange-100 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400';
      case 'room': return 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400';
      case 'user': return 'bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400';
      case 'system': return 'bg-gray-100 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400';
      default: return 'bg-gray-100 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'issue': return '🔧';
      case 'room': return '🏠';
      case 'user': return '👤';
      case 'system': return '⚙️';
      default: return '📋';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
          System Monitoring
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Monitor all complaints and system activity across hostels
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-gray-200 dark:border-gray-800">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Issues</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
              {mockIssues.length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-gray-200 dark:border-gray-800">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
            <p className="text-2xl font-semibold text-yellow-600 dark:text-yellow-400 mt-1">
              {mockIssues.filter(i => i.status === 'pending').length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-gray-200 dark:border-gray-800">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
            <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mt-1">
              {mockIssues.filter(i => i.status === 'in-progress').length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-gray-200 dark:border-gray-800">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Activity Logs</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
              {mockActivityLogs.length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-gray-200 dark:border-gray-800">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={hostelFilter} onValueChange={setHostelFilter}>
              <SelectTrigger className="w-full md:w-56">
                <SelectValue placeholder="All Hostels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Hostels</SelectItem>
                <SelectItem value="Sunrise Boys Hostel">Sunrise Boys Hostel</SelectItem>
                <SelectItem value="Lakeview Girls Hostel">Lakeview Girls Hostel</SelectItem>
                <SelectItem value="Tech Tower Hostel">Tech Tower Hostel</SelectItem>
                <SelectItem value="Green Valley Hostel">Green Valley Hostel</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="issues" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="issues">All Complaints</TabsTrigger>
          <TabsTrigger value="activity">Activity Logs</TabsTrigger>
        </TabsList>

        {/* Issues Tab */}
        <TabsContent value="issues" className="space-y-4">
          <Card className="border-gray-200 dark:border-gray-800">
            <CardContent className="p-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-4">
            {filteredIssues.length > 0 ? (
              filteredIssues.map((issue) => (
                <Card
                  key={issue.id}
                  className="border-gray-200 dark:border-gray-800 hover:shadow-md dark:hover:shadow-gray-900/50 transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {issue.title}
                          </h3>
                          <Badge className={getStatusColor(issue.status)}>
                            {issue.status}
                          </Badge>
                          <Badge className={getPriorityColor(issue.priority)} variant="outline">
                            {issue.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {issue.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-medium">{issue.hostel}</span>
                          <span>•</span>
                          <span>Room {issue.room}, Block {issue.block}</span>
                          <span>•</span>
                          <span>{issue.category}</span>
                          <span>•</span>
                          <span>{issue.studentName}</span>
                          <span>•</span>
                          <span>{formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}</span>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        #{issue.id}
                      </span>
                    </div>
                    {issue.assignedTo && (
                      <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Assigned to: <span className="font-medium text-gray-900 dark:text-white">{issue.assignedTo}</span>
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="border-gray-200 dark:border-gray-800">
                <CardContent className="p-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No issues found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Try adjusting your filters
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Activity Logs Tab */}
        <TabsContent value="activity" className="space-y-4">
          <Card className="border-gray-200 dark:border-gray-800">
            <CardContent className="p-4">
              <Select value={activityTypeFilter} onValueChange={setActivityTypeFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="issue">Issues</SelectItem>
                  <SelectItem value="room">Room</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="border-gray-200 dark:border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Activity Timeline
              </CardTitle>
              <CardDescription>
                Real-time system activity across all hostels
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredLogs.length > 0 ? (
                <div className="space-y-4">
                  {filteredLogs.map((log, index) => (
                    <div
                      key={log.id}
                      className="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex flex-col items-center">
                        <div className="text-2xl">{getActivityIcon(log.type)}</div>
                        {index < filteredLogs.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 mt-2" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {log.action}
                          </p>
                          <Badge className={getActivityTypeColor(log.type)}>
                            {log.type}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-medium">{log.hostel}</span>
                          <span>•</span>
                          <span>{log.user}</span>
                          <span>•</span>
                          <span>{formatDistanceToNow(new Date(log.timestamp), { addSuffix: true })}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                    <Activity className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No activity logs found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Try adjusting your filters
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
