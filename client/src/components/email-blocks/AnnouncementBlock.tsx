import { GripVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnnouncementBlockProps {
  id: string;
  content: {
    title: string;
    body: string;
  };
  isEditing?: boolean;
  onDelete?: () => void;
  onUpdate?: (content: any) => void;
  dragHandleProps?: any;
}

export default function AnnouncementBlock({ id, content, isEditing, onDelete, onUpdate, dragHandleProps }: AnnouncementBlockProps) {
  return (
    <div className="group relative">
      {isEditing && (
        <div className="absolute -left-10 top-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-6 w-6 cursor-grab" 
            data-testid={`drag-announcement-${id}`}
            {...dragHandleProps}
          >
            <GripVertical className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-6 w-6 text-destructive" 
            onClick={onDelete}
            data-testid={`delete-announcement-${id}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <table width="100%" cellPadding="0" cellSpacing="0" style={{ backgroundColor: '#ffffff' }}>
        <tbody>
          <tr>
            <td style={{ padding: '32px 24px' }}>
              <table width="100%" cellPadding="0" cellSpacing="0" style={{ backgroundColor: '#FEF2F2', borderLeft: '4px solid #A51C30', padding: '16px' }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '0 16px' }}>
                      <div
                        contentEditable={isEditing}
                        suppressContentEditableWarning
                        onBlur={(e) => onUpdate?.({ ...content, title: e.currentTarget.textContent || '' })}
                        style={{
                          fontFamily: 'Georgia, serif',
                          fontSize: '18px',
                          fontWeight: 700,
                          color: '#A51C30',
                          marginBottom: '8px',
                          outline: 'none',
                        }}
                        data-testid={`announcement-title-${id}`}
                      >
                        {content.title}
                      </div>
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
                        data-testid={`announcement-body-${id}`}
                      >
                        {content.body}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
