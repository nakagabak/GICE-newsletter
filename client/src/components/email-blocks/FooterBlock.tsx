import { GripVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FooterBlockProps {
  id: string;
  content: {
    organizationName: string;
    contactInfo?: string;
    resourceLink?: string;
  };
  isEditing?: boolean;
  onDelete?: () => void;
  onUpdate?: (content: any) => void;
}

export default function FooterBlock({ id, content, isEditing, onDelete, onUpdate }: FooterBlockProps) {
  return (
    <div className="group relative">
      {isEditing && (
        <div className="absolute -left-10 top-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="icon" variant="ghost" className="h-6 w-6 cursor-grab" data-testid={`drag-footer-${id}`}>
            <GripVertical className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-6 w-6 text-destructive" 
            onClick={onDelete}
            data-testid={`delete-footer-${id}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <table width="100%" cellPadding="0" cellSpacing="0" style={{ backgroundColor: '#262626' }}>
        <tbody>
          <tr>
            <td style={{ padding: '32px 24px', textAlign: 'center' }}>
              <div
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(e) => onUpdate?.({ ...content, organizationName: e.currentTarget.textContent || '' })}
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '12px',
                  outline: 'none',
                }}
                data-testid={`footer-org-${id}`}
              >
                {content.organizationName}
              </div>
              
              {content.contactInfo && (
                <div
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={(e) => onUpdate?.({ ...content, contactInfo: e.currentTarget.textContent || '' })}
                  style={{
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '13px',
                    color: '#A3A3A3',
                    marginBottom: '16px',
                    outline: 'none',
                  }}
                  data-testid={`footer-contact-${id}`}
                >
                  {content.contactInfo}
                </div>
              )}
              
              {content.resourceLink && (
                <div>
                  <a
                    href={content.resourceLink}
                    style={{
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '13px',
                      color: '#0073E6',
                      textDecoration: 'none',
                      borderBottom: '1px solid #0073E6',
                    }}
                    data-testid={`footer-resource-${id}`}
                  >
                    GICE Program Resources
                  </a>
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
