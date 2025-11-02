import { GripVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderBlockProps {
  id: string;
  content: {
    title: string;
    subtitle?: string;
  };
  isEditing?: boolean;
  onDelete?: () => void;
  onUpdate?: (content: any) => void;
  dragHandleProps?: any;
}

export default function HeaderBlock({ id, content, isEditing, onDelete, onUpdate, dragHandleProps }: HeaderBlockProps) {
  return (
    <div className="group relative">
      {isEditing && (
        <div className="absolute -left-10 top-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-6 w-6 cursor-grab" 
            data-testid={`drag-header-${id}`}
            {...dragHandleProps}
          >
            <GripVertical className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-6 w-6 text-destructive" 
            onClick={onDelete}
            data-testid={`delete-header-${id}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <table width="100%" cellPadding="0" cellSpacing="0" style={{ backgroundColor: '#ffffff' }}>
        <tbody>
          <tr>
            <td style={{ padding: '24px', borderTop: '4px solid #A51C30' }}>
              <table width="100%" cellPadding="0" cellSpacing="0">
                <tbody>
                  <tr>
                    <td>
                      <div
                        contentEditable={isEditing}
                        suppressContentEditableWarning
                        onBlur={(e) => onUpdate?.({ ...content, title: e.currentTarget.textContent || '' })}
                        style={{
                          fontFamily: 'Georgia, serif',
                          fontSize: '24px',
                          fontWeight: 700,
                          color: '#262626',
                          outline: 'none',
                        }}
                        data-testid={`header-title-${id}`}
                      >
                        {content.title}
                      </div>
                      {content.subtitle && (
                        <div
                          contentEditable={isEditing}
                          suppressContentEditableWarning
                          onBlur={(e) => onUpdate?.({ ...content, subtitle: e.currentTarget.textContent || '' })}
                          style={{
                            fontFamily: 'Arial, sans-serif',
                            fontSize: '14px',
                            color: '#737373',
                            marginTop: '8px',
                            outline: 'none',
                          }}
                          data-testid={`header-subtitle-${id}`}
                        >
                          {content.subtitle}
                        </div>
                      )}
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
