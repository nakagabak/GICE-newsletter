import FooterBlock from '../email-blocks/FooterBlock';

export default function FooterBlockExample() {
  return (
    <div className="w-full max-w-email mx-auto">
      <FooterBlock
        id="example-1"
        content={{
          organizationName: 'GICE Program - Harvard Graduate School of Education',
          contactInfo: '13 Appian Way, Cambridge, MA 02138',
          resourceLink: 'https://edmsupport.gse.harvard.edu/global-international-and-comparative-education',
          unsubscribeText: 'Unsubscribe | Update email preferences'
        }}
        isEditing={false}
      />
    </div>
  );
}
