'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Profile {
  name: string;
  motto: string;
  role: string;
  skills: string[];
}

const profiles: Record<string, Profile> = {
  dimas: {
    name: "Dimas Surya Frannanta",
    motto: "Do What You Want To Do Like Bird Fly In Sky",
    role: "FullStack Developer",
    skills: ["Python", "TypeScript", "FastAPI", "NextJS"]
  },
  kanrisha: {
    name: "Kanrisha_G",
    motto: "Creative and Passion",
    role: "AI Internet Creative Art Maker",
    skills: ["Make Image Song from AI", "Editing Video", "Make Storyline"]
  }
};

const skillCategories = {
  "Programming Languages": ["Python", "TypeScript"],
  "Frameworks": ["NextJS", "FastAPI"],
  "Platforms": ["Canva", "Figma", "PixAI", "VS Code", "Railway", "Vercel", "Webflow"]
};

const projects = [
  {
    name: "L-J",
    description: "Website untuk membuat laporan kerja",
    webLink: "https://laporankerja.vercel.app/",
    githubLink: "https://github.com/DimasGodim/L-J",
    tech: ["NextJS", "TypeScript"]
  },
  {
    name: "SSO",
    description: "Website API Collection",
    webLink: "https://sekai-set-on.vercel.app/",
    githubLink: {
      frontend: "https://github.com/DimasGodim/SSO-Sekai-Set-On-Frontend",
      backend: "https://github.com/DimasGodim/SSO-Sekai-Set-On-Backend"
    },
    tech: ["FastAPI", "NextJS", "Python"]
  }
];

const socialLinks = [
  { 
    name: "Github", 
    url: "https://github.com/DimasGodim", 
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    )
  },
  { 
    name: "YouTube", 
    url: "https://www.youtube.com/@Waifu-Set-On", 
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    )
  },
  { 
    name: "Pixiv", 
    url: "https://www.pixiv.net/en/users/112376257", 
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.935 0A4.924 4.924 0 0 0 0 4.935v14.13A4.924 4.924 0 0 0 4.935 24h14.13A4.924 4.924 0 0 0 19.065 0zm7.81 4.547c2.181 0 4.058.676 5.399 1.847a6.118 6.118 0 0 1 2.116 4.66c.005.717-.098 1.431-.305 2.116a6.068 6.068 0 0 1-2.116 3.004c-1.341 1.17-3.218 1.847-5.399 1.847H9.052v2.318c0 .49-.375.847-.847.847H6.118c-.49 0-.847-.375-.847-.847V6.118c0-.49.375-.847.847-.847h6.627zm-.305 2.328H9.052v5.399h3.388c1.7 0 2.328-.628 2.328-2.7s-.628-2.7-2.328-2.7z"/>
      </svg>
    )
  },
  { 
    name: "Email", 
    url: "mailto:dimas.ngadinegaran@gmail.com", 
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    )
  }
];

export default function Home() {
  const [activeProfile, setActiveProfile] = useState<'dimas' | 'kanrisha'>('dimas');
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!mounted) return null;

  const currentProfile = profiles[activeProfile];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, white 2px, transparent 0),
            radial-gradient(circle at 75% 75%, white 1px, transparent 0),
            linear-gradient(45deg, transparent 49%, rgba(255,255,255,0.03) 50%, transparent 51%),
            linear-gradient(-45deg, transparent 49%, rgba(255,255,255,0.02) 50%, transparent 51%)
          `,
          backgroundSize: '100px 100px, 60px 60px, 40px 40px, 40px 40px'
        }} />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-900/5 to-gray-800/10" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-4 md:p-8 flex justify-between items-center">
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xl md:text-3xl font-display font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent"
        >
          Portfolio
        </motion.h1>

        {/* Desktop buttons */}
        <div className="hidden sm:flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveProfile('dimas')}
            className={`px-6 py-3 rounded-xl border-2 transition-all duration-300 font-medium ${
              activeProfile === 'dimas'
                ? 'bg-white text-black border-white shadow-lg shadow-white/20'
                : 'bg-black/50 text-white border-gray-600 hover:border-gray-400 backdrop-blur-sm'
            }`}
          >
            Dimas
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveProfile('kanrisha')}
            className={`px-6 py-3 rounded-xl border-2 transition-all duration-300 font-medium ${
              activeProfile === 'kanrisha'
                ? 'bg-white text-black border-white shadow-lg shadow-white/20'
                : 'bg-black/50 text-white border-gray-600 hover:border-gray-400 backdrop-blur-sm'
            }`}
          >
            Kanrisha_G
          </motion.button>
        </div>

        {/* Mobile buttons - compact design */}
        <div className="flex sm:hidden gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveProfile('dimas')}
            className={`px-3 py-2 rounded-lg border-2 transition-all duration-300 font-medium text-sm ${
              activeProfile === 'dimas'
                ? 'bg-white text-black border-white shadow-md'
                : 'bg-black/50 text-white border-gray-600 backdrop-blur-sm'
            }`}
          >
            D
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveProfile('kanrisha')}
            className={`px-3 py-2 rounded-lg border-2 transition-all duration-300 font-medium text-sm ${
              activeProfile === 'kanrisha'
                ? 'bg-white text-black border-white shadow-md'
                : 'bg-black/50 text-white border-gray-600 backdrop-blur-sm'
            }`}
          >
            K
          </motion.button>
        </div>
      </nav>

      {/* Profile Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 md:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProfile}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-10"
            >
              <motion.h1
                className="text-6xl md:text-8xl lg:text-9xl font-display font-bold mb-6 leading-tight"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  {currentProfile.name}
                </span>
              </motion.h1>

              <motion.p
                className="text-xl md:text-3xl lg:text-4xl text-gray-300 italic mb-8 font-light tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <span className="text-gray-400">&ldquo;</span>
                {currentProfile.motto}
                <span className="text-gray-400">&ldquo;</span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-2xl md:text-4xl lg:text-5xl font-inter font-light tracking-wider"
              >
                <span className="bg-gradient-to-r from-gray-300 via-white to-gray-400 bg-clip-text text-transparent">
                  {currentProfile.role}
                </span>
              </motion.div>

              <motion.div
                className="flex flex-wrap justify-center gap-4 mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                {currentProfile.skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05, y: -3 }}
                    className="px-6 py-3 bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-gray-500 transition-all duration-300 font-mono text-sm tracking-wide shadow-lg"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-3 bg-white rounded-full mt-2"
              />
            </motion.div>
            <p className="text-xs text-gray-500 mt-2 font-mono">SCROLL</p>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative z-10 py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-display font-bold text-center mb-20"
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(skillCategories).map(([category, skills], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.2, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-gray-600 transition-all duration-300 shadow-xl"
              >
                <h3 className="text-2xl font-display font-semibold mb-6 text-white">{category}</h3>
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: categoryIndex * 0.2 + index * 0.1, duration: 0.4 }}
                      className="flex items-center space-x-3 group"
                    >
                      <motion.div
                        className="w-2 h-2 bg-white rounded-full group-hover:scale-150 transition-transform duration-200"
                        whileHover={{ scale: 1.5 }}
                      />
                      <span className="text-gray-300 font-mono text-sm group-hover:text-white transition-colors duration-200">
                        {skill}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-display font-bold text-center mb-20"
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-10">
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-gray-600 transition-all duration-300 group shadow-2xl"
              >
                <h3 className="text-3xl font-display font-bold mb-4 text-white group-hover:text-gray-200 transition-colors duration-300">
                  {project.name}
                </h3>
                <p className="text-gray-400 mb-6 text-lg leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-3 mb-6">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-3 py-2 bg-gray-800/80 backdrop-blur-sm rounded-lg text-sm text-gray-300 font-mono border border-gray-700">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="space-y-4">
                  {/* Live Demo Button - sama untuk semua */}
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.webLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-white text-black py-3 px-6 rounded-xl text-center font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg"
                  >
                    Live Demo
                  </motion.a>

                  {/* GitHub Links - berbeda tergantung tipe */}
                  {typeof project.githubLink === 'string' ? (
                    <motion.a
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full border-2 border-gray-600 text-white py-3 px-6 rounded-xl text-center font-semibold hover:border-gray-400 transition-all duration-300"
                    >
                      GitHub
                    </motion.a>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <motion.a
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.githubLink.frontend}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-2 border-gray-600 text-white py-3 px-4 rounded-xl text-center font-medium hover:border-gray-400 transition-all duration-300"
                      >
                        Frontend
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.githubLink.backend}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-2 border-gray-600 text-white py-3 px-4 rounded-xl text-center font-medium hover:border-gray-400 transition-all duration-300"
                      >
                        Backend
                      </motion.a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-24 px-4 md:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-display font-bold mb-8"
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Let&apos;s Connect
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 mb-16 font-light leading-relaxed"
          >
            Ready to bring your ideas to life? Let&apos;s collaborate and create something amazing together.
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-gray-500 transition-all duration-300 group shadow-xl"
              >
                <div className="text-white mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                  {link.icon}
                </div>
                <div className="text-white group-hover:text-gray-200 transition-colors duration-300 font-medium">
                  {link.name}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 md:px-8 border-t border-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-gray-400 font-light tracking-wide"
          >
            © 2025 Dimas Surya Frannanta. Crafted with passion and precision.
          </motion.p>
        </div>
      </footer>
    </div>
  );
}
