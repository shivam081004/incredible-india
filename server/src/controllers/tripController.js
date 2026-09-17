import Trip from '../models/Trip.js';

export async function createTrip(req, res) {
  const { origin, destination, distanceText, durationText, polyline, steps, travelMode } = req.body;

  if (!origin?.address || !destination?.address) {
    return res.status(400).json({ error: 'origin and destination are required' });
  }

  const trip = await Trip.create({
    userId: req.userId,
    origin,
    destination,
    distanceText,
    durationText,
    polyline,
    steps,
    travelMode,
  });

  res.status(201).json(trip);
}

export async function listTrips(req, res) {
  const trips = await Trip.find({ userId: req.userId }).sort({ createdAt: -1 });
  res.json(trips);
}

export async function deleteTrip(req, res) {
  const trip = await Trip.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  if (!trip) return res.status(404).json({ error: 'Trip not found' });
  res.status(204).end();
}

export async function toggleFavorite(req, res) {
  const trip = await Trip.findOne({ _id: req.params.id, userId: req.userId });
  if (!trip) return res.status(404).json({ error: 'Trip not found' });

  trip.favorite = !trip.favorite;
  await trip.save();
  res.json(trip);
}
