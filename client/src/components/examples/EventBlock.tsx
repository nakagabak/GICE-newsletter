import EventBlock from '../email-blocks/EventBlock';

export default function EventBlockExample() {
  return (
    <div className="w-full max-w-email mx-auto">
      <EventBlock
        id="example-1"
        content={{
          title: 'Global Education Symposium',
          date: 'Wednesday, November 15 | 2:00-4:00pm | Gutman Conference Center',
          description: 'Join us for an engaging discussion on the future of global education. This symposium will feature distinguished speakers from around the world sharing insights on international education policy and practice.',
          link: '#',
          linkText: 'Register Now →'
        }}
        isEditing={false}
      />
    </div>
  );
}
