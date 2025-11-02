import { Download, Save, FileText, Plus, FolderOpen, FilePenLine, Send, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { type EmailTemplate } from "@shared/schema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

interface EmailToolbarProps {
  templateName: string;
  onTemplateNameChange: (name: string) => void;
  onSave: () => void;
  onSaveDraft: () => void;
  onExport: () => void;
  onSend: () => void;
  onPreview: () => void;
  onNew: () => void;
  templates: EmailTemplate[];
  onLoadTemplate: (template: EmailTemplate) => void;
  onDeleteTemplate: (templateId: string) => void;
  isSaving?: boolean;
  isSavingDraft?: boolean;
  isSending?: boolean;
}

export default function EmailToolbar({ 
  templateName, 
  onTemplateNameChange, 
  onSave, 
  onSaveDraft,
  onExport,
  onSend,
  onPreview,
  onNew,
  templates,
  onLoadTemplate,
  onDeleteTemplate,
  isSaving,
  isSavingDraft,
  isSending
}: EmailToolbarProps) {
  return (
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
                  className="cursor-pointer"
                >
                  <div className="flex items-center gap-2 flex-1">
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
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 opacity-70 hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteTemplate(template.id);
                      }}
                      data-testid={`button-delete-${template.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
          onClick={onPreview}
          data-testid="button-preview"
        >
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </Button>
        <Button
          variant="default"
          onClick={onSend}
          disabled={isSending}
          data-testid="button-send"
        >
          <Send className="h-4 w-4 mr-2" />
          {isSending ? 'Sending...' : 'Send Email'}
        </Button>
        <Button
          variant="outline"
          onClick={onExport}
          data-testid="button-export"
        >
          <Download className="h-4 w-4 mr-2" />
          Export HTML
        </Button>
      </div>
    </div>
  );
}
