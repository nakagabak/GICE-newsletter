import HeaderBlock from '../email-blocks/HeaderBlock';

export default function HeaderBlockExample() {
  return (
    <div className="w-full max-w-email mx-auto">
      <HeaderBlock
        id="example-1"
        content={{
          title: 'GICE Weekly Newsletter',
          subtitle: 'Global, International, and Comparative Education'
        }}
        isEditing={false}
      />
    </div>
  );
}
