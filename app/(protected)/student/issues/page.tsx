'use client';

import { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Clock,
  AlertCircle,
  CheckCircle,
  X,
  RotateCcw, Upload
} from 'lucide-react';

import {
  Card,
  CardContent,
} from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';

import { formatDistanceToNow } from 'date-fns';

// temporary mock (replace with API later)
import { mockIssues, currentStudent, Issue,IssueStatus } from '@/utils/mockData';

// export default function StudentIssueTracker() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState<string>('all');
//   const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
//   const [isNewIssueOpen, setIsNewIssueOpen] = useState(false);

//   const myIssues = mockIssues.filter(
//     (issue) => issue.studentId === currentStudent.id
//   );

//   const filteredIssues = myIssues.filter((issue) => {
//     const matchesSearch =
//       issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       issue.description.toLowerCase().includes(searchQuery.toLowerCase());

//     const matchesStatus =
//       statusFilter === 'all' || issue.status === statusFilter;

//     return matchesSearch && matchesStatus;
//   });

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'pending': return 'bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
//       case 'in-progress': return 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400';
//       case 'resolved': return 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400';
//       default: return 'bg-gray-100 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400';
//     }
//   };

//   const getPriorityColor = (priority: string) => {
//     switch (priority) {
//        case 'high': return 'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400';
//       case 'medium': return 'bg-orange-100 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400';
//       case 'low': return 'bg-gray-100 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400';
//       default: return 'bg-gray-100 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400';
//     }
//   };

//   const stats = [
//     {
//       label: 'Total Issues',
//       value: myIssues.length,
//       icon: AlertCircle,
//       color: 'text-blue-600 dark:text-blue-400',
//     },
//     {
//       label: 'In Progress',
//       value: myIssues.filter((i) => i.status === 'in-progress').length,
//       icon: Clock,
//       color: 'text-orange-600 dark:text-orange-400',
//     },
//     {
//       label: 'Resolved',
//       value: myIssues.filter((i) => i.status === 'resolved').length,
//       icon: CheckCircle,
//       color: 'text-green-600 dark:text-green-400',
//     },
//   ];

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
//             Issue Tracker
//           </h1>
//           <p className="text-gray-500 dark:text-gray-400 mt-1">
//             Manage and track your reported issues
//           </p>
//         </div>

//         {/* Report Issue */}
//         <Dialog open={isNewIssueOpen} onOpenChange={setIsNewIssueOpen}>
//           <DialogTrigger asChild>
//             <Button>
//               <Plus className="w-4 h-4 mr-2" />
//               Report Issue
//             </Button>
//           </DialogTrigger>

//           <DialogContent className="sm:max-w-[500px]">
//             <DialogHeader>
//               <DialogTitle>Report New Issue</DialogTitle>
//               <DialogDescription>
//                 Describe your issue
//               </DialogDescription>
//             </DialogHeader>

//             <div className="space-y-4 py-4">
//               <div>
//                 <Label>Category</Label>
//                 <Select>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select category" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="electrical">Electrical</SelectItem>
//                     <SelectItem value="plumbing">Plumbing</SelectItem>
//                     <SelectItem value="maintenance">Maintenance</SelectItem>
//                     <SelectItem value="network">Network</SelectItem>
//                     <SelectItem value="other">Other</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div>
//                 <Label>Title</Label>
//                 <Input placeholder="Issue title" />
//               </div>

//               <div>
//                 <Label>Description</Label>
//                 <Textarea rows={4} />
//               </div>

