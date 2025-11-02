import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  html: string;
  templateName: string;
}

export default function PreviewDialog({ open, onOpenChange, html, templateName }: PreviewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh]" data-testid="dialog-preview">
        <DialogHeader>
          <DialogTitle>Preview: {templateName}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-1 h-full">
          <div 
            className="bg-background p-6"
            dangerouslySetInnerHTML={{ __html: html }}
            data-testid="preview-content"
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
