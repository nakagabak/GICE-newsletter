import { EmailBlock } from "@shared/schema";
import HeaderBlock from "./email-blocks/HeaderBlock";
import TextBlock from "./email-blocks/TextBlock";
import EventBlock from "./email-blocks/EventBlock";
import AnnouncementBlock from "./email-blocks/AnnouncementBlock";
import DividerBlock from "./email-blocks/DividerBlock";
import MediaBlock from "./email-blocks/MediaBlock";
import FooterBlock from "./email-blocks/FooterBlock";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EmailCanvasProps {
  blocks: EmailBlock[];
  onUpdateBlock: (id: string, content: any) => void;
  onDeleteBlock: (id: string) => void;
}

export default function EmailCanvas({ blocks, onUpdateBlock, onDeleteBlock }: EmailCanvasProps) {
  const renderBlock = (block: EmailBlock) => {
    const commonProps = {
      id: block.id,
      isEditing: true,
      onDelete: () => onDeleteBlock(block.id),
      onUpdate: (content: any) => onUpdateBlock(block.id, content),
    };

    switch (block.type) {
      case 'header':
        return <HeaderBlock key={block.id} content={block.content as any} {...commonProps} />;
      case 'text':
        return <TextBlock key={block.id} content={block.content as any} {...commonProps} />;
      case 'event':
        return <EventBlock key={block.id} content={block.content as any} {...commonProps} />;
      case 'announcement':
        return <AnnouncementBlock key={block.id} content={block.content as any} {...commonProps} />;
      case 'divider':
        return <DividerBlock key={block.id} {...commonProps} />;
      case 'media':
        return <MediaBlock key={block.id} content={block.content as any} {...commonProps} />;
      case 'footer':
        return <FooterBlock key={block.id} content={block.content as any} {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 bg-muted/30 flex items-start justify-center py-8">
      <ScrollArea className="h-[calc(100vh-8rem)] w-full">
        <div className="flex justify-center px-4">
          <div 
            className="w-full max-w-email bg-white shadow-lg"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            {blocks.length === 0 ? (
              <div className="p-16 text-center text-gray-500">
                <p className="text-lg font-medium mb-2">Start building your email</p>
                <p className="text-sm">Click on a content block to add it to your email template</p>
              </div>
            ) : (
              <div className="pl-12">
                {blocks.map(renderBlock)}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
