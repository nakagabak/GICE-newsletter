import TextBlock from '../email-blocks/TextBlock';

export default function TextBlockExample() {
  return (
    <div className="w-full max-w-email mx-auto">
      <TextBlock
        id="example-1"
        content={{
          title: 'Note from Program Team',
          body: 'Dear GICE Students,\n\nWe hope this message finds you well. As we approach mid-semester, we wanted to share some important updates and opportunities with you.\n\nBest regards,\nThe GICE Team'
        }}
        isEditing={false}
      />
    </div>
  );
}