//               <div>
//                 <Label>Priority</Label>
//                 <Select>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select priority" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="low">Low</SelectItem>
//                     <SelectItem value="medium">Medium</SelectItem>
//                     <SelectItem value="high">High</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             <div className="flex justify-end gap-3">
//               <Button variant="outline" onClick={() => setIsNewIssueOpen(false)}>
//                 Cancel
//               </Button>
//               <Button>Submit</Button>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* Stats */}
//       <div className="grid md:grid-cols-3 gap-6">
//         {stats.map((stat, index) => (
//           <Card key={index} className="border-gray-200 dark:border-gray-800">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
//                     {stat.label}
//                   </p>
//                   <p className="text-3xl font-semibold text-gray-900 dark:text-white mt-2">
//                     {stat.value}
//                   </p>
//                 </div>
//                 <stat.icon className={`w-8 h-8 ${stat.color}`} />
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Filters */}
//       <Card className="border-gray-200 dark:border-gray-800">
//         <CardContent className="p-4">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <Input
//                 placeholder="Search issues..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//             <Select value={statusFilter} onValueChange={setStatusFilter}>
//               <SelectTrigger className="w-full md:w-48">
//                 <Filter className="w-4 h-4 mr-2" />
//                 <SelectValue placeholder="Filter by status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Status</SelectItem>
//                 <SelectItem value="pending">Pending</SelectItem>
//                 <SelectItem value="in-progress">In Progress</SelectItem>
//                 <SelectItem value="resolved">Resolved</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Issue List */}
//       <div className="grid grid-cols-1 gap-4">
//         {filteredIssues.map((issue) => (
//           <Card
//             key={issue.id}
//             className="border-gray-200 dark:border-gray-800 hover:shadow-md dark:hover:shadow-gray-900/50 transition-shadow cursor-pointer"
//             onClick={() => setSelectedIssue(issue)}
//           >
//             <CardContent className="p-6">
//               <div className="flex items-start justify-between mb-3">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 mb-2">
//                     <h3 className="font-semibold text-gray-900 dark:text-white">
//                       {issue.title}
//                     </h3>
//                     <Badge className={getStatusColor(issue.status)}>
//                       {issue.status}
//                     </Badge>
//                     <Badge className={getPriorityColor(issue.priority)} variant="outline">
//                       {issue.priority}
//                     </Badge>
//                   </div>
//                   <p className="text-sm text-gray-600 dark:text-gray-400">
//                     {issue.description}
//                   </p>
//                 </div>
//                 <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
//                   #{issue.id}
//                 </span>
//               </div>
//               <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
//                 <span>Category: {issue.category}</span>
//                 <span>Room: {issue.room}, Block {issue.block}</span>
//                 <span className="flex items-center gap-1">
//                   <Clock className="w-3 h-3" />
//                   {formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}
//                 </span>
//                 {issue.assignedTo && (
//                   <span>Assigned to: {issue.assignedTo}</span>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//         {filteredIssues.length === 0 && (
//           <Card className="border-gray-200 dark:border-gray-800">
//             <CardContent className="p-12 text-center">
//               <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//               <p className="text-gray-500 dark:text-gray-400">No issues found</p>
//             </CardContent>
//           </Card>
//         )}
//       </div>

//       {/* Sheet */}
//       <Sheet open={!!selectedIssue} onOpenChange={() => setSelectedIssue(null)}>
//         <SheetContent className="sm:max-w-[540px] overflow-y-auto">
//           {selectedIssue && (
//             <>
//               <SheetHeader>
//                 <div className="flex items-start justify-between">
//                   <div>
//                     <SheetTitle className="text-xl">{selectedIssue.title}</SheetTitle>
//                     <SheetDescription className="mt-1">
//                       Issue ID: #{selectedIssue.id}
//                     </SheetDescription>
//                   </div>
//                   <button
//                     onClick={() => setSelectedIssue(null)}
//                     className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>
//               </SheetHeader>

//               <div className="space-y-6 mt-6">
//                 {/* Status & Priority */}
//                 <div className="flex gap-3">
//                   <Badge className={getStatusColor(selectedIssue.status)}>
//                     {selectedIssue.status}
//                   </Badge>
//                   <Badge className={getPriorityColor(selectedIssue.priority)} variant="outline">
//                     {selectedIssue.priority} priority
//                   </Badge>
//                 </div>

//                 {/* Details */}
//                 <div className="space-y-4">
//                   <div>
//                     <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
//                       Description
//                     </h4>
//                     <p className="text-gray-900 dark:text-white">
//                       {selectedIssue.description}
//                     </p>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
//                         Category
//                       </h4>
//                       <p className="text-gray-900 dark:text-white">
//                         {selectedIssue.category}
//                       </p>
//                     </div>
//                     <div>
//                       <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
//                         Location
//                       </h4>
//                       <p className="text-gray-900 dark:text-white">
//                         Room {selectedIssue.room}, Block {selectedIssue.block}
//                       </p>
//                     </div>
//                   </div>

