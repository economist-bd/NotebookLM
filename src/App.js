import React, { useState } from 'react';
import { BookOpen, Headphones, Share2, X, ArrowRight, DollarSign, Cpu, ChevronRight, Home, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATA: 30 CHAPTERS CONTENT ---
const chaptersData = [
  {
    category: "Media & Content",
    items: [
      { id: 1, title: "ইনস্ট্যান্ট পডকাস্ট স্টুডিও", icon: "🎧", concept: "NotebookLM অডিও ওভারভিউ ব্যবহার করে ব্লগ থেকে পডকাস্ট তৈরি।", opportunity: "$500/episode পডকাস্ট প্রোডাকশন সার্ভিস।", prompt: "Focus heavily on practical applications. Tone: Enthusiastic but professional." },
      { id: 2, title: "YouTube টু ব্লগ কনভার্টার", icon: "📺", concept: "ভিডিও না দেখেই এসইও ফ্রেন্ডলি ব্লগ তৈরি।", opportunity: "কন্টেন্ট রিপারপাসিং এজেন্সি।", prompt: "Create a 1500-word SEO blog post based on this video source." },
      { id: 3, title: "সোশ্যাল মিডিয়া কন্টেন্ট ফ্যাক্টরি", icon: "📱", concept: "১টি ডকুমেন্ট থেকে ৩০ দিনের সোশ্যাল পোস্ট।", opportunity: "সোশ্যাল মিডিয়া ম্যানেজমেন্ট (SMM)।", prompt: "Write 10 viral hooks for LinkedIn based on this data." },
      { id: 4, title: "নিউজলেটার কিউরেটর", icon: "📰", concept: "সপ্তাহের সেরা আর্টিকেল থেকে ডাইজেস্ট তৈরি।", opportunity: "পেইড নিউজলেটার সাবস্ক্রিপশন।", prompt: "Draft a concise newsletter summarizing these 5 articles." },
      { id: 5, title: "ভিডিও স্ক্রিপ্ট রাইটার", icon: "✍️", concept: "নোটস থেকে এনগেজিং স্ক্রিপ্ট।", opportunity: "ইউটিউবারদের জন্য স্ক্রিপ্ট রাইটিং।", prompt: "Convert these notes into a 3-minute storytelling script." },
      { id: 6, title: "ইন্টারভিউ প্যানেল জেনারেটর", icon: "🎙️", concept: "AI হোস্ট এবং গেস্টের মধ্যে বিতর্ক তৈরি।", opportunity: "কর্পোরেট ট্রেনিং অডিও।", prompt: "Simulate a debate. Host A is skeptic, Host B is optimist." },
      { id: 7, title: "ডকুমেন্টারি ন্যারেটিভ বিল্ডার", icon: "🎥", concept: "রিসার্চ থেকে ডকুমেন্টারি স্টাইল গল্প।", opportunity: "ফিল্ম মেকারদের রিসার্চ অ্যাসিস্ট্যান্ট।", prompt: "Create a narrative arc based on these historical facts." }
    ]
  },
  {
    category: "Digital Products",
    items: [
      { id: 8, title: "ইবুক থেকে অনলাইন কোর্স", icon: "📚", concept: "বই থেকে কোর্স কারিকুলাম তৈরি।", opportunity: "কোর্স ক্রিয়েশন কনসালটেন্সি।", prompt: "Create a 6-module course outline with quizzes based on this book." },
      { id: 9, title: "লিড ম্যাগনেট জেনারেটর", icon: "🧲", concept: "চেকলিস্ট এবং চিট-শিট তৈরি।", opportunity: "মার্কেটিং ফানেল সার্ভিস।", prompt: "Create a 5-page beginner checklist from this report." },
      { id: 10, title: "স্টাডি গাইড ও নোটস", icon: "📝", concept: "লেকচার থেকে সুন্দর নোট তৈরি।", opportunity: "ছাত্রছাত্রীদের কাছে নোট বিক্রি।", prompt: "Summarize this lecture into a study guide with key definitions." },
      { id: 11, title: "ওয়েবিনার স্ট্রাকচার ডিজাইনার", icon: "🖥️", concept: "কাঁচা তথ্য থেকে ১ ঘণ্টার ওয়েবিনার প্ল্যান।", opportunity: "কোচিং বিজনেস সাপোর্ট।", prompt: "Design a 60-min interactive webinar structure." },
      { id: 12, title: "ফ্ল্যাশকার্ড ও কুইজ মেকার", icon: "🃏", concept: "পরীক্ষার প্রস্তুতির জন্য অটোমেটেড কুইজ।", opportunity: "এডুকেশনাল অ্যাপ কন্টেন্ট।", prompt: "Generate 20 difficult flashcards from this chapter." }
    ]
  },
  {
    category: "Consulting & Business",
    items: [
      { id: 13, title: "প্রতিযোগী বিশ্লেষণ (SWOT)", icon: "📊", concept: "অ্যানুয়াল রিপোর্ট থেকে দুর্বলতা বের করা।", opportunity: "বিজনেস ইন্টেলিজেন্স রিপোর্ট।", prompt: "Create a comparative SWOT analysis for Company A vs B." },
      { id: 14, title: "মিটিং মিনিটস্ ও অ্যাকশন প্ল্যান", icon: "⏱️", concept: "ট্রান্সক্রিপ্ট থেকে কাজের তালিকা।", opportunity: "ভার্চুয়াল অ্যাসিস্ট্যান্ট সার্ভিস।", prompt: "Identify action items and assignees from this transcript." },
      { id: 15, title: "গ্রান্ট ও প্রপোজাল রাইটিং", icon: "💰", concept: "ফান্ডিং গাইডলাইন মেনে প্রপোজাল।", opportunity: "এনজিও কনসাল্টিং।", prompt: "Write a grant proposal following these specific guidelines." },
      { id: 16, title: "লিগ্যাল রিস্ক অ্যানালিসিস", icon: "⚖️", concept: "চুক্তিনামার রিস্ক পয়েন্ট বের করা।", opportunity: "লিগ্যাল টেক সাপোর্ট।", prompt: "Highlight potential risk factors in this contract." },
      { id: 17, title: "কোড ডকুমেন্টেশন", icon: "💻", concept: "কোড থেকে ইউজার ম্যানুয়াল।", opportunity: "টেকনিক্যাল রাইটিং।", prompt: "Write documentation for this code file explaining its functions." },
      { id: 18, title: "সেলস অবজেকশন হ্যান্ডলিং", icon: "🤝", concept: "প্রোডাক্ট ডাটা থেকে সেলস স্ক্রিপ্ট।", opportunity: "সেলস টিম ট্রেনিং।", prompt: "Write persuasive answers to these 5 customer objections." },
      { id: 19, title: "HR রেজুমে স্ক্রিনিং", icon: "👥", concept: "সিভি এবং জবের তুলনা।", opportunity: "রিক্রুটমেন্ট এজেন্সি।", prompt: "Score these 10 resumes based on the job description." }
    ]
  },
  {
    category: "Strategy & Productivity",
    items: [
      { id: 20, title: "বিজনেস আইডিয়া ভ্যালিডেশন", icon: "🚀", concept: "মার্কেট রিপোর্টের সাপেক্ষে আইডিয়া যাচাই।", opportunity: "স্টার্টআপ মেন্টরশিপ।", prompt: "Critique this business idea based on current market trends." },
      { id: 21, title: "রোল-প্লে ইন্টারভিউ", icon: "🗣️", concept: "জব ইন্টারভিউ প্র্যাকটিস।", opportunity: "ক্যারিয়ার কোচিং।", prompt: "Act as an interviewer and ask me hard questions." },
      { id: 22, title: "কর্পোরেট নলেজ বেস", icon: "🧠", concept: "কোম্পানির পলিসি বট।", opportunity: "ইন্টারনাল টুল ডেভেলপমেন্ট।", prompt: "Answer employee questions based on these policy PDFs." },
      { id: 23, title: "অনুবাদ ও লোকালাইজেশন", icon: "🌍", concept: "ভাষা ও কালচার অনুযায়ী কন্টেন্ট পরিবর্তন।", opportunity: "গ্লোবাল বিজনেস সার্ভিস।", prompt: "Translate and localize this for a rural Bangladeshi audience." },
      { id: 24, title: "ফ্যাক্ট চেকিং সার্ভিস", icon: "🔍", concept: "একাধিক সোর্সের সত্যতা যাচাই।", opportunity: "জার্নালিজম সাপোর্ট।", prompt: "Find inconsistencies between Source A and Source B." },
      { id: 25, title: "বই লেখার সঙ্গী", icon: "📖", concept: "প্লট এবং ক্যারেক্টার ডেভেলপমেন্ট।", opportunity: "ঘোস্ট রাইটিং।", prompt: "Suggest 3 plot twists for the next chapter." },
      { id: 26, title: "রিসার্চ এক্সিকিউটিভ সামারি", icon: "📑", concept: "জটিল পেপার থেকে ১ পাতার সারাংশ।", opportunity: "সিইও ব্রিফিং সার্ভিস।", prompt: "Write a 1-page executive summary for a non-technical CEO." },
      { id: 27, title: "মার্কেট ট্রেন্ড স্পটিং", icon: "📈", concept: "ডাটা থেকে ট্রেন্ড পূর্বাভাস।", opportunity: "ইনভেস্টমেন্ট অ্যাডভাইজরি।", prompt: "Identify top 3 emerging trends from these reports." }
    ]
  },
  {
    category: "Niche Mastery",
    items: [
      { id: 28, title: "রিয়েল এস্টেট লিস্টিং", icon: "🏠", concept: "ফিচার থেকে প্রপার্টি ডেসক্রিপশন।", opportunity: "রিয়েল এস্টেট কপিরাইটিং।", prompt: "Write 3 descriptions: Luxury, Family, and Investor tone." },
      { id: 29, title: "ই-কমার্স প্রোডাক্ট ডেসক্রিপশন", icon: "🛍️", concept: "বাল্ক প্রোডাক্ট কন্টেন্ট।", opportunity: "ই-কমার্স এসইও।", prompt: "Write catchy descriptions for these 50 products." },
      { id: 30, title: "আর্নিং কল অ্যানালিসিস", icon: "💹", concept: "শেয়ার মার্কেট ইনসাইট।", opportunity: "স্টক মার্কেট নিউজলেটার।", prompt: "Analyze the CEO's tone and future guidance from this call." }
    ]
  }
];

// --- COMPONENTS ---

const CoverPage = ({ onStart }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center p-6 text-center">
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }}
      className="max-w-md w-full border border-gray-700 rounded-2xl p-8 shadow-2xl bg-gray-800/50 backdrop-blur-sm"
    >
      <div className="flex justify-center mb-6">
        <Cpu size={64} className="text-blue-400" />
      </div>
      <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        দ্য নোটবুকএলএম<br/>মিলিয়নেয়ার
      </h1>
      <p className="text-gray-400 mb-8 text-sm tracking-widest">VERSION 2026 EDITION</p>
      
      <p className="text-gray-300 mb-8 text-lg">
        গুগলের ফ্রি টুল ব্যবহার করে মাসে <span className="text-green-400 font-bold">$১০,০০০</span> আয়ের ৩০টি ভাইরাল ব্লু-প্রিন্ট।
      </p>

      <button 
        onClick={onStart}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all transform hover:scale-105"
      >
        <BookOpen size={20} /> পড়া শুরু করুন
      </button>

      <div className="mt-6 flex justify-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1"><Headphones size={12}/> Audio Enabled</span>
        <span className="flex items-center gap-1"><Share2 size={12}/> Shareable</span>
      </div>
    </motion.div>
  </div>
);

