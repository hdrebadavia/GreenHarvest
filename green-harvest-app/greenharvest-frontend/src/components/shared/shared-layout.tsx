import { Box, Container, Grid, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import React from 'react';
import { AccountCircle } from '@mui/icons-material';

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
        <Grid size={3}>
          <Box
          component="img"
          src="/src/assets/GreenHarvest Logo - Transparent.png"
          alt="Logo"
          sx={{
            width: '35%',
            display: 'inline-block',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
          />
        </Grid>
        <Grid size={6} sx={{display:'flex', justifyContent: 'center', alignItems: 'center', margin:'0px'}}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Products" {...a11yProps(0)} />
            <Tab label="About GreenHarvest" {...a11yProps(1)} />
          </Tabs>
        </Grid>
        <Grid size={3}>
          <Typography fontSize={60} textAlign="center" mb={0}>
            <AccountCircle></AccountCircle>
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
            <Grid size={3}>
                <Typography>Navigation Pane</Typography>
            </Grid>
            <Grid size={9} padding={0}>
              <CustomTabPanel value={value} index={0}>
                <Box>
                    {children}
                </Box>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                About
              </CustomTabPanel>
            </Grid>
        </Grid>
    </Box>
  );
};

export default SharedLayout;