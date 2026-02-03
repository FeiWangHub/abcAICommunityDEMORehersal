import { Box, Typography, Button, Paper, Container, Stack, Grid } from '@mui/material';
// import Grid from '@mui/material/Grid2';
import { motion } from 'framer-motion';
import { Rocket, Cpu, Users, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background Glows */}
      <Box sx={{
        position: 'fixed',
        top: '10%',
        left: '10%',
        width: '40vw',
        height: '40vw',
        background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)',
        zIndex: -1,
        filter: 'blur(100px)',
      }} />
      <Box sx={{
        position: 'fixed',
        bottom: '10%',
        right: '10%',
        width: '40vw',
        height: '40vw',
        background: 'radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, transparent 70%)',
        zIndex: -1,
        filter: 'blur(100px)',
      }} />

      {/* Hero Section */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        sx={{
          py: { xs: 8, md: 15 },
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <Box 
          component={motion.div}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          sx={{ mb: 2, display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.5, borderRadius: 10, bgcolor: 'rgba(124, 58, 237, 0.1)', border: '1px solid rgba(124, 58, 237, 0.2)' }}
        >
          <Sparkles size={16} color="#A78BFA" />
          <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>
            Welcome to the Future
          </Typography>
        </Box>
        
        <Typography variant="h1" gutterBottom sx={{ 
          background: 'linear-gradient(to right, #fff 30%, #94a3b8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitFillColor: 'transparent',
          mb: 3,
          fontSize: { xs: '2.5rem', md: '4rem' }
        }}>
          Empowering you with <br /> AI tooling, resources, knowledge
        </Typography>
        
        <Typography variant="h4" sx={{ mb: 6, color: 'text.secondary', maxWidth: '950px', mx: 'auto', fontWeight: 400, fontSize: { xs: '1.2rem', md: '1.6rem' }, lineHeight: 1.6 }}>
          The centralized gateway bridging world-class AI ecosystems with our internal innovation hub. <br />
          Explore the benchmarks, tools, and protocols defining the future of work.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
          <Button
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/external-resources')}
            endIcon={<ArrowRight size={20} />}
            sx={{ px: 6, py: 2, fontSize: '1.1rem', borderRadius: 3 }}
          >
            External Resources
          </Button>
          <Button
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variant="outlined"
            size="large"
            onClick={() => navigate('/internal-resources')}
            sx={{ px: 6, py: 2, fontSize: '1.1rem', borderRadius: 3, borderColor: 'rgba(255,255,255,0.2)', '&:hover': { borderColor: 'primary.main', bgcolor: 'rgba(124, 58, 237, 0.05)' } }}
          >
            Internal Resources
          </Button>
        </Stack>
      </Box>

      {/* Features Grid */}
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 10 }}>
          {[
            { icon: <Rocket size={40} />, title: "Latest Tools", desc: "Discover advanced AI development tools and CRI tools to boost productivity." },
            { icon: <Cpu size={40} />, title: "Model Garden", desc: "Access company-specific AI platforms and models tailored for our needs." },
            { icon: <Users size={40} />, title: "Community", desc: "Share feedback and collaborate with colleagues to build an AI culture." }
          ].map((feature, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Paper 
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * idx, duration: 0.5 }}
                whileHover={{ y: -10 }}
                sx={{ 
                  p: 4, 
                  height: '100%', 
                  textAlign: 'left',
                  background: 'rgba(30, 41, 59, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: 'primary.main',
                    background: 'rgba(30, 41, 59, 0.6)',
                  }
                }}
              >
                <Box sx={{ color: 'primary.light', mb: 3 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {feature.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
