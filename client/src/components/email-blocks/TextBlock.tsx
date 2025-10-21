import { GripVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TextBlockProps {
  id: string;
  content: {
    title?: string;
    body: string;
  };
  isEditing?: boolean;
  onDelete?: () => void;
  onUpdate?: (content: any) => void;
}

export default function TextBlock({ id, content, isEditing, onDelete, onUpdate }: TextBlockProps) {
  return (
    <div className="group relative">
      {isEditing && (
        <div className="absolute -left-10 top-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="icon" variant="ghost" className="h-6 w-6 cursor-grab" data-testid={`drag-text-${id}`}>
            <GripVertical className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-6 w-6 text-destructive" 
            onClick={onDelete}
            data-testid={`delete-text-${id}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <table width="100%" cellPadding="0" cellSpacing="0" style={{ backgroundColor: '#ffffff' }}>
        <tbody>
          <tr>
            <td style={{ padding: '32px 24px' }}>
              {content.title && (
                <div
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={(e) => onUpdate?.({ ...content, title: e.currentTarget.textContent || '' })}
                  style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#262626',
                    marginBottom: '16px',
                    outline: 'none',
                  }}
                  data-testid={`text-title-${id}`}
                >
                  {content.title}
                </div>
              )}
              <div
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(e) => onUpdate?.({ ...content, body: e.currentTarget.textContent || '' })}
                style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: '#404040',
                  outline: 'none',
                  whiteSpace: 'pre-wrap',
                }}
                data-testid={`text-body-${id}`}
              >
                {content.body}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
