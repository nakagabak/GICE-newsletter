import { GripVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DividerBlockProps {
  id: string;
  isEditing?: boolean;
  onDelete?: () => void;
}

export default function DividerBlock({ id, isEditing, onDelete }: DividerBlockProps) {
  return (
    <div className="group relative">
      {isEditing && (
        <div className="absolute -left-10 top-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="icon" variant="ghost" className="h-6 w-6 cursor-grab" data-testid={`drag-divider-${id}`}>
            <GripVertical className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-6 w-6 text-destructive" 
            onClick={onDelete}
            data-testid={`delete-divider-${id}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <table width="100%" cellPadding="0" cellSpacing="0" style={{ backgroundColor: '#ffffff' }}>
        <tbody>
          <tr>
            <td style={{ padding: '16px 24px' }}>
              <hr style={{ 
                border: 'none', 
                borderTop: '1px solid #E5E5E5', 
                margin: 0 
              }} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
