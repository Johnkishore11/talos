"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@/components/_core/layout/Container";
import DraggableEventsCarousel from "@/components/ui/DraggableEventsCarousel";
import { api, type Event } from "@/lib/api";

export default function PreviewSection() {
  type PreviewItem = { title: string; desc: string; tag: string; image: string };
  const [items, setItems] = useState<PreviewItem[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await api.getEvents();
        const mappedItems = events.map((e: Event) => ({
          title: e.title,
          desc: e.description,
          tag: e.category,
          image: e.image_url,
        }));

        // If no events from backend, fallback or empty
        if (mappedItems.length > 0) {
          setItems(mappedItems);
        } else {
           // Fallback to empty or placeholder if preferred, OR keep empty to hide?
           // keeping empty array if API returns empty
           setItems([]);
        }
      } catch (err) {
        console.error("Failed to load preview events", err);
      }
    };
    fetchEvents();
  }, []);

  const hasItems = items.length > 0;

  return (
    <section className="relative py-28 bg-black overflow-hidden">
      {/* HEADER */}
      <Container>
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-zen-dots)] tracking-tight text-white uppercase">
              Events<span className="text-red-600"> and </span>
              <span className="text-red-0">Workshops</span>
            </h2>
            <div className="mt-2 h-1 w-20 bg-gradient-to-r from-red-600 to-red-400 rounded-full" />
          </div>

          <Link
            href="/events"
            className="text-sm font-semibold text-red-500 hover:text-white transition-colors uppercase tracking-widest"
          >
            View All →
          </Link>
        </div>
      </Container>

      {/* Show spinner or placeholder if loading? Or just nothing/static if strictly preferred? 
          For better UX, showing empty or spinner is better than crashing or old data.
      */}
      {hasItems ? (
        <DraggableEventsCarousel items={items} />
      ) : (
         <div className="flex h-64 items-center justify-center text-gray-500">
            <p>Loading events...</p>
         </div>
      )}
    </section>
  );
}
