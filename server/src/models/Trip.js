import mongoose from 'mongoose';

const placeSchema = new mongoose.Schema(
  {
    address: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  { _id: false }
);

const stepSchema = new mongoose.Schema(
  {
    instruction: String,
    distanceText: String,
    durationText: String,
  },
  { _id: false }
);

const tripSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    origin: { type: placeSchema, required: true },
    destination: { type: placeSchema, required: true },
    distanceText: String,
    durationText: String,
    polyline: String,
    steps: [stepSchema],
    travelMode: {
      type: String,
      enum: ['DRIVING', 'WALKING', 'BICYCLING', 'TRANSIT'],
      default: 'DRIVING',
    },
    favorite: { type: Boolean, default: false },
  },
  { timestamps: true }
);

tripSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model('Trip', tripSchema);
