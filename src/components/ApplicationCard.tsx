import {useState} from "react";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Clock, ChevronDown, MoreVertical, Edit, Trash2, ExternalLink, Briefcase} from "lucide-react";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {JobApplication, Status, statusDetailsMap, statuses} from "@/types/Applications.ts";
import {formatRelativeTime, formatTimelineDate} from "utils/DateUtil.ts";
import {getCompanyColor, getCompanyInitials} from "utils/StringUtil.ts";


// Props for the ApplicationCard component
interface ApplicationCardProps {
    application: JobApplication;
    onRequestStatusChange: (appId: string, newStatus: Status) => void;
    onEdit?: (appId: string) => void;
    onDelete?: (appId: string) => void;
}

export function ApplicationCard({application, onRequestStatusChange, onEdit, onDelete}: ApplicationCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    // Get the most recent status update timestamp
    const lastUpdateTimestamp = application.statusHistory[application.statusHistory.length - 1]?.timestamp;

    // Get current status details
    const currentStatusDetails = statusDetailsMap[application.status];

    return (
        <Card
            className={`h-full flex flex-col transition-all duration-200 ${isHovered ? 'shadow-md transform scale-[1.005]' : 'shadow'} overflow-hidden`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <CardHeader className="p-4 border-b space-y-3">
                <div className="flex items-center justify-between">
                    {/* Status Badge */}
                    <Badge variant="outline"
                           className={`border-0 ${currentStatusDetails.colorClass} text-white px-2.5 py-1 inline-flex items-center gap-1`}>
                        <currentStatusDetails.Icon className="mr-1 h-3 w-3"/>
                        {application.status}
                    </Badge>

                    {/* Last Updated */}
                    <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1"/>
                        <time dateTime={lastUpdateTimestamp}>{formatRelativeTime(lastUpdateTimestamp)}</time>
                    </div>
                </div>

                {/* Company and Position */}
                <div className="flex items-start gap-3">
                    {/* Company Avatar */}
                    <div
                        className={`flex-shrink-0 h-10 w-10 rounded-md ring-1 ring-gray-200 flex items-center justify-center text-sm font-bold ${getCompanyColor(application.company)}`}>
                        {getCompanyInitials(application.company)}
                    </div>

                    {/* Position & Company */}
                    <div className="min-w-0">
                        <h3 className="font-semibold text-base leading-tight truncate">
                            {application.position}
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5">
                            <p className="text-sm font-medium text-gray-700">
                                {application.company}
                            </p>
                            {application.website && (
                                <a
                                    href={application.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-blue-500 transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <ExternalLink className="h-3.5 w-3.5"/>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-4 flex-grow flex flex-col">
                {/* Progress Indicator */}
                <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-gray-700">Progress</span>
                        <span className="text-gray-500">{currentStatusDetails.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-500 ${currentStatusDetails.colorClass}`}
                            style={{width: `${currentStatusDetails.progress}%`}}
                        ></div>
                    </div>
                </div>

                {/* Status Timeline */}
                <div>
                    <h4 className="text-sm- font-medium text-gray-700 mb-2">Status History</h4>

                    <div className="max-h-16 overflow-y-auto pr-2 space-y-1">
                        {[...application.statusHistory].reverse().map((status, sIndex, displayedHistory) => (
                            <li key={`${application.id}-${sIndex}`} className="flex gap-3">
                                {/* Timeline indicator */}
                                <div className="flex flex-col items-center">
                                    <div className="relative flex items-center justify-center h-5 w-5">
                                        <div
                                            className={`w-3 h-3 rounded-full ${statusDetailsMap[status.status].colorClass} ring-2 ring-white`}></div>
                                    </div>

                                    {/* Vertical connector line */}
                                    {sIndex !== displayedHistory.length - 1 && (
                                        <div className="w-0.5 h-6 bg-gray-200"></div>
                                    )}
                                </div>

                                {/* Status content */}
                                <div className="flex-1 pb-1">
                                    <div className="flex justify-between items-baseline">
                                        <span className="font-medium text-sm">{status.status}</span>
                                        <time className="text-xs text-gray-400">
                                            {formatTimelineDate(status.timestamp)}
                                        </time>
                                    </div>
                                    {status.note && (
                                        <p className="text-xs mt-0.5 text-gray-500">{status.note}</p>
                                    )}
                                </div>
                            </li>
                        ))}
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-4 border-t flex items-center justify-between">
                {/* Change Status Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="px-3 py-1 text-xs h-8">
                            Change Status
                            <ChevronDown className="h-3 w-3 ml-1"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        {statuses.map((statusOption) => (
                            <DropdownMenuItem
                                key={statusOption}
                                onClick={() => onRequestStatusChange(application.id, statusOption)}
                                className={`text-xs cursor-pointer ${statusDetailsMap[statusOption].textClass}`}
                            >
                <span className="flex items-center gap-2">
                  {application.status === statusOption ? (
                      <div className="h-3 w-3">✓</div>
                  ) : (
                      <div className="h-3 w-3"></div>
                  )}
                    {statusOption}
                </span>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Quick actions */}
                <div className="flex space-x-1">
                    {/* Edit Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 p-0 hover:bg-gray-700"
                        onClick={() => onEdit && onEdit(application.id)}
                        aria-label="Edit application"
                    >
                        <Edit className="h-4 w-4"/>
                    </Button>

                    {/* Delete Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 p-0 hover:bg-gray-700 hover:text-red-500 text-red-500"
                        onClick={() => onDelete && onDelete(application.id)}
                        aria-label="Delete application"
                    >
                        <Trash2 className="h-4 w-4"/>
                    </Button>

                    {/* More Options */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 p-0 hover:bg-gray-700"
                                aria-label="More options"
                            >
                                <MoreVertical className="h-4 w-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {application.website && (
                                <DropdownMenuItem asChild>
                                    <a
                                        href={application.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs cursor-pointer flex items-center gap-2"
                                    >
                                        <ExternalLink className="h-3 w-3"/>
                                        Visit Company Site
                                    </a>
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="text-xs cursor-pointer flex items-center gap-2">
                                <Briefcase className="h-3 w-3"/>
                                View Job Description
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-xs cursor-pointer flex items-center gap-2"
                                onClick={() => onEdit && onEdit(application.id)}
                            >
                                <Edit className="h-3 w-3"/>
                                Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-xs cursor-pointer flex items-center gap-2 text-red-500 hover:bg-red-500/10"
                                onClick={() => onDelete && onDelete(application.id)}
                            >
                                <Trash2 className="h-3 w-3"/>
                                Delete Application
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardFooter>
        </Card>
    );
}
