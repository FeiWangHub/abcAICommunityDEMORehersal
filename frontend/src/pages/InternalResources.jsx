import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  CircularProgress,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Container,
  Chip,
  Snackbar,
  Alert,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
// import Grid from '@mui/material/Grid2';
import { 
  Copy, 
  Download, 
  Search, 
  Info, 
  LayoutGrid, 
  Terminal, 
  Table as TableIcon, 
  Cpu, 
  Database, 
  BookOpen, 
  ExternalLink, 
  Globe,
  Sparkles,
  Zap,
  Layers
} from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const InternalResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const isDev = import.meta.env.DEV;
        const apiUrl = isDev ? (import.meta.env.VITE_API_URL || 'http://localhost:8000') : '';
        const response = await axios.get(`${apiUrl}/api/resources/internal`);
        setResources(response.data);
      } catch (error) {
        console.error('Error fetching internal resources:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  const handleCopy = (command) => {
    navigator.clipboard.writeText(command);
    setSnackbar({ open: true, message: 'Command copied to clipboard!' });
  };

  const filteredResources = resources.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.resource_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const modelGarden = resources.filter(r => r.resource_type === 'model_garden');
  const aiSoftware = resources.filter(r => r.resource_type === 'ai_software');

  return (
    <Container maxWidth="lg">
      <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 800, mb: 6, textAlign: 'center' }}>
          Internal AI Assets
        </Typography>

        {/* AI Platform Big Card */}
        <Box sx={{ mb: 10 }}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)',
            borderRadius: 4,
            border: '1px solid rgba(124, 58, 237, 0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <Box sx={{ 
              position: 'absolute', 
              top: -100, 
              right: -100, 
              width: 300, 
              height: 300, 
              background: 'radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, transparent 70%)',
              zIndex: 0 
            }} />
            
            <CardContent sx={{ p: { xs: 3, md: 6 }, position: 'relative', zIndex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'primary.main', color: 'white' }}>
                  <Layers size={32} />
                </Box>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 800 }}>AI Platform</Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>Our integrated ecosystem for AI development and innovation</Typography>
                </Box>
              </Box>

              <Grid container spacing={4}>
                {/* Model Garden */}
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 3, height: '100%', bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 3, border: '1px solid rgba(255,255,255,0.05)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                      <Cpu size={20} color="#8b5cf6" />
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>Model Garden</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>Access our curated collection of frontier and internal models.</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {['GPT-4o', 'Claude 3.5', 'Llama 3.1', 'DeepSeek-V2', 'Internal-LLM-v2'].map((model) => (
                        <Chip key={model} label={model} size="small" sx={{ bgcolor: 'rgba(139, 92, 246, 0.1)', color: 'primary.light', fontSize: '0.7rem' }} />
                      ))}
                    </Box>
                  </Paper>
                </Grid>

                {/* RAG Studio */}
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 3, height: '100%', bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 3, border: '1px solid rgba(255,255,255,0.05)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                      <Database size={20} color="#10b981" />
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>RAG Studio</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>Build knowledge-aware agents with our Retrieval-Augmented Generation pipeline.</Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button size="small" variant="contained" color="success" startIcon={<Zap size={14} />} sx={{ borderRadius: 1.5 }}>Launch Studio</Button>
                      <Button size="small" variant="outlined" color="success" startIcon={<BookOpen size={14} />} sx={{ borderRadius: 1.5 }}>Wiki</Button>
                    </Box>
                  </Paper>
                </Grid>

                {/* Doc Wiki */}
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 3, height: '100%', bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 3, border: '1px solid rgba(255,255,255,0.05)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                      <Globe size={20} color="#3b82f6" />
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>Doc Wiki</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>Comprehensive documentation for all internal AI protocols and best practices.</Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button size="small" variant="contained" color="primary" startIcon={<ExternalLink size={14} />} sx={{ borderRadius: 1.5 }}>Read Docs</Button>
                      <Button size="small" variant="outlined" color="primary" startIcon={<BookOpen size={14} />} sx={{ borderRadius: 1.5 }}>Wiki</Button>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>

        {/* Model Garden Section */}
        <Box sx={{ mb: 10 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(124, 58, 237, 0.1)', color: 'primary.light' }}>
              <LayoutGrid size={24} />
            </Box>
            <Typography variant="h4">Model Garden</Typography>
          </Box>
          <Grid container spacing={3}>
            {modelGarden.map((platform) => (
              <Grid size={{ xs: 12, md: 4 }} key={platform.id}>
                <Card sx={{ 
                  height: '100%',
                  borderTop: '4px solid', 
                  borderColor: 'primary.main',
                  background: 'linear-gradient(to bottom right, rgba(30, 41, 59, 0.6), rgba(30, 41, 59, 0.4))'
                }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                      {platform.name}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.6 }}>
                      {platform.description}
                    </Typography>
                    <Button 
                      variant="contained" 
                      fullWidth
                      href={platform.access_url} 
                      target="_blank"
                      sx={{ borderRadius: 2 }}
                    >
                      Enter Platform
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* AI Software Section */}
        <Box sx={{ mb: 10 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(249, 115, 22, 0.1)', color: 'secondary.main' }}>
              <Terminal size={24} />
            </Box>
            <Typography variant="h4">Development Software</Typography>
          </Box>
          <Grid container spacing={4}>
            {aiSoftware.map((software) => (
              <Grid size={{ xs: 12, md: 6 }} key={software.id}>
                <Paper sx={{ 
                  p: 4, 
                  background: 'rgba(30, 41, 59, 0.3)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: 'primary.light' }}>
                    {software.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                    {software.description}
                  </Typography>
                  <Box sx={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.6)', 
                    p: 2, 
                    borderRadius: 2, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    fontFamily: 'monospace',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    <Typography variant="body2" sx={{ color: '#a5b4fc' }}>
                      {software.installation_guide?.command || 'Follow setup guide'}
                    </Typography>
                    {software.installation_guide?.command && (
                      <Tooltip title="Copy command">
                        <IconButton size="small" onClick={() => handleCopy(software.installation_guide.command)} sx={{ color: 'primary.light' }}>
                          <Copy size={16} />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Resource List Table */}
        <Box sx={{ mb: 10 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                <TableIcon size={24} />
              </Box>
              <Typography variant="h4">Resource Directory</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, width: { xs: '100%', md: 'auto' } }}>
              <TextField
                size="small"
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ 
                  width: { xs: '100%', md: 250 },
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'rgba(30, 41, 59, 0.5)',
                    borderRadius: 2
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={18} color="#94a3b8" />
                    </InputAdornment>
                  ),
                }}
              />
              <Button variant="outlined" startIcon={<Download size={18} />} sx={{ borderRadius: 2, borderColor: 'rgba(255,255,255,0.1)' }}>
                Export
              </Button>
            </Box>
          </Box>
          <TableContainer component={Paper} sx={{ 
            background: 'rgba(30, 41, 59, 0.4)',
            borderRadius: 4,
            overflow: 'hidden'
          }}>
            <Table>
              <TableHead sx={{ bgcolor: 'rgba(255, 255, 255, 0.02)' }}>
                <TableRow>
                  <TableCell sx={{ color: 'text.secondary', fontWeight: 700 }}>Name</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontWeight: 700 }}>Type</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontWeight: 700 }}>Owner</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontWeight: 700 }}>Status</TableCell>
                  <TableCell align="right" sx={{ color: 'text.secondary', fontWeight: 700 }}>Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredResources.map((row) => (
                  <TableRow key={row.id} hover sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' } }}>
                    <TableCell sx={{ fontWeight: 600 }}>{row.name}</TableCell>
                    <TableCell>
                      <Chip label={row.resource_type.replace('_', ' ')} size="small" sx={{ textTransform: 'capitalize', bgcolor: 'rgba(255,255,255,0.05)' }} />
                    </TableCell>
                    <TableCell sx={{ color: 'text.secondary' }}>{row.responsible_person}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10b981' }} />
                        <Typography variant="body2" sx={{ color: '#10b981', fontWeight: 600 }}>Active</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" sx={{ color: 'text.secondary' }}>
                        <Info size={18} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={3000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%', borderRadius: 2 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default InternalResources;
