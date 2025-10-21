import { Download, Save, FileText, Undo, Redo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EmailToolbarProps {
  templateName: string;
  onTemplateNameChange: (name: string) => void;
  onSave: () => void;
  onExport: () => void;
}

export default function EmailToolbar({ 
  templateName, 
  onTemplateNameChange, 
  onSave, 
  onExport 
}: EmailToolbarProps) {
  return (
    <div className="h-16 border-b border-border bg-card flex items-center justify-between px-6 gap-4">
      <div className="flex items-center gap-3 flex-1">
        <FileText className="h-5 w-5 text-primary" />
        <Input
          value={templateName}
          onChange={(e) => {
            console.log(`Template name changed to: ${e.target.value}`);
            onTemplateNameChange(e.target.value);
          }}
          placeholder="Untitled Template"
          className="max-w-xs"
          data-testid="input-template-name"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => console.log('Undo clicked')}
          data-testid="button-undo"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => console.log('Redo clicked')}
          data-testid="button-redo"
        >
          <Redo className="h-4 w-4" />
        </Button>
        
        <div className="w-px h-6 bg-border mx-2" />
        
        <Button
          variant="outline"
          onClick={() => {
            console.log('Save clicked');
            onSave();
          }}
          data-testid="button-save"
        >
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
        <Button
          variant="default"
          onClick={() => {
            console.log('Export clicked');
            onExport();
          }}
          data-testid="button-export"
        >
          <Download className="h-4 w-4 mr-2" />
          Export HTML
        </Button>
      </div>
    </div>
  );
}
