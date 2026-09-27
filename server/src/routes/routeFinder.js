import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Get route and transport options
router.post('/find-route', async (req, res) => {
  try {
    const { origin, destination, transportMode } = req.body;

    if (!origin || !destination) {
      return res.status(400).json({ error: 'Origin and destination are required' });
    }

    // Get destination place info
    const { data: destinationPlace, error: placeError } = await supabase
      .from('places')
      .select('*')
      .eq('name', destination)
      .single();

    if (placeError || !destinationPlace) {
      return res.status(404).json({ error: 'Destination place not found' });
    }

    // Build transport options response
    const transportOptions = buildTransportOptions(origin, destinationPlace);

    res.json({
      origin,
      destination: destinationPlace.name,
      destinationCity: destinationPlace.city,
      coordinates: {
        latitude: destinationPlace.latitude,
        longitude: destinationPlace.longitude,
      },
      transportOptions,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error finding route:', error);
    res.status(500).json({ error: 'Failed to find route' });
  }
});

// Get all transport options for a destination
router.get('/transport-options/:destination', async (req, res) => {
  try {
    const { destination } = req.params;

    const { data: place, error } = await supabase
      .from('places')
      .select('*')
      .eq('name', destination)
      .single();

    if (error || !place) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    const transportOptions = buildTransportOptions('Your Location', place);

    res.json({
      destination: place.name,
      city: place.city,
      transportOptions,
    });
  } catch (error) {
    console.error('Error getting transport options:', error);
    res.status(500).json({ error: 'Failed to get transport options' });
  }
});

// Helper function to build transport options
function buildTransportOptions(origin, destination) {
  return {
    train: {
      mode: 'Train',
      icon: '🚂',
      pros: ['Comfortable', 'Scenic journey', 'Affordable for long distances'],
      cons: ['Longer travel time', 'Limited timings'],
      estimatedTime: '12-24 hours',
      estimatedCost: '₹500-2000',
      bookingLink: `https://www.irctc.co.in/nget/train-search`,
      provider: 'IRCTC',
      description: 'Indian Railways - Experience the classic Indian train journey',
    },
    bus: {
      mode: 'Bus',
      icon: '🚌',
      pros: ['Budget-friendly', 'Multiple daily services', 'Direct routes'],
      cons: ['Slower than trains', 'Can be crowded'],
      estimatedTime: '8-16 hours',
      estimatedCost: '₹300-1500',
      bookingLink: `https://www.redbus.in/`,
      provider: 'RedBus',
      description: 'Intercity buses with comfort options',
    },
    flight: {
      mode: 'Flight',
      icon: '✈️',
      pros: ['Fastest option', 'Comfortable seating', 'Multiple airlines'],
      cons: ['Most expensive', 'Airport procedures', 'Luggage limits'],
      estimatedTime: '2-4 hours',
      estimatedCost: '₹3000-10000+',
      bookingLink: `https://www.makemytrip.com/flights/`,
      provider: 'MakeMyTrip',
      description: 'Domestic flights to reach destinations quickly',
    },
    cab: {
      mode: 'Cab/Taxi',
      icon: '🚕',
      pros: ['Flexible timing', 'Door-to-door service', 'Convenient for short distances'],
      cons: ['Traffic dependent', 'Can be expensive for long distances'],
      estimatedTime: 'Varies with traffic',
      estimatedCost: '₹20-50 per km',
      bookingLink: `https://www.uber.com/en-IN/`,
      provider: 'Uber/Ola',
      description: 'On-demand cabs and taxis',
    },
    auto: {
      mode: 'Auto-Rickshaw',
      icon: '🛺',
      pros: ['Budget-friendly', 'Local experience', 'Easy to negotiate'],
      cons: ['Slow for long distances', 'No AC', 'Unmetered fares'],
      estimatedTime: 'Varies',
      estimatedCost: '₹10-40 per km',
      bookingLink: `https://www.ola.com/`,
      provider: 'Ola Auto',
      description: 'Traditional auto-rickshaws for local travel',
    },
  };
}

// Get nearby stations/stops
router.get('/nearby-stations/:destination', async (req, res) => {
  try {
    const { destination } = req.params;

    const { data: place, error } = await supabase
      .from('places')
      .select('*')
      .eq('name', destination)
      .single();

    if (error || !place) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    // Mock nearby stations data
    const stations = {
      trainStations: [
        {
          name: `${place.city} Railway Station`,
          distance: '2 km',
          city: place.city,
        },
      ],
      busStands: [
        {
          name: `${place.city} Main Bus Stand`,
          distance: '3 km',
          city: place.city,
        },
      ],
      airports: [
        {
          name: `${place.city} International Airport`,
          distance: '15-20 km',
          city: place.city,
        },
      ],
    };

    res.json({
      destination: place.name,
      city: place.city,
      stations,
    });
  } catch (error) {
    console.error('Error getting nearby stations:', error);
    res.status(500).json({ error: 'Failed to get nearby stations' });
  }
});

// Get traffic/travel conditions (mock data)
router.get('/traffic/:destination', async (req, res) => {
  try {
    const { destination } = req.params;

    const { data: place, error } = await supabase
      .from('places')
      .select('*')
      .eq('name', destination)
      .single();

    if (error || !place) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    // Mock traffic data
    const trafficData = {
      destination: place.name,
      city: place.city,
      currentTraffic: 'Moderate',
      roadCondition: 'Good',
      weatherCondition: 'Clear',
      advisories: [
        'Peak hours 8-10 AM and 5-7 PM',
        'Summer heat - travel early morning or evening',
      ],
      lastUpdated: new Date().toISOString(),
    };

    res.json(trafficData);
  } catch (error) {
    console.error('Error getting traffic info:', error);
    res.status(500).json({ error: 'Failed to get traffic info' });
  }
});

export default router;
