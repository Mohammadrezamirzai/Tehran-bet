"use client";
import Image from "next/image";

export default function CasinoBanner() {
  return (
    <div className="w-full flex justify-center my-8">
      <div className="rounded-2xl overflow-hidden shadow-2xl border border-accent max-w-2xl">
        <Image
          src="/casino.jpg" // Place your image in public/casino.jpg
          alt="People betting in a casino"
          width={800}
          height={400}
          className="object-cover w-full h-auto"
          priority
        />
      </div>
    </div>
  );
}
