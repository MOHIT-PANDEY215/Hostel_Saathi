'use client'
import { useState } from 'react';
import { Plus, Search, Edit, Trash2, MapPin, Users, Bed, DollarSign, Mail, Phone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { mockHostels, Hostel } from '@/utils/superAdminMockData';
import { toast } from 'sonner';
import { useGetDashboard } from '@/hooks/roles/useSuperAdmin';
import { useGetHostels } from '@/hooks/org/useHostel';

export default function SuperAdminHostelManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingHostel, setEditingHostel] = useState<Hostel | null>(null);

  const filteredHostels = mockHostels.filter(hostel =>
    hostel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hostel?.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const { isPending, isError, data, error } = useGetDashboard()
    const kpiFromData = data?.data?.kpis
    const hostelFromData = data?.data?.hostels

    const { isPending:isHostelPending, isError:isHostelError, data:hostels, error:hostelError } = useGetHostels()

    console.log("hostels",hostels)
    const allHostels=hostels?.hostels

  const handleCreateHostel = () => {
    toast.success('Hostel created successfully!');
    setCreateDialogOpen(false);
  };

  const handleEditHostel = (hostel: Hostel) => {
    setEditingHostel(hostel);
  };

  const handleUpdateHostel = () => {
    toast.success('Hostel updated successfully!');
    setEditingHostel(null);
  };

  const handleDeleteHostel = (hostelName: string) => {
    toast.success(`${hostelName} deleted successfully!`);
  };

  const getTotal =(data,field)=>{
    return data?.reduce((a,b)=>a+b[field],0)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Hostel Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Create and manage hostels across the platform
          </p>
        </div>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Hostel
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Hostel</DialogTitle>
              <DialogDescription>
                Add a new hostel to the platform
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Hostel Name</Label>
                  <Input placeholder="e.g., Sunrise Boys Hostel" />
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input placeholder="e.g., North Campus" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Total Rooms</Label>
                  <Input type="number" placeholder="50" />
                </div>
                <div className="space-y-2">
                  <Label>Total Beds</Label>
                  <Input type="number" placeholder="150" />
                </div>
                {/* <div className="space-y-2">
                  <Label>Monthly Fee (₹)</Label>
                  <Input type="number" placeholder="3000" />
                </div> */}
              </div>
              {/* <div className="space-y-2">
                <Label>Warden Name</Label>
                <Input placeholder="Full name of the warden" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Warden Email</Label>
                  <Input type="email" placeholder="warden@hostel.com" />
                </div>
                <div className="space-y-2">
                  <Label>Warden Phone</Label>
                  <Input type="tel" placeholder="+91 9876543210" />
                </div>
              </div> */}
              {/* <div className="space-y-2">
                <Label>Status</Label>
                <Select defaultValue="active">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={handleCreateHostel}
              >
                Create Hostel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-gray-200 dark:border-gray-800">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Hostels</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
              {/* {mockHostels.length} */}
              {allHostels?.length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-gray-200 dark:border-gray-800">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
            <p className="text-2xl font-semibold text-green-600 dark:text-green-400 mt-1">
              {mockHostels.filter(h => h.status === 'active').length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-gray-200 dark:border-gray-800">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Capacity</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
              {/* {mockHostels.reduce((sum, h) => sum + h.totalBeds, 0)} */}
              {allHostels?.reduce((sum, h) => sum + h.totalBeds, 0)}
            </p>
          </CardContent>
        </Card>
        <Card className="border-gray-200 dark:border-gray-800">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Avg Occupancy</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
              {(
                (allHostels?.reduce((sum, h) => sum + h?.occupiedBeds, 0) /
                  Math.max(1,getTotal(allHostels,"totalBeds"))) *
                100
              ).toFixed(0)}%
              {/* {(
                (mockHostels.reduce((sum, h) => sum + h.occupiedBeds, 0) /
                  mockHostels.reduce((sum, h) => sum + h.totalBeds, 0)) *
                100
              ).toFixed(0)}% */}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="border-gray-200 dark:border-gray-800">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search hostels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Hostels Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {allHostels?.map((hostel) => (
          <Card
            key={hostel._id}
            className="border-gray-200 dark:border-gray-800 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl">{hostel?.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-2">
                    <MapPin className="w-4 h-4" />
                    {hostel?.address}
                  </CardDescription>
                </div>
                <Badge
                  className={
                    hostel.status === 'active'
                      ? 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400'
                      : 'bg-gray-100 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400'
                  }
                >
                  {hostel.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10">
                  <Bed className="w-5 h-5 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">Rooms</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {hostel.totalRooms}
                  </p>
                </div>
                <div className="text-center p-3 rounded-xl bg-purple-50 dark:bg-purple-500/10">
                  <Users className="w-5 h-5 text-purple-600 dark:text-purple-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">Students</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {hostel.occupiedBeds}
                  </p>
                </div>
                {/* <div className="text-center p-3 rounded-xl bg-green-50 dark:bg-green-500/10">
                  <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">Revenue</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    ₹{(hostel.revenue / 100000).toFixed(0)}L
                  </p>
                </div> */}
                <div className="text-center p-3 rounded-xl bg-orange-50 dark:bg-orange-500/10">
                  <div className="w-5 h-5 mx-auto mb-1 rounded-full border-2 border-orange-600 dark:border-orange-400 flex items-center justify-center">
                    <span className="text-xs font-semibold text-orange-600 dark:text-orange-400">
                      {((hostel.occupiedBeds / hostel.totalBeds) * 100).toFixed(0)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Fill</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {((hostel.occupiedBeds / hostel.totalBeds) * 100).toFixed(0)}%
                  </p>
                </div>
              </div>

              {/* Warden Info */}
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Warden Details
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>{hostel.warden}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Mail className="w-4 h-4" />
                    <span>{hostel.wardenEmail}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Phone className="w-4 h-4" />
                    <span>{hostel.wardenPhone}</span>
                  </div>
                </div>
              </div>

              {/* Issues Badge */}
              {hostel.activeIssues > 0 && (
                <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-800">
                  <p className="text-sm text-orange-700 dark:text-orange-400">
                    ⚠️ {hostel.activeIssues} active issue{hostel.activeIssues !== 1 ? 's' : ''} requiring attention
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={() => handleEditHostel(hostel)}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteHostel(hostel.name)}
                  variant="outline"
                  className="border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHostels.length === 0 && (
        <Card className="border-gray-200 dark:border-gray-800">
          <CardContent className="p-16 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No hostels found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search criteria
            </p>
          </CardContent>
        </Card>
      )}

      {/* Edit Hostel Dialog */}
      <Dialog open={!!editingHostel} onOpenChange={() => setEditingHostel(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Hostel</DialogTitle>
            <DialogDescription>
              Update hostel information
            </DialogDescription>
          </DialogHeader>
          {editingHostel && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Hostel Name</Label>
                  <Input defaultValue={editingHostel.name} />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input defaultValue={editingHostel?.address} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Total Rooms</Label>
                  <Input type="number" defaultValue={editingHostel.totalRooms} />
                </div>
                <div className="space-y-2">
                  <Label>Total Beds</Label>
                  <Input type="number" defaultValue={editingHostel.totalBeds} />
                </div>
                <div className="space-y-2">
                  <Label>Occupied</Label>
                  <Input type="number" defaultValue={editingHostel.occupiedBeds} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Warden Name</Label>
                <Input defaultValue={editingHostel.warden} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Warden Email</Label>
                  <Input type="email" defaultValue={editingHostel.wardenEmail} />
                </div>
                <div className="space-y-2">
                  <Label>Warden Phone</Label>
                  <Input type="tel" defaultValue={editingHostel.wardenPhone} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select defaultValue={editingHostel.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setEditingHostel(null)}>
              Cancel
            </Button>
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={handleUpdateHostel}
            >
              Update Hostel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
