import { Download, Save, FileText, Plus, FolderOpen, FilePenLine, Code, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { type EmailTemplate, type EmailBlock } from "@shared/schema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { useState } from "react";
import { generateEmailHtml } from "@/lib/generateEmailHtml";

interface EmailToolbarProps {
  templateName: string;
  onTemplateNameChange: (name: string) => void;
  onSave: () => void;
  onSaveDraft: () => void;
  onExport: () => void;
  onNew: () => void;
  templates: EmailTemplate[];
  onLoadTemplate: (template: EmailTemplate) => void;
  isSaving?: boolean;
  isSavingDraft?: boolean;
  blocks: EmailBlock[];
}

export default function EmailToolbar({ 
  templateName, 
  onTemplateNameChange, 
  onSave, 
  onSaveDraft,
  onExport,
  onNew,
  templates,
  onLoadTemplate,
  isSaving,
  isSavingDraft,
  blocks
}: EmailToolbarProps) {
  const [showHtmlDialog, setShowHtmlDialog] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const htmlCode = generateEmailHtml(blocks || []);
  
  const handleCopyHtml = async () => {
    await navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <>
    <div className="h-16 border-b border-border bg-card flex items-center justify-between px-6 gap-4">
      <div className="flex items-center gap-3 flex-1">
        <FileText className="h-5 w-5 text-primary" />
        <Input
          value={templateName}
          onChange={(e) => onTemplateNameChange(e.target.value)}
          placeholder="Untitled Template"
          className="max-w-xs"
          data-testid="input-template-name"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={onNew}
          data-testid="button-new"
        >
          <Plus className="h-4 w-4 mr-2" />
          New
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" data-testid="button-open">
              <FolderOpen className="h-4 w-4 mr-2" />
              Open
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            {templates.length === 0 ? (
              <DropdownMenuItem disabled>
                <span className="text-muted-foreground">No saved templates</span>
              </DropdownMenuItem>
            ) : (
              templates.map((template) => (
                <DropdownMenuItem
                  key={template.id}
                  onClick={() => onLoadTemplate(template)}
                  data-testid={`template-${template.id}`}
                >
                  <div className="flex flex-col gap-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{template.name}</span>
                      {template.isDraft && (
                        <Badge variant="secondary" className="text-xs" data-testid={`badge-draft-${template.id}`}>
                          Draft
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Updated {format(new Date(template.updatedAt), "MMM d, yyyy 'at' h:mm a")}
                    </span>
                  </div>
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="w-px h-6 bg-border mx-2" />
        
        <Button
          variant="outline"
          onClick={onSaveDraft}
          disabled={isSavingDraft}
          data-testid="button-save-draft"
        >
          <FilePenLine className="h-4 w-4 mr-2" />
          {isSavingDraft ? 'Saving...' : 'Save Draft'}
        </Button>
        <Button
          variant="outline"
          onClick={onSave}
          disabled={isSaving}
          data-testid="button-save"
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
        <Button
          variant="outline"
          onClick={() => setShowHtmlDialog(true)}
          data-testid="button-view-html"
        >
          <Code className="h-4 w-4 mr-2" />
          View HTML
        </Button>
        <Button
          variant="default"
          onClick={onExport}
          data-testid="button-export"
        >
          <Download className="h-4 w-4 mr-2" />
          Export HTML
        </Button>
      </div>
    </div>
    
    <Dialog open={showHtmlDialog} onOpenChange={setShowHtmlDialog}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Email HTML Code</DialogTitle>
          <DialogDescription>
            Copy this HTML code and paste it into Gmail, Outlook, or any email client.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="relative">
            <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-96 text-xs">
              <code>{htmlCode}</code>
            </pre>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopyHtml}
              className="absolute top-2 right-2"
              data-testid="button-copy-html"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
}
