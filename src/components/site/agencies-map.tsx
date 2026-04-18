"use client";

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { AGENCIES, BRAND_META, BRAND_PIN_COLOR, type Brand } from "@/lib/agencies";

type MapFilter = Brand | "todas";

interface AgenciesMapProps {
  filter: MapFilter;
}

function buildIcon(brand: Brand): L.DivIcon {
  const color = BRAND_PIN_COLOR[brand];
  const ring = brand === "volvo" ? "#0a0f1a" : "#f5c76a";
  return L.divIcon({
    className: "grupocar-marker",
    html: `
      <div style="position:relative;transform:translate(-50%,-100%);">
        <div style="
          width:34px;height:34px;border-radius:9999px;
          background:${color};
          border:2px solid ${ring};
          box-shadow:0 6px 20px rgba(0,0,0,.55), 0 0 0 4px rgba(245,199,106,.12);
          display:flex;align-items:center;justify-content:center;
          font-family:'Inter',sans-serif;font-size:10px;font-weight:700;
          letter-spacing:.08em;color:${brand === "volvo" ? "#0a0f1a" : "#f5c76a"};
        ">${brand.charAt(0).toUpperCase()}</div>
        <div style="
          position:absolute;left:50%;bottom:-8px;transform:translateX(-50%);
          width:2px;height:10px;background:linear-gradient(to bottom, ${ring}, transparent);
        "></div>
      </div>
    `,
    iconSize: [34, 44],
    iconAnchor: [17, 44],
    popupAnchor: [0, -40],
  });
}

function FitBounds({ filter }: { filter: MapFilter }) {
  const map = useMap();

  useEffect(() => {
    const visible =
      filter === "todas"
        ? AGENCIES
        : AGENCIES.filter((a) => a.brand === filter);
    if (visible.length === 0) return;
    const bounds = L.latLngBounds(visible.map((a) => [a.lat, a.lng]));
    map.flyToBounds(bounds, {
      padding: [60, 60],
      duration: 1.1,
      maxZoom: 10,
    });
  }, [filter, map]);

  return null;
}

export default function AgenciesMap({ filter }: AgenciesMapProps) {
  const visible =
    filter === "todas" ? AGENCIES : AGENCIES.filter((a) => a.brand === filter);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-gold-500/15 shadow-2xl shadow-black/60">
      <div className="pointer-events-none absolute inset-0 z-[400] rounded-3xl ring-1 ring-inset ring-white/5" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[400] h-24 bg-gradient-to-b from-petrol-800/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[400] h-24 bg-gradient-to-t from-petrol-800/60 to-transparent" />

      <MapContainer
        center={[26.5, -101.5]}
        zoom={6}
        scrollWheelZoom={true}
        style={{
          height: "560px",
          width: "100%",
          background: "#0a1a14",
        }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          className="map-tiles"
        />
        <FitBounds filter={filter} />
        {visible.map((a) => (
          <Marker key={a.id} position={[a.lat, a.lng]} icon={buildIcon(a.brand)}>
            <Popup closeButton={false} className="grupocar-popup">
              <div className="grupocar-popup-inner">
                <span className="grupocar-popup-brand">
                  {BRAND_META[a.brand].label}
                </span>
                <h4 className="grupocar-popup-title">{a.name}</h4>
                <p className="grupocar-popup-city">
                  {a.city} · {a.state}
                </p>
                <p className="grupocar-popup-address">{a.address}</p>
                <a
                  className="grupocar-popup-cta"
                  href={a.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visitar sitio oficial →
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
