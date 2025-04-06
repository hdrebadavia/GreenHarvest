import { Box, Container, Grid, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import React from 'react';

interface SharedLayoutProps {
  title: string;
  children: React.ReactNode;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const SharedLayout: React.FC<SharedLayoutProps> = ({ title, children }) => {

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Grid container spacing={2} sx={{ padding: 2, textAlign: 'center' }}>
        <Grid size={4}>
          <Box
          component="img"
          src="/src/assets/GreenHarvest Logo - Transparent.png"
          alt="Logo"
          sx={{
            width: '35%',
            height: 'auto',
            display: 'inline-block',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
          />
        </Grid>
        <Grid size={4}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </Grid>
        <Grid size={4}>
          <Typography variant="h4" textAlign="center" mb={3}>
            acct
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
            <Grid size={4}>
                <Typography>Navigation Pane</Typography>
            </Grid>
            <Grid size={8}>
              <CustomTabPanel value={value} index={0}>
                Item One
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                Item Two
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                Item Three
              </CustomTabPanel>
                <Typography variant="h4" textAlign="center" mb={3}>
                    {title}
                </Typography>
                <Box>
                    {children}
                </Box>
            </Grid>
        </Grid>
    </Box>
  );
};

export default SharedLayout;