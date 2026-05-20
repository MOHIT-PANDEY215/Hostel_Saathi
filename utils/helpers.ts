// lib/helpers.ts

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

import { IssueStatus } from './mockData';

export function getStatusBadgeColor(status: IssueStatus): string {
  switch (status) {
    case 'reported':
      return 'bg-gray-100 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400';
    case 'verified':
      return 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400';
    case 'assigned':
      return 'bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400';
    case 'in-progress':
      return 'bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
    case 'resolved':
      return 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400';
    case 'awaiting-verification':
      return 'bg-teal-100 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400';
    case 'closed':
      return 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400';
    case 'rejected':
      return 'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400';
    case 'reopened':
      return 'bg-orange-100 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400';
    default:
      return 'bg-gray-100 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400';
  }
}

export function getStatusLabel(status: IssueStatus): string {
  switch (status) {
    case 'reported':
      return 'Reported';
    case 'verified':
      return 'Verified';
    case 'assigned':
      return 'Assigned';
    case 'in-progress':
      return 'In Progress';
    case 'resolved':
      return 'Resolved';
    case 'awaiting-verification':
      return 'Awaiting Confirmation';
    case 'closed':
      return 'Closed';
    case 'rejected':
      return 'Rejected';
    case 'reopened':
      return 'Reopened';
    default:
      return status;
  }
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'high':
      return 'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400';
    case 'medium':
      return 'bg-orange-100 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400';
    case 'low':
      return 'bg-gray-100 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400';
    default:
      return 'bg-gray-100 dark:bg-gray-500/10 text-gray-700 dark:text-gray-400';
  }
}

export function canStudentConfirmResolution(status: IssueStatus): boolean {
  return status === 'awaiting-verification';
}

export function canStudentReopenIssue(status: IssueStatus): boolean {
  return status === 'closed';
}

export function canWardenVerify(status: IssueStatus): boolean {
  return status === 'reported' || status === 'reopened';
}

export function canWardenAssign(status: IssueStatus): boolean {
  return status === 'verified';
}

export function canWorkerStartWork(status: IssueStatus): boolean {
  return status === 'assigned';
}

export function canWorkerResolve(status: IssueStatus): boolean {
  return status === 'in-progress';
}
