'use client';

import { MenuAnimation } from '@/components/ui/menu-animations';

const animations = [
  { id: 'dots-grid', title: 'Dots Grid' },
  { id: 'text-morph', title: 'Text Morph' },
  { id: 'plus-morph', title: 'Plus Morph' },
  { id: 'circle-pulse', title: 'Circle Pulse' },
  { id: 'cube-spin', title: '3D Cube Transform' },
  { id: 'stacked-circles', title: 'Stacked Circles' },
  { id: 'rotating-circles', title: 'Rotating Circles' },
  { id: 'isometric-cube', title: 'Isometric Cube' },
  { id: 'expanding-circles', title: 'Expanding Circles' },
] as const;

const MenuAnimationsDemo = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center p-5 bg-background text-foreground">
      <h1 className="mb-[30px] text-center text-2xl tracking-[1px] font-bold">
        ADVANCED MENU ANIMATIONS
      </h1>
      <div className="mx-auto grid max-w-[750px] grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
        {animations.map((anim) => (
          <MenuAnimation key={anim.id} title={anim.title} animationId={anim.id as any} />
        ))}
      </div>
    </div>
  );
};

export default MenuAnimationsDemo;
