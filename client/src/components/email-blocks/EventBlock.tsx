import { GripVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventBlockProps {
  id: string;
  content: {
    title: string;
    date?: string;
    description: string;
    link?: string;
    linkText?: string;
  };
  isEditing?: boolean;
  onDelete?: () => void;
  onUpdate?: (content: any) => void;
}

export default function EventBlock({ id, content, isEditing, onDelete, onUpdate }: EventBlockProps) {
  return (
    <div className="group relative">
      {isEditing && (
        <div className="absolute -left-10 top-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="icon" variant="ghost" className="h-6 w-6 cursor-grab" data-testid={`drag-event-${id}`}>
            <GripVertical className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-6 w-6 text-destructive" 
            onClick={onDelete}
            data-testid={`delete-event-${id}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <table width="100%" cellPadding="0" cellSpacing="0" style={{ backgroundColor: '#F5F5F5' }}>
        <tbody>
          <tr>
            <td style={{ padding: '32px 24px' }}>
              <div
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(e) => onUpdate?.({ ...content, title: e.currentTarget.textContent || '' })}
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#262626',
                  marginBottom: '8px',
                  outline: 'none',
                }}
                data-testid={`event-title-${id}`}
              >
                {content.title}
              </div>
              
              {content.date && (
                <div
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={(e) => onUpdate?.({ ...content, date: e.currentTarget.textContent || '' })}
                  style={{
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#A51C30',
                    marginBottom: '12px',
                    outline: 'none',
                  }}
                  data-testid={`event-date-${id}`}
                >
                  {content.date}
                </div>
              )}
              
              <div
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(e) => onUpdate?.({ ...content, description: e.currentTarget.textContent || '' })}
                style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: '#404040',
                  marginBottom: '16px',
                  outline: 'none',
                  whiteSpace: 'pre-wrap',
                }}
                data-testid={`event-description-${id}`}
              >
                {content.description}
              </div>
              
              {content.link && (
                <a
                  href={content.link}
                  style={{
                    display: 'inline-block',
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#0073E6',
                    textDecoration: 'none',
                    borderBottom: '1px solid #0073E6',
                  }}
                  data-testid={`event-link-${id}`}
                >
                  {content.linkText || 'Learn More →'}
                </a>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
