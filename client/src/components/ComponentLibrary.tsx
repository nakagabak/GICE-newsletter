import { 
  Heading, 
  Type, 
  Calendar, 
  AlertCircle, 
  Minus,
  ImageIcon,
  FileText 
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BlockTemplate {
  type: string;
  label: string;
  icon: any;
  description: string;
}

const blockTemplates: BlockTemplate[] = [
  {
    type: 'header',
    label: 'Header',
    icon: Heading,
    description: 'Newsletter title and subtitle',
  },
  {
    type: 'text',
    label: 'Text Block',
    icon: Type,
    description: 'Paragraph with optional title',
  },
  {
    type: 'event',
    label: 'Event Card',
    icon: Calendar,
    description: 'Event with image, date, and details',
  },
  {
    type: 'announcement',
    label: 'Announcement',
    icon: AlertCircle,
    description: 'Highlighted important message',
  },
  {
    type: 'divider',
    label: 'Divider',
    icon: Minus,
    description: 'Horizontal line separator',
  },
  {
    type: 'media',
    label: 'Image',
    icon: ImageIcon,
    description: 'Add images',
  },
  {
    type: 'footer',
    label: 'Footer',
    icon: FileText,
    description: 'Footer information',
  },
];

interface ComponentLibraryProps {
  onAddBlock: (type: string) => void;
}

export default function ComponentLibrary({ onAddBlock }: ComponentLibraryProps) {
  return (
    <div className="w-72 border-r border-border bg-card h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold">Content Blocks</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Click to add to your email
        </p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {blockTemplates.map((template) => {
            const Icon = template.icon;
            return (
              <Card
                key={template.type}
                className="p-3 cursor-pointer hover-elevate active-elevate-2 transition-all"
                onClick={() => {
                  console.log(`Adding block: ${template.type}`);
                  onAddBlock(template.type);
                }}
                data-testid={`add-block-${template.type}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm">{template.label}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {template.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
