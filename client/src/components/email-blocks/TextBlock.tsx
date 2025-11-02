import { GripVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TextBlockProps {
  id: string;
  content: {
    title?: string;
    body: string;
    linkUrl?: string;
    linkText?: string;
  };
  isEditing?: boolean;
  onDelete?: () => void;
  onUpdate?: (content: any) => void;
  dragHandleProps?: any;
}

export default function TextBlock({ id, content, isEditing, onDelete, onUpdate, dragHandleProps }: TextBlockProps) {
  return (
    <div className="group relative">
      {isEditing && (
        <div className="absolute -left-10 top-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-6 w-6 cursor-grab" 
            data-testid={`drag-text-${id}`}
            {...dragHandleProps}
          >
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
                isEditing ? (
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => onUpdate?.({ ...content, title: e.currentTarget.innerHTML || '' })}
                    dangerouslySetInnerHTML={{ __html: content.title }}
                    style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: '20px',
                      fontWeight: 700,
                      color: '#262626',
                      marginBottom: '16px',
                      outline: 'none',
                    }}
                    data-testid={`text-title-${id}`}
                  />
                ) : (
                  <div
                    dangerouslySetInnerHTML={{ __html: content.title }}
                    style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: '20px',
                      fontWeight: 700,
                      color: '#262626',
                      marginBottom: '16px',
                    }}
                    data-testid={`text-title-${id}`}
                  />
                )
              )}
              {isEditing ? (
                <div
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => onUpdate?.({ ...content, body: e.currentTarget.innerHTML || '' })}
                  dangerouslySetInnerHTML={{ __html: content.body }}
                  style={{
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: '#404040',
                    outline: 'none',
                  }}
                  data-testid={`text-body-${id}`}
                />
              ) : (
                <div
                  dangerouslySetInnerHTML={{ __html: content.body }}
                  style={{
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: '#404040',
                  }}
                  data-testid={`text-body-${id}`}
                />
              )}
              
              {isEditing && (
                <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label htmlFor={`text-link-text-${id}`} style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#737373' }}>
                      Link text (e.g., Learn More →)
                    </label>
                    <input
                      id={`text-link-text-${id}`}
                      type="text"
                      value={content.linkText || ''}
                      onChange={(e) => onUpdate?.({ ...content, linkText: e.target.value })}
                      placeholder="Link text (e.g., Learn More →)"
                      style={{
                        fontFamily: 'Arial, sans-serif',
                        fontSize: '14px',
                        padding: '8px',
                        border: '1px solid #e5e5e5',
                        borderRadius: '4px',
                        color: '#262626',
                        backgroundColor: '#ffffff',
                      }}
                      data-testid={`input-link-text-${id}`}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label htmlFor={`text-link-url-${id}`} style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#737373' }}>
                      Link URL (e.g., https://example.com)
                    </label>
                    <input
                      id={`text-link-url-${id}`}
                      type="text"
                      value={content.linkUrl || ''}
                      onChange={(e) => onUpdate?.({ ...content, linkUrl: e.target.value })}
                      placeholder="Link URL (e.g., https://example.com)"
                      style={{
                        fontFamily: 'Arial, sans-serif',
                        fontSize: '14px',
                        padding: '8px',
                        border: '1px solid #e5e5e5',
                        borderRadius: '4px',
                        color: '#262626',
                        backgroundColor: '#ffffff',
                      }}
                      data-testid={`input-link-url-${id}`}
                    />
                  </div>
                </div>
              )}
              
              {!isEditing && content.linkText && content.linkUrl && (
                <div style={{ marginTop: '16px' }}>
                  <a
                    href={content.linkUrl}
                    style={{
                      display: 'inline-block',
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#A51C30',
                      textDecoration: 'none',
                      padding: '8px 16px',
                      border: '1px solid #A51C30',
                      borderRadius: '4px',
                    }}
                  >
                    {content.linkText}
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
