import EmailCanvas from '../EmailCanvas';

export default function EmailCanvasExample() {
  const sampleBlocks = [
    {
      id: '1',
      type: 'header' as const,
      content: {
        title: 'GICE Weekly Newsletter',
        subtitle: 'October 21, 2025',
      },
    },
    {
      id: '2',
      type: 'text' as const,
      content: {
        title: 'Note from Program Team',
        body: 'Dear GICE Students,\n\nWe hope you are having a productive semester. Here are some important updates and opportunities for you.',
      },
    },
  ];

  return (
    <div className="h-screen">
      <EmailCanvas
        blocks={sampleBlocks}
        onUpdateBlock={(id, content) => console.log(`Update block ${id}:`, content)}
        onDeleteBlock={(id) => console.log(`Delete block ${id}`)}
      />
    </div>
  );
}
