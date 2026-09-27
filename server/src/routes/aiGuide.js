import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const router = express.Router();
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'mistral';

// Generate AI guide for a place
router.post('/generate', async (req, res) => {
  try {
    const { placeId, placeName, placeDescription, userQuery } = req.body;

    if (!placeName) {
      return res.status(400).json({ error: 'Place name is required' });
    }

    const prompt = `You are a knowledgeable India tour guide. Provide helpful, accurate information about ${placeName}.
    ${placeDescription ? `Background: ${placeDescription}` : ''}
    ${userQuery ? `User question: ${userQuery}` : 'Provide a brief guide about this place.'}

    Include:
    - History and significance
    - Best time to visit
    - How to reach
    - Entry fees and timings
    - Tips for visitors
    - Nearby attractions

    Keep the response concise, engaging, and celebratory of Indian culture.`;

    // Call Ollama API
    const ollamaResponse = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt,
        stream: false,
        temperature: 0.7,
      }),
    });

    if (!ollamaResponse.ok) {
      return res.status(500).json({
        error: 'Failed to generate guide from AI',
        details: await ollamaResponse.text(),
      });
    }

    const data = await ollamaResponse.json();

    // Store generated guide in database
    if (placeId) {
      await supabase.from('guides').insert([
        {
          place_id: placeId,
          content: data.response,
          generated_at: new Date().toISOString(),
        },
      ]);
    }

    res.json({
      placeName,
      guide: data.response,
      model: OLLAMA_MODEL,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error generating AI guide:', error);
    res.status(500).json({ error: 'Failed to generate guide' });
  }
});

// Get real-time travel tips
router.post('/travel-tips', async (req, res) => {
  try {
    const { placeName, travelMode, userContext } = req.body;

    if (!placeName) {
      return res.status(400).json({ error: 'Place name is required' });
    }

    const prompt = `As an India travel guide, provide travel tips for visiting ${placeName}.
    ${travelMode ? `Travel mode: ${travelMode}` : ''}
    ${userContext ? `Context: ${userContext}` : ''}

    Include practical tips about:
    - Transportation options
    - Local food to try
    - Safety and etiquette
    - Local customs
    - Photography spots
    - Best things to do

    Keep it brief, friendly, and culturally sensitive.`;

    const ollamaResponse = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt,
        stream: false,
        temperature: 0.8,
      }),
    });

    if (!ollamaResponse.ok) {
      return res.status(500).json({
        error: 'Failed to generate travel tips',
      });
    }

    const data = await ollamaResponse.json();

    res.json({
      placeName,
      tips: data.response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error generating travel tips:', error);
    res.status(500).json({ error: 'Failed to generate travel tips' });
  }
});

// Get cached guide for a place
router.get('/place/:placeId', async (req, res) => {
  try {
    const { placeId } = req.params;

    const { data: guide, error } = await supabase
      .from('guides')
      .select('*')
      .eq('place_id', placeId)
      .order('generated_at', { ascending: false })
      .limit(1)
      .single();

    if (error || !guide) {
      return res.status(404).json({ error: 'No guide found for this place' });
    }

    res.json(guide);
  } catch (error) {
    console.error('Error fetching guide:', error);
    res.status(500).json({ error: 'Failed to fetch guide' });
  }
});

// Health check for Ollama
router.get('/status', async (req, res) => {
  try {
    const ollamaResponse = await fetch(`${OLLAMA_BASE_URL}/api/tags`);

    if (!ollamaResponse.ok) {
      return res.status(503).json({
        status: 'offline',
        message: 'Ollama service is not accessible',
        url: OLLAMA_BASE_URL,
      });
    }

    const data = await ollamaResponse.json();

    res.json({
      status: 'online',
      model: OLLAMA_MODEL,
      availableModels: data.models?.map((m) => m.name) || [],
      url: OLLAMA_BASE_URL,
    });
  } catch (error) {
    console.error('Error checking Ollama status:', error);
    res.status(503).json({
      status: 'offline',
      error: error.message,
    });
  }
});

export default router;