//                   {selectedIssue.assignedTo && (
//                     <div>
//                       <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
//                         Assigned To
//                       </h4>
//                       <p className="text-gray-900 dark:text-white">
//                         {selectedIssue.assignedTo}
//                       </p>
//                     </div>
//                   )}
//                 </div>

//                 {/* Timeline */}
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
//                     Timeline
//                   </h4>
//                   <div className="space-y-4">
//                     {selectedIssue.timeline.map((event, index) => (
//                       <div key={index} className="flex gap-3">
//                         <div className="flex flex-col items-center">
//                           <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
//                           {index < selectedIssue.timeline.length - 1 && (
//                             <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 mt-2" />
//                           )}
//                         </div>
//                         <div className="flex-1 pb-4">
//                           <p className="text-sm font-medium text-gray-900 dark:text-white">
//                             {event.action}
//                           </p>
//                           <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                             by {event.user} • {formatDistanceToNow(new Date(event.date), { addSuffix: true })}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}
//         </SheetContent>
//       </Sheet>
//     </div>
//   );
// }

import { IssueWorkflowStepper } from '@/components/ui/issue-workflow-stepper';
import { getStatusBadgeColor, getStatusLabel, getPriorityColor, canStudentConfirmResolution, canStudentReopenIssue } from '@/utils/helpers';
import { toast } from 'sonner';

