import * as React from 'react';

import ContactMailIcon from '@mui/icons-material/ContactMail';
import HomeIcon from '@mui/icons-material/Home';
import KeyIcon from '@mui/icons-material/Key';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';

import { UserAddressesTab } from '@/components/Profile/Tabs/UserAddressesTab';
import { UserCredentialsTab } from '@/components/Profile/Tabs/UserCredentialsTab';
import { UserPasswordTab } from '@/components/Profile/Tabs/UserPasswordTab';

export function Profile() {
  const matches = useMediaQuery('(max-width:550px)');

  const [value, setValue] = React.useState('1');

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: '100%',
        typography: 'body1',
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'start',
        alignItems: 'center',
      }}
    >
      <TabContext value={value}>
        <Box>
          <TabList
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            centered
            orientation={matches ? 'vertical' : 'horizontal'}
            variant={matches ? 'scrollable' : 'standard'}
          >
            <Tab icon={<ContactMailIcon />} label="Personal Information" value="1" />
            <Tab icon={<KeyIcon />} label="Your Password" value="2" />
            <Tab icon={<HomeIcon />} label="Your Addresses" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ width: '100%' }}>
          <UserCredentialsTab />
        </TabPanel>
        <TabPanel value="2" sx={{ width: '100%' }}>
          <UserPasswordTab />
        </TabPanel>
        <TabPanel value="3" sx={{ width: '100%' }}>
          <UserAddressesTab />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default Profile;
