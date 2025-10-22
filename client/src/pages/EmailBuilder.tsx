import { useState } from "react";
import { EmailBlock } from "@shared/schema";
import ComponentLibrary from "@/components/ComponentLibrary";
import EmailCanvas from "@/components/EmailCanvas";
import EmailToolbar from "@/components/EmailToolbar";
import { useToast } from "@/hooks/use-toast";

const getDefaultContent = (type: string) => {
  switch (type) {
    case 'header':
      return {
        title: 'Newsletter Title',
        subtitle: 'Subtitle or date',
      };
    case 'text':
      return {
        title: 'Section Title',
        body: 'Add your content here...',
      };
    case 'event':
      return {
        title: 'Event Name',
        date: 'Date and time',
        description: 'Event description...',
        link: '#',
        linkText: 'Learn More →',
      };
    case 'announcement':
      return {
        title: 'Important Notice',
        body: 'Announcement details...',
      };
    case 'media':
      return {
        imageUrl: '',
        altText: '',
        caption: '',
        linkUrl: '',
        width: 'full',
      };
    case 'footer':
      return {
        organizationName: 'GICE Program - Harvard Graduate School of Education',
        contactInfo: '13 Appian Way, Cambridge, MA 02138',
        resourceLink: 'https://edmsupport.gse.harvard.edu/global-international-and-comparative-education',
        unsubscribeText: 'Unsubscribe | Update email preferences',
      };
    default:
      return {};
  }
};

export default function EmailBuilder() {
  const [templateName, setTemplateName] = useState('GICE Newsletter - October 2025');
  const [blocks, setBlocks] = useState<EmailBlock[]>([]);
  const { toast } = useToast();

  const handleAddBlock = (type: string) => {
    const newBlock: EmailBlock = {
      id: `${type}-${Date.now()}`,
      type: type as any,
      content: getDefaultContent(type),
    };
    setBlocks([...blocks, newBlock]);
    
    toast({
      title: "Block added",
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} block added to your email`,
    });
  };

  const handleUpdateBlock = (id: string, content: any) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, content } : block
    ));
  };

  const handleDeleteBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id));
    
    toast({
      title: "Block removed",
      description: "The content block has been removed from your email",
    });
  };

  const handleSave = () => {
    console.log('Saving template:', { name: templateName, blocks });
    
    toast({
      title: "Template saved",
      description: `"${templateName}" has been saved successfully`,
    });
  };

  const handleExport = () => {
    const html = generateEmailHTML(blocks);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${templateName.replace(/\s+/g, '-').toLowerCase()}.html`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "HTML exported",
      description: "Your email template has been downloaded as HTML",
    });
  };

  return (
    <div className="h-screen flex flex-col">
      <EmailToolbar
        templateName={templateName}
        onTemplateNameChange={setTemplateName}
        onSave={handleSave}
        onExport={handleExport}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <ComponentLibrary onAddBlock={handleAddBlock} />
        <EmailCanvas
          blocks={blocks}
          onUpdateBlock={handleUpdateBlock}
          onDeleteBlock={handleDeleteBlock}
        />
      </div>
    </div>
  );
}

function generateEmailHTML(blocks: EmailBlock[]): string {
  const blockHTMLMap: Record<string, (content: any) => string> = {
    header: (content) => `
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff;">
        <tr>
          <td style="padding: 24px; border-top: 4px solid #A51C30;">
            <h1 style="font-family: Georgia, serif; font-size: 24px; font-weight: 700; color: #262626; margin: 0;">
              ${content.title}
            </h1>
            ${content.subtitle ? `
              <p style="font-family: Arial, sans-serif; font-size: 14px; color: #737373; margin: 8px 0 0 0;">
                ${content.subtitle}
              </p>
            ` : ''}
          </td>
        </tr>
      </table>
    `,
    text: (content) => `
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff;">
        <tr>
          <td style="padding: 32px 24px;">
            ${content.title ? `
              <h2 style="font-family: Georgia, serif; font-size: 20px; font-weight: 700; color: #262626; margin: 0 0 16px 0;">
                ${content.title}
              </h2>
            ` : ''}
            <p style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #404040; margin: 0; white-space: pre-wrap;">
              ${content.body}
            </p>
          </td>
        </tr>
      </table>
    `,
    event: (content) => `
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F5F5F5;">
        <tr>
          <td style="padding: 32px 24px;">
            ${content.image ? `<img src="${content.image}" alt="${content.title}" style="width: 100%; height: auto; margin-bottom: 16px; border-radius: 4px;" />` : ''}
            <h3 style="font-family: Georgia, serif; font-size: 18px; font-weight: 700; color: #262626; margin: 0 0 8px 0;">
              ${content.title}
            </h3>
            ${content.date ? `
              <p style="font-family: Arial, sans-serif; font-size: 14px; font-weight: 600; color: #A51C30; margin: 0 0 12px 0;">
                ${content.date}
              </p>
            ` : ''}
            <p style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #404040; margin: 0 0 16px 0;">
              ${content.description}
            </p>
            ${content.link ? `
              <a href="${content.link}" style="display: inline-block; font-family: Arial, sans-serif; font-size: 14px; font-weight: 600; color: #0073E6; text-decoration: none; border-bottom: 1px solid #0073E6;">
                ${content.linkText || 'Learn More →'}
              </a>
            ` : ''}
          </td>
        </tr>
      </table>
    `,
    announcement: (content) => `
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff;">
        <tr>
          <td style="padding: 32px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FEF2F2; border-left: 4px solid #A51C30; padding: 16px;">
              <tr>
                <td style="padding: 0 16px;">
                  <h3 style="font-family: Georgia, serif; font-size: 18px; font-weight: 700; color: #A51C30; margin: 0 0 8px 0;">
                    ${content.title}
                  </h3>
                  <p style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #404040; margin: 0;">
                    ${content.body}
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    `,
    divider: () => `
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff;">
        <tr>
          <td style="padding: 16px 24px;">
            <hr style="border: none; border-top: 1px solid #E5E5E5; margin: 0;" />
          </td>
        </tr>
      </table>
    `,
    media: (content) => {
      if (!content.imageUrl) return '';
      
      const widthMap: Record<string, string> = {
        full: '100%',
        medium: '400px',
        small: '250px',
      };
      const width = widthMap[content.width || 'full'];
      
      const imageHtml = `<img src="${content.imageUrl}" alt="${content.altText || 'Image'}" style="max-width: ${width}; width: 100%; height: auto; display: block; margin: 0 auto; border: none;" />`;
      
      return `
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff;">
        <tr>
          <td style="padding: 24px; text-align: center;">
            ${content.linkUrl ? `<a href="${content.linkUrl}" target="_blank" rel="noopener noreferrer">${imageHtml}</a>` : imageHtml}
            ${content.caption ? `
              <p style="font-family: Arial, sans-serif; font-size: 13px; color: #737373; margin: 12px 0 0 0; font-style: italic;">
                ${content.caption}
              </p>
            ` : ''}
          </td>
        </tr>
      </table>
    `;
    },
    footer: (content) => `
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #262626;">
        <tr>
          <td style="padding: 32px 24px; text-align: center;">
            <p style="font-family: Georgia, serif; font-size: 16px; font-weight: 700; color: #ffffff; margin: 0 0 12px 0;">
              ${content.organizationName}
            </p>
            ${content.contactInfo ? `
              <p style="font-family: Arial, sans-serif; font-size: 13px; color: #A3A3A3; margin: 0 0 16px 0;">
                ${content.contactInfo}
              </p>
            ` : ''}
            ${content.resourceLink ? `
              <p style="margin: 0 0 16px 0;">
                <a href="${content.resourceLink}" style="font-family: Arial, sans-serif; font-size: 13px; color: #0073E6; text-decoration: none; border-bottom: 1px solid #0073E6;">
                  GICE Program Resources
                </a>
              </p>
            ` : ''}
            <p style="font-family: Arial, sans-serif; font-size: 12px; color: #737373; margin: 0;">
              ${content.unsubscribeText || 'Unsubscribe | Update preferences'}
            </p>
          </td>
        </tr>
      </table>
    `,
  };

  const blocksHTML = blocks
    .map(block => blockHTMLMap[block.type]?.(block.content) || '')
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${blocks.find(b => b.type === 'header')?.content.title || 'Email Newsletter'}</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f0f0;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; max-width: 600px;">
          ${blocksHTML}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
