import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Grid,
  Chip,
  Tooltip
} from '@mui/material';
import { ExternalLink, Trophy, Code2, Globe, Terminal, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const TopTenChart = ({ title, icon, data, color }) => (
  <Box sx={{ mb: 4, width: '100%' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, position: 'relative' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 1, borderRadius: 1.5, bgcolor: `${color}.main`, opacity: 0.15, position: 'absolute', width: '36px', height: '36px', zIndex: 0 }} />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', color: `${color}.main`, position: 'relative', zIndex: 1 }}>
        {icon}
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 700, ml: 0.5, fontSize: { xs: '1rem', md: '1.25rem' } }}>{title}</Typography>
    </Box>
    <TableContainer component={Paper} sx={{ 
      background: 'rgba(30, 41, 59, 0.4)',
      borderRadius: 1.5,
      overflow: 'hidden',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      '& .MuiTableCell-root': {
        px: 2,
        py: 1.5,
        fontSize: '0.85rem',
        borderColor: 'rgba(255, 255, 255, 0.05)'
      }
    }}>
      <Table size="small">
        <TableHead sx={{ bgcolor: 'rgba(255, 255, 255, 0.02)' }}>
          <TableRow>
            <TableCell sx={{ color: 'text.secondary', fontWeight: 700, width: '60px' }}>Rank</TableCell>
            <TableCell sx={{ color: 'text.secondary', fontWeight: 700 }}>Name</TableCell>
            <TableCell sx={{ color: 'text.secondary', fontWeight: 700, display: { xs: 'none', md: 'table-cell' } }}>Key Feature / Score</TableCell>
            <TableCell align="right" sx={{ color: 'text.secondary', fontWeight: 700, width: '60px' }}>Link</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index} hover sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' } }}>
              <TableCell>
                <Typography variant="body2" sx={{ fontWeight: 800, color: index < 3 ? 'secondary.main' : 'text.secondary', fontSize: 'inherit' }}>
                  #{index + 1}
                </Typography>
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: 'text.primary', fontSize: 'inherit' }}>{item.name}</TableCell>
              <TableCell sx={{ color: 'text.secondary', fontSize: 'inherit', display: { xs: 'none', md: 'table-cell' } }}>{item.detail}</TableCell>
              <TableCell align="right">
                <Box component="a" href={item.url} target="_blank" sx={{ color: 'primary.light', display: 'inline-flex', '&:hover': { color: 'white' } }}>
                  <ExternalLink size={16} />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

