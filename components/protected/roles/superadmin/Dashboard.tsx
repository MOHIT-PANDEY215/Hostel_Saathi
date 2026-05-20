'use client'
import { Building2, Users, DollarSign, AlertCircle, TrendingUp, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockHostels, mockActivityLogs } from '@/utils/superAdminMockData';
import { mockIssues } from '@/utils/mockData';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { formatDistanceToNow } from 'date-fns';
import { useGetDashboard } from '@/hooks/roles/useSuperAdmin';

export default function SuperAdminDashboard() {
  const totalHostels = mockHostels.length;
  const totalBeds = mockHostels.reduce((sum, h) => sum + h.totalBeds, 0);
  const occupiedBeds = mockHostels.reduce((sum, h) => sum + h.occupiedBeds, 0);
  const totalRevenue = mockHostels.reduce((sum, h) => sum + h.revenue, 0);
  const totalIssues = mockHostels.reduce((sum, h) => sum + h.activeIssues, 0);
  const occupancyRate = ((occupiedBeds / totalBeds) * 100).toFixed(1);

  
  const { isPending, isError, data, error } = useGetDashboard()
  console.log(data,"data")
  const kpiFromData = data?.data?.kpis
  const hostelFromData = data?.data?.hostels

  const kpis = [
    {
      title: 'Total Hostels',
      value: kpiFromData?.totalHostels,
      change: '+2',
      trend: 'up',
      icon: Building2,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-500/10',
    },
    {
      title: 'Total Students',
      value: occupiedBeds,
      change: '+45',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-500/10',
    },
    {
      title: 'Total Revenue',
      value: `₹${(totalRevenue / 100000).toFixed(1)}L`,
      change: '+12%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-500/10',
    },
    {
      title: 'Active Issues',
      value: totalIssues,
      change: '-3',
      trend: 'down',
      icon: AlertCircle,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-500/10',
    },
  ];

  // Hostel occupancy data
  const hostelData = hostelFromData?.map(h => ({
    name: h.name.split(' ')[0],
    occupancy: ((h.occupiedBeds / h.totalBeds) * 100).toFixed(0),
    occupied: h.occupiedBeds,
    vacant: h.totalBeds - h.occupiedBeds,
  }));

  // Revenue trend (mock data)
  const revenueTrend = [
    { month: 'Jan', revenue: 1200000 },
    { month: 'Feb', revenue: 1350000 },
    { month: 'Mar', revenue: 1640000 },
    { month: 'Apr', revenue: 1520000 },
    { month: 'May', revenue: 1680000 },
    { month: 'Jun', revenue: totalRevenue },
  ];

  // Issue distribution
  const issueTypes = [
    { name: 'Electrical', value: 8, color: '#3b82f6' },
    { name: 'Plumbing', value: 5, color: '#8b5cf6' },
    { name: 'Network', value: 3, color: '#f59e0b' },
    { name: 'Maintenance', value: 2, color: '#10b981' },
  ];

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
          Super Admin Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Multi-hostel platform overview and management
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <Card key={index} className="border-gray-200 dark:border-gray-800 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${kpi?.bgColor}`}>
                  <kpi.icon className={`w-6 h-6 ${kpi?.color}`} />
                </div>
                <Badge
                  variant="outline"
                  className={
                    kpi?.trend === 'up'
                      ? 'text-green-600 dark:text-green-400 border-green-200 dark:border-green-800'
                      : 'text-red-600 dark:text-red-400 border-red-200 dark:border-red-800'
                  }
                >
                  {kpi?.change}
                </Badge>
              </div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {kpi?.title}
              </p>
              <p className="text-3xl font-semibold text-gray-900 dark:text-white mt-2">
                {kpi?.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        {/* <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue across all hostels</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueTrend}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis
                  dataKey="month"
                  className="text-gray-600 dark:text-gray-400"
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  className="text-gray-600 dark:text-gray-400"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `₹${value / 100000}L`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgb(var(--background))',
                    border: '1px solid rgb(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => `₹${value.toLocaleString()}`}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 5 }}
                  name="Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card> */}

        {/* Hostel Occupancy */}
        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle>Hostel Occupancy</CardTitle>
            <CardDescription>Bed occupancy across hostels</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hostelData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis
                  dataKey="name"
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
                <Bar dataKey="occupied" fill="#6366f1" name="Occupied" radius={[8, 8, 0, 0]} />
                <Bar dataKey="vacant" fill="#e5e7eb" name="Vacant" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Issue Distribution */}
        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle>Issue Distribution</CardTitle>
            <CardDescription>Issues by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={issueTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(Number(percent) * 100).toFixed(0)}%`}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {issueTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2 border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>System-wide activity logs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[250px] overflow-y-auto">
              {mockActivityLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="text-2xl flex-shrink-0">{getActivityIcon(log.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {log.action}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {log.hostel} • {log.user} • {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hostel Overview */}
      <Card className="border-gray-200 dark:border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Hostel Overview</CardTitle>
              <CardDescription>All hostels at a glance</CardDescription>
            </div>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hostelFromData?.map((hostel:any) => (
              <div
                key={hostel._id}
                className="p-5 rounded-xl border-2 border-gray-200 dark:border-gray-800 hover:border-indigo-500 dark:hover:border-indigo-400 hover:shadow-lg dark:hover:shadow-indigo-900/20 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {hostel?.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {hostel?.address}
                    </p>
                  </div>
                  <Badge
                    className={
                      hostel.status === 'active'
                        ? 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400'
                        : 'bg-gray-100 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400'
                    }
                  >
                    {hostel?.status||"active"}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div className="text-center p-2 rounded-lg bg-blue-50 dark:bg-blue-500/10">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Rooms</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {hostel?.totalRooms}
                    </p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-purple-50 dark:bg-purple-500/10">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Occupancy</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {((hostel?.occupiedBeds / Math.max(hostel?.totalBeds,1)) * 100).toFixed(0)}%
                    </p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-green-50 dark:bg-green-500/10">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Revenue</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      ₹{(Number(hostel?.revenue||0) / 100000).toFixed(0)}L
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Warden: {hostel?.warden}
                  </span>
                  {hostel.activeIssues > 0 && (
                    <Badge variant="outline" className="text-orange-600 dark:text-orange-400">
                      {hostel?.activeIssues} issues
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
