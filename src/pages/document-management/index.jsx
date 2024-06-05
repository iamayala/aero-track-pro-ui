// material-ui
import Grid from '@mui/material/Grid';
import PageTitle from 'components/@extended/PageTitle';
import DocCard from './Card';
import { useState } from 'react';
import FormSelect from 'components/FormSelect';

export default function Documents() {
  const options = [
    { label: 'All', value: null },
    {
      label: 'Service Bulletin',
      value: 'service_bulletin'
    },
    { label: 'Maintenance Manual', value: 'maintenance_manual' },
    { label: 'Technical Document', value: 'technical_document' },
    { label: 'Others', value: 'others' }
  ];
  const [active, setactive] = useState(options[0]);

  const documents = [
    {
      id: 2,
      document_type: 'maintenance_manual',
      document_name: 'Aircraft Maintenance Manual',
      document_description: 'Describing Aircraft Maintenance Manual',
      document_url: 'https://pdfobject.com/pdf/sample.pdf',
      created_at: '2024-05-10T00:00:00.000Z',
      updated_at: '2024-05-10T00:00:00.000Z'
    },
    {
      id: 3,
      document_type: 'service_bulletin',
      document_name: 'Aircraft Maintenance Manual',
      document_description: 'Describing Aircraft Maintenance Manual',
      document_url: 'https://pdfobject.com/pdf/sample.pdf',
      created_at: '2024-05-10T00:00:00.000Z',
      updated_at: '2024-05-10T00:00:00.000Z'
    }
  ];

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Grid container>
      <PageTitle title="Documents" buttonLabel="New Document" hasButton={false} onPressButton={() => handleClickOpen()} />
      <FormSelect options={options} handleChange={(e) => setactive(e.target.value)} value={active} />

      <Grid container rowSpacing={1.5} columnSpacing={1.5}>
        {documents
          .filter((item) => item.document_type === active)
          .map((item, i) => {
            return (
              <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                <DocCard item={item} />
              </Grid>
            );
          })}
      </Grid>
    </Grid>
  );
}

Documents.propTypes = {};
