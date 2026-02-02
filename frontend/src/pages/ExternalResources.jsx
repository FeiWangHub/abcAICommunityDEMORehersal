import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  Chip, 
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Grid
} from '@mui/material';
// import Grid from '@mui/material/Grid2';
import { ExternalLink, BarChart3, Wrench, Globe, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const ExternalResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/resources/external');
        setResources(response.data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  const benchmarks = resources.filter(r => r.category === 'benchmarks');
  const devTools = resources.filter(r => r.category === 'development_tools');
  const modelProviders = resources.filter(r => r.category === 'model_providers');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Container maxWidth="lg">
      <Box component={motion.div} initial="hidden" animate="visible" variants={containerVariants}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 800, mb: 6, textAlign: 'center' }}>
          External AI Ecosystem
        </Typography>

        {/* Benchmarks Section */}
        <Box sx={{ mb: 10 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(124, 58, 237, 0.1)', color: 'primary.light' }}>
              <BarChart3 size={24} />
            </Box>
            <Typography variant="h4">Model Benchmarks</Typography>
          </Box>
          <TableContainer component={Paper} sx={{ 
            background: 'rgba(30, 41, 59, 0.4)',
            borderRadius: 4,
            overflow: 'hidden'
          }}>
            <Table>
              <TableHead sx={{ bgcolor: 'rgba(124, 58, 237, 0.1)' }}>
                <TableRow>
                  <TableCell sx={{ color: 'primary.light', fontWeight: 700 }}>Model Name</TableCell>
                  <TableCell sx={{ color: 'primary.light', fontWeight: 700 }}>Description</TableCell>
                  <TableCell align="right" sx={{ color: 'primary.light', fontWeight: 700 }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {benchmarks.map((item) => (
                  <TableRow key={item.id} hover sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' } }}>
                    <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>{item.name}</TableCell>
                    <TableCell sx={{ color: 'text.secondary' }}>{item.description}</TableCell>
                    <TableCell align="right">
                      <Button 
                        size="small" 
                        endIcon={<ExternalLink size={14} />} 
                        href={item.url} 
                        target="_blank"
                        sx={{ color: 'primary.light' }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Dev Tools Section */}
        <Box sx={{ mb: 10 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(249, 115, 22, 0.1)', color: 'secondary.main' }}>
              <Wrench size={24} />
            </Box>
            <Typography variant="h4">Development Tools</Typography>
          </Box>
          <Grid container spacing={3}>
            {devTools.map((tool) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={tool.id}>
                <Card component={motion.div} variants={itemVariants} sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 1 }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: 'primary.light' }}>
                      {tool.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {tool.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ px: 2, pb: 2 }}>
                    <Button 
                      fullWidth 
                      variant="outlined" 
                      size="small" 
                      href={tool.url} 
                      target="_blank"
                      sx={{ borderColor: 'rgba(255,255,255,0.1)', color: 'text.secondary', '&:hover': { borderColor: 'primary.main', color: 'primary.light' } }}
                    >
                      Documentation
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Model Providers Section */}
        <Box sx={{ mb: 10 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              <Globe size={24} />
            </Box>
            <Typography variant="h4">Model Providers</Typography>
          </Box>
          <Grid container spacing={3}>
            {modelProviders.map((provider) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={provider.id}>
                <Card component={motion.div} variants={itemVariants} sx={{ textAlign: 'center', p: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                      {provider.name}
                    </Typography>
                    <Chip 
                      label="Cloud Native" 
                      size="small" 
                      sx={{ mb: 2, bgcolor: 'rgba(124, 58, 237, 0.1)', color: 'primary.light', fontWeight: 600 }} 
                    />
                    <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary', minHeight: '3em' }}>
                      {provider.description}
                    </Typography>
                    <Button 
                      variant="contained" 
                      href={provider.url} 
                      target="_blank" 
                      fullWidth
                      sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: 'text.primary', '&:hover': { bgcolor: 'primary.main' } }}
                    >
                      Visit Provider
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default ExternalResources;
