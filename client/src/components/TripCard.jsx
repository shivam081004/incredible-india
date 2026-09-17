import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PLACE_IMAGES = [
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1534008897995-27a23e859048?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
];

function getImage(index) {
  return PLACE_IMAGES[index % PLACE_IMAGES.length];
}

export default function TripCard({ trip, onDelete, onToggleFavorite, onOpen }) {
  const [imgError, setImgError] = useState(false);
  const [imgIdx] = useState(() => Math.floor(Math.random() * PLACE_IMAGES.length));

  return (
    <div className="trip-card-3d surface flex flex-col gap-3 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-36 overflow-hidden">
        {!imgError ? (
          <img
            src={getImage(imgIdx)}
            alt={`${trip.origin.address} to ${trip.destination.address}`}
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-navy to-emerald flex items-center justify-center">
            <i className="fa-solid fa-map-location-dot text-4xl text-white/40" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-white/90 text-xs font-medium bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
              <i className="fa-solid fa-route text-amber"></i>
              {trip.travelMode}
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        <button
          type="button"
          onClick={() => onOpen(trip)}
          className="flex-1 text-left w-full"
        >
          <p className="text-sm font-semibold text-ink line-clamp-1">
            <i className="fa-solid fa-location-dot text-amber text-xs mr-1" />
            {trip.origin.address}
          </p>
          <p className="text-xs text-rose font-semibold my-1">
            <i className="fa-solid fa-arrow-right text-[10px] mr-1"></i>
            {trip.destination.address}
          </p>
        </button>

        <div className="flex items-center justify-between pt-3 border-t border-mist/70">
          <div>
            <span className="text-sm font-bold text-navy">
              {trip.distanceText}
            </span>
            <span className="text-xs text-ink/40 ml-1">·</span>
            <span className="text-xs text-ink/40 ml-1">{trip.durationText}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleFavorite(trip)}
              title="Favorite"
              aria-label={trip.favorite ? "Remove favorite" : "Add favorite"}
              className={`text-lg transition-all duration-300 ${
                trip.favorite ? "text-amber scale-110" : "text-ink/20 hover:text-amber"
              }`}
            >
              <i className={`fa-${trip.favorite ? 'solid' : 'regular'} fa-star`} />
            </button>
            <button
              type="button"
              onClick={() => onDelete(trip)}
              title="Delete"
              className="text-xs text-ink/30 hover:text-red-500 hover:font-semibold transition-all"
            >
              <i className="fa-solid fa-trash-can" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}