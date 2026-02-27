"use client";

export default function HeroLogo() {
  return (
    <div className="flex justify-center items-center pt-8 pb-6">
      <img
        src="/icon.png"
        alt="LumosMind Logo"
        draggable={false}
        className="w-[180px] md:w-[240px] lg:w-[300px] select-none drop-shadow-[0_0_70px_rgba(139,92,246,0.65)]"
      />
    </div>
  );
}