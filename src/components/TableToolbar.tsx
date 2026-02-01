import { Copy, Download, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export function TableToolbar({
  copySummaryLabel,
  actionsLabel,
  copyTableLabel,
  exportCsvLabel,
  copySummaryId,
  onCopySummary,
  onCopyTable,
  onExportCsv
}: {
  copySummaryLabel: string;
  actionsLabel: string;
  copyTableLabel: string;
  exportCsvLabel: string;
  copySummaryId?: string;
  onCopySummary: () => void;
  onCopyTable: () => void;
  onExportCsv: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <Button id={copySummaryId} onClick={onCopySummary} className="h-9">
        <Copy className="h-4 w-4" />
        {copySummaryLabel}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <MoreHorizontal className="h-4 w-4" />
            {actionsLabel}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onCopyTable}>
            <Copy className="mr-2 h-4 w-4" />
            {copyTableLabel}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onExportCsv}>
            <Download className="mr-2 h-4 w-4" />
            {exportCsvLabel}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
