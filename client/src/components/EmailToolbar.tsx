import { Download, Save, FileText, Plus, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  onExport: () => void;
  onNew: () => void;
  templates: EmailTemplate[];
  onLoadTemplate: (template: EmailTemplate) => void;
  isSaving?: boolean;
}

export default function EmailToolbar({ 
  templateName, 
  onTemplateNameChange, 
  onSave, 
  onExport,
  onNew,
  templates,
  onLoadTemplate,
  isSaving
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
                >
                  <div className="flex flex-col gap-1 flex-1">
                    <span className="font-medium">{template.name}</span>
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
          onClick={onSave}
          disabled={isSaving}
          data-testid="button-save"
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save'}
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
  );
}