const ChapterList = ({ onSelectChapter }) => {
  return (
    <div className="pb-20 pt-6 px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">সূচিপত্র</h2>
      {chaptersData.map((section, idx) => (
        <div key={idx} className="mb-8">
          <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-3">{section.category}</h3>
          <div className="space-y-3">
            {section.items.map((chapter) => (
              <motion.div 
                whileTap={{ scale: 0.98 }}
                key={chapter.id}
                onClick={() => onSelectChapter(chapter)}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-blue-50 text-2xl w-10 h-10 flex items-center justify-center rounded-full">
                    {chapter.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm md:text-base">{chapter.id}. {chapter.title}</h4>
                    <p className="text-xs text-gray-500 truncate max-w-[200px]">{chapter.concept}</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const ChapterView = ({ chapter, onBack }) => {
  if (!chapter) return null;

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed inset-0 bg-white z-50 overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b p-4 flex items-center gap-3 shadow-sm z-10">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowRight className="rotate-180" size={24} />
        </button>
        <h2 className="font-bold text-lg truncate">{chapter.title}</h2>
      </div>

      {/* Content */}
      <div className="p-6 max-w-2xl mx-auto space-y-8 pb-24">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{chapter.icon}</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{chapter.title}</h1>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
            CHAPTER {chapter.id}
          </span>
        </div>

        <section className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <h3 className="flex items-center gap-2 font-bold text-gray-700 mb-2">
            <Cpu size={18} className="text-blue-500"/> কনসেপ্ট
          </h3>
          <p className="text-gray-600">{chapter.concept}</p>
        </section>

        <section className="bg-green-50 p-6 rounded-2xl border border-green-100">
          <h3 className="flex items-center gap-2 font-bold text-green-700 mb-2">
            <DollarSign size={18}/> $১০,০০০ সুযোগ
          </h3>
          <p className="text-gray-700 font-medium">{chapter.opportunity}</p>
        </section>

        <section className="space-y-4">
          <h3 className="font-bold text-xl text-gray-800 border-l-4 border-purple-500 pl-3">
            NotebookLM কৌশল
          </h3>
          <div className="bg-gray-900 text-gray-200 p-5 rounded-xl font-mono text-sm leading-relaxed relative group">
            <p className="mb-2 text-xs text-gray-500 uppercase">System Prompt:</p>
            "{chapter.prompt}"
            <button 
              onClick={() => navigator.clipboard.writeText(chapter.prompt)}
              className="absolute top-2 right-2 p-2 bg-gray-700 rounded hover:bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Copy
            </button>
          </div>
          <p className="text-gray-600 text-sm">
            💡 <strong>টিপস:</strong> সোর্স ম্যাটেরিয়াল হিসেবে পিডিএফ বা গুগল ডক আপলোড করুন এবং উপরের প্রম্পটটি চ্যাট বক্সে ব্যবহার করুন।
          </p>
        </section>

        <button className="w-full bg-black text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 mt-8">
          <Share2 size={18} /> এই হ্যাকটি শেয়ার করুন
        </button>
      </div>
    </motion.div>
  );
};

// --- MAIN APP COMPONENT ---

function App() {
  const [view, setView] = useState('cover'); // cover, index, chapter
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [showBio, setShowBio] = useState(false);

  const startReading = () => setView('index');
  
  const openChapter = (chapter) => {
    setSelectedChapter(chapter);
    setView('chapter');
  };

  const goBack = () => {
    setView('index');
    setSelectedChapter(null);
  };

  return (
    <div className="font-sans text-gray-900 bg-gray-50 min-h-screen">
      <AnimatePresence mode='wait'>
        {/* VIEW 1: COVER */}
        {view === 'cover' && (
          <CoverPage key="cover" onStart={startReading} />
        )}

        {/* VIEW 2: INDEX (MAIN APP) */}
        {view === 'index' && (
          <motion.div 
            key="index"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-md mx-auto min-h-screen bg-white shadow-2xl relative"
          >
            {/* Top Bar */}
            <header className="sticky top-0 bg-white/90 backdrop-blur border-b p-4 flex justify-between items-center z-20">
              <h1 className="font-bold text-lg text-blue-900">NotebookLM Millionaire</h1>
              <button onClick={() => setShowBio(true)} className="p-2 bg-gray-100 rounded-full">
                <User size={20} />
              </button>
            </header>

            {/* Chapter List */}
            <ChapterList onSelectChapter={openChapter} />

            {/* Bottom Nav */}
            <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t p-3 flex justify-around text-xs text-gray-500">
              <div className="flex flex-col items-center text-blue-600">
                <Home size={20} />
                <span>Home</span>
              </div>
              <div className="flex flex-col items-center hover:text-blue-600 cursor-pointer">
                <BookOpen size={20} />
                <span>My List</span>
              </div>
              <div className="flex flex-col items-center hover:text-blue-600 cursor-pointer">
                <DollarSign size={20} />
                <span>Pro</span>
              </div>
            </nav>

            {/* Author Bio Modal (Simple Overlay) */}
            {showBio && (
              <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl p-6 max-w-sm w-full relative">
                  <button onClick={() => setShowBio(false)} className="absolute top-4 right-4"><X /></button>
                  <div className="w-16 h-16 bg-blue-600 rounded-full mb-4 flex items-center justify-center text-white text-2xl font-bold">A</div>
                  <h3 className="text-xl font-bold">Author Bio</h3>
                  <p className="text-sm text-gray-500 mb-4">AI Business Strategist</p>
                  <p className="text-gray-600 text-sm mb-4">
                    আমি জটিল AI টুলসকে আয়ের উৎসে পরিণত করতে সাহায্য করি। এই অ্যাপটি ২০২৫-২৬ সালের সেরা স্ট্র্যাটেজি নিয়ে তৈরি।
                  </p>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm">Follow on Twitter</button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* VIEW 3: CHAPTER DETAIL */}
        {view === 'chapter' && (
          <ChapterView key="chapter" chapter={selectedChapter} onBack={goBack} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;