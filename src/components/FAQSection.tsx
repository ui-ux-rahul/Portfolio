import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, MessageSquare } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "What is your design process for high-density SaaS products?",
      answer: "My approach blends deep UX research with custom Figma design systems. I start by auditing user cognitive load, conducting department head interviews, mapping complete state machines, and translating them into a highly responsive, clean-coded prototype. I prioritize spatial consistency, typography hierarchy, and direct developer alignment."
    },
    {
      question: "How do you handle Figma handoff to engineering teams?",
      answer: "I believe in absolute developer alignment, not just dropping links. I deliver structured Figma files with fully documented tokens (spacing scale, typography system, color variables), interactive component states (default, hover, active, disabled), responsive layout grids, and a direct interactive video walkthrough to align expectations."
    },
    {
      question: "Can you collaborate directly on existing codebases?",
      answer: "Yes, absolutely. I am comfortable working natively inside modern full-stack setups (React, Vite, Node, Tailwind, TypeScript). I can inspect existing styling architectures, implement responsive interfaces, resolve UI bugs, and ensure pixel-perfect fidelity with zero styling regressions."
    },
    {
      question: "Do you design custom interactive graphs and data visualizations?",
      answer: "Yes. I utilize charting libraries like Recharts, D3.js, or raw high-performance custom SVG elements to construct beautiful, highly responsive, real-time analytics dashboards that look stellar in both light and dark modes, prioritizing instant visual scannability."
    },
    {
      question: "How can we book a design project or consultation with you?",
      answer: "You can click any 'Contact' or 'Book a Design Call' button on this site to schedule a direct Google Meet. During our call, we will discuss your product vision, functional scope, timelines, and technical constraints to establish a clear, frictionless execution plan."
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-transparent relative z-10 w-full text-[#1A1A1A] dark:text-white select-none">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 text-[11px] font-semibold tracking-wide uppercase text-zinc-500 dark:text-zinc-400 mb-4"
          >
            Frequently Asked Questions
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-sans text-3xl sm:text-4xl md:text-[40px] font-medium leading-[1.15] tracking-tight text-black dark:text-white"
          >
            Got Questions? I have Answers.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-sans tracking-wide leading-relaxed"
          >
            A compilation of answers exploring my design philosophy, development workflow, and client collaboration strategies.
          </motion.p>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-[24px] border border-gray-200/60 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-900/15 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-gray-300 dark:hover:border-zinc-700 hover:shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full py-5 px-6 sm:px-8 flex items-center justify-between text-left cursor-pointer transition-colors duration-200 hover:bg-zinc-50/20 dark:hover:bg-zinc-900/10"
                >
                  <span className="font-sans font-medium text-base sm:text-lg text-black dark:text-zinc-100 pr-4">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pt-5 px-6 sm:px-8 border-t border-dashed border-gray-100 dark:border-zinc-800/60">
                        <p className="font-sans text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