export default function StudentIssueTracker() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isNewIssueOpen, setIsNewIssueOpen] = useState(false);

  const myIssues = mockIssues.filter(issue => issue.studentId === currentStudent.id);

  const filteredIssues = myIssues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleConfirmResolution = (issue: Issue) => {
    toast.success('Issue marked as closed! Thank you for confirming.');
    setSelectedIssue(null);
  };

  const handleReopenIssue = (issue: Issue) => {
    toast.success('Issue has been reopened and sent back to the warden.');
    setSelectedIssue(null);
  };

  const stats = [
    {
      label: 'Total Issues',
      value: myIssues.length,
      icon: AlertCircle,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-500/10',
    },
    {
      label: 'Active',
      value: myIssues.filter(i => !['closed', 'rejected'].includes(i.status)).length,
      icon: Clock,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-500/10',
    },
    {
      label: 'Resolved',
      value: myIssues.filter(i => ['resolved', 'awaiting-verification', 'closed'].includes(i.status)).length,
      icon: CheckCircle,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-500/10',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Issue Tracker
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Report and track your hostel issues
          </p>
        </div>
        <Dialog open={isNewIssueOpen} onOpenChange={setIsNewIssueOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl transition-all">
              <Plus className="w-4 h-4 mr-2" />
              Report Issue
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Report New Issue</DialogTitle>
              <DialogDescription>
                Describe your issue and we'll get it resolved as soon as possible.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electrical">Electrical</SelectItem>
                    <SelectItem value="plumbing">Plumbing</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="network">Network</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Issue Title</Label>
                <Input id="title" placeholder="Brief title of the issue" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed description of the issue"
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Upload Images (Optional)</Label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 text-center hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsNewIssueOpen(false)}>
                Cancel
              </Button>
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={() => {
                  toast.success('Issue reported successfully!');
                  setIsNewIssueOpen(false);
                }}
              >
                Submit Issue
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.label}
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

      {/* Filters */}
      <Card className="border-gray-200 dark:border-gray-800">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search issues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-56">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="reported">Reported</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="awaiting-verification">Awaiting Confirmation</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="reopened">Reopened</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Issues List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredIssues.length > 0 ? (
          filteredIssues.map((issue) => (
            <Card
              key={issue.id}
              className="border-gray-200 dark:border-gray-800 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all cursor-pointer group"
              onClick={() => setSelectedIssue(issue)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {issue.title}
                      </h3>
                      <Badge className={getStatusBadgeColor(issue.status)}>
                        {getStatusLabel(issue.status)}
                      </Badge>
                      <Badge className={getPriorityColor(issue.priority)} variant="outline">
                        {issue.priority}
                      </Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {issue.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>{issue.category}</span>
                      <span>•</span>
                      <span>Room {issue.room}, Block {issue.block}</span>
                      <span>•</span>
                      <span>{formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}</span>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    #{issue.id}
                  </span>
                </div>

                {/* Compact Workflow Stepper */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                  <IssueWorkflowStepper currentStatus={issue.status} compact />
                </div>
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
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {statusFilter !== 'all' ? 'Try adjusting your filters' : 'You haven\'t reported any issues yet'}
              </p>
              {statusFilter === 'all' && (
                <Button
                  onClick={() => setIsNewIssueOpen(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Report Your First Issue
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Issue Detail Sheet */}
      <Sheet open={!!selectedIssue} onOpenChange={() => setSelectedIssue(null)}>
        <SheetContent className="sm:max-w-[640px] overflow-y-auto">
          {selectedIssue && (
            <>
              <SheetHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <SheetTitle className="text-2xl pr-8">{selectedIssue.title}</SheetTitle>
                    <SheetDescription className="mt-2">
                      Issue ID: #{selectedIssue.id} • Reported {formatDistanceToNow(new Date(selectedIssue.createdAt), { addSuffix: true })}
                    </SheetDescription>
                  </div>
                  <button
                    onClick={() => setSelectedIssue(null)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </SheetHeader>

              <div className="space-y-6 mt-6">
                {/* Status & Priority */}
                <div className="flex gap-3">
                  <Badge className={getStatusBadgeColor(selectedIssue.status)}>
                    {getStatusLabel(selectedIssue.status)}
                  </Badge>
                  <Badge className={getPriorityColor(selectedIssue.priority)} variant="outline">
                    {selectedIssue.priority} priority
                  </Badge>
                </div>

                {/* Issue Details */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Description
                    </h4>
                    <p className="text-gray-900 dark:text-white">
                      {selectedIssue.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Category
                      </h4>
                      <p className="text-gray-900 dark:text-white">
                        {selectedIssue.category}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Location
                      </h4>
                      <p className="text-gray-900 dark:text-white">
                        Room {selectedIssue.room}, Block {selectedIssue.block}
                      </p>
                    </div>
                    {selectedIssue.assignedTo && (
                      <div className="col-span-2">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                          Assigned To
                        </h4>
                        <p className="text-gray-900 dark:text-white">
                          {selectedIssue.assignedTo}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Rejection Reason */}
                  {selectedIssue.status === 'rejected' && selectedIssue.rejectionReason && (
                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-800">
                      <h4 className="text-sm font-semibold text-red-900 dark:text-red-100 mb-2">
                        Rejection Reason
                      </h4>
                      <p className="text-sm text-red-700 dark:text-red-300">
                        {selectedIssue.rejectionReason}
                      </p>
                    </div>
                  )}
                </div>

                {/* Workflow Visualization */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                    Issue Workflow
                  </h4>
                  <IssueWorkflowStepper currentStatus={selectedIssue.status} />
                </div>

                {/* Timeline */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                    Activity Timeline
                  </h4>
                  <div className="space-y-4">
                    {selectedIssue.timeline.map((event, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                          {index < selectedIssue.timeline.length - 1 && (
                            <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 mt-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {event.action}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            by {event.user} • {formatDistanceToNow(new Date(event.date), { addSuffix: true })}
                          </p>
                          {event.note && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                              {event.note}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                  {canStudentConfirmResolution(selectedIssue.status) && (
                    <>
                      <div className="p-4 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-800">
                        <p className="text-sm text-green-900 dark:text-green-100 mb-3">
                          The worker has marked this issue as resolved. Please confirm if the issue is fixed.
                        </p>
                        <div className="flex gap-3">
                          <Button
                            onClick={() => handleConfirmResolution(selectedIssue)}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Confirm Resolution
                          </Button>
                          <Button
                            onClick={() => handleReopenIssue(selectedIssue)}
                            variant="outline"
                            className="flex-1 border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10"
                          >
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Reopen Issue
                          </Button>
                        </div>
                      </div>
                    </>
                  )}

                  {canStudentReopenIssue(selectedIssue.status) && (
                    <Button
                      onClick={() => handleReopenIssue(selectedIssue)}
                      variant="outline"
                      className="border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reopen Issue
                    </Button>
                  )}

                  {selectedIssue.status === 'closed' && (
                    <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-800 text-center">
                      <CheckCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                        This issue has been closed
                      </p>
                      <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
                        You can reopen it if the problem persists
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}