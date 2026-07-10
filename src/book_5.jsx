import React, { useState, useEffect } from 'react';
import { Star, Users, BookOpen, Heart, Award, CheckCircle, ArrowRight, Menu, X, Globe, Quote, Brain, ShoppingCart, Play, Building2, Shield, Goal, Earth, Check, Rocket, Layers } from 'lucide-react';
import { Plus } from 'lucide-react';
import { Clock, RefreshCw, TrendingUp, BarChart3 } from 'lucide-react';
import { Building, Briefcase } from 'lucide-react';
import backgroundImage from './assets/book5/background.webp';
import { Target, Zap } from 'lucide-react';
import logo from './assets/book5/logo.png';
import award1 from './assets/book5/photo-gallery/image1.webp';
import award2 from './assets/book5/photo-gallery/image2.webp';
import award3 from './assets/Awards/40 Under 40 – 2024.webp'
import video1 from './assets/book5/book.gif'
import video2 from './assets/book5/video13.mp4'
import image20 from './assets/book5/dhiraj.webp'

// import award3 from './assets/A'
import award4 from './assets/Awards/Business Icons of the Year 2025.webp'
import award5 from './assets/Awards/Indo Global Awards 2025.webp'
import award6 from './assets/Awards/Most Influential CEOs 2025 Awards.webp'
import award7 from './assets/Awards/Ph.D. in Guerrilla Marketing.webp'
import award8 from './assets/Awards/Super 30 Visionary Leaders To Watch in 2025.webp'
import award9 from './assets/Awards/The Leader Behind An Admirable Company 2025 .webp'
import award10 from './assets/Awards/UAE Business Leader of the Year 2025 awards .webp'
import award11 from './assets/Awards/World Class Visionaries Leadership Beyond Borders awards.webp'
import image2 from './assets/book5/image2.webp';
import image3 from './assets/book5/bookimages.webp';

import image11 from './assets/book5/img(1).webp';
import image5 from './assets/book5/heroimg.webp';
// import gimage5 from './assets/book5/gimage5.png';
// import image6 from './assets/book5/image6.png';
// import image7 from './assets/book5/image7.png';
// import image8 from './assets/book5/image8.png';
// import image9 from './assets/book5/image9.webp';
import image10 from './assets/Awards/image10.webp';
// import banner from "./assets/book5/banner.png";
import { useLocation } from 'react-router-dom';



// //photo gallery

// import img3 from './assets/book5/photo-gallery/image3.png';


export default function LandingPage() {
    const [openIndex, setOpenIndex] = useState(null);
   const location = useLocation();
  const params = new URLSearchParams(location.search);
  
  const [pricing, setPricing] = useState(() => {
    const saved = localStorage.getItem("userPricing");
    return saved ? JSON.parse(saved) : { symbol: "$", amount: "4.99", discount: "9.99" };
  });
  const reference = params.get("reference") || "direct";
const utm_source = params.get("utm_source") || sessionStorage.getItem("utm_source") || null;
const utm_medium = params.get("utm_medium") || sessionStorage.getItem("utm_medium") || null;
const utm_campaign = params.get("utm_campaign") || sessionStorage.getItem("utm_campaign") || null;
const utm_content = params.get("utm_content") || sessionStorage.getItem("utm_content") || null;
const ref = sessionStorage.getItem("reference") || "direct";

// 📌 STORE IN SESSION
sessionStorage.setItem("reference", reference);
if (utm_source) sessionStorage.setItem("utm_source", utm_source);
if (utm_medium) sessionStorage.setItem("utm_medium", utm_medium);
if (utm_campaign) sessionStorage.setItem("utm_campaign", utm_campaign);
if (utm_content) sessionStorage.setItem("utm_content", utm_content);

  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 30, seconds: 23 });
  const [isLoading, setIsLoading] = useState(!localStorage.getItem("userPricing")); // Only show loading if no saved data

  useEffect(() => {
    // Fetch pricing based on location
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const country = data.country_code;
        let newPricing;

        if (country === "IN") newPricing = { symbol: "₹", amount: "99", discount: "199" };
        else if (country === "AE") newPricing = { symbol: "AED", amount: "9", discount: "19" };
        else newPricing = { symbol: "$", amount: "4.99", discount: "9.99" };

        setPricing(newPricing);
        setIsLoading(false);
      })
      .catch(() => {
        const defaultPricing = { symbol: "$", amount: "4.99", discount: "9.99" };
        setPricing(defaultPricing);
        setIsLoading(false);
      });

    // Timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (hours === 0 && minutes === 0 && seconds === 0) return prev;

        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  // Optional: Show nothing or skeleton while loading first time
  if (isLoading) {
    return <div>Loading...</div>; // Or return null, or a skeleton component
  }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { hours, minutes, seconds } = prev;

                if (seconds > 0) {
                    seconds--;
                } else if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                }

                return { hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);
const messages = [
  { text: "Limited Stock", icon: "🛒" },
  { text: "Fast Delivery", icon: "🚚" },
  { text: "Bestseller Book", icon: "⭐" },
  { text: "10,000+ Readers", icon: "📚" },
  { text: "Ships Worldwide", icon: "🌍" },
  { text: "Top Rated", icon: "🔥" },
  { text: "Entrepreneur's Pick", icon: "💼" },
  { text: "Instant eBook Access", icon: "⚡" }
];

const MarqueeContent = () => {
  return (
    <>
      {messages.map((item, index) => (
        <span
          key={index}
          className="inline-flex items-center text-white mx-6 font-medium hover:-translate-y-0.5  transition-transform whitespace-nowrap"
        >
          <span className="text-lg">{item.icon}</span>
          <span className="ml-2 font-semibold">{item.text}</span>
        </span>
      ))}
    </>
  );
};
 

    const sections = [
        {
            icon: Clock,
            title: "Foundations of Sustainable Business Growth",
            items: [
                "Building strong internal systems & processes.",
                "Creating clarity in goals, structure, and operations.",
                "Developing a reliable team that supports long-term success.",
                "Establishing the mindset required for consistent growth."
            ]
        },
        {
            icon: TrendingUp,
            title: "Leveraging Technology for Scale",
            items: [
                "Using simple tech tools to automate and streamline operations.",
                "Building digital systems that save time and increase efficiency.",
                "Adopting online platforms to expand reach and improve customer experience.",
                "Integrating tech solutions for faster, smarter decision-making."
            ]
        },
        {
            icon: RefreshCw,
            title: "Smart & Strategic Marketing",
            items: [
                "Understanding your customers and market positioning.",
                "Crafting a compelling brand story that attracts attention.",
                "Using modern marketing tools that drive real engagement.",
                "Implementing proven strategies like influencer tie-ups & digital campaigns."
            ]
        },
        {
            icon: BarChart3,
            title: "Leadership, Resilience & Crisis Management",
            items: [
                "Staying calm and strategic during business challenges.",
                "Adapting quickly to market shifts and uncertainties.",
                "Leading teams with confidence and clarity.",
                "Building the habits and mindset of long-term, purpose-driven entrepreneurs."
            ]
        }
    ];
    const awardsRow1 = [
        { img: award1, label: "Iconic Power Couple of the UAE 2025 by the India Today Group" },
        { img: award2, label: "The Economic Times Indo Global Leaders 2025" },

    ];

    const awardsRow2 = [
        { img: award3, label: "40 Under 40 – 2024" },
        { img: award4, label: "Business Icons of the Year 2025" },
        { img: award5, label: "The Economic Times Indo Global Leaders Award 2025" },
        { img: award6, label: "Most Influential CEOs 2025 Award" },
        { img: award7, label: "PhD in Guerrilla Marketing" },
        { img: award8, label: "The Super 30 Visionary Leaders To Watch in 2025" },
        { img: award9, label: "The Leader Behind An Admirable Company 2025" },
        { img: award10, label: "UAE Business Leader of the Year 2025" },
        { img: award11, label: "World Class Visionaries: Leadership Beyond Borders" },
    ];
    const audiences = [
        {
            icon: <Rocket className="w-6 h-6 text-[#6A3F43]" />,
            title: "First-Time Entrepreneurs",
            points: [
                "Wanting a clear roadmap to start and grow their business the right way.",
                "Seeking guidance on systems, planning, and avoiding early-stage mistakes.",
            ],
        },
        {
            icon: <Building2 className="w-6 h-6 text-[#6A3F43]" />,
            title: "Small & Mid-Sized Business Owners",
            points: [
                "Looking to fix internal processes, strengthen teams, and scale efficiently.",
                "Needing practical strategies to increase growth without chaos.",
            ],
        },
        {
            icon: <Briefcase className="w-6 h-6 text-[#6A3F43]" />,
            title: "Coaches, Consultants & Leaders",
            points: [
                "Wanting proven frameworks to improve decision-making and leadership.",
                "Seeking tools to guide clients or teams with more structure and confidence.",
            ],
        },
        {
            icon: <Users className="w-6 h-6 text-[#6A3F43]" />,
            title: "Growth-Focused Founders",
            points: [
                "Ready to use marketing, technology, and systems for faster scaling.",
                "Searching for long-term, resilient business strategies not shortcuts.",
            ],
        },
    ];


    const chapters = [
        {
            number: "01",
            title: "Building a Scalable Growth Model",
            desc: "Discover how to create systems that support sustainable scaling, allowing your business to grow with minimal effort and maximum impact.",
        },
        {
            number: "02",
            title: "Building a Solid Business Foundation",
            desc: "Learn how systems, processes, and internal structure create stability and unlock long-term success.",
        },
        {
            number: "03",
            title: "The Power of Smart Planning",
            desc: "Discover how to create clear strategies, set priorities, and align your business for predictable progress.",
        },
        {
            number: "04",
            title: "Creating a High-Performance Team",
            desc: "Explore how leadership, culture, and trust shape a team that supports your vision and accelerates growth.",
        },
        {
            number: "05",
            title: "Modern Marketing That Actually Works",
            desc: "Master storytelling, positioning, influencer strategies, and digital campaigns that attract loyal customers.",
        },
        {
            number: "06",
            title: "Technology as a Growth Multiplier",
            desc: "See how simple tech tools, automation, and online systems make scaling faster, smoother, and more efficient.",
        },
        {
            number: "07",
            title: "Innovation & Adaptability in Business",
            desc: "Learn how to evolve with market trends, stay relevant, and keep your business future-ready.",
        },
        {
            number: "08",
            title: "Staying Resilient Through Crises",
            desc: "Gain tools to handle slowdowns, sudden challenges, and market shifts without losing momentum.",
        },
        {
            number: "09",
            title: "The Power of Collaboration & Community",
            desc: "Understand how partnerships, networking, and shared success unlock exponential opportunities.",
        },
        {
            number: "10",
            title: "Building a Legacy, Not Just a Business",
            desc: "Learn how to create sustainable impact through ethical leadership, continuous learning, and long-term vision.",
        },
    ];


    const faqs = [
        {
            question: "What is The Growth PlayBook about?",
            answer: "The Growth PlayBook is a practical business guide that teaches entrepreneurs and CEOs how to scale their companies sustainably without burnout."
        },
        {
            question: "Who should read this book?",
            answer: "This book is specifically designed for ambitious business leaders who want to scale sustainably while gaining more freedom and impact."
        },
        {
            question: "Does the book include real-life examples and practical frameworks?",
            answer: "Yes, absolutely. The Growth PlayBook is designed as a highly practical, implementation-focused guide that includes case studies from Dhiraj Jain's own entrepreneurial journey, real business scenarios and challenges he encountered while scaling companies"
        },
        {
            question: "How is this book different from other business or self-growth books?",
            answer: "The Growth PlayBook is written by an entrepreneur who actually built and scaled businesses, not just studied them academically. Unlike books that focus on mindset and motivation, this provides concrete operational systems and frameworks you can implement immediately. "
        },
        {
            question: "Is this book based on Dhiraj Jain’s real business experience?",
            answer: "Dhiraj Jain is an entrepreneur and business strategist who has built and scaled multiple businesses. The book draws from his practical experience in growing his own companies from startup to significant scale, implementing systems and processes that enabled sustainable growth"
        },
        {
            question: " Where can I buy the book or get a sample chapter?",
            answer: "The Growth PlayBook is available for purchase on major online platforms including Amazon, Flipkart, and the official website. You can download a free sample chapter or preview sections on these platforms before purchasing to see if the content resonates with your business needs."
        },
        {
            question: "Why should I trust this author?",
            answer: "Dhiraj Kantilal Jain is a proven entrepreneur who has successfully built and scaled multiple businesses from the ground up, giving him firsthand experience with the challenges you're facing. He's not a theoretical consultant but someone who has actually implemented these systems in his own companies and achieved measurable results."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const links = [
        {
            id: 1,
            link: "About the Book",
            src: "#about-book"
        },
        {
            id: 2,
            link: "About the Author",
            src: "#about-author"
        },
        {
            id: 3,
            link: "Reader Reviews",
            src: "#reader-reviews"
        },
        {
            id: 4,
            link: "FAQs",
            src: "#faqs"
        },


    ]



    return (
        <div className="min-h-screen bg-white">
            <style jsx>{`
                .marquee {
                --marquee-duration: 12s; 
                }

               .marquee-track {
    display: inline-flex;
    align-items: center;
    animation: marquee var(--marquee-duration) linear infinite;
    will-change: transform;
}

                .marquee-item {
                    flex-shrink: 0;

                padding-right: 1rem;   
                }

                @keyframes marquee {
                0%   { transform: translateX(0); }
                100% { transform: translateX(-50%); }
                }

                .marquee-track:hover {
                animation-play-state: paused;
                }
                .font-ibmplex {
                    font-family: "IBM Plex Serif", serif;
                }
                    .gallery-slide-left {
                    animation: slideLeft 20s linear infinite;
                }

                .gallery-slide-right {
                    animation: slideRight 20s linear infinite;
                }

                @keyframes slideLeft {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }

                @keyframes slideRight {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }

                .gallery-slide-left:hover,
                .gallery-slide-right:hover {
                    animation-play-state: paused;

                }
                     .cta-dynamic-footer {
          position: relative;
          overflow: hidden;
          background: #6A3F43;
          background-size: 400% 400%;
          animation: gradientShift 6s ease infinite, float 3s ease-in-out infinite;
          color: white;
          font-weight: 600;
          transition: all 0.4s ease;
          cursor: pointer;
        }
        .cta-dynamic-footer:hover {
          transform: scale(1.05) translateY(-3px);
        }
        .cta-dynamic-footer::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
          pointer-events: none;
        }
        .cta-dynamic-footer:hover::after {
          animation: ripple 1.5s ease-out;
          opacity: 1;
        }
                    
                `}
            </style>
            <style>{`
                @keyframes breathe {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.15); }
                }
            `}</style>

            {/* Sticky Footer */}
            <div className="fixed bottom-0 left-0 right-0 bg-[#FAFAF7] border border-[#6A3F43] shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-18 py-3">
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
          {/* Price Badge */}
          <div className="relative bg-gradient-to-b from-[#A66B71] to-[#6A3F43] text-white hover:from-[#E1DB3A] hover:to-[#E1DB3A] hover:text-black px-4 sm:px-6 py-2 rounded-lg shadow-md overflow-hidden">
            <div
              className="absolute inset-0 animate-shimmer"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              }}
            ></div>

            <span className="text-white hearbeat cta-text font-bold text-[20px] sm:text-[30px] whitespace-nowrap">
              {pricing.symbol}
              {pricing.amount}
            </span>

            <span className="text-gray-200 hearbeat line-through text-[14px] sm:text-[18px] font-medium whitespace-nowrap ml-2">
              {pricing.symbol}
              {pricing.discount}
            </span>

            <style>{`
              @keyframes shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
              }
              .animate-shimmer {
                animation: shimmer 2s infinite;
                transform: translateX(-100%);
              }
              .heartbeat {
                animation: 2s ease-in-out infinite heartbeat;
                display: inline-block;
              }
            `}</style>
          </div>

          {/* Timer Section */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-black font-medium text-xs sm:text-sm">
              Offer Will Expire In
            </span>

            <div className="flex items-center justify-center gap-2">
              {/* Hours */}
              <div className="text-center">
                <div className="text-[#6A3F43] font-bold text-[18px] sm:text-[22px] md:text-[32px] leading-none">
                  {String(timeLeft.hours).padStart(2, "0")}
                </div>
                <div className="text-black text-[9px] sm:text-[11px] md:text-[12px] leading-none mt-[2px]">
                  Hours
                </div>
              </div>

              <div className="text-[#6A3F43] font-bold text-[18px] sm:text-[22px] md:text-[24px] leading-none">
                :
              </div>

              {/* Minutes */}
              <div className="text-center">
                <div className="text-[#6A3F43] font-bold text-[18px] sm:text-[22px] md:text-[32px] leading-none">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </div>
                <div className="text-black text-[9px] sm:text-[11px] md:text-[12px] leading-none mt-[2px]">
                  Minutes
                </div>
              </div>

              <div className="text-[#6A3F43] font-bold text-[18px] sm:text-[22px] md:text-[24px] leading-none">
                :
              </div>

              {/* Seconds */}
              <div className="text-center">
                <div className="text-[#6A3F43] font-bold text-[18px] sm:text-[22px] md:text-[32px] leading-none">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </div>
                <div className="text-black text-[9px] sm:text-[11px] md:text-[12px] leading-none mt-[2px]">
                  Seconds
                </div>
              </div>
            </div>
          </div>

          {/* Order Button */}
          <button
            onClick={() => (window.location.href = `/books/tgp/checkout?type=ebook&reference=${ref}`)}
            className="cursor-pointer bg-white text-gray-900 px-5 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg border hover:bg-[#6A3F43] hover:text-white hover:border-white border-[#6A3F43] transition-colors shadow-md w-full sm:w-auto"
          >
            <span style={{ animation: "breathe 2s ease-in-out infinite", display: "inline-block" }}>
              Order Now
            </span>
          </button>
        </div>
      </div>
    </div>


            {/* Navigation */}
             <div className="flex items-center gap-2 text-[14px] sm:text-[16px] md:text-[18px] font-medium overflow-hidden py-2 bg-[#6A3F43]">
  <div className="animate-marquee inline-flex whitespace-nowrap">
    {[...Array(3)].map((_, i) => (
      <MarqueeContent key={i} />
    ))}
  </div>
  
  <style>{`
    @keyframes marquee {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-33.333%);
      }
    }

    .animate-marquee {
      animation: marquee 25s linear infinite;
    }

    .animate-marquee:hover {
      animation-play-state: paused;
    }
  `}</style>
</div>



            {/* Hero Section */}
            <section className="bg-white pt-5 sm:pt-0 text-black py-0 pl-2 sm:pl-22 relative">
                {/* Background Image */}
                <div
                    className="absolute inset-0 opacity-100"
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                ></div>

                {/* Content */}
                <div className="container mx-auto relative z-10">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className='px-5 sm:px-0'>
                            <h1 className="font-ibmplex text-[50px] font-bold mb-6 leading-tight">
                                Learn <span className='bg-[#6A3F43] bg-clip-text text-transparent'> the Growth Secrets </span>Used by Top CEOs & Fastest Growing Businesses
                            </h1>
                            <p className="text-[18px] mb-8 text-black">
                                Discover the proven strategies, systems, and mindsets from The Growth PlayBook that help businesses scale with clarity, speed, and confidence.
                            </p>
                            <div className='flex flex-col sm:flex-row gap-2 mb-4'>
                                <button onClick={() => (window.location.href = `/books/tgp/checkout?type=hardcopy&reference=${ref}`)} className="cursor-pointer bg-gradient-to-b from-[#A66B71] to-[#6A3F43] hover:from-yellow-400 hover:to-yellow-200 hover:text-black text-white px-6 py-3 rounded-[8px] text-[17px] font-medium mr-2 mb-2 sm:mb-0 transition-all">
                                    <span style={{ animation: 'breathe 2s ease-in-out infinite', display: 'inline-block' }}>
                                        📘 Get Your Hard Copy Now
                                    </span>
                                </button>
                                <button onClick={() => (window.location.href = `/books/tgp/checkout?type=ebook&reference=${ref}`)} className="cursor-pointer bg-gradient-to-b from-[#A66B71] to-[#6A3F43] hover:from-yellow-400 hover:to-yellow-200  hover:bg-[#6A3F43] hover:text-black  text-white px-6 py-3 rounded-[8px] text-[17px] font-medium flex items-center justify-center gap-1">
                                    <span style={{ animation: 'breathe 2s ease-in-out infinite', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                                        📥 Get Your Digital Copy Now
                                    </span>
                                </button>
                            </div>
                            <div className='flex flex-col sm:flex-row gap-2 mt-10'>
                                <div className='bg-[#FFFFFF] text-[#6A3F43] text-[16px] py-3 px-3 rounded-[8px] flex items-center justify-center gap-2'> <Award className='w-4 h-4' /> Bestseller 2025</div>
                                <div className='bg-[#FFFFFF] text-[#6A3F43] text-[16px] py-3 px-3 rounded-[8px] flex items-center justify-center gap-2'><Users className='w-4 h-4' />5,000+ Readers</div>
                                <div className='bg-[#FFFFFF] text-[#6A3F43] text-[16px] py-3 px-3 rounded-[8px] text-center'>★ 4.5 Reviews</div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            {/* Show only on desktop */}
                            <div className="relative hidden md:block">
                                <img
                                    src={image5}
                                    alt="Book Cover"
                                    className="relative w-120 h-full"
                                />
                            </div>

                            {/* Show only on mobile */}
                            <div className="relative block md:hidden">
                                <img 
                                    src={image5}
                                    alt="Book Cover"
                                    className="relative w-200 h-auto"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Stats Bar */}
           

            {/* Personalized Book Section */}
            <section
                // id="about-author"
                className="relative py-10 px-3 sm:px-6 md:px-8 overflow-hidden"
            >
                {/* Background Glow */}
                {/* <div className="absolute inset-0 flex items-start justify-center">
                    <div className="w-[600px] md:w-[800px] rounded-full h-[600px] bg-gradient-to-b from-[#0A3B3699] via-purple-100 to-transparent opacity-50 blur-[128px]"></div>
                </div> */}

                <div className="container mx-auto px-4 relative z-10">
                    {/* Title + Subtitle */}
                    <div id="about-book" className="max-w-6xl mx-auto text-center mb-10 sm:mb-12">
                        <h2 className="text-black font-ibmplex text-[32px] sm:text-[42px] md:text-[50px] font-bold mb-4 sm:mb-6 leading-tight">
                            What is{" "}
                            <span className="bg-[#6A3F43] bg-clip-text text-transparent">
                                The Growth PlayBook
                            </span>{" "}
                            All About?
                        </h2>
                        <p className="text-[16px] sm:text-[18px] text-black max-w-3xl sm:max-w-4xl mx-auto">
                            Real-world growth strategies that help you build, scale, and sustain a purpose-driven business.
                        </p>
                    </div>

                    {/* Image + Points */}
                    <div  className="flex flex-col lg:flex-row justify-center items-center gap-6 sm:gap-10">
                        {/* Left Image */}
                        <div className="flex justify-center sm:justify-start mb-6 lg:mb-0 w-full lg:w-[45%]">
                            <img loading="lazy"
                                src={image2}
                                alt="All About Book"
                                className="rounded-lg w-[280px] sm:w-[350px] md:w-[512px] h-auto mx-auto"
                            />
                        </div>

                        {/* Right Features */}
                        <div className="space-y-4 sm:space-y-5 text-black w-full lg:w-[55%] text-justify">
                            {[
                                {
                                    icon: Building2,
                                    title: "The Foundations–Systems–Growth Method",
                                    desc: "Build a rock–solid business base with clear plans, strong teams, and efficient systems that make scaling easier.",
                                },
                                {
                                    icon: Target,
                                    title: "The Smart Marketing Advantage",
                                    desc: "Learn how to position your brand, tell your story, and attract customers using proven, real-world marketing strategies.",
                                },
                                {
                                    icon: Zap,
                                    title: "The Technology-Driven Growth Model",
                                    desc: "Use digital tools, automation, and simple tech solutions to streamline operations and accelerate business success.",
                                },
                                {
                                    icon: Shield,
                                    title: "The Resilience & Leadership Framework",
                                    desc: "Develop the mindset, adaptability, and decision-making skills needed to survive challenges and build long-term, sustainable growth.",
                                },
                            ].map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={index}
                                        className="flex items-start space-x-3 sm:space-x-4 bg-[#6A3F430D] border border-[#6A3F4333] px-3 sm:px-4 py-3 rounded-lg"
                                    >
                                        <div className="bg-gradient-to-b from-[#A66B71] to-[#6A3F43] text-white rounded-full p-2 sm:p-3 flex-shrink-0">
                                            <Icon size={20} className="sm:w-6 sm:h-6" />
                                        </div>

                                        <div>
                                            <h3 className="font-ibmplex text-[16px] sm:text-[18px] font-medium mb-1 sm:mb-2">
                                                {item.title}
                                            </h3>
                                            <p className="text-[14px] sm:text-[16px] text-justify text-[#000000CC] leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className='flex flex-col sm:flex-row gap-4 mb-4 mt-15 justify-center'>
                    <button onClick={() => (window.location.href = `/books/tgp/checkout?type=hardcopy&reference=${ref}`)} className="cursor-pointer bg-gradient-to-b from-[#A66B71] to-[#6A3F43] hover:from-[#E1DB3A] hover:to-[#E1DB3A] hover:text-black  text-white px-12 py-4 rounded-[8px] text-[17px] font-medium mr-2 mb-2 sm:mb-0">
                        <span style={{ animation: 'breathe 2s ease-in-out infinite', display: 'inline-block' }}>
                            📘 Get Your Hard Copy Now
                        </span>
                    </button>
                    <button onClick={() => (window.location.href = `/books/tgp/checkout?type=ebook&reference=${ref}`)} className="cursor-pointer bg-gradient-to-b from-[#A66B71] to-[#6A3F43] hover:from-yellow-400 hover:to-yellow-200  hover:bg-[#6A3F43] hover:text-black  text-white px-8 py-3 rounded-[8px] text-[17px] font-medium flex items-center justify-center gap-1">
                        <span style={{ animation: 'breathe 2s ease-in-out infinite', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                            📥 Get Your Digital Copy Now
                        </span>
                    </button>
                </div>




            </section>


            {/* Meet The Person Behind The Book */}
            <section id='about-author' className="py-10 bg-white px-3 sm:px-8">
                <div className="max-w-7xl container mx-auto px-1 ">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <div className="space-y-6 w-[100%] sm:w-[50%]">
                            <h2 className="text-black font-ibmplex text-[50px] font-bold mb-6 leading-tight sm: -mt-5">Meet The <span className='text-[#6A3F43]'>Visionary </span> Behind The Book
                            </h2>
                            <h3 className="text-[27px] font-bold text-[#6A3F43]">Dhiraj Jain</h3>
                            <ul className='list-disc pl-6 space-y-2 text[20px] text-black text-justify'>
                                <li>
                                    He is a transformative <strong>Business mentor, Entrepreneur, and Philanthropist</strong>, widely recognised for his influence across real estate, technology, and leadership development. With <strong>20+ years of experience</strong>, he has helped countless businesses achieve sustainable growth through strategic thinking and innovation.
                                </li>
                                <li>
                                   As Founder & Chairman of  <strong><span className='w-5 h-5' style={{ fontFamily: 'Lato' }}>1</span>XL </strong>, he empowers entrepreneurs with <strong>Proven business models, Mentorship systems, and Growth frameworks</strong>, enabling them to turn ideas into scalable, future-ready enterprises.
                                </li>
                                <li>
                                    He holds a <strong>PhD in Guerrilla Marketing for Real Estate</strong> and has authored <strong>Multiple influential books</strong> on leadership, strategy, and business evolution.
                                </li>
                            </ul>
                        </div>
                        <div className="flex justify-center px-2 mr-0 sm:mr-10 mb-5 sm:mb-0">
                            <img loading="lazy"
                                src={image3}
                                alt="Author of the book"
                                className="w-[410px]"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Beyond the Book: A Legacy of Impact */}
            {/* Information section */}
            <section className="bg-gradient-to-b from-[#6A3F43] to-[#A66B71] py-10 px-5 lg:px-30">
                <center className="lg:text-[40px] text-[35px] text-[#E1DB3A]">
                    Beyond the Book: A Legacy of Impact
                </center>
                <center className="lg:text-[22px] text-[20px] text-white mt-5 text-justify">
                    Dhiraj Jain has been honoured with prestigious recognitions such as {" "}
                    <span className="text-[#E1DB3A]">The Economic Times Indo Global Leaders Award, </span>
                    being listed among
                    <span className="text-[#E1DB3A]"> The Most Influential CEOs,</span> and receiving <span className="text-[#E1DB3A]">The Iconic Power Couple of the UAE award by India Today Group</span> a testament to his leadership, vision, and industry-defining contributions. Through
                    <span className="text-[#E1DB3A]"> <span style={{ fontFamily: 'Lato' }}>1</span>XL Ventures</span> and the
                    <span className="text-[#E1DB3A]"> Jainam Jivika Foundation (JJF),</span> he leads initiatives focused on education, healthcare, sustainability, entrepreneurship, and community upliftment. His mission extends beyond business success it is about creating meaningful, long-lasting positive change.
                </center>
                <center className="lg:text-[22px] text-[20px] text-white font-bold mt-5">
                    Follow his journey and insights on @DhirajJain<span style={{ fontFamily: 'Nonito' }}>1</span>XL
                </center>
                <center className="flex flex-wrap justify-center gap-2 lg:gap-5 mt-10">
                    <a
                        href="https://www.instagram.com/DhirajJain1XL/"
                        className="relative group w-8 h-8 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded flex items-center justify-center hover:scale-110 transition-transform"
                        aria-label="Instagram" target='_blank'
                    >
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200 whitespace-nowrap z-10">
                            Instagram
                        </span>
                        <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                    </a>

                    <a
                        href="https://www.linkedin.com/company/DhirajJain1XL/"
                        className="relative group w-8 h-8 bg-[#0077b5] rounded flex items-center justify-center hover:scale-110 transition-transform"
                        aria-label="LinkedIn" target='_blank'
                    >
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200 whitespace-nowrap z-10">
                            LinkedIn
                        </span>
                        <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                    </a>

                    <a
                        href="https://www.facebook.com/DhirajJain1XL/"
                        className="relative group w-8 h-8 bg-[#1877f2] rounded flex items-center justify-center hover:scale-110 transition-transform"
                        aria-label="Facebook" target='_blank'
                    >
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200 whitespace-nowrap z-10">
                            Facebook
                        </span>
                        <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                    </a>

                    <a
                        href="https://www.youtube.com/@DhirajJain1XL"
                        className="relative group w-8 h-8 bg-[#ff0000] rounded flex items-center justify-center hover:scale-110 transition-transform"
                        aria-label="YouTube" target='_blank'
                    >
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200 whitespace-nowrap z-10">
                            YouTube
                        </span>
                        <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                    </a>

                    <a
                        href="https://x.com/DhirajJain1XL"
                        className="relative group w-8 h-8 bg-black rounded flex items-center justify-center hover:scale-110 transition-transform"
                        aria-label="X" target='_blank'
                    >
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200 whitespace-nowrap z-10">
                            X
                        </span>
                        <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                    </a>

                    <a
                        href="https://www.threads.com/@DhirajJain1XL"
                        className="relative group w-8 h-8 bg-black rounded flex items-center justify-center hover:scale-110 transition-transform"
                        aria-label="Threads" target='_blank'
                    >
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200 whitespace-nowrap z-10">
                            Threads
                        </span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fill="#fff"
                                d="M6.321 6.016c-.27-.18-1.166-.802-1.166-.802c.756-1.081 1.753-1.502 3.132-1.502c.975 0 1.803.327 2.394.948s.928 1.509 1.005 2.644q.492.207.905.484c1.109.745 1.719 1.86 1.719 3.137c0 2.716-2.226 5.075-6.256 5.075C4.594 16 1 13.987 1 7.994C1 2.034 4.482 0 8.044 0C9.69 0 13.55.243 15 5.036l-1.36.353C12.516 1.974 10.163 1.43 8.006 1.43c-3.565 0-5.582 2.171-5.582 6.79c0 4.143 2.254 6.343 5.63 6.343c2.777 0 4.847-1.443 4.847-3.556c0-1.438-1.208-2.127-1.27-2.127c-.236 1.234-.868 3.31-3.644 3.31c-1.618 0-3.013-1.118-3.013-2.582c0-2.09 1.984-2.847 3.55-2.847c.586 0 1.294.04 1.663.114c0-.637-.54-1.728-1.9-1.728c-1.25 0-1.566.405-1.967.868ZM8.716 8.19c-2.04 0-2.304.87-2.304 1.416c0 .878 1.043 1.168 1.6 1.168c1.02 0 2.067-.282 2.232-2.423a6.2 6.2 0 0 0-1.528-.161"
                            />
                        </svg>
                    </a>



                    <a
                        href="https://www.pinterest.com/DhirajJain1XL/"
                        className="relative group w-8 h-8 bg-[#e60023] rounded flex items-center justify-center hover:scale-110 transition-transform"
                        aria-label="Pinterest" target='_blank'
                    >
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200 whitespace-nowrap z-10">
                            Pinterest
                        </span>
                        <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                            <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                        </svg>
                    </a>
                </center>
            </section>

            {/* Photo Gallery */}
            <style>
                {`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .marquee-track {
            display: flex;
            width: max-content;
            animation: marquee 30s linear infinite;
          }

          .marquee-container:hover .marquee-track {
            animation-play-state: paused;
          }
        `}
            </style>
            <section className="py-12 bg-white px-4 sm:px-6 lg:px-8 mt-2">
                <div className="mx-auto max-w-7xl">
                    <div className="space-y-8">
                        {/* First Row - Static (centered) */}
                        <div className="overflow-hidden py-8">
                            <div className="flex justify-center gap-6 md:gap-8 px-4 flex-wrap">
                                {awardsRow1.map((award, idx) => (
                                    <div
                                        key={`award-row1-${idx}`}
                                        className="flex-shrink-0 w-full max-w-[360px] sm:w-[360px]"
                                    >
                                        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                                            <div className="h-[240px] md:h-[260px] lg:h-[280px] flex items-center justify-center bg-gray-50">
                                                <img loading="lazy"
                                                    src={award.img}
                                                    alt='Awards Received'
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div className="bg-white px-4 py-4">
                                                <p className="text-[14px] md:text-[16px] font-semibold text-[#6A3F43] text-center">
                                                    {award.label}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Second Row - Infinite marquee with all 9 images */}
                        <div className="marquee-container overflow-hidden w-full py-4">
                            <div className="marquee-track gap-8">
                                {[...Array(2)].map((_, setIndex) => (
                                    <React.Fragment key={setIndex}>
                                        {awardsRow2.map((award, idx) => (
                                            <div
                                                key={`row2-${setIndex}-${idx}`}
                                                className="flex-shrink-0 w-[260px] sm:w-[300px] md:w-[340px] lg:w-[360px]"
                                            >
                                                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                                                    <div className="h-[220px] md:h-[240px] lg:h-[260px] flex items-center justify-center bg-gray-50">
                                                        <img loading="lazy"
                                                            src={award.img}
                                                            alt='Awards Received'
                                                            className="w-full h-full object-contain"
                                                        />
                                                    </div>
                                                    <div className="bg-white px-4 py-4">
                                                        <p className="text-[14px] md:text-[14px] font-semibold text-[#6A3F43] text-center">
                                                            {award.label}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>


                    {/* Buttons */}
                    <div className='flex flex-col sm:flex-row gap-4 mb-4 mt-15 justify-center'>
                        <button onClick={() => (window.location.href = `/books/tgp/checkout?type=hardcopy&reference=${ref}`)} className="hover:from-[#E1DB3A] hover:to-[#E1DB3A] hover:text-black cursor-pointer bg-gradient-to-b from-[#A66B71] to-[#6A3F43] border border-[#6A3F43] text-white mx-4 sm:mx-4 px-2 sm:px-12 py-4 rounded-[8px] text-[17px] font-medium mb-2 sm:mb-0">
                            <span style={{ animation: 'breathe 2s ease-in-out infinite', display: 'inline-block' }}>
                                📘 Get Your Hard Copy Now
                            </span>
                        </button>
                        <button onClick={() => (window.location.href = `/books/tgp/checkout?type=ebook&reference=${ref}`)} className="cursor-pointer bg-gradient-to-b from-[#A66B71] to-[#6A3F43] hover:from-yellow-400 hover:to-yellow-200  hover:bg-[#6A3F43] hover:text-black  text-white px-8 py-3 rounded-[8px] text-[17px] font-medium px-4 flex items-center justify-center gap-1">
                            <span style={{ animation: 'breathe 2s ease-in-out infinite', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                                📥 Get Your Digital Copy Now
                            </span>
                        </button>
                    </div>
                </div>
            </section>


            {/* What Lovers Are Saying */}
            <section id="reader-reviews" className="relative py-16 px-3 sm:px-8 bg-white overflow-hidden">
                {/* Purple gradient background - centered */}
                {/* <div className="absolute inset-0 flex items-start justify-center">
                    <div className="w-150 rounded-full max-w-2xl h-150 bg-gradient-to-b from-[#0A3B3699] via-purple-100 to-transparent opacity-50 blur-[128px]"></div>
                </div> */}
                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    <h2 className="text-[#000] font-ibmplex text-center text-[50px] font-bold mb- leading-tight">
                        What Users Are Saying About
                    </h2>
                    <h2 className="text-[#6A3F43] font-ibmplex text-center text-[50px] font-bold mb-15 leading-tight">
                        The Growth PlayBook?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-white shadow-lg p-8 rounded-lg text-center flex flex-col h-full">
                            <p className="text-[16px] md:text-[18px] text-gray-700 leading-relaxed mb-6 flex-grow text-justify border-t-2 border-[#A66B71] pt-6">
                                "This book gave me the clarity I was missing for years." The Growth PlayBook broke down business growth into simple, actionable steps. I fixed my internal systems, improved team performance, and finally started scaling without stress.
                            </p>
                            <div>
                                <div className="flex justify-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="fill-yellow-400 text-yellow-400" size={18} />
                                    ))}
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg">Rohit S</h3>
                                <p className="text-gray-500 text-sm">Founder & CEO</p>
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-white shadow-lg p-8 rounded-lg text-center flex flex-col h-full">
                            <p className="text-[16px] md:text-[18px] text-gray-700 leading-relaxed mb-6 flex-grow text-justify border-t-2 border-[#A66B71] pt-6">
                                “Feels like having a business mentor guiding you on every page.”

                                Dhiraj Jain’s real-world examples and frameworks helped me rethink my marketing, customer experience, and long-term strategy. My revenue and confidence both increased.
                            </p>
                            <div>
                                <div className="flex justify-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="fill-yellow-400 text-yellow-400" size={18} />
                                    ))}
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg">Ayesha M</h3>
                                <p className="text-gray-500 text-sm">Entrepreneur & Coach</p>
                            </div>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="bg-white shadow-lg p-8  rounded-lg text-center flex flex-col h-full">
                            <p className="text-[16px] md:text-[18px] text-gray-700 leading-relaxed mb-6 flex-grow text-justify border-t-2 border-[#A66B71] pt-6">
                                “A must-read for anyone serious about building a sustainable business.” This book doesn’t give shortcuts, it gives a complete roadmap. The sections on resilience and technology-driven growth completely transformed how I run my business.
                            </p>
                            <div>
                                <div className="flex justify-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="fill-yellow-400 text-yellow-400" size={18} />
                                    ))}
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg">Kunal P</h3>
                                <p className="text-gray-500 text-sm">Small Business Owner</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='flex flex-col sm:flex-row gap-4 mb-4 mt-15 justify-center'>
                    <button onClick={() => (window.location.href = `/books/tgp/checkout?type=hardcopy&reference=${ref}`)} className="hover:from-[#E1DB3A] hover:to-[#E1DB3A] hover:text-black cursor-pointer bg-gradient-to-b from-[#A66B71] to-[#6A3F43] border border-[#6A3F43] text-white mx-4 sm:mx-4 px-2 sm:px-12 py-4 rounded-[8px] text-[17px] font-medium mb-2 sm:mb-0">
                        <span style={{ animation: 'breathe 2s ease-in-out infinite', display: 'inline-block' }}>
                            📘 Get Your Hard Copy Now
                        </span>
                    </button>
                    <button onClick={() => (window.location.href = `/books/tgp/checkout?type=ebook&reference=${ref}`)} className="cursor-pointer bg-gradient-to-b from-[#A66B71] to-[#6A3F43] hover:from-yellow-400 hover:to-yellow-200  hover:bg-[#6A3F43] hover:text-black  text-white px-10 py-3 rounded-[8px] text-[17px] font-medium flex items-center justify-center gap-1">
                        <span style={{ animation: 'breathe 2s ease-in-out infinite', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                            📥 Get Your Digital Copy Now
                        </span>
                    </button>
                </div>
            </section>

            {/* What You Will Learn */}
            <section className="py-12 px-3 sm:px-15 ">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-[#000] font-ibmplex text-center text-[50px] -mt-14 font-bold leading-tight ">
                            What You Will Learn in{" "}
                            <span className="text-[#6A3F43]">The Growth PlayBook</span>
                        </h2>


                        <p className="text-black text-[18px] max-w-2xl mx-auto leading-relaxed">
Learn strategies, systems, and frameworks to build, scale, and sustain a purpose-driven, growth-oriented business.
                        </p>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-3 items-start">
                        {/* Left Column */}
                        <div className="space-y-8">
                            <div className=" rounded-2xl p-6 shadow-lg  border border-[#6A3F43] border-t-4 border-[#6A3F43] hover:shadow-xl transition-shadow">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-gradient-to-r from-[#A66B71] to-[#6A3F43]  p-3 rounded-xl">
                                        <Brain className="text-white" size={24} />
                                    </div>
                                    <h3 className="font-bold font-ibmplex text-lg text-black">
                                        {sections[0].title}
                                    </h3>
                                </div>
                                <ul className="space-y-3">
                                    {sections[0].items.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-black text-[16px]">
                                            <span className="text-black">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className=" rounded-2xl p-6 shadow-lg  border border-[#6A3F43] border-t-4 border-[#6A3F43] hover:shadow-xl transition-shadow">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-gradient-to-r from-[#A66B71] to-[#6A3F43]  p-3 rounded-xl">
                                        <TrendingUp className="text-white" size={24} />
                                    </div>
                                    <h3 className="font-ibmplex font-bold text-lg text-black">
                                        {sections[1].title}
                                    </h3>
                                </div>
                                <ul className="space-y-3">
                                    {sections[1].items.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-black text-[16px]">
                                            <span className="text-black">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Center - Book Image */}
                        <div className="flex justify-center items-center lg:py-8 -mt-15 mb-5">
                            <img loading="lazy" src={image11} alt="What You Will Learn" className="w-70 md:w-110 xl:mt-15 lg:w-125 lg:h-122 l:mt-25 xl:-mt-5  md: mt-30 xl:px-5 md: h-100 md:h-145" />
                        </div>

                        {/* Right Column */}
                        <div className="space-y-8">
                            <div className=" rounded-2xl p-6 shadow-lg border-t-4  border border-[#6A3F43] border-[#6A3F43] hover:shadow-xl transition-shadow">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-gradient-to-r from-[#A66B71] to-[#6A3F43]  p-3 rounded-xl">
                                        <RefreshCw className="text-white" size={24} />
                                    </div>
                                    <h3 className="font-ibmplex font-bold text-lg text-black">
                                        {sections[2].title}
                                    </h3>
                                </div>
                                <ul className="space-y-3">
                                    {sections[2].items.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-black text-[16px]">
                                            <span className="text-black">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className=" rounded-2xl p-6 shadow-lg border-t-4  border border-[#6A3F43] border-[#6A3F43] hover:shadow-xl transition-shadow">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-gradient-to-r from-[#A66B71] to-[#6A3F43] p-3 rounded-xl">
                                        <Rocket className="text-white" size={24} />
                                    </div>
                                    <h3 className="font-ibmplex font-bold text-lg text-black">
                                        {sections[3].title}
                                    </h3>
                                </div>
                                <ul className="space-y-3">
                                    {sections[3].items.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-black text-[16px]">
                                            <span className="text-black">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>


                </div>

                <div className='flex flex-col sm:flex-row gap-4 mb-4 mt-15 justify-center'>
                    <button onClick={() => (window.location.href = `/books/tgp/checkout?type=hardcopy&reference=${ref}`)} className="hover:from-[#E1DB3A] hover:to-[#E1DB3A] hover:text-black cursor-pointer bg-gradient-to-b from-[#6A3F43] to-[#A66B71] border border-[#6A3F43] text-white mx-4 sm:mx-4 px-2 sm:px-12 py-4 rounded-[8px] text-[17px] font-medium mb-2 sm:mb-0">
                        <span style={{ animation: 'breathe 2s ease-in-out infinite', display: 'inline-block' }}>
                            📘 Get Your Hard Copy Now
                        </span>
                    </button>
                    <button onClick={() => (window.location.href = `/books/tgp/checkout?type=ebook&reference=${ref}`)} className="cursor-pointer bg-gradient-to-b from-[#A66B71] to-[#6A3F43] hover:from-yellow-400 hover:to-yellow-200  hover:bg-[#6A3F43] hover:text-black  text-white px-9 py-3 rounded-[8px] text-[17px] font-medium flex items-center justify-center gap-1">
                        <span style={{ animation: 'breathe 2s ease-in-out infinite', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                            📥 Get Your Digital Copy Now
                        </span>
                    </button>
                </div>
            </section>

            {/* Who is Million-Dollar Rental Profits Simplified Book For? */}
            <section className="relative py-16 px-4 sm:px-35 overflow-hidden">
                {/* Purple gradient background - centered */}
                <div className="absolute inset-0 flex items-start justify-center">
                    <div className="w-150 rounded-full max-w-2xl h-150 bg-[#6A3F434D] opacity-50 blur-[128px]"></div>
                </div>
                <div className="max-w-6xl mx-auto relative z-10">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-[#000] font-ibmplex text-center text-[50px] font-bold  leading-tight">
                            <span className="text-black">Who is </span>
                            <span className="text-[#6A3F43]">The Growth PlayBook</span>
                            <span className="text-black"> For?</span>
                        </h2>
                        <p className="text-black text-[18px] max-w-3xl mx-auto">
                            A practical guide designed for entrepreneurs, leaders, and teams who want clarity, structure, and sustainable business growth.
                        </p>
                    </div>

                    {/* Grid Layout */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {audiences.map((audience, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-8 min-h-[280px] flex flex-col"
                            >
                                {/* ICON at Top */}
                                <div className="p-3 rounded-full bg-[#0A3B361A] w-fit mb-4">
                                    {audience.icon}
                                </div>

                                {/* TITLE */}
                                <h3 className="font-medium text-[20px] text-gray-900 mb-2">
                                    {audience.title}
                                </h3>

                                {/* POINTS */}
                                <ul className="list-disc ml-5 text-justify text-gray-700 text-[16px] space-y-1">
                                    {audience.points.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className='flex flex-col sm:flex-row gap-4 mb-4 mt-15 justify-center'>
                        <button onClick={() => (window.location.href = `/books/tgp/checkout?type=hardcopy&reference=${ref}`)} className="hover:from-[#E1DB3A] hover:to-[#E1DB3A] hover:text-black cursor-pointer bg-gradient-to-b from-[#A66B71] to-[#6A3F43] border border-[#6A3F43] text-white mx-4 sm:mx-4 px-2 sm:px-12 py-4 rounded-[8px] text-[17px] font-medium mb-2 sm:mb-0">
                            <span style={{ animation: 'breathe 2s ease-in-out infinite', display: 'inline-block' }}>
                                📘 Get Your Hard Copy Now
                            </span>
                        </button>
                        <button onClick={() => (window.location.href = `/books/tgp/checkout?type=ebook&reference=${ref}`)} className="cursor-pointer bg-gradient-to-b from-[#A66B71] to-[#6A3F43] hover:from-yellow-400 hover:to-yellow-200  hover:bg-[#6A3F43] hover:text-black  text-white px-10 py-3 rounded-[8px] text-[17px] font-medium flex items-center justify-center gap-1">
                            <span style={{ animation: 'breathe 2s ease-in-out infinite', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                                📥 Get Your Digital Copy Now
                            </span>
                        </button>
                    </div>

                </div>
            </section>

            {/* Why You Should Read  Million-Dollar Rental Profits Simplified Book ? */}
            <section id="benefits" className="relative py-20  sm:px-12 bg-gradient-to-b from-[#6A3F43] to-[#A66B71] text-white">
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `url(${image10})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                ></div>
                <div className="max-w-7xl container mx-auto px-4 relative z-10">
                    <h2 className="font-ibmplex text-center text-[50px] font-bold leading-tight">
                        <span className="text-white">Why You Should Read </span>
                        <span className="text-[#E1DB3A]">The Growth PlayBook?</span>
                    </h2>
                    <p className="text-[18px] text-center text-white mb-12">
Proven strategies and frameworks to build a solid business foundation with smart solutions.
                    </p>
                    <div>
                        <div className='bg-[#FFFFFF0F] border border-[#FFFFFF40] flex items-center gap-4 py-4 px-8 rounded-lg mb-6'>
                            <div className='bg-[#E1DB3A] text-black p-2 flex justify-center items-center rounded-full'><BookOpen className='w-6 h-6' /></div>
                            <div>
                                <div className='font-ibmplex text-white text-[22px] font-medium'>The Real Meaning of Growth</div>
                                <div className='text-[#FFFFFFCC] text-[18px]'>Understand why true growth goes beyond money and how purpose, people, and clarity build stronger businesses.</div>
                            </div>
                        </div>
                        <div className='bg-[#FFFFFF0F] border border-[#FFFFFF40] flex items-center gap-4 py-4 px-8 rounded-lg mb-6'>
                            <div className='bg-[#E1DB3A] text-black p-2 flex justify-center items-center rounded-full'><Goal className='w-6 h-6' /></div>
                            <div>
                                <div className='font-ibmplex text-white text-[22px] font-medium'>Master Practical, Real-World Marketing</div>
                                <div className='text-[#FFFFFFCC] text-[18px]'>Discover actionable strategies to position your brand, attract customers, and grow through storytelling and smart marketing.</div>
                            </div>
                        </div>

                        <div className='bg-[#FFFFFF0F] border border-[#FFFFFF40] flex items-center gap-4 py-4 px-8 rounded-lg mb-6'>
                            <div className='bg-[#E1DB3A] text-black p-2 flex justify-center items-center rounded-full'><CheckCircle className='w-6 h-6' /></div>
                            <div>
                                <div className='font-ibmplex text-white text-[22px] font-medium'>Leverage Technology to Scale Faster</div>
                                <div className='text-[#FFFFFFCC] text-[18px]'>Understand how simple tools and digital solutions can automate work, increase efficiency, and unlock exponential growth.</div>
                            </div>
                        </div>
                        <div className='bg-[#FFFFFF0F] border border-[#FFFFFF40] flex items-center gap-4 py-4 px-8 rounded-lg mb-6'>
                            <div className='bg-[#E1DB3A] text-black p-2 flex justify-center items-center rounded-full'><Shield className='w-6 h-6' /></div>
                            <div>
                                <div className='font-ibmplex text-white text-[22px] font-medium'>Become a More Resilient, Confident Leader</div>
                                <div className='text-[#FFFFFFCC] text-[18px]'>Gain the mindset, discipline, and clarity needed to navigate challenges, lead teams, and make better decisions.</div>
                            </div>
                        </div>
                        <div className='bg-[#FFFFFF0F] border border-[#FFFFFF40] flex items-center gap-4 py-4 px-8 rounded-lg mb-6'>
                            <div className='bg-[#E1DB3A] text-black p-2 flex justify-center items-center rounded-full'><Earth className='w-6 h-6' /></div>
                            <div>
                                <div className='font-ibmplex text-white text-[22px] font-medium'>Avoid Costly Mistakes Most Entrepreneurs Make</div>
                                <div className='text-[#FFFFFFCC] text-[18px]'>Learn where businesses fail, how to fix weak foundations, and how to build a business that grows smoothly.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row gap-4 mt-16 justify-center'>
                    <button onClick={() => (window.location.href = `/books/tgp/checkout?type=hardcopy&reference=${ref}`)} className="cursor-pointer bg-gradient-to-b from-[#E1DB3A] to-[#E1DB3A] hover:from-[#A66B71]  hover:to-[#6A3F43] hover:border-[#6A3F43] hover:text-black border border-[#F9C646] text-black mx-4 sm:mx-4 px-2 sm:px-12 py-4 rounded-[8px] text-[17px] font-medium mb-2 sm:mb-0">
                        <span style={{ animation: 'breathe 2s ease-in-out infinite', display: 'inline-block' }}>
                            📘 Get Your Hard Copy Now
                        </span>
                    </button>
                    <button onClick={() => (window.location.href = `/books/tgp/checkout?type=ebook&reference=${ref}`)} className="cursor-pointer bg-gradient-to-b from-[#E1DB3A] to-[#E1DB3A] hover:from-[#A66B71]  hover:to-[#6A3F43] hover:border-[#6A3F43] hover:text-black border border-[#F9C646] text-black mx-4 sm:mx-4 px-2 sm:px-12 py-4 rounded-[8px] text-[17px] font-medium mb-2 sm:mb-0">
                        <span style={{ animation: 'breathe 2s ease-in-out infinite', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                            📥 Get Your Digital Copy Now
                        </span>
                    </button>
                </div>
            </section>

            <div className="relative bg-white py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Purple gradient background - centered */}
                <div className="absolute inset-0 flex items-start justify-center">
                    <div className="w-150 rounded-full max-w-2xl h-150 bg-[#6A3F4380] opacity-50 blur-[128px]"></div>
                </div>
                <div className="max-w-5xl mx-auto relative z-10">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h2 className="font-ibmplex text-center text-[50px] font-bold leading-tight mb-6">
                            <span className="text-black">Chapter Highlights of </span>
                            <span className="text-[#6A3F43]">The Growth PlayBook</span>
                        </h2>
                        <p className="text-[18px] text-center text-black mb-12">
                            A quick glimpse into the powerful lessons, systems, and strategies you’ll uncover inside the book:
                        </p>
                    </div>

                    {/* Chapter Timeline */}
                    {/* GRID: 2 columns */}
                    <div className="grid md:grid-cols-2 gap-y-10 gap-x-12">
                        {chapters.map((chapter, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-4 sm:gap-6"
                            >
                                {/* Number Circle */}
                                <div
                                    className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-[#A66B71] to-[#6A3F43] flex items-center justify-center text-white text-lg shadow-md"
                                >
                                    {chapter.number}
                                </div>

                                {/* Text Card */}
                                <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-5 sm:p-6 flex-1 h-40 overflow-y-auto">
                                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                                        {chapter.title}
                                    </h3>
                                    <p className="text-gray-700 text-[15px] leading-relaxed">
                                        {chapter.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>            {/* CTA Buttons */}
                    <div className='flex flex-col sm:flex-row gap-4 mb-4 mt-15 justify-center'>
                        <button onClick={() => (window.location.href = `/books/tgp/checkout?type=hardcopy&reference=${ref}`)} className="hover:from-[#E1DB3A] hover:to-[#E1DB3A] hover:text-black cursor-pointer bg-gradient-to-b from-[#A66B71] to-[#6A3F43] border border-[#F9C646] text-white mx-4 sm:mx-4 px-2 sm:px-12 py-4 rounded-[8px] text-[17px] font-medium mb-2 sm:mb-0">
                            <span style={{ animation: 'breathe 2s ease-in-out infinite', display: 'inline-block' }}>
                                📘 Get Your Hard Copy Now
                            </span>
                        </button>
                        <button onClick={() => (window.location.href = `/books/tgp/checkout?type=ebook&reference=${ref}`)} className="hover:from-[#E1DB3A] hover:to-[#E1DB3A] hover:text-black cursor-pointer bg-gradient-to-b from-[#A66B71] to-[#6A3F43] border border-[#0A3B36] text-white mx-4 sm:mx-4 px-6 sm:px-12 py-4 rounded-[8px] text-[17px] font-medium flex items-center justify-center gap-1">
                            <span style={{ animation: 'breathe 2s ease-in-out infinite', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                                📥 Get Your Digital Copy Now
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-[#0A3B360A]">
                {/* Hero Section */}
                <section className="py-12 px-6 md:px-12 lg:px-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col lg:flex-row-reverse items-stretch justify-between gap-8">
                            {/* Right Content */}
                            <div className="flex-1 space-y-6">
                                <div>
                                    <div className="font-ibmplex text-[35px] font-bold text-black leading-tight text-right">
                                        We Built Strong, Scalable Businesses By Redefining How Growth Really Works
                                    </div>
                                    <p className="text-[18px] text-[#000000BF] mb-5  leading-relaxed mt-6 text-justify">
                                        This book flips traditional business advice on its head by showing you how to combine strong foundations, smart marketing, and technology-backed systems to grow faster and smarter.
                                    </p>
                                </div>
                                <div className="flex justify-center">
                                    <img loading="lazy"
                                        src={video1} alt='BookCover Video'
                                        className="w-[320px] md:w-[600px]  h-[220px] lg:w-[520px] xl:h-[280px] lg:h-[220px] lg:-mt-0 mx-auto rounded-lg shadow-md "
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    />
                                </div>
                            </div>

                            {/* Left Content - Success Box */}
                            <div className="flex-1 bg-[#FFFFFF] rounded-2xl shadow-xl p-8 flex flex-col justify-center h-[548px]">
                                <div className="space-y-6">
                                    <div className="flex items-start gap-3 pt-0 xl:pt-10">
                                        <div>
                                            <p className="text-[20px] font-semibold text-[#6A3F43] mb-2">Our readers achieved breakthrough business growth by:</p>
                                        </div>
                                    </div>

                                    <ul className="list-disc text-justify text-black text-[20px] space-y-4 ml-5">
                                        <li className="leading-relaxed">
                                            Strengthening their foundations before scaling.
                                        </li>
                                        <li className="leading-relaxed">
                                            Turning structured strategies into consistent results.
                                        </li>
                                        <li className="leading-relaxed">
                                            Building systems that support long-term success, not just short-term wins.
                                        </li>
                                    </ul>

                                    <div className="pt-6">
                                        <p className="text-[#6A3F43] text-center text-[22px] font-medium leading-relaxed">
                                            The Growth PlayBook proves that clarity, structure, and purposeful action outperform guesswork and shortcuts every single time.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-12 px-6 md:px-12 lg:px-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8">
                            {/* Left Content */}
                            <div className="flex-1 space-y-6 flex flex-col justify-between">
                                <div>
                                    <div className="font-ibmplex text-[35px] font-bold text-black leading-tight">
                                        Our Approach to Business Growth Has Created Transformation Beyond Expectation
                                    </div>
                                    <p className="text-[18px] text-[#000000BF] leading-relaxed mt-6">
                                        By following Dhiraj Jain’s proven Foundations - Systems - Growth framework, entrepreneurs are now building businesses that give them clarity, stability, and the freedom to scale on their terms.
                                    </p>
                                </div>
                                <div className="flex justify-center lg:justify-start">
                                    <img loading="lazy"
                                        src={image20}
                                        alt="Book with rental properties"
                                        className="rounded-[10px]  -mt-0 object-contain"
                                    />
                                </div>
                            </div>

                            {/* Right Content - Benefits Box */}
                            <div className="flex-1 bg-[#FFFFFF] rounded-2xl shadow-xl p-8 flex flex-col justify-start">
                                <div className="space-y-6">
                                    <div className="flex items-start gap-3">
                                        <div>
                                            <p className="text-[20px] font-semibold text-[#6A3F43] mb-2">You’ll learn how to:</p>
                                        </div>
                                    </div>

                                    <ul className="list-disc text-black text-justify text-[20px] space-y-4 ml-5">
                                        <li className="leading-relaxed">
                                            Build strong systems to stabilise and scale your business.
                                        </li>
                                        <li className="leading-relaxed">
                                            Use smart marketing and storytelling to attract consistent customers.

                                        </li>
                                        <li className="leading-relaxed">
                                            Leverage simple technology to improve efficiency and unlock growth.
                                        </li>
                                    </ul>

                                    <div className="pt-10">
                                        <p className="text-[#6A3F43] text-center text-[22px] font-medium leading-relaxed">
                                            This is the kind of transformation that comes from knowing your strengths, understanding your systems, and leading your business with purpose and confidence.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-12 px-6 md:px-12 lg:px-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col lg:flex-row-reverse items-stretch justify-between gap-8">
                            {/* Right Content */}
                            <div className="flex-1">
                                <div>
                                    <div className="font-ibmplex text-[35px] font-bold text-black leading-tight text-right">
                                        We Didn’t Start With Big Teams -
                                        We Built Success Through Strategy And Focus
                                    </div>
                                    <p className="text-[18px] text-[#000000BF] leading-relaxed mt-6 ml-8 text-justify">
                                        Dhiraj Jain's built lasting success through vision, discipline, and smart strategy and now shares those principles inside The Growth PlayBook.
                                    </p>
                                </div>
                                <div className="flex justify-center">
                                    <video
                                        src={video2}
                                        className="h-auto sm: w-[230px] max-w-[295px] lg:w-[215px] xl:w-[285px] sm: mt-0 xl:-mt-15 md:-mt-10 mx-auto rounded-lg shadow-md -rotate-90"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    />
                                </div>
                            </div>

                            {/* Left Content - Success Box */}
                            <div className="flex-1 bg-[#FFFFFF] rounded-2xl shadow-xl p-8 flex flex-col justify-center h-[545px]">
                                <div className="space-y-6">
                                    <div className="flex items-start gap-3 pt-10">
                                        <div>
                                            <p className="text-[20px] font-semibold text-[#6A3F43] mb-2">This book is built for those who:</p>
                                        </div>
                                    </div>

                                    <ul className="list-disc text-justify text-black text-[20px] space-y-4 ml-5">
                                        <li className="leading-relaxed">
                                            Are ready to move from confusion to clarity and structured growth.
                                        </li>
                                        <li className="leading-relaxed">
                                            Want to build ethical, purposeful, long-term businesses.
                                        </li>
                                        <li className="leading-relaxed">
                                            Believe in discipline, systems, and the compounding power of strategic action.
                                        </li>
                                    </ul>

                                    <div className="pt-6">
                                        <p className="text-[#6A3F43] text-center text-[22px] font-medium leading-relaxed">
                                            The Growth PlayBook isn’t just a book; it’s your roadmap for long-term, sustainable business success.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>




            </div>

            <div id='faqs' className="bg-[#0A3B360A]  px-4 sm:px-6 md:px-8 text-black">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <h2 className="text-[#000] font-ibmplex text-center text-[32px] sm:text-[40px] md:text-[50px] font-bold mb-8 sm:mb-10 md:mb-12 leading-tight">
                        Frequently <span className="text-[#6A3F43]">Asked Questions</span>
                    </h2>

                    {/* FAQ Items */}
                    <div className="space-y-3 sm:space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-[8px] border border-[#6A3F43] overflow-hidden transition-all duration-200 hover:shadow-md"
                            >
                                {/* Question Button */}
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                                >
                                    <span className="cursor-pointer text-sm sm:text-base md:text-lg font-medium text-gray-800 pr-3 sm:pr-4">
                                        {faq.question}
                                    </span>
                                    <span className="cursor-pointer text-[#6A3F43] font-bold flex-shrink-0">
                                        {openIndex === index ? (
                                            <X size={22} className="sm:w-6 sm:h-6" />
                                        ) : (
                                            <Plus size={22} className="sm:w-6 sm:h-6" />
                                        )}
                                    </span>
                                </button>

                                {/* Answer */}
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index
                                        ? 'max-h-96 opacity-100'
                                        : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-2">
                                        <p className="text-gray-600 text-sm sm:text-base text-justify leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            <div className='my-12'>
                <div className='flex flex-col  sm:flex-row gap-4 mb-4 justify-center'>
                    <button onClick={() => (window.location.href = `/books/tgp/checkout?type=hardcopy&reference=${ref}`)} className="hover:from-[#E1DB3A] hover:to-[#E1DB3A] hover:text-black cursor-pointer bg-gradient-to-b from-[#A66B71] to-[#6A3F43] border border-[#6A3F43] text-white mx-4 sm:mx-4 px-2 sm:px-12 py-4 rounded-[8px] text-[17px] font-medium mb-2 sm:mb-0">
                        <span style={{ animation: 'breathe 2s ease-in-out infinite', display: 'inline-block' }}>
                            📘 Get Your Hard Copy Now
                        </span>
                    </button>
                    <button onClick={() => (window.location.href = `/books/tgp/checkout?type=ebook&reference=${ref}`)} className="hover:from-[#E1DB3A] hover:to-[#E1DB3A] hover:text-black cursor-pointer bg-gradient-to-b from-[#A66B71] to-[#6A3F43] border border-[#F9C646] text-white mx-4 sm:mx-4 px-2 sm:px-12 py-4 rounded-[8px] text-[17px] font-medium mb-2 sm:mb-0">
                        <span style={{ animation: 'breathe 2s ease-in-out infinite', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                            📥 Get Your Digital Copy Now
                        </span>
                    </button>
                </div>
            </div>
          <footer className="bg-gradient-to-br from-[#A66B71] to-[#6A3F43] text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-12 md:py-16">

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* About */}
          <div>
            <img src={logo} alt="Logo" className="h-8 mb-4" />
            <p className="text-sm sm:text-base text-[#fff] leading-relaxed text-justify">
              A real-world blueprint that helps entrepreneurs grow with clarity, structure, and purpose focusing on systems, marketing, and long-term success.  
            </p>
          </div>

                        {/* Quick Links */}
                        <div className='xl:ml-10 lg:ml-10'>
                            <h3 className="text-[20px] font-bold mb-4 text-[#E1DB3A] ml-2">Quick Links</h3>
                            <ul className="space-y-0">
                                {links.map((link) => (
                                    <li key={link.id}>
                                        <a
                                            href={link.src}
                                            className="text-white text-[18px] transition-all inline-block px-2 py-1 rounded-md hover:bg-white/10"
                                        >
                                            {link.link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h3 className="text-[20px] font-bold ml-2 mb-4 text-[#E1DB3A]">Legal</h3>
                            <ul className="space-y-0">
                                {[
                                    { name: "Privacy Policy", path: "/books/tgp/privacy-policy" },
                                    { name: "Terms & Conditions", path: "/books/tgp/terms" },
                                    { name: "Return Policy", path: "/books/tgp/return-policy" },
                                    { name: "Shipping Policy", path: "/books/tgp/shipping-policy" },
                                    { name: "Payment Policy", path: "/books/tgp/payment-policy" },
                                    { name: "Cookie Policy", path: "/books/tgp/cookie-policy" },
                                ].map((item, idx) => (
                                    <li key={idx}>
                                        <a
                                            href={item.path}
                                            className="text-gray-200 hover:text-white text-[18px] transition-all inline-block px-2 py-1 rounded-md hover:bg-white/10"
                                        >
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>


                        {/* Connect With Us */}
                        <div>
                            <h3 className="text-[20px] font-bold mb-4 text-[#E1DB3A]">Connect With Us</h3>

                            {/* Email */}
                            <a
  href="mailto:support@1XL.com"
  onClick={(e) => {
    if (window.innerWidth > 768) {
      window.open(
        "https://mail.google.com/mail/?view=cm&fs=1&to=support@1XL.com",
        "_blank"
      );
      e.preventDefault();
    }
  }}
  className="flex items-center gap-2 text-gray-200 hover:text-white hover:bg-white/10 text-sm mb-6 group cursor-pointer"
>
                  <svg
                    className="w-5 h-5 xl:mt-1.5 flex-shrink-0"
                    fill="none" npm
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="break-all text-[18px]">
                    support@1XL.com
                  </span>
                </a>

                            <div className="flex flex-nowrap gap-2 pb-2">
                                <a
                                    href="https://www.instagram.com/DhirajJain1XL/"
                                    className="relative group w-8 h-8 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded flex items-center justify-center hover:scale-110 transition-transform"
                                    aria-label="Instagram"
                                    target="blank"
                                >
                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200 whitespace-nowrap z-10">
                                        Instagram
                                    </span>
                                    <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>

                                <a
                                    href="https://www.linkedin.com/company/DhirajJain1XL/"
                                    className="relative group w-8 h-8 bg-[#0077b5] rounded flex items-center justify-center hover:scale-110 transition-transform"
                                    aria-label="LinkedIn"
                                    target="blank"
                                >
                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200 whitespace-nowrap z-10">
                                        LinkedIn
                                    </span>
                                    <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>

                                <a
                                    href="https://www.facebook.com/DhirajJain1XL/"
                                    className="relative group w-8 h-8 bg-[#1877f2] rounded flex items-center justify-center hover:scale-110 transition-transform"
                                    aria-label="Facebook"
                                    target="blank"
                                >
                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200 whitespace-nowrap z-10">
                                        Facebook
                                    </span>
                                    <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>

                                <a
                                    href="https://www.youtube.com/@DhirajJain1XL"
                                    className="relative group w-8 h-8 bg-[#ff0000] rounded flex items-center justify-center hover:scale-110 transition-transform"
                                    aria-label="YouTube"
                                    target="blank"
                                >
                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200 whitespace-nowrap z-10">
                                        YouTube
                                    </span>
                                    <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                </a>

                                <a
                                    href="https://x.com/DhirajJain1XL"
                                    className="relative group w-8 h-8 bg-black rounded flex items-center justify-center hover:scale-110 transition-transform"
                                    aria-label="X"
                                    target="blank"
                                >
                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200 whitespace-nowrap z-10">
                                        X
                                    </span>
                                    <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>

                                <a
                                    href="https://www.threads.com/@DhirajJain1XL"
                                    className="relative group w-8 h-8 bg-black rounded flex items-center justify-center hover:scale-110 transition-transform"
                                    aria-label="Threads"
                                    target="blank"
                                >
                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200 whitespace-nowrap z-10">
                                        Threads
                                    </span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="30"
                                        height="30"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fill="#fff"
                                            d="M6.321 6.016c-.27-.18-1.166-.802-1.166-.802c.756-1.081 1.753-1.502 3.132-1.502c.975 0 1.803.327 2.394.948s.928 1.509 1.005 2.644q.492.207.905.484c1.109.745 1.719 1.86 1.719 3.137c0 2.716-2.226 5.075-6.256 5.075C4.594 16 1 13.987 1 7.994C1 2.034 4.482 0 8.044 0C9.69 0 13.55.243 15 5.036l-1.36.353C12.516 1.974 10.163 1.43 8.006 1.43c-3.565 0-5.582 2.171-5.582 6.79c0 4.143 2.254 6.343 5.63 6.343c2.777 0 4.847-1.443 4.847-3.556c0-1.438-1.208-2.127-1.27-2.127c-.236 1.234-.868 3.31-3.644 3.31c-1.618 0-3.013-1.118-3.013-2.582c0-2.09 1.984-2.847 3.55-2.847c.586 0 1.294.04 1.663.114c0-.637-.54-1.728-1.9-1.728c-1.25 0-1.566.405-1.967.868ZM8.716 8.19c-2.04 0-2.304.87-2.304 1.416c0 .878 1.043 1.168 1.6 1.168c1.02 0 2.067-.282 2.232-2.423a6.2 6.2 0 0 0-1.528-.161"
                                        />
                                    </svg>
                                </a>



                                <a
                                    href="https://www.pinterest.com/DhirajJain1XL/"
                                    className="relative group w-8 h-8 bg-[#e60023] rounded flex items-center justify-center hover:scale-110 transition-transform"
                                    aria-label="Pinterest"
                                    target="blank"
                                >
                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200 whitespace-nowrap z-10">
                                        Pinterest
                                    </span>
                                    <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                                        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/20 my-8"></div>

                    {/* Copyright */}


                    <p className="text-center text-gray-300 text-sm pb-15">
                        © 2026
                        <a href="https://drdhirajjain.com/" target="blank" className="hover:text-yellow-400 cursor-pointer"> Dhiraj Jain. </a>
                        All Rights Reserved.
                    </p>

                </div>
            </footer>
        </div>
    );
}