import { GripVertical, Trash2, ImageIcon, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ObjectUploader } from "@/components/ObjectUploader";
import type { UploadResult } from "@uppy/core";

interface MediaBlockProps {
  id: string;
  content: {
    imageUrl?: string;
    altText?: string;
    caption?: string;
    linkUrl?: string;
    width?: 'full' | 'medium' | 'small';
  };
  isEditing?: boolean;
  onDelete?: () => void;
  onUpdate?: (content: any) => void;
  dragHandleProps?: any;
}

export default function MediaBlock({ id, content, isEditing, onDelete, onUpdate, dragHandleProps }: MediaBlockProps) {
  const widthMap = {
    full: '100%',
    medium: '400px',
    small: '250px',
  };

  const width = widthMap[content.width || 'full'];

  return (
    <div className="group relative">
      {isEditing && (
        <div className="absolute -left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1 z-10">
          <div 
            className="p-1 bg-background border rounded cursor-move"
            {...dragHandleProps}
            data-testid={`drag-media-${id}`}
          >
            <GripVertical className="h-4 w-4" />
          </div>
          <Button
            size="icon"
            variant="destructive"
            className="h-6 w-6"
            onClick={onDelete}
            data-testid={`button-delete-${id}`}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      )}
      
      <table
        width="100%"
        cellPadding="0"
        cellSpacing="0"
        style={{
          backgroundColor: '#ffffff',
        }}
      >
        <tbody>
          <tr>
            <td style={{ padding: '24px', textAlign: 'center' }}>
              {content.imageUrl ? (
                <div>
                  {content.linkUrl ? (
                    <a href={content.linkUrl} target="_blank" rel="noopener noreferrer">
                      <img
                        src={content.imageUrl}
                        alt={content.altText || 'Image'}
                        style={{
                          maxWidth: width,
                          width: '100%',
                          height: 'auto',
                          display: 'block',
                          margin: '0 auto',
                          border: 'none',
                        }}
                        data-testid={`media-image-${id}`}
                      />
                    </a>
                  ) : (
                    <img
                      src={content.imageUrl}
                      alt={content.altText || 'Image'}
                      style={{
                        maxWidth: width,
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        margin: '0 auto',
                        border: 'none',
                      }}
                      data-testid={`media-image-${id}`}
                    />
                  )}
                  
                  {content.caption && (
                    <div
                      contentEditable={isEditing}
                      suppressContentEditableWarning
                      onBlur={(e) => onUpdate?.({ ...content, caption: e.currentTarget.textContent || '' })}
                      style={{
                        fontFamily: 'Arial, sans-serif',
                        fontSize: '13px',
                        color: '#737373',
                        marginTop: '12px',
                        fontStyle: 'italic',
                        outline: 'none',
                      }}
                      data-testid={`media-caption-${id}`}
                    >
                      {content.caption}
                    </div>
                  )}
                </div>
              ) : (
                <div
                  style={{
                    padding: '48px 24px',
                    backgroundColor: '#F5F5F5',
                    border: '2px dashed #D4D4D4',
                    borderRadius: '8px',
                    textAlign: 'center',
                  }}
                >
                  <ImageIcon style={{ width: '48px', height: '48px', margin: '0 auto 12px', color: '#A3A3A3' }} />
                  <p style={{
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '14px',
                    color: '#737373',
                    margin: 0,
                  }}>
                    {isEditing ? 'Click to add image URL in the editor' : 'No image selected'}
                  </p>
                </div>
              )}
              
              {isEditing && (
                <div style={{ marginTop: '16px', textAlign: 'left' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ 
                      display: 'block', 
                      fontFamily: 'Arial, sans-serif', 
                      fontSize: '12px', 
                      color: '#737373',
                      marginBottom: '4px',
                      fontWeight: 600,
                    }}>
                      Image URL:
                    </label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input
                        type="text"
                        value={content.imageUrl || ''}
                        onChange={(e) => onUpdate?.({ ...content, imageUrl: e.target.value })}
                        placeholder="https://example.com/image.jpg"
                        style={{
                          flex: 1,
                          padding: '8px',
                          fontFamily: 'Arial, sans-serif',
                          fontSize: '13px',
                          border: '1px solid #D4D4D4',
                          borderRadius: '4px',
                          color: '#262626',
                          backgroundColor: '#ffffff',
                        }}
                        data-testid={`input-image-url-${id}`}
                      />
                      <ObjectUploader
                        maxNumberOfFiles={1}
                        maxFileSize={10485760}
                        onGetUploadParameters={async () => {
                          const response = await fetch('/api/objects/upload', { method: 'POST' });
                          const { uploadURL } = await response.json();
                          return { method: 'PUT' as const, url: uploadURL };
                        }}
                        onComplete={async (result: UploadResult<Record<string, unknown>, Record<string, unknown>>) => {
                          const uploadedFile = result.successful?.[0];
                          if (uploadedFile?.uploadURL) {
                            const normalizeResponse = await fetch('/api/objects/normalize', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ url: uploadedFile.uploadURL }),
                            });
                            const { normalizedPath } = await normalizeResponse.json();
                            onUpdate?.({ ...content, imageUrl: normalizedPath });
                          }
                        }}
                        buttonClassName="h-9"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </ObjectUploader>
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ 
                      display: 'block', 
                      fontFamily: 'Arial, sans-serif', 
                      fontSize: '12px', 
                      color: '#737373',
                      marginBottom: '4px',
                      fontWeight: 600,
                    }}>
                      Alt Text:
                    </label>
                    <input
                      type="text"
                      value={content.altText || ''}
                      onChange={(e) => onUpdate?.({ ...content, altText: e.target.value })}
                      placeholder="Description of image"
                      style={{
                        width: '100%',
                        padding: '8px',
                        fontFamily: 'Arial, sans-serif',
                        fontSize: '13px',
                        border: '1px solid #D4D4D4',
                        borderRadius: '4px',
                        color: '#262626',
                        backgroundColor: '#ffffff',
                      }}
                      data-testid={`input-alt-text-${id}`}
                    />
                  </div>
                  
                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ 
                      display: 'block', 
                      fontFamily: 'Arial, sans-serif', 
                      fontSize: '12px', 
                      color: '#737373',
                      marginBottom: '4px',
                      fontWeight: 600,
                    }}>
                      Link URL (optional - for videos):
                    </label>
                    <input
                      type="text"
                      value={content.linkUrl || ''}
                      onChange={(e) => onUpdate?.({ ...content, linkUrl: e.target.value })}
                      placeholder="https://youtube.com/watch?v=..."
                      style={{
                        width: '100%',
                        padding: '8px',
                        fontFamily: 'Arial, sans-serif',
                        fontSize: '13px',
                        border: '1px solid #D4D4D4',
                        borderRadius: '4px',
                        color: '#262626',
                        backgroundColor: '#ffffff',
                      }}
                      data-testid={`input-link-url-${id}`}
                    />
                  </div>
                  
                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ 
                      display: 'block', 
                      fontFamily: 'Arial, sans-serif', 
                      fontSize: '12px', 
                      color: '#737373',
                      marginBottom: '4px',
                      fontWeight: 600,
                    }}>
                      Caption (optional):
                    </label>
                    <input
                      type="text"
                      value={content.caption || ''}
                      onChange={(e) => onUpdate?.({ ...content, caption: e.target.value })}
                      placeholder="Add a caption..."
                      style={{
                        width: '100%',
                        padding: '8px',
                        fontFamily: 'Arial, sans-serif',
                        fontSize: '13px',
                        border: '1px solid #D4D4D4',
                        borderRadius: '4px',
                        color: '#262626',
                        backgroundColor: '#ffffff',
                      }}
                      data-testid={`input-caption-${id}`}
                    />
                  </div>
                  
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontFamily: 'Arial, sans-serif', 
                      fontSize: '12px', 
                      color: '#737373',
                      marginBottom: '4px',
                      fontWeight: 600,
                    }}>
                      Width:
                    </label>
                    <select
                      value={content.width || 'full'}
                      onChange={(e) => onUpdate?.({ ...content, width: e.target.value as 'full' | 'medium' | 'small' })}
                      style={{
                        width: '100%',
                        padding: '8px',
                        fontFamily: 'Arial, sans-serif',
                        fontSize: '13px',
                        border: '1px solid #D4D4D4',
                        borderRadius: '4px',
                      }}
                      data-testid={`select-width-${id}`}
                    >
                      <option value="full">Full Width</option>
                      <option value="medium">Medium (400px)</option>
                      <option value="small">Small (250px)</option>
                    </select>
                  </div>
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
