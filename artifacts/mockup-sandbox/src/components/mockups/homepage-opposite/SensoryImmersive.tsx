import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export function SensoryImmersive() {
  return (
    <div className="min-h-screen bg-[#1a1209] text-white selection:bg-[#c8922a] selection:text-white font-sans overflow-x-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
        .font-serif-kr { font-family: 'Noto Serif KR', serif; }
        .font-playfair { font-family: 'Playfair Display', serif; }
      `}} />

      {/* 1. Full-screen opener */}
      <section className="relative h-screen w-full flex flex-col justify-center items-center text-center px-4">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(https://cdn-optimized.imweb.me/upload/S202009213e99d638e95aa/6bf89575469c9.jpg)' }}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 flex flex-col items-center gap-6">
          <h1 className="font-serif-kr font-light text-4xl md:text-6xl lg:text-8xl leading-tight tracking-widest text-white/90" style={{ wordKeepAll: 'keep-all' }}>
            편백나무의 향기가<br />몸을 감싸는 순간
          </h1>
          <p className="font-light text-white/50 tracking-[0.3em] text-xs md:text-sm mt-8">
            히노끼욕조 전문 기업, 휴편백
          </p>
        </div>
      </section>

      {/* 2. Immersive product reveal */}
      <section className="min-h-screen w-full flex flex-col md:flex-row bg-[#1a1209]">
        <div className="w-full md:w-1/2 h-[60vh] md:h-screen">
          <img 
            src="https://cdn.imweb.me/thumbnail/20220103/5c1275af617c1.jpg" 
            alt="Hinoki Bath"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center p-12 md:p-24 relative">
          <div className="absolute top-12 right-12 md:top-24 md:right-24 text-[8rem] md:text-[12rem] font-serif-kr text-[#c8922a]/20 leading-none pointer-events-none select-none">
            壹
          </div>
          <div className="relative z-10 mt-12 md:mt-0 flex flex-col items-start gap-8">
            <h2 className="font-serif-kr font-bold text-5xl md:text-7xl text-white/90 tracking-wide">
              프리미엄<br />오픈형 히노끼
            </h2>
            <p className="font-playfair text-2xl md:text-3xl text-white/60 tracking-wider">
              <span className="font-serif-kr">₩</span> 2,850,000
            </p>
            <button className="mt-12 group flex items-center gap-3 text-white/80 hover:text-white transition-colors pb-2 border-b border-white/30 hover:border-white/80 tracking-widest text-sm uppercase">
              상담하기 <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Sensory copy section */}
      <section className="py-40 md:py-64 px-6 text-center bg-[#1a1209]">
        <div className="max-w-4xl mx-auto flex flex-col gap-16">
          <h3 className="font-serif-kr font-light text-2xl md:text-4xl lg:text-5xl leading-[1.8] text-[#c8922a]/90 tracking-widest" style={{ wordBreak: 'keep-all' }}>
            피톤치드는 나무가 자신을 지키기 위해 만들어내는 물질입니다.
          </h3>
          <p className="font-light text-white/50 text-sm md:text-lg leading-[2.5] tracking-[0.2em]" style={{ wordBreak: 'keep-all' }}>
            히노끼(편백)나무에 특히 풍부하며,<br className="hidden md:block" />
            스트레스 완화·항균·숙면에 효과가 있다고 알려져 있습니다.
          </p>
        </div>
      </section>

      {/* 4. Second product — horizontal asymmetric */}
      <section className="min-h-screen w-full flex flex-col md:flex-row bg-[#2d1f0e]">
        <div className="w-full md:w-[40%] flex flex-col justify-center p-12 md:p-24 order-2 md:order-1">
          <div className="flex flex-col gap-8">
            <div className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white/10 tracking-widest uppercase mb-4 leading-none">
              Hinoki<br />Bath
            </div>
            <h2 className="font-serif-kr font-bold text-4xl md:text-5xl text-white/90 tracking-wide">
              빌트인 매립형
            </h2>
            <p className="font-playfair text-xl md:text-2xl text-white/60 tracking-wider">
              <span className="font-serif-kr">₩</span> 3,200,000
            </p>
            <button className="w-fit mt-8 group flex items-center gap-3 text-white/80 hover:text-white transition-colors pb-2 border-b border-white/30 hover:border-white/80 tracking-widest text-sm uppercase">
              상담하기 <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
        <div className="w-full md:w-[60%] h-[60vh] md:h-screen order-1 md:order-2">
          {/* Reusing the same image or a similar aesthetic one from unsplash just for the mockup to look good, but the prompt says: "Real CDN images from the app (listed above) — do not use placeholder boxes". I'll use the first image again but with a different crop/filter since only 2 images were provided. */}
          <img 
            src="https://cdn-optimized.imweb.me/upload/S202009213e99d638e95aa/6bf89575469c9.jpg" 
            alt="Built-in Hinoki Bath"
            className="w-full h-full object-cover filter contrast-125 saturate-50"
          />
        </div>
      </section>

      {/* 5. Closing moment */}
      <section className="h-screen w-full flex flex-col justify-center items-center text-center px-4 bg-[#1a1209]">
        <div className="flex flex-col items-center gap-20">
          <h2 className="font-serif-kr font-light text-5xl md:text-7xl lg:text-8xl leading-[1.3] tracking-widest text-white/90">
            나만의 욕조를<br />지금 만들어보세요.
          </h2>
          <button className="px-16 py-6 border border-white/30 text-white/90 hover:bg-white hover:text-[#1a1209] transition-all duration-700 tracking-[0.3em] font-light text-sm uppercase">
            무료 상담 신청
          </button>
        </div>
      </section>
    </div>
  );
}

export default SensoryImmersive;
