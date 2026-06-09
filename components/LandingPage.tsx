"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import { ArrowRight, FileText, CheckCircle, BarChart, GraduationCap, Code, Target, Sparkles } from "lucide-react";

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div className="bg-pathly-bg text-pathly-primary min-h-screen overflow-hidden selection:bg-pathly-lavender selection:text-pathly-primary">
      {/* Navigation */}
      <nav className="absolute w-full top-0 z-50 bg-transparent text-[#111111]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-bold text-2xl tracking-tighter flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#111111]" />
            pathly.
          </div>
          <div className="hidden md:flex gap-8 font-medium">
            <a href="#how-it-works" className="hover:opacity-70 transition-opacity">How it Works</a>
            <a href="#features" className="hover:opacity-70 transition-opacity">Features</a>
            <a href="#faq" className="hover:opacity-70 transition-opacity">FAQ</a>
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost" className="font-semibold text-[#111111] hover:bg-black/5 rounded-full px-6">
                Sign in
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-black/5 text-[#111111] hover:bg-black/10 font-bold rounded-full px-6 border-none">
                Sign up for free
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-6 pt-20 bg-[#FFF158] text-[#111111]">
          <div className="max-w-6xl mx-auto text-center z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-6xl md:text-[6.5rem] font-black tracking-[-0.04em] leading-[1.05] mb-8 text-[#111111]"
            >
              What if your career roadmap was built just for you?
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-xl md:text-[1.35rem] font-medium opacity-90 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Effortlessly plan, match, and learn with pathly's built-in AI roadmap, integrated skill analysis, and auto-generated courses—all in one place.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/signup">
                <Button size="lg" className="bg-[#111111] text-white hover:bg-black rounded-full px-10 py-7 text-xl font-bold group shadow-lg">
                  <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Sign up with Google
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="lg" className="bg-white text-[#111111] hover:bg-white/90 rounded-full px-10 py-7 text-xl font-bold shadow-lg border-none">
                  Sign up for free
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* BUTTER-STYLE HIGHLIGHT SECTION */}
        <section className="py-24 md:py-32 px-6 bg-white text-center relative">
          <div className="absolute top-0 left-0 w-full z-10 pointer-events-none">
            <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-full h-12 md:h-28 block">
              <path fill="#FFF158" d="M0,0 V20 Q25,20 40,60 Q55,100 70,60 Q85,20 120,20 Q145,20 160,50 Q175,80 190,50 Q205,20 240,20 Q270,20 280,80 Q290,140 300,80 Q310,20 350,20 Q375,20 390,70 Q405,120 420,70 Q435,20 470,20 Q495,20 510,40 Q525,60 540,40 Q555,20 590,20 Q615,20 630,90 Q645,160 660,90 Q675,20 710,20 Q735,20 750,50 Q765,80 780,50 Q795,20 830,20 Q860,20 870,70 Q880,120 890,70 Q900,20 940,20 Q965,20 980,50 Q995,80 1000,50 V0 Z" />
            </svg>
          </div>
          <div className="max-w-4xl mx-auto relative z-20">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-[#111111] leading-tight">
              <span className="font-black">All your career progression tools in one place.</span> Stop following generic tutorials. Start learning effectively. pathly brings structure, <span className="bg-[#FFF158] px-2 py-1 inline-block -skew-x-3">clarity, and direction</span> to your career goals, projects, and interviews.
            </h2>
          </div>
        </section>

        {/* SECTION 2: PLAN */}
        <section id="how-it-works" className="py-24 px-6 bg-white overflow-hidden relative">
          <div className="max-w-6xl mx-auto relative pt-32">
            <h2 className="absolute top-0 left-4 md:-left-10 text-[8rem] md:text-[14rem] font-black tracking-tighter text-[#111111] leading-none z-10 -rotate-[4deg]">
              Plan.
            </h2>
            
            <div className="bg-[#C6D2FD] rounded-[3rem] p-8 md:p-20 relative z-0 flex flex-col md:flex-row items-center gap-16 md:gap-24 mt-16 md:mt-24">
              <div className="flex-1 w-full relative z-20 order-2 md:order-1">
                <motion.div 
                  initial={{ rotate: -5, opacity: 0, y: 50 }}
                  whileInView={{ rotate: -8, opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-white rounded-3xl p-8 shadow-xl border-4 border-[#111111] relative z-20 max-w-sm mx-auto"
                >
                  <FileText className="w-12 h-12 mb-4 text-[#111111]" />
                  <h3 className="text-2xl font-black mb-2 text-[#111111]">Resume Analysis</h3>
                  <p className="font-medium opacity-80 text-[#111111] text-sm">We extract your skills, projects, and experience using advanced NLP.</p>
                </motion.div>
                <motion.div 
                  initial={{ rotate: 5, opacity: 0, x: -50 }}
                  whileInView={{ rotate: 6, opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-white rounded-3xl p-6 shadow-xl border-4 border-[#111111] absolute -bottom-12 right-0 md:right-8 z-10 w-64"
                >
                  <h4 className="font-bold text-[#111111] mb-3">Extracted Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-[#FFF158] border-2 border-[#111111] rounded-full font-bold text-xs text-[#111111]">Python</span>
                    <span className="px-3 py-1 bg-[#BFF2E2] border-2 border-[#111111] rounded-full font-bold text-xs text-[#111111]">React</span>
                    <span className="px-3 py-1 bg-[#FFD6D6] border-2 border-[#111111] rounded-full font-bold text-xs text-[#111111]">AWS</span>
                  </div>
                </motion.div>
              </div>

              <div className="flex-1 order-1 md:order-2">
                <h3 className="text-4xl md:text-5xl font-black mb-6 text-[#111111] leading-tight">Your baseline, established.</h3>
                <p className="text-xl opacity-80 font-medium text-[#111111] mb-10 leading-relaxed">
                  We don't just read your resume; we understand it. Our ML engine profiles your current career readiness and skill extraction instantly.
                </p>
                <Button variant="outline" className="rounded-full px-8 py-6 text-lg font-bold border-2 border-[#111111] text-[#111111] bg-transparent hover:bg-black/5">
                  See how it works
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: MATCH */}
        <section className="py-24 px-6 bg-white overflow-hidden">
          <div className="max-w-6xl mx-auto relative pt-32">
            <h2 className="absolute top-0 right-4 md:-right-10 text-[8rem] md:text-[14rem] font-black tracking-tighter text-[#111111] leading-none z-10 rotate-[4deg]">
              Match.
            </h2>
            
            <div className="bg-[#BFF2E2] rounded-[3rem] p-8 md:p-20 relative z-0 flex flex-col md:flex-row items-center gap-16 mt-16 md:mt-24">
              <div className="flex-1 order-2 md:order-1">
                <h3 className="text-4xl md:text-5xl font-black mb-6 text-[#111111] leading-tight">Find your perfect fit.</h3>
                <p className="text-xl opacity-80 font-medium text-[#111111] mb-10 leading-relaxed">
                  We compare your profile against a curated role knowledge base of thousands of job descriptions to calculate your exact gap.
                </p>
                <Button variant="outline" className="rounded-full px-8 py-6 text-lg font-bold border-2 border-[#111111] text-[#111111] bg-transparent hover:bg-black/5">
                  View role matching
                </Button>
              </div>

              <div className="flex-1 w-full relative z-20 order-1 md:order-2">
                <motion.div 
                  initial={{ rotate: 5, opacity: 0, scale: 0.9 }}
                  whileInView={{ rotate: 3, opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-white rounded-3xl p-10 shadow-xl border-4 border-[#111111] relative z-20 max-w-sm mx-auto text-center"
                >
                  <Target className="w-16 h-16 mb-6 text-[#111111] mx-auto" />
                  <div className="text-7xl font-black text-[#111111] mb-2">82<span className="text-4xl">%</span></div>
                  <h3 className="text-xl font-bold mb-4 text-[#111111]">Role Match Score</h3>
                  <p className="font-medium opacity-80 text-[#111111] text-sm">You are 82% ready for the "ML Engineer" role.</p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: BUILD */}
        <section id="features" className="py-24 px-6 bg-white overflow-hidden">
          <div className="max-w-6xl mx-auto relative pt-32">
            <h2 className="absolute top-0 left-4 md:-left-10 text-[8rem] md:text-[14rem] font-black tracking-tighter text-[#111111] leading-none z-10 -rotate-[3deg]">
              Build.
            </h2>
            
            <div className="bg-[#F9D6AE] rounded-[3rem] p-8 md:p-20 relative z-0 flex flex-col md:flex-row items-center gap-16 mt-16 md:mt-24">
              <div className="flex-1 order-2 md:order-1">
                <h3 className="text-4xl md:text-5xl font-black mb-6 text-[#111111] leading-tight">Resume-worthy Projects.</h3>
                <p className="text-xl opacity-80 font-medium text-[#111111] mb-10 leading-relaxed">
                  Stop building generic to-do apps. Get recommended projects that actually impress hiring managers and fill your specific portfolio gaps.
                </p>
                <Button variant="outline" className="rounded-full px-8 py-6 text-lg font-bold border-2 border-[#111111] text-[#111111] bg-transparent hover:bg-black/5">
                  Explore projects
                </Button>
              </div>

              <div className="flex-1 w-full relative z-20 order-1 md:order-2">
                <motion.div 
                  initial={{ rotate: -4, opacity: 0, y: 30 }}
                  whileInView={{ rotate: -2, opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-white rounded-3xl p-8 shadow-xl border-4 border-[#111111] relative z-20 max-w-sm mx-auto"
                >
                  <Code className="w-12 h-12 mb-6 text-[#111111]" />
                  <h4 className="font-black text-2xl text-[#111111] mb-2">Semantic Search Engine</h4>
                  <p className="text-sm opacity-80 font-medium text-[#111111]">Uses Sentence Transformers & FAISS</p>
                  <div className="mt-6 flex gap-2">
                    <span className="px-3 py-1 bg-[#C6D2FD] border-2 border-[#111111] rounded-full text-xs font-bold text-[#111111]">Advanced</span>
                    <span className="px-3 py-1 bg-[#BFF2E2] border-2 border-[#111111] rounded-full text-xs font-bold text-[#111111]">~2 weeks</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: LEARN & PRACTICE */}
        <section className="py-24 px-6 bg-white overflow-hidden">
          <div className="max-w-6xl mx-auto relative pt-32">
            <h2 className="absolute top-0 right-4 md:-right-4 text-[6rem] md:text-[12rem] font-black tracking-tighter text-[#111111] leading-none z-10 rotate-[2deg]">
              Learn.
            </h2>
            
            <div className="bg-[#FFD6D6] rounded-[3rem] p-8 md:p-20 relative z-0 flex flex-col md:flex-row items-center gap-16 mt-16 md:mt-24">
              <div className="flex-1 w-full relative z-20 order-2 md:order-1">
                <motion.div 
                  initial={{ rotate: 3, opacity: 0, x: -30 }}
                  whileInView={{ rotate: 4, opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-white rounded-3xl p-8 shadow-xl border-4 border-[#111111] relative z-20 max-w-sm mx-auto"
                >
                  <GraduationCap className="w-12 h-12 mb-6 text-[#111111]" />
                  <h4 className="font-black text-2xl text-[#111111] mb-4">Curated Courses</h4>
                  <ul className="space-y-4 font-bold text-sm text-[#111111]">
                    <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5" /> DeepLearning.AI Specializations</li>
                    <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5" /> StatQuest with Josh Starmer</li>
                    <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5" /> Stanford CS229</li>
                  </ul>
                </motion.div>
              </div>

              <div className="flex-1 order-1 md:order-2">
                <h3 className="text-4xl md:text-5xl font-black mb-6 text-[#111111] leading-tight">Close your skill gaps</h3>
                <p className="text-xl opacity-80 font-medium text-[#111111] mb-10 leading-relaxed">
                  Dynamically selected resources from YouTube, Coursera, and LeetCode so you never waste time studying what you already know.
                </p>
                <Button variant="outline" className="rounded-full px-8 py-6 text-lg font-bold border-2 border-[#111111] text-[#111111] bg-transparent hover:bg-black/5">
                  View curriculums
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: COMMUNITY */}
        <section className="py-32 px-6 bg-white overflow-hidden relative min-h-[80vh] flex items-center justify-center">
          <div className="relative w-full max-w-6xl h-[800px] flex items-center justify-center">
            {/* Center Play Button Icon */}
            <div className="absolute z-20">
              <svg width="70" height="70" viewBox="0 0 24 24" fill="#FFF158" stroke="#111111" strokeWidth="2" className="drop-shadow-sm transition-transform hover:scale-110 cursor-pointer">
                <polygon points="5 3 19 12 5 21 5 3" strokeLinejoin="round" />
              </svg>
            </div>
            
            {/* Inner Circle: pathly */}
            {"pathly".split("").map((char, i) => {
              const angle = (i / 6) * Math.PI * 2 - Math.PI / 2; // Start from top
              const radius = 180; // Inner circle size
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              const baseRotation = (angle * 180) / Math.PI + 90; 
              const jitterRotate = (i % 2 === 0) ? 15 : -15;
              const jitterX = (i % 2 === 0) ? 10 : -10;
              const jitterY = (i % 3 === 0) ? -15 : 10;
              
              return (
                <div 
                  key={`inner-${i}`} 
                  className="absolute text-[4rem] md:text-[6rem] font-black text-[#111111] select-none lowercase leading-none"
                  style={{
                    transform: `translate(${x + jitterX}px, ${y + jitterY}px) rotate(${baseRotation + jitterRotate}deg)`,
                  }}
                >
                  {char}
                </div>
              );
            })}

            {/* Outer Circle: community */}
            {"community".split("").map((char, i) => {
              const angle = (i / 9) * Math.PI * 2 - Math.PI / 2; // Start from top
              const radius = 380; // Outer circle size
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              const baseRotation = (angle * 180) / Math.PI + 90; 
              const jitterRotate = (i % 3 === 0) ? 25 : (i % 2 === 0) ? -15 : 10;
              const jitterX = (i % 2 === 0) ? 20 : -20;
              const jitterY = (i % 3 === 0) ? -25 : 15;
              
              return (
                <div 
                  key={`outer-${i}`} 
                  className="absolute text-[5.5rem] md:text-[8rem] font-black text-[#111111] select-none lowercase leading-none"
                  style={{
                    transform: `translate(${x + jitterX}px, ${y + jitterY}px) rotate(${baseRotation + jitterRotate}deg)`,
                  }}
                >
                  {char}
                </div>
              );
            })}

            {/* Floating Emojis (replacing people) - Positioned securely outside the outer ring to prevent overlap */}
            <div className="absolute z-10 w-20 h-20 md:w-28 md:h-28 bg-[#FFD6D6] rounded-full flex items-center justify-center text-5xl shadow-sm border-4 border-[#111111]" style={{ transform: 'translate(-360px, -280px) rotate(-15deg)' }}>🚀</div>
            <div className="absolute z-10 w-20 h-20 md:w-28 md:h-28 bg-[#BFF2E2] rounded-full flex items-center justify-center text-5xl shadow-sm border-4 border-[#111111]" style={{ transform: 'translate(360px, -280px) rotate(15deg)' }}>💡</div>
            <div className="absolute z-10 w-20 h-20 md:w-28 md:h-28 bg-[#C6D2FD] rounded-full flex items-center justify-center text-5xl shadow-sm border-4 border-[#111111]" style={{ transform: 'translate(-360px, 280px) rotate(-5deg)' }}>✨</div>
            <div className="absolute z-10 w-20 h-20 md:w-28 md:h-28 bg-[#F9D6AE] rounded-full flex items-center justify-center text-5xl shadow-sm border-4 border-[#111111]" style={{ transform: 'translate(360px, 280px) rotate(20deg)' }}>🔥</div>
          </div>
        </section>

        {/* SECTION 7: ROADMAP */}
        <section className="py-40 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-[10vw] font-black tracking-tighter leading-none mb-12 opacity-5 text-pathly-primary absolute left-0 right-0 z-0 select-none">
              ROADMAP
            </h2>
            <div className="relative z-10">
              <h3 className="text-6xl md:text-8xl font-black mb-8">Dynamic Timeline.</h3>
              <p className="text-2xl opacity-80 leading-relaxed font-medium max-w-3xl mx-auto mb-16">
                No fixed 6-month generic bootcamps. Your estimated completion time is based on your current skills, experience, and hours committed.
              </p>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white border-2 border-pathly-primary/10 rounded-[3rem] p-12 max-w-4xl mx-auto shadow-2xl"
              >
                <div className="text-left">
                  <div className="text-sm font-bold uppercase tracking-widest opacity-50 mb-2">Estimated Duration</div>
                  <div className="text-7xl font-black text-pathly-primary mb-8">2.3 Months</div>
                  
                  <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                    {/* Milestone 1 */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-pathly-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        1
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-pathly-lavender p-6 rounded-2xl shadow">
                        <h4 className="font-bold text-xl mb-1">Foundational ML Concepts</h4>
                        <p className="text-sm opacity-80 font-medium">Linear Algebra refresh, Scikit-learn basics.</p>
                      </div>
                    </div>
                    {/* Milestone 2 */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-pathly-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        2
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-pathly-mint p-6 rounded-2xl shadow">
                        <h4 className="font-bold text-xl mb-1">Deep Learning & PyTorch</h4>
                        <p className="text-sm opacity-80 font-medium">Neural Networks, Backprop, CNNs.</p>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ */}
        <section id="faq" className="py-32 px-6 bg-[#FAFAFA]">
          <div className="max-w-4xl mx-auto flex flex-col gap-16">
            <div>
              <h2 className="text-[8rem] md:text-[15rem] font-black tracking-tighter leading-[0.85] text-[#111111]">
                What.<br/>The.<br/>FAQ?
              </h2>
            </div>
            <div className="w-full">
              <Accordion className="w-full space-y-4">
                <AccordionItem value="item-1" className="border-none rounded-3xl px-8 py-2 bg-white shadow-sm transition-shadow hover:shadow-md">
                  <AccordionTrigger className="text-xl font-bold hover:no-underline text-[#111111]">How is this different from generic roadmaps?</AccordionTrigger>
                  <AccordionContent className="text-lg opacity-80 font-medium leading-relaxed pb-4 text-[#111111]">
                    Generic roadmaps give everyone the same 6-month path. pathly analyzes your existing resume to skip what you already know and focus only on the gaps between you and your dream role.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-none rounded-3xl px-8 py-2 bg-white shadow-sm transition-shadow hover:shadow-md">
                  <AccordionTrigger className="text-xl font-bold hover:no-underline text-[#111111]">What roles do you support?</AccordionTrigger>
                  <AccordionContent className="text-lg opacity-80 font-medium leading-relaxed pb-4 text-[#111111]">
                    Our knowledge base currently supports Software Engineering, ML Engineering, Data Science, Full Stack, Backend, Frontend, DevOps, and Product Management.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-none rounded-3xl px-8 py-2 bg-white shadow-sm transition-shadow hover:shadow-md">
                  <AccordionTrigger className="text-xl font-bold hover:no-underline text-[#111111]">Can I export my roadmap?</AccordionTrigger>
                  <AccordionContent className="text-lg opacity-80 font-medium leading-relaxed pb-4 text-[#111111]">
                    Yes! You can export your personalized roadmap, coding question plan, and career report as beautifully designed PDFs to share with mentors or keep for your records.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="border-none rounded-3xl px-8 py-2 bg-white shadow-sm transition-shadow hover:shadow-md">
                  <AccordionTrigger className="text-xl font-bold hover:no-underline text-[#111111]">Is pathly free to use?</AccordionTrigger>
                  <AccordionContent className="text-lg opacity-80 font-medium leading-relaxed pb-4 text-[#111111]">
                    Yes! We offer a generous free tier that includes your first 3 resume analyses, role matching, and project recommendations. Premium features like unlimited analyses and mock interviews require a paid plan.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* SECTION 10: FINAL CTA */}
        <section className="py-40 px-6 bg-pathly-primary text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8">Ready to discover your path?</h2>
            <p className="text-2xl font-medium opacity-80 mb-12">
              Join thousands of students and professionals taking control of their careers.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/signup">
                <Button size="lg" className="bg-pathly-lavender text-pathly-primary hover:bg-white rounded-full px-12 py-8 text-2xl font-black transition-colors">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-pathly-primary text-white/50 py-12 text-center text-sm font-medium border-t border-white/10">
        <p>© 2026 pathly. Built for Amazon ML Summer School.</p>
      </footer>
    </div>
  );
}
