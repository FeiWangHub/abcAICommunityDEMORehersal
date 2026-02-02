import { Routes, Route, Link as RouterLink, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Box, 
  InputBase, 
  alpha, 
  styled,
  IconButton,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Snackbar,
  Alert,
  Tooltip
} from '@mui/material';
import { Search as SearchIcon, MessageSquare, Home as HomeIcon, Bot, Cpu, Globe } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

// Page Components
import Home from './pages/Home';
import ExternalResources from './pages/ExternalResources';
import InternalResources from './pages/InternalResources';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 12,
  backgroundColor: alpha(theme.palette.common.white, 0.05),
  border: '1px solid rgba(255, 255, 255, 0.1)',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
    borderColor: 'rgba(124, 58, 237, 0.5)',
  },
  marginLeft: 0,
  width: '100%',
  transition: 'all 0.3s ease',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '15ch',
      '&:focus': {
        width: '25ch',
      },
    },
  },
}));

function App() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [email, setEmail] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  const handleFeedbackSubmit = async () => {
    if (!feedbackMsg.trim()) return;
    try {
      await axios.post('http://localhost:8000/api/feedback', {
        message: feedbackMsg,
        user_email: email
      });
      setSnackbar({ open: true, message: 'Feedback submitted! Thank you.', severity: 'success' });
      setFeedbackOpen(false);
      setFeedbackMsg('');
      setEmail('');
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to submit feedback.', severity: 'error' });
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      <AppBar position="sticky" sx={{ top: 0, zIndex: 1100 }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ height: 80 }}>
            <Box
              component={RouterLink}
              to="/"
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1.5, 
                textDecoration: 'none', 
                color: 'inherit',
                flexGrow: { xs: 1, md: 0 },
                mr: 4
              }}
            >
              <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'primary.main', display: 'flex' }}>
                <Bot size={24} color="white" />
              </Box>
              <Typography
                variant="h6"
                noWrap
                sx={{ 
                  fontWeight: 800,
                  letterSpacing: -0.5,
                  fontSize: '1.25rem',
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                ABC AI COMMUNITY
              </Typography>
            </Box>
            
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, flexGrow: 1 }}>
              <Button 
                component={RouterLink} 
                to="/external-resources"
                startIcon={<Globe size={18} />}
                sx={{ color: 'text.secondary', '&:hover': { color: 'primary.light' } }}
              >
                External AI
              </Button>
              <Button 
                component={RouterLink} 
                to="/internal-resources"
                startIcon={<Cpu size={18} />}
                sx={{ color: 'text.secondary', '&:hover': { color: 'primary.light' } }}
              >
                Internal AI
              </Button>
            </Box>

            <Search>
              <SearchIconWrapper>
                <SearchIcon size={18} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Find resources..."
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, position: 'relative' }}>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/external-resources" element={<ExternalResources />} />
            <Route path="/internal-resources" element={<InternalResources />} />
          </Routes>
        </AnimatePresence>
      </Box>

      <Tooltip title="Feedback" placement="left">
        <Fab 
          color="primary" 
          aria-label="feedback" 
          sx={{ 
            position: 'fixed', 
            bottom: 32, 
            right: 32,
            boxShadow: '0 8px 32px rgba(124, 58, 237, 0.4)',
            '&:hover': {
              transform: 'scale(1.1) rotate(5deg)',
            },
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
          onClick={() => setFeedbackOpen(true)}
        >
          <MessageSquare size={24} />
        </Fab>
      </Tooltip>

      <Dialog 
        open={feedbackOpen} 
        onClose={() => setFeedbackOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 1,
            background: 'rgba(30, 41, 59, 0.9)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: '1.5rem' }}>Send Feedback</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
            Help us improve the community by sharing your thoughts or reporting issues.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Message"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={feedbackMsg}
            onChange={(e) => setFeedbackMsg(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Email Address (optional)"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setFeedbackOpen(false)} sx={{ color: 'text.secondary' }}>Cancel</Button>
          <Button onClick={handleFeedbackSubmit} variant="contained" sx={{ px: 4 }}>Send Message</Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} variant="filled" sx={{ width: '100%', borderRadius: 2 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
