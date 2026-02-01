import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FibreCodesAccordion({ title, codes }: { title: string; codes: string[] }) {
  return (
    <Accordion type="single" collapsible className="rounded-md border border-border px-3">
      <AccordionItem value="codes" className="border-none">
        <AccordionTrigger className="text-sm">{title}</AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {codes.map((code, idx) => (
              <li key={`${code}-${idx}`}>
                F{idx + 1}: {code || "—"}
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
