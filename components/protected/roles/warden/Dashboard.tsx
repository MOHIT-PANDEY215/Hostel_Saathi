'use client';
import { AlertCircle, CheckCircle, Clock, Users, Bed, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockIssues, mockRooms } from '@/utils/mockData';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function WardenDashboard() {
  const totalIssues = mockIssues.length;
  const pendingIssues = mockIssues.filter(i => i.status === 'pending').length;
  const inProgressIssues = mockIssues.filter(i => i.status === 'in-progress').length;
  const resolvedIssues = mockIssues.filter(i => i.status === 'resolved').length;

  const totalBeds = mockRooms.reduce((sum, room) => sum + room.capacity, 0);
  const occupiedBeds = mockRooms.reduce((sum, room) => sum + room.occupied, 0);
  const occupancyRate = ((occupiedBeds / totalBeds) * 100).toFixed(1);

  const kpis = [
    {
      title: 'Total Issues',
      value: totalIssues,
      change: '+12%',
      trend: 'up',
      icon: AlertCircle,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-500/10',
    },
    {
      title: 'Pending Issues',
      value: pendingIssues,
      change: '-5%',
      trend: 'down',
      icon: Clock,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-500/10',
    },
    {
      title: 'Resolved',
      value: resolvedIssues,
      change: '+24%',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-500/10',
    },
    {
      title: 'Occupancy Rate',
      value: `${occupancyRate}%`,
      change: '+3%',
      trend: 'up',
      icon: Bed,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-500/10',
    },
  ];

  // Issue status distribution
  const statusData = [
    { name: 'Pending', value: pendingIssues, color: '#f59e0b' },
    { name: 'In Progress', value: inProgressIssues, color: '#3b82f6' },
    { name: 'Resolved', value: resolvedIssues, color: '#10b981' },
  ];

  // Issue trend data (last 7 days)
  const trendData = [
    { day: 'Mon', issues: 3, resolved: 2 },
    { day: 'Tue', issues: 5, resolved: 3 },
    { day: 'Wed', issues: 2, resolved: 4 },
    { day: 'Thu', issues: 4, resolved: 2 },
    { day: 'Fri', issues: 3, resolved: 5 },
    { day: 'Sat', issues: 6, resolved: 3 },
    { day: 'Sun', issues: 2, resolved: 4 },
  ];

  // Room occupancy by block
  const blockData = ['A', 'B', 'C'].map(block => {
    const blockRooms = mockRooms.filter(r => r.block === block);
    const total = blockRooms.reduce((sum, r) => sum + r.capacity, 0);
    const occupied = blockRooms.reduce((sum, r) => sum + r.occupied, 0);
    return {
      block: `Block ${block}`,
      total,
      occupied,
      vacant: total - occupied,
    };
  });

  // Category distribution
  const categoryCount: { [key: string]: number } = {};
  mockIssues.forEach(issue => {
    categoryCount[issue.category] = (categoryCount[issue.category] || 0) + 1;
  });
  const categoryData = Object.entries(categoryCount).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
          Warden Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Overview of hostel operations and maintenance
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <Card key={index} className="border-gray-200 dark:border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${kpi.bgColor}`}>
                  <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
                <Badge
                  variant="outline"
                  className={
                    kpi.trend === 'up'
                      ? 'text-green-600 dark:text-green-400 border-green-200 dark:border-green-800'
                      : 'text-red-600 dark:text-red-400 border-red-200 dark:border-red-800'
                  }
                >
                  {kpi.change}
                </Badge>
              </div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {kpi.title}
              </p>
              <p className="text-3xl font-semibold text-gray-900 dark:text-white mt-2">
                {kpi.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issue Trend */}
        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle>Issue Trends</CardTitle>
            <CardDescription>New vs Resolved issues (Last 7 days)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis 
                  dataKey="day" 
                  className="text-gray-600 dark:text-gray-400"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  className="text-gray-600 dark:text-gray-400"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgb(var(--background))',
                    border: '1px solid rgb(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="issues" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="New Issues"
                />
                <Line 
                  type="monotone" 
                  dataKey="resolved" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Resolved"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle>Issue Status Distribution</CardTitle>
            <CardDescription>Current status breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(Number(percent) * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Room Occupancy by Block */}
        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle>Room Occupancy by Block</CardTitle>
            <CardDescription>Bed occupancy across hostel blocks</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={blockData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis 
                  dataKey="block" 
                  className="text-gray-600 dark:text-gray-400"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  className="text-gray-600 dark:text-gray-400"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgb(var(--background))',
                    border: '1px solid rgb(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="occupied" fill="#6366f1" name="Occupied" />
                <Bar dataKey="vacant" fill="#e5e7eb" name="Vacant" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Issue Categories */}
        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle>Issue Categories</CardTitle>
            <CardDescription>Distribution by category type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={100}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgb(var(--background))',
                    border: '1px solid rgb(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="value" fill="#8b5cf6" name="Count" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle>Recent Issues</CardTitle>
          <CardDescription>Latest reported issues requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockIssues.slice(0, 5).map((issue) => {
              const getStatusColor = (status: string) => {
                switch (status) {
                  case 'pending': return 'bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
                  case 'in-progress': return 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400';
                  case 'resolved': return 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400';
                  default: return 'bg-gray-100 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400';
                }
              };

              return (
                <div
                  key={issue.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {issue.title}
                      </h4>
                      <Badge className={getStatusColor(issue.status)}>
                        {issue.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {issue.studentName} • Room {issue.room}, Block {issue.block} • {issue.category}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    #{issue.id}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
