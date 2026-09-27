import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Get all famous places
router.get('/all', async (req, res) => {
  try {
    const { data: places, error } = await supabase
      .from('places')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({
      count: places.length,
      places,
    });
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(500).json({ error: 'Failed to fetch places' });
  }
});

// Get place by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data: place, error } = await supabase
      .from('places')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !place) {
      return res.status(404).json({ error: 'Place not found' });
    }

    res.json(place);
  } catch (error) {
    console.error('Error fetching place:', error);
    res.status(500).json({ error: 'Failed to fetch place' });
  }
});

// Search places by name or city
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const searchTerm = `%${query}%`;

    const { data: places, error } = await supabase
      .from('places')
      .select('*')
      .or(
        `name.ilike.${searchTerm},city.ilike.${searchTerm},description.ilike.${searchTerm}`
      );

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({
      count: places.length,
      places,
    });
  } catch (error) {
    console.error('Error searching places:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

// Get places by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;

    const { data: places, error } = await supabase
      .from('places')
      .select('*')
      .eq('category', category);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({
      category,
      count: places.length,
      places,
    });
  } catch (error) {
    console.error('Error fetching places by category:', error);
    res.status(500).json({ error: 'Failed to fetch places' });
  }
});

// Get nearby places (within radius)
router.get('/nearby', async (req, res) => {
  try {
    const { lat, lng, radius = 50 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ error: 'Latitude and longitude required' });
    }

    // Simple distance calculation (you can use PostGIS for better accuracy)
    const { data: places, error } = await supabase
      .from('places')
      .select('*');

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Filter by distance (simplified)
    const nearby = places.filter((place) => {
      const latDiff = Math.abs(place.latitude - parseFloat(lat));
      const lngDiff = Math.abs(place.longitude - parseFloat(lng));
      const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
      return distance <= parseFloat(radius) / 111; // Rough conversion
    });

    res.json({
      count: nearby.length,
      places: nearby,
    });
  } catch (error) {
    console.error('Error fetching nearby places:', error);
    res.status(500).json({ error: 'Failed to fetch nearby places' });
  }
});

export default router;
