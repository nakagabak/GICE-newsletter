import type { EmailBlock } from "@shared/schema";

export function generateEmailHtml(blocks: EmailBlock[]): string {
  const blocksHtml = blocks.map(block => generateBlockHtml(block)).join('\n');
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Newsletter</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #F5F5F5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F5F5F5;">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; max-width: 600px;">
          ${blocksHtml}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function generateBlockHtml(block: EmailBlock): string {
  switch (block.type) {
    case 'header':
      return generateHeaderHtml(block);
    case 'text':
      return generateTextHtml(block);
    case 'event':
      return generateEventHtml(block);
    case 'announcement':
      return generateAnnouncementHtml(block);
    case 'media':
      return generateMediaHtml(block);
    case 'divider':
      return generateDividerHtml();
    case 'footer':
      return generateFooterHtml(block);
    default:
      return '';
  }
}

function generateHeaderHtml(block: EmailBlock): string {
  if (block.type !== 'header') return '';
  const { title, subtitle } = block.content;
  
  return `          <tr>
            <td style="padding: 24px; border-top: 4px solid #A51C30;">
              <div style="font-family: Georgia, serif; font-size: 24px; font-weight: 700; color: #262626;">
                ${title}
              </div>
              ${subtitle ? `<div style="font-family: Arial, sans-serif; font-size: 14px; color: #737373; margin-top: 8px;">
                ${subtitle}
              </div>` : ''}
            </td>
          </tr>`;
}

function generateTextHtml(block: EmailBlock): string {
  if (block.type !== 'text') return '';
  const { title, body, linkUrl, linkText } = block.content;
  
  return `          <tr>
            <td style="padding: 32px 24px;">
              ${title ? `<div style="font-family: Georgia, serif; font-size: 20px; font-weight: 700; color: #262626; margin-bottom: 16px;">
                ${title}
              </div>` : ''}
              <div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #404040;">
                ${body}
              </div>
              ${linkUrl && linkText ? `<div style="margin-top: 16px;">
                <a href="${linkUrl}" style="font-family: Arial, sans-serif; font-size: 14px; color: #0073E6; text-decoration: none; border-bottom: 1px solid #0073E6;">
                  ${linkText}
                </a>
              </div>` : ''}
            </td>
          </tr>`;
}

function generateEventHtml(block: EmailBlock): string {
  if (block.type !== 'event') return '';
  const { title, date, description, link, linkText } = block.content;
  
  return `          <tr>
            <td style="padding: 32px 24px; background-color: #F5F5F5;">
              <div style="font-family: Georgia, serif; font-size: 18px; font-weight: 700; color: #262626; margin-bottom: 8px;">
                ${title}
              </div>
              ${date ? `<div style="font-family: Arial, sans-serif; font-size: 14px; font-weight: 600; color: #A51C30; margin-bottom: 12px;">
                ${date}
              </div>` : ''}
              <div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #404040; margin-bottom: 16px; white-space: pre-wrap;">
                ${description}
              </div>
              ${link && linkText ? `<a href="${link}" style="font-family: Arial, sans-serif; font-size: 14px; font-weight: 600; color: #0073E6; text-decoration: none; border-bottom: 1px solid #0073E6;">
                ${linkText}
              </a>` : ''}
            </td>
          </tr>`;
}

function generateAnnouncementHtml(block: EmailBlock): string {
  if (block.type !== 'announcement') return '';
  const { title, body } = block.content;
  
  return `          <tr>
            <td style="padding: 32px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FEF2F2; border-left: 4px solid #A51C30;">
                <tr>
                  <td style="padding: 16px;">
                    <div style="font-family: Georgia, serif; font-size: 18px; font-weight: 700; color: #A51C30; margin-bottom: 8px;">
                      ${title}
                    </div>
                    <div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #404040; white-space: pre-wrap;">
                      ${body}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`;
}

function generateMediaHtml(block: EmailBlock): string {
  if (block.type !== 'media') return '';
  const { imageUrl, altText, caption, linkUrl, width } = block.content;
  
  if (!imageUrl) return '';
  
  const widthMap: Record<string, string> = {
    full: '100%',
    medium: '400px',
    small: '250px',
  };
  const imgWidth = widthMap[width || 'full'];
  
  const imageElement = `<img src="${imageUrl}" alt="${altText || 'Image'}" style="max-width: ${imgWidth}; width: 100%; height: auto; display: block; margin: 0 auto; border: none;" />`;
  
  return `          <tr>
            <td style="padding: 24px; text-align: center;">
              ${linkUrl ? `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${imageElement}</a>` : imageElement}
              ${caption ? `<div style="font-family: Arial, sans-serif; font-size: 13px; color: #737373; margin-top: 12px; font-style: italic;">
                ${caption}
              </div>` : ''}
            </td>
          </tr>`;
}

function generateDividerHtml(): string {
  return `          <tr>
            <td style="padding: 16px 24px;">
              <hr style="border: none; border-top: 1px solid #E5E5E5; margin: 0;" />
            </td>
          </tr>`;
}

function generateFooterHtml(block: EmailBlock): string {
  if (block.type !== 'footer') return '';
  const { organizationName, contactInfo, resourceLink } = block.content;
  
  return `          <tr>
            <td style="padding: 32px 24px; text-align: center; background-color: #262626;">
              <div style="font-family: Georgia, serif; font-size: 16px; font-weight: 700; color: #ffffff; margin-bottom: 12px;">
                ${organizationName}
              </div>
              ${contactInfo ? `<div style="font-family: Arial, sans-serif; font-size: 13px; color: #A3A3A3; margin-bottom: 16px;">
                ${contactInfo}
              </div>` : ''}
              ${resourceLink ? `<div>
                <a href="${resourceLink}" style="font-family: Arial, sans-serif; font-size: 13px; color: #0073E6; text-decoration: none; border-bottom: 1px solid #0073E6;">
                  GICE Concentration Resources
                </a>
              </div>` : ''}
            </td>
          </tr>`;
}
