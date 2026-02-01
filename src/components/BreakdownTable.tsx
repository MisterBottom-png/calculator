import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export type BreakdownColumn = {
  key: string;
  label: string;
  align?: "left" | "right";
};

export type BreakdownRow = Record<string, string | number>;

export function BreakdownTable({ columns, rows }: { columns: BreakdownColumn[]; rows: BreakdownRow[] }) {
  return (
    <div className="rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key} className={column.align === "right" ? "text-right" : ""}>
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={`${row[columns[0].key]}-${index}`}>
              {columns.map((column) => (
                <TableCell key={column.key} className={column.align === "right" ? "text-right" : ""}>
                  {row[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
