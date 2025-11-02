import { EmailBlock } from "@shared/schema";
import HeaderBlock from "./email-blocks/HeaderBlock";
import TextBlock from "./email-blocks/TextBlock";
import EventBlock from "./email-blocks/EventBlock";
import AnnouncementBlock from "./email-blocks/AnnouncementBlock";
import DividerBlock from "./email-blocks/DividerBlock";
import MediaBlock from "./email-blocks/MediaBlock";
import FooterBlock from "./email-blocks/FooterBlock";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface EmailCanvasProps {
  blocks: EmailBlock[];
  onUpdateBlock: (id: string, content: any) => void;
  onDeleteBlock: (id: string) => void;
  onReorderBlocks: (blocks: EmailBlock[]) => void;
}

function SortableBlock({ block, onUpdateBlock, onDeleteBlock }: { 
  block: EmailBlock; 
  onUpdateBlock: (id: string, content: any) => void;
  onDeleteBlock: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const commonProps = {
    id: block.id,
    isEditing: true,
    onDelete: () => onDeleteBlock(block.id),
    onUpdate: (content: any) => onUpdateBlock(block.id, content),
    dragHandleProps: { ...attributes, ...listeners },
  };

  const renderBlock = () => {
    switch (block.type) {
      case 'header':
        return <HeaderBlock content={block.content as any} {...commonProps} />;
      case 'text':
        return <TextBlock content={block.content as any} {...commonProps} />;
      case 'event':
        return <EventBlock content={block.content as any} {...commonProps} />;
      case 'announcement':
        return <AnnouncementBlock content={block.content as any} {...commonProps} />;
      case 'divider':
        return <DividerBlock {...commonProps} />;
      case 'media':
        return <MediaBlock content={block.content as any} {...commonProps} />;
      case 'footer':
        return <FooterBlock content={block.content as any} {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div ref={setNodeRef} style={style}>
      {renderBlock()}
    </div>
  );
}

export default function EmailCanvas({ blocks, onUpdateBlock, onDeleteBlock, onReorderBlocks }: EmailCanvasProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex((block) => block.id === active.id);
      const newIndex = blocks.findIndex((block) => block.id === over.id);
      
      const reorderedBlocks = arrayMove(blocks, oldIndex, newIndex);
      onReorderBlocks(reorderedBlocks);
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
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={blocks.map(b => b.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {blocks.map((block) => (
                      <SortableBlock
                        key={block.id}
                        block={block}
                        onUpdateBlock={onUpdateBlock}
                        onDeleteBlock={onDeleteBlock}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
