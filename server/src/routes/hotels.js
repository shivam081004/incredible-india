import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Get hotels near a place
router.get('/near/:placeId', async (req, res) => {
  try {
    const { placeId } = req.params;

    // Get the place first
    const { data: place, error: placeError } = await supabase
      .from('places')
      .select('*')
      .eq('id', placeId)
      .single();

    if (placeError || !place) {
      return res.status(404).json({ error: 'Place not found' });
    }

    // Get hotels near this place (by city or coordinates)
    const { data: hotels, error: hotelsError } = await supabase
      .from('hotels')
      .select('*')
      .eq('city', place.city)
      .order('rating', { ascending: false })
      .limit(20);

    if (hotelsError) {
      return res.status(500).json({ error: hotelsError.message });
    }

    res.json({
      place: {
        id: place.id,
        name: place.name,
        city: place.city,
      },
      count: hotels.length,
      hotels,
    });
  } catch (error) {
    console.error('Error fetching hotels:', error);
    res.status(500).json({ error: 'Failed to fetch hotels' });
  }
});

// Get all hotels in a city
router.get('/city/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const { limit = 50 } = req.query;

    const { data: hotels, error } = await supabase
      .from('hotels')
      .select('*')
      .eq('city', city)
      .order('rating', { ascending: false })
      .limit(parseInt(limit));

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({
      city,
      count: hotels.length,
      hotels,
    });
  } catch (error) {
    console.error('Error fetching hotels by city:', error);
    res.status(500).json({ error: 'Failed to fetch hotels' });
  }
});

// Get highly-rated hotels (for food/hospitality)
router.get('/top-rated', async (req, res) => {
  try {
    const { limit = 30 } = req.query;

    const { data: hotels, error } = await supabase
      .from('hotels')
      .select('*')
      .gte('rating', 4.0)
      .order('rating', { ascending: false })
      .order('review_count', { ascending: false })
      .limit(parseInt(limit));

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({
      count: hotels.length,
      hotels,
    });
  } catch (error) {
    console.error('Error fetching top-rated hotels:', error);
    res.status(500).json({ error: 'Failed to fetch top-rated hotels' });
  }
});

// Search hotels
router.get('/search', async (req, res) => {
  try {
    const { query, city } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const searchTerm = `%${query}%`;
    let dbQuery = supabase.from('hotels').select('*');

    // Add city filter if provided
    if (city) {
      dbQuery = dbQuery.eq('city', city);
    }

    const { data: hotels, error } = await dbQuery
      .or(`name.ilike.${searchTerm},description.ilike.${searchTerm}`)
      .order('rating', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({
      count: hotels.length,
      hotels,
    });
  } catch (error) {
    console.error('Error searching hotels:', error);
    res.status(500).json({ error: 'Hotel search failed' });
  }
});

// Get free/cultural places near a place
router.get('/cultural/:placeId', async (req, res) => {
  try {
    const { placeId } = req.params;

    // Get the place first
    const { data: place, error: placeError } = await supabase
      .from('places')
      .select('*')
      .eq('id', placeId)
      .single();

    if (placeError || !place) {
      return res.status(404).json({ error: 'Place not found' });
    }

    // Get cultural places in same city
    const { data: cultural, error: culturalError } = await supabase
      .from('cultural_places')
      .select('*')
      .eq('city', place.city)
      .eq('is_free', true)
      .order('name', { ascending: true });

    if (culturalError) {
      return res.status(500).json({ error: culturalError.message });
    }

    res.json({
      place: {
        id: place.id,
        name: place.name,
        city: place.city,
      },
      count: cultural.length,
      culturalPlaces: cultural,
    });
  } catch (error) {
    console.error('Error fetching cultural places:', error);
    res.status(500).json({ error: 'Failed to fetch cultural places' });
  }
});

// Get all cultural/museum/free places
router.get('/all-cultural', async (req, res) => {
  try {
    const { limit = 100 } = req.query;

    const { data: cultural, error } = await supabase
      .from('cultural_places')
      .select('*')
      .order('city', { ascending: true })
      .limit(parseInt(limit));

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({
      count: cultural.length,
      culturalPlaces: cultural,
    });
  } catch (error) {
    console.error('Error fetching cultural places:', error);
    res.status(500).json({ error: 'Failed to fetch cultural places' });
  }
});

export default router;
