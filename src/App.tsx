import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Mail } from 'lucide-react';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [mediaErrors, setMediaErrors] = useState<Record<number, boolean>>({});
  const [expandedProjects, setExpandedProjects] = useState<Record<number, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const projects: Array<{
    id: number;
    title: string;
    description: string;
    mediaUrl: string;
    mediaType: 'image' | 'video';
    link?: string;
  }> = [
    { 
      id: 1, 
      title: 'Ontario Endangered Turtles', 
      description: 'I created a fully responsive educational website dedicated to raising awareness about Ontario\'s endangered turtle species. This project started as a personal passion for wildlife protection and environmental design. The website was designed and developed entirely by me using HTML5, CSS3, semantic structuring, accessibility best practices, UX layout principles, and responsive design techniques, all coded from scratch. The site includes multiple thematic pages such as endangered species profiles, conservation solutions, research highlights, scientific data dashboards, lake/park ecosystem information, and a communication page with a functional contact form.',
      mediaUrl: '/images/ontario.png',
      mediaType: 'image' as const,
      link: 'https://joseph9866.github.io/ontario-lake-tales/'
    },
    { 
      id: 2, 
      title: 'PAC-MAN Retro Arcade Interface', 
      description: 'This project is a self-directed build where I recreated a PAC-MAN–inspired retro web interface using hand-coded HTML and CSS. The goal was to challenge myself to design a fully themed, multi-section website while maintaining strict visual fidelity to early arcade UI systems. No external libraries, page builders, or frameworks were used — everything is built from scratch. I implemented information architecture with logical sections (Header/Navigation, Landing Screen, High Scores Module, Gameplay Instructions, Character Index, Footer), recreated the arcade aesthetic through custom pixel-based typography, controlled color indexing, strict box-model usage, and CSS positioning. I curated and prepared each asset manually including cleaned and resized PNG sprites (Blinky, Pinky, Inky, Clyde), isolated Pac-Man movement frames, and applied responsive constraints. The final outcome demonstrates my ability to build structured pages using pure HTML/CSS, translate thematic design into functional UI components, work with custom assets and pixel-art rendering, and combine visual design principles with clean, modular code thinking.',
      mediaUrl: '/images/pac-man.mp4',
      mediaType: 'video' as const
    },
    { 
      id: 3, 
      title: 'OZIO Authentic Sushi Restaurant', 
      description: 'A wide restaurant homepage layout centered on Japanese cuisine. The top shows a bold brand name, "OZIO AUTHENTIC SUSHI," with a navigation row offering menu, specials, locations, and contact. The hero area is a full-width banner featuring close-up sushi visuals with heavy garnish, paired with a heading promoting Japanese fusion cuisine and a subheading describing authentic, traditional dishes. A call-out button invites visitors to view seasonal specialties. Beneath the banner sits a three-column section. Each column displays a food category with a large image above its label. The left block shows a bowl of seasonal soup, the center displays sushi pieces being picked up with chopsticks, and the right features a bowl of udon noodles. The layout uses strong imagery, bold typography, and clean spacing to highlight featured dishes.',
      mediaUrl: '/images/Screenshot 2025-11-17 173525.png',
      mediaType: 'image' as const
    },
    { 
      id: 4, 
      title: 'Animated Logo Design', 
      description: 'A dynamic logo animation project showcasing motion design skills and brand identity development. This project demonstrates the ability to bring static brand elements to life through smooth transitions, timing, and visual effects, creating an engaging and memorable brand experience.',
      mediaUrl: '/images/hipcamp.png',
      mediaType: 'image' as const
    },
    { 
      id: 5, 
      title: 'Digital Oasis & Solar Ecliptica', 
      description: '"Digital Oasis" and "Solar Ecliptica" are part of a personal design series where I explored experimental album cover art, visual storytelling, and typographic expression outside of client constraints. The goal of this project was to push my creative boundaries, develop stronger artistic direction, and create visually striking covers that could exist within electronic, alternative, or conceptual music genres. Digital Oasis explores the idea of a "digital mirage" — a space where technology and human emotion blur, using heat-map inspired gradients, soft neon edges, and an abstract human form. Solar Ecliptica experiments with cosmic themes, dual silhouettes, and bold solar-inspired gradients. The angular futuristic type system reflects the intensity of space and eclipse imagery. Through this project, I developed two fully realized conceptual album identities, strengthened my skills in expressive typography, color theory, and abstract composition, and demonstrated versatility from minimal digital art to high-contrast cosmic visuals.',
      mediaUrl: '/images/digitaloasis.jpeg',
      mediaType: 'image' as const
    },
    { 
      id: 6, 
      title: 'Solar Ecliptica Branding System', 
      description: 'A turntable setup sits on a deep red background alongside a full set of branded music-release assets. The layout includes black and white vinyl records, a CD, album covers, and printed inserts. Each item carries the same visual identity—bold red, orange, and black tones with abstract silhouette artwork and the title "SOLAR ECLIPTICA." The arrangement highlights consistency in branding, packaging design, and layout execution, showing the designer\'s ability to create a unified visual system across multiple physical and digital formats. This project demonstrates comprehensive brand application across vinyl, CD covers, and promotional layouts to simulate a real album launch.',
      mediaUrl: '/images/solar.jpeg',
      mediaType: 'image' as const
    },
    { 
      id: 7, 
      title: 'War & Peace Book Cover', 
      description: 'The design serves as a visually intense and thematic cover for Leo Tolstoy\'s War & Peace, utilizing strong symbolism and a dramatic color scheme to convey the epic scope of the novel. The use of deep maroons, rich reds, and dark browns sets an immediate mood of historical conflict, passion, and gravity. The golden shield and crossed swords are the clear focal point, directly representing the "War" component and the military aristocracy. The fiery phoenix symbolizes destruction and the potential for rebirth and change. The stark contrast between the white dove (Peace/Hope) and the subtle tank (Modern Warfare/Conflict) visually encapsulates the dual nature of the title. This project emphasizes symbolic visual language, integrating multiple well-known symbols to represent complex themes instantly, using historical palettes to establish a serious, classical tone, and creating visual depth through layered design where texture, symbols, and light effects give the flat cover depth and drama.',
      mediaUrl: '/images/book-cover.jpeg',
      mediaType: 'image' as const
    },
    { 
      id: 8, 
      title: 'War & Peace Mood Board', 
      description: 'A digital mood board with a black background, visually mapping the themes of the book War & Peace through various images, textures, and typography. Key visual themes include Peace/Aristocracy represented by historical images of 19th-century noble figures, and War/Conflict shown through Napoleonic-era cavalry, battlefield scenes, and gritty photos of soldiers. The board features powerful symbolism including a burning Phoenix rising from the bottom right (symbolizing renewal and transformation), a ripped Eagle head (representing empire and military strength), military medals, and Soviet-era war memorial statues. The duality is emphasized through contrasting typography: "WAR" appears dark and fragmented while "& PEACE" is rendered in gold/yellow against a dark, ruined landscape. This mood board demonstrates visual research and conceptualization skills, showing how imagery, color palettes, textures, and symbolic elements inform design decisions for thematic projects.',
      mediaUrl: '/images/moodboard.jpeg',
      mediaType: 'image' as const
    },
    ];

  const visibleProjects = projects.slice(currentSlide, currentSlide + 3);

  const handleNext = () => {
    if (currentSlide + 3 < projects.length) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Load profile image from localStorage on mount
  useEffect(() => {
    const storedImage = localStorage.getItem('portfolio_profile_image');
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  // Handle profile circle click to trigger file input
  const handleProfileClick = () => {
    fileInputRef.current?.click();
  };

  // Compress image before storing
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          // Create canvas for compression
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            reject(new Error('Failed to get canvas context'));
            return;
          }

          // Calculate new dimensions (max 800x800 while maintaining aspect ratio)
          const maxSize = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxSize) {
              height = (height * maxSize) / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width = (width * maxSize) / height;
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;

          // Draw and compress image
          ctx.drawImage(img, 0, 0, width, height);
          
          // Convert to base64 with compression (0.85 quality for JPEG)
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.85);
          resolve(compressedBase64);
        };

        img.onerror = () => {
          reject(new Error('Failed to load image'));
        };

        img.src = e.target?.result as string;
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsDataURL(file);
    });
  };

  // Handle file selection and validation
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset error state and show loading
    setUploadError(null);
    setIsUploading(true);

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Please select a valid image file (JPG, PNG, WebP, or GIF)');
      setIsUploading(false);
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setUploadError('Image size must be less than 5MB. Please compress your image and try again.');
      setIsUploading(false);
      return;
    }

    try {
      // Compress image before storing
      const compressedImage = await compressImage(file);
      
      // Store in localStorage
      localStorage.setItem('portfolio_profile_image', compressedImage);
      setProfileImage(compressedImage);
      setIsUploading(false);
    } catch (error) {
      // Handle storage quota exceeded
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        setUploadError('Storage quota exceeded. Please try a smaller image or clear browser storage.');
      } else if (error instanceof Error) {
        setUploadError(error.message || 'Failed to process image. Please try again.');
      } else {
        setUploadError('Failed to save image. Please try again.');
      }
      setIsUploading(false);
    }
  };

  // Handle media loading errors
  const handleMediaError = (projectId: number) => {
    setMediaErrors(prev => ({ ...prev, [projectId]: true }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="border-b border-gray-800 px-6 sm:px-8 lg:px-12 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-500 rounded-full p-2">
              <div className="w-6 h-6 bg-gray-900 rounded-full" />
            </div>
            <span className="font-bold text-lg">RTFOLIO | Editor</span>
          </div>
        </div>
      </header>

      <section className="animated-gradient-bg px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gray-400 text-sm mb-4 tracking-wide">CREATIVE PORTFOLIO</p>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-white leading-tight">
              Kamsiyochukwu Desiree Obi
            </h1>
            <div className="mb-8 space-y-1">
              <p className="text-gray-300 text-lg sm:text-xl leading-relaxed">
                Graphic Designer & Creative Developer
              </p>
              <p className="text-gray-300 text-lg sm:text-xl leading-relaxed">
                Blending Artistic Creativity with Technical Expertise
              </p>
              <p className="text-gray-300 text-lg sm:text-xl leading-relaxed">
                Architecture Background • Adobe Suite Expert • Web Developer
              </p>
            </div>
            <button 
              onClick={() => {
                document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="border-2 border-yellow-500 text-yellow-500 px-8 py-3 hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 font-semibold"
            >
              Hire Me
            </button>
          </div>

          <div className="flex justify-center flex-col items-center">
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[28rem] lg:h-[28rem]">
              <div className="absolute inset-0 border-8 border-yellow-500 rounded-full"></div>
              <div 
                className={`absolute inset-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity duration-300 group ${isUploading ? 'opacity-50 cursor-wait' : ''}`}
                onClick={!isUploading ? handleProfileClick : undefined}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (!isUploading && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    handleProfileClick();
                  }
                }}
                aria-label="Click to upload profile image"
                aria-busy={isUploading}
              >
                <div className="w-full h-full bg-gradient-to-b from-amber-900 via-amber-800 to-gray-900 rounded-full flex items-center justify-center text-4xl overflow-hidden relative">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span>👨</span>
                  )}
                  {isUploading ? (
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-white text-sm">Uploading...</span>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Click to upload
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleFileChange}
              className="hidden"
              aria-label="Upload profile image"
              disabled={isUploading}
            />
            {uploadError && (
              <div className="mt-4 p-3 bg-red-900 bg-opacity-50 border border-red-500 rounded-lg max-w-xs">
                <p className="text-red-300 text-sm text-center">
                  {uploadError}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-8 lg:px-12 py-16 bg-gray-800 bg-opacity-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-1 rounded-lg">
              <div className="bg-gray-900 p-4 rounded">
                <img
                  src="/images/about.png"
                  alt="About Kamsiyochukwu Desiree Obi"
                  className="w-full h-64 sm:h-80 object-contain rounded"
                />
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6 text-white">About Me</h2>
              <p className="text-gray-300 mb-5 leading-relaxed text-base">
                Welcome to my portfolio — a space I personally designed and developed to showcase my creative work, technical abilities, and design journey. I am a Graphic Design student with a background in Architecture, blending artistic creativity with structural thinking to produce clean, purposeful, and visually compelling work.
              </p>
              <p className="text-gray-300 mb-5 leading-relaxed text-base">
                I am highly skilled in Adobe Creative Suite, including Illustrator, Photoshop, InDesign, Dreamweaver, Lightroom, and Adobe XD, with additional experience in Figma for UI/UX design. My strengths include creating brand-consistent visuals, conceptualizing designs from idea to completion, and developing polished graphics for campaigns, digital experiences, and print materials.
              </p>
              <p className="text-gray-300 mb-5 leading-relaxed text-base">
                Alongside my design expertise, I have working knowledge of HTML, CSS, and introductory JavaScript, allowing me to build and understand responsive layouts, creative interfaces, and functional web structures. The website you are exploring right now was designed and partially developed by me, showcasing my ability to merge design thinking with web execution.
              </p>
              <p className="text-gray-300 leading-relaxed text-base">
                I'm a detail-oriented designer who thrives in structured, fast-paced environments. I bring strong organizational skills, creativity, and the ability to manage multiple projects while maintaining consistency across visual assets. I'm open-minded, collaborative, and always ready to learn — whether I'm developing visual concepts, refining brand elements, or contributing creative input to new design ideas.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-8 lg:px-12 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-2 inline-block relative">
              <span className="text-yellow-500">·</span> My Projects <span className="text-yellow-500">·</span>
            </h2>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {visibleProjects.map(project => {
                const ProjectWrapper = project.link ? 'a' : 'article';
                const wrapperProps = project.link 
                  ? { 
                      href: project.link, 
                      target: '_blank', 
                      rel: 'noopener noreferrer',
                      className: "bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group block"
                    }
                  : { 
                      className: "bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                    };

                return (
                  <ProjectWrapper
                    key={project.id}
                    {...wrapperProps}
                    aria-label={`Project: ${project.title}${project.link ? ' (opens in new tab)' : ''}`}
                  >
                    <div className="aspect-square bg-gradient-to-br from-yellow-600 via-amber-600 to-gray-800 flex items-center justify-center relative overflow-hidden">
                      {mediaErrors[project.id] ? (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6 text-center" role="alert" aria-live="polite">
                          <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          <p className="text-gray-400 text-sm">Failed to load media</p>
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              setMediaErrors(prev => {
                                const newErrors = { ...prev };
                                delete newErrors[project.id];
                                return newErrors;
                              });
                            }}
                            className="text-yellow-500 text-xs hover:text-yellow-400 underline"
                            aria-label={`Retry loading media for ${project.title}`}
                          >
                            Retry
                          </button>
                        </div>
                      ) : (
                        <>
                          {project.mediaType === 'image' ? (
                            <img 
                              src={project.mediaUrl} 
                              alt={`${project.title} - ${project.description}`}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              onError={() => handleMediaError(project.id)}
                            />
                          ) : (
                            <video 
                              src={project.mediaUrl}
                              className="w-full h-full object-cover"
                              muted
                              loop
                              playsInline
                              onMouseEnter={(e) => e.currentTarget.play()}
                              onMouseLeave={(e) => {
                                e.currentTarget.pause();
                                e.currentTarget.currentTime = 0;
                              }}
                              onError={() => handleMediaError(project.id)}
                              aria-label={`Video preview for ${project.title}`}
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                        </>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-white mb-2">
                        {project.title}
                        {project.link && (
                          <svg className="inline-block ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        )}
                      </h3>
                      <div>
                        <p className={`text-gray-400 text-sm leading-relaxed ${!expandedProjects[project.id] && project.description.length > 150 ? 'line-clamp-3' : ''}`}>
                          {project.description}
                        </p>
                        {project.description.length > 150 && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setExpandedProjects(prev => ({
                                ...prev,
                                [project.id]: !prev[project.id]
                              }));
                            }}
                            className="text-yellow-500 text-xs hover:text-yellow-400 mt-2 flex items-center gap-1"
                            aria-label={expandedProjects[project.id] ? 'Show less' : 'Show more'}
                          >
                            {expandedProjects[project.id] ? (
                              <>
                                Show less
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                              </>
                            ) : (
                              <>
                                Show more
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </ProjectWrapper>
                );
              })}
            </div>

            {projects.length > 3 && (
              <div className="flex justify-center items-center gap-4" role="navigation" aria-label="Project carousel navigation">
                <button
                  onClick={handlePrev}
                  disabled={currentSlide === 0}
                  className="bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 p-3 rounded-full transition-all"
                  aria-label="Previous projects"
                  title="Previous projects"
                >
                  <ChevronLeft size={24} aria-hidden="true" />
                </button>

                <div className="flex gap-2" role="tablist" aria-label="Project pages">
                  {Array.from({ length: Math.ceil(projects.length / 3) }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        Math.floor(currentSlide / 1) === i
                          ? 'bg-yellow-500 w-6'
                          : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                      role="tab"
                      aria-label={`Go to page ${i + 1}`}
                      aria-selected={Math.floor(currentSlide / 1) === i}
                      title={`Page ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  disabled={currentSlide + 3 >= projects.length}
                  className="bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 p-3 rounded-full transition-all"
                  aria-label="Next projects"
                  title="Next projects"
                >
                  <ChevronRight size={24} aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="contact-section" className="px-6 sm:px-8 lg:px-12 py-16 bg-gray-800 bg-opacity-50">
        <div className="max-w-6xl mx-auto text-center">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 sm:px-12 py-3 font-bold transition-all mb-8 block mx-auto">
            Get More
          </button>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-8 border-t border-gray-700">
            <a href="mailto:kamsiyochukwu.obi@email.com" className="flex items-center gap-3 text-gray-300 hover:text-yellow-500 transition-colors">
              <Mail size={24} />
              <span className="text-lg">kamsiyochukwu.obi@email.com</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
