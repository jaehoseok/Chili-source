import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';

const BASICINDEX = [
  { name: '시작하기', pathId: 1 },
  { name: '기능 소개', pathId: 2 },
];

const SIDEINDEX = [
  { name: '기여', pathId: 3 },
  { name: 'FAQ', pathId: 4 },
];

const index = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          border: `1px solid #e9e9e9`,
          padding: '10px',
          width: '300px',
          height: '100%',
          maxHeight: '700px',
        }}
      >
        <List>
          {BASICINDEX.map(({ name, pathId }) => (
            <ListItem key={pathId} disablePadding>
              <ListItemButton onClick={() => navigate(`/guide/${pathId}`)}>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {SIDEINDEX.map(({ name, pathId }) => (
            <ListItem key={pathId} disablePadding>
              <ListItemButton onClick={() => navigate(`/guide/${pathId}`)}>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};

export default index;
