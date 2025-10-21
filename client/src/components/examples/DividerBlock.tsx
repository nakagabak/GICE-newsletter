import DividerBlock from '../email-blocks/DividerBlock';

export default function DividerBlockExample() {
  return (
    <div className="w-full max-w-email mx-auto">
      <DividerBlock
        id="example-1"
        isEditing={false}
      />
    </div>
  );
}
