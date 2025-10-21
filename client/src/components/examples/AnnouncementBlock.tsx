import AnnouncementBlock from '../email-blocks/AnnouncementBlock';

export default function AnnouncementBlockExample() {
  return (
    <div className="w-full max-w-email mx-auto">
      <AnnouncementBlock
        id="example-1"
        content={{
          title: 'Important Deadline',
          body: 'The application deadline for Spring 2026 international field studies is November 30th. Please submit all required materials through the student portal.'
        }}
        isEditing={false}
      />
    </div>
  );
}