const ExternalResources = () => {
  const charts = [
    {
      title: "Top 10 AI Models (SWE-bench Verified)",
      icon: <Trophy size={24} />,
      color: "primary",
      data: [
        { name: "Claude 3.5 Sonnet", detail: "49.0% Resolved - Current Leader", url: "https://swe-bench.com/" },
        { name: "GPT-4o (2024-05-13)", detail: "43.3% Resolved", url: "https://swe-bench.com/" },
        { name: "o1-mini", detail: "39.7% Resolved", url: "https://swe-bench.com/" },
        { name: "o1-preview", detail: "38.9% Resolved", url: "https://swe-bench.com/" },
        { name: "DeepSeek-V2.5", detail: "High-performance coding MoE", url: "https://swe-bench.com/" },
        { name: "Llama-3.1-405B", detail: "Open-weight state-of-the-art", url: "https://swe-bench.com/" },
        { name: "Claude 3 Opus", detail: "Advanced reasoning & logic", url: "https://swe-bench.com/" },
        { name: "GPT-4 Turbo", detail: "Consistent production standard", url: "https://swe-bench.com/" },
        { name: "Qwen2.5-72B", detail: "Leading open-source from Alibaba", url: "https://swe-bench.com/" },
        { name: "Gemini 1.5 Pro", detail: "Massive context window support", url: "https://swe-bench.com/" }
      ]
    },
    {
      title: "Top 10 AI IDEs",
      icon: <Code2 size={24} />,
      color: "secondary",
      data: [
        { name: "Cursor", detail: "AI-first fork of VS Code, deep context", url: "https://cursor.com/" },
        { name: "Trae", detail: "By ByteDance - Adaptive AI coding agent", url: "https://trae.ai/" },
        { name: "Windsurf", detail: "By Codeium - First agentic IDE", url: "https://codeium.com/windsurf" },
        { name: "Zed", detail: "Ultra-fast, high-performance AI-native", url: "https://zed.dev/" },
        { name: "GitHub Copilot (VS Code)", detail: "Industry standard extension", url: "https://github.com/features/copilot" },
        { name: "Continue.dev", detail: "Leading open-source AI extension", url: "https://continue.dev/" },
        { name: "JetBrains AI", detail: "Native integration for IntelliJ/PyCharm", url: "https://www.jetbrains.com/ai/" },
        { name: "PearAI", detail: "Open-source alternative to Cursor", url: "https://trypear.ai/" },
        { name: "Aider", detail: "CLI-based pair programmer (Agentic)", url: "https://aider.chat/" },
        { name: "Qodo", detail: "Context-aware enterprise IDE platform", url: "https://qodo.ai/" }
      ]
    },
    {
      title: "Top 10 Model Providers",
      icon: <Globe size={24} />,
      color: "success",
      data: [
        { name: "OpenRouter", detail: "Unified gateway to all frontier models", url: "https://openrouter.ai/" },
        { name: "Volcengine (火山引擎)", detail: "ByteDance's enterprise AI platform", url: "https://www.volcengine.com/" },
        { name: "AWS Bedrock", detail: "Scalable enterprise model hosting", url: "https://aws.amazon.com/bedrock/" },
        { name: "Azure OpenAI", detail: "Enterprise GPT-4 with MSFT ecosystem", url: "https://azure.microsoft.com/" },
        { name: "Google Vertex AI", detail: "Gemini & specialized model garden", url: "https://cloud.google.com/vertex-ai" },
        { name: "Anthropic Console", detail: "Direct access to Claude family", url: "https://console.anthropic.com/" },
        { name: "DeepSeek", detail: "High-efficiency, cost-effective reasoning", url: "https://deepseek.com/" },
        { name: "Groq", detail: "LPU-powered lightning-fast inference", url: "https://groq.com/" },
        { name: "Together AI", detail: "Fastest cloud for open-source models", url: "https://together.ai/" },
        { name: "Mistral AI", detail: "Leading European open-weight pioneer", url: "https://mistral.ai/" }
      ]
    },
    {
      title: "Top 10 AI CLI Tools",
      icon: <Terminal size={24} />,
      color: "info",
      data: [
        { name: "Claude Code", detail: "Anthropic's native terminal agent", url: "https://claude.ai/" },
        { name: "OpenCode", detail: "SST's open-source terminal coding partner", url: "https://github.com/sst/opencode" },
        { name: "Aider", detail: "The original CLI pair programmer", url: "https://aider.chat/" },
        { name: "Cline", detail: "VS Code agent (formerly Claude Dev)", url: "https://cline.bot/" },
        { name: "OpenHands", detail: "Autonomous software engineer agent", url: "https://github.com/All-Hands-AI/OpenHands" },
        { name: "Open Interpreter", detail: "Natural language terminal interface", url: "https://openinterpreter.com/" },
        { name: "GitHub Copilot CLI", detail: "Terminal command assistant", url: "https://github.com/features/copilot" },
        { name: "Sweep", detail: "AI junior developer for GitHub issues", url: "https://sweep.dev/" },
        { name: "GPT Engineer", detail: "One-prompt app generation tool", url: "https://gptengineer.app/" },
        { name: "Mentat", detail: "Context-aware AI coding assistant", url: "https://www.mentat.ai/" }
      ]
    }
  ];

  return (
    <Container maxWidth={false} sx={{ py: 8, px: { xs: 2, xl: 6 } }}>
      <Box 
        component={motion.div} 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h2" gutterBottom sx={{ 
          fontWeight: 800, 
          mb: 2, 
          textAlign: 'center',
          background: 'linear-gradient(to right, #fff, #94a3b8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: { xs: '2.5rem', md: '3.5rem' }
        }}>
          Global AI Ecosystem
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center', mb: 8, maxWidth: '800px', mx: 'auto' }}>
          Real-time leaderboards and industry-standard tools curated for elite AI engineering.
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {charts.map((chart, idx) => (
            <Grid item xs={12} md={6} key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: idx * 0.1
                }}
              >
                <TopTenChart {...chart} />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ExternalResources;
