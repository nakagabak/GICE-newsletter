import EmailToolbar from '../EmailToolbar';
import { useState } from 'react';

export default function EmailToolbarExample() {
  const [name, setName] = useState('GICE Newsletter - October 2025');
  
  return (
    <EmailToolbar
      templateName={name}
      onTemplateNameChange={setName}
      onSave={() => console.log('Saving template...')}
      onExport={() => console.log('Exporting HTML...')}
    />
  );
}
