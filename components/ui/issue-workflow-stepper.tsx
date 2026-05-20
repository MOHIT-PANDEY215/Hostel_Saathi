import { Check, X, AlertCircle, RotateCcw } from 'lucide-react';
import { IssueStatus } from '../../utils/mockData';

interface IssueWorkflowStepperProps {
  currentStatus: IssueStatus;
  compact?: boolean;
}

const workflowSteps: { status: IssueStatus; label: string }[] = [
  { status: 'reported', label: 'Reported' },
  { status: 'verified', label: 'Verified' },
  { status: 'assigned', label: 'Assigned' },
  { status: 'in-progress', label: 'In Progress' },
  { status: 'resolved', label: 'Resolved' },
  { status: 'awaiting-verification', label: 'Awaiting Confirmation' },
  { status: 'closed', label: 'Closed' },
];

export function IssueWorkflowStepper({ currentStatus, compact = false }: IssueWorkflowStepperProps) {
  // Handle special statuses
  if (currentStatus === 'rejected') {
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border-2 border-red-200 dark:border-red-800">
        <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center">
          <X className="w-5 h-5 text-red-600 dark:text-red-400" />
        </div>
        <div>
          <p className="font-semibold text-red-900 dark:text-red-100">Issue Rejected</p>
          <p className="text-sm text-red-700 dark:text-red-300">This issue has been rejected by the warden</p>
        </div>
      </div>
    );
  }

  if (currentStatus === 'reopened') {
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl bg-orange-50 dark:bg-orange-500/10 border-2 border-orange-200 dark:border-orange-800">
        <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center">
          <RotateCcw className="w-5 h-5 text-orange-600 dark:text-orange-400" />
        </div>
        <div>
          <p className="font-semibold text-orange-900 dark:text-orange-100">Issue Reopened</p>
          <p className="text-sm text-orange-700 dark:text-orange-300">This issue was reopened and needs attention</p>
        </div>
      </div>
    );
  }

  const currentStepIndex = workflowSteps.findIndex(step => step.status === currentStatus);

  if (compact) {
    return (
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {workflowSteps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const isUpcoming = index > currentStepIndex;

          return (
            <div key={step.status} className="flex items-center gap-2 flex-shrink-0">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                    isCompleted
                      ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300'
                      : isCurrent
                      ? 'bg-indigo-600 dark:bg-indigo-500 text-white ring-4 ring-indigo-100 dark:ring-indigo-500/20'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                </div>
                <span
                  className={`text-xs mt-1 text-center whitespace-nowrap ${
                    isCurrent
                      ? 'font-semibold text-gray-900 dark:text-white'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < workflowSteps.length - 1 && (
                <div
                  className={`h-0.5 w-8 transition-all ${
                    isCompleted
                      ? 'bg-green-300 dark:bg-green-700'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {workflowSteps.map((step, index) => {
        const isCompleted = index < currentStepIndex;
        const isCurrent = index === currentStepIndex;
        const isUpcoming = index > currentStepIndex;

        return (
          <div key={step.status} className="flex gap-4">
            {/* Timeline Line */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  isCompleted
                    ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300'
                    : isCurrent
                    ? 'bg-indigo-600 dark:bg-indigo-500 text-white ring-4 ring-indigo-100 dark:ring-indigo-500/20 scale-110'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : index + 1}
              </div>
              {index < workflowSteps.length - 1 && (
                <div
                  className={`w-0.5 h-12 transition-all ${
                    isCompleted
                      ? 'bg-green-300 dark:bg-green-700'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              )}
            </div>

            {/* Step Content */}
            <div className="flex-1 pb-8">
              <div
                className={`p-4 rounded-xl transition-all ${
                  isCurrent
                    ? 'bg-indigo-50 dark:bg-indigo-500/10 border-2 border-indigo-200 dark:border-indigo-800'
                    : isCompleted
                    ? 'bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-800'
                    : 'bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800'
                }`}
              >
                <h4
                  className={`font-semibold mb-1 ${
                    isCurrent
                      ? 'text-indigo-900 dark:text-indigo-100'
                      : isCompleted
                      ? 'text-green-900 dark:text-green-100'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {step.label}
                </h4>
                <p
                  className={`text-sm ${
                    isCurrent
                      ? 'text-indigo-700 dark:text-indigo-300'
                      : isCompleted
                      ? 'text-green-700 dark:text-green-300'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {getStepDescription(step.status, isCurrent)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function getStepDescription(status: IssueStatus, isCurrent: boolean): string {
  const prefix = isCurrent ? 'Current: ' : '';
  
  switch (status) {
    case 'reported':
      return `${prefix}Issue has been reported by the student`;
    case 'verified':
      return `${prefix}Warden has verified the issue`;
    case 'assigned':
      return `${prefix}Worker has been assigned to resolve the issue`;
    case 'in-progress':
      return `${prefix}Worker is actively working on the issue`;
    case 'resolved':
      return `${prefix}Worker has marked the issue as resolved`;
    case 'awaiting-verification':
      return `${prefix}Waiting for student to confirm the resolution`;
    case 'closed':
      return `${prefix}Issue is closed and completed`;
    default:
      return '';
  }
}

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

export function getStatusIcon(status: IssueStatus) {
  switch (status) {
    case 'reported':
      return AlertCircle;
    case 'verified':
      return Check;
    case 'rejected':
      return X;
    case 'reopened':
      return RotateCcw;
    default:
      return AlertCircle;
  }
}
