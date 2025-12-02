import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const experiences = [
  {
    id: 1,
    title: 'Web Development Intern',
    company: 'Sumago Infotech',
    location: 'India',
    duration: 'Jun - Aug 2025',
    description: [
      'Built functional modules using HTML, CSS, and JavaScript',
      'Learned real-world SDLC workflows and debugging techniques',
      'Completed tasks under mentor guidance with focus on code quality',
      'Collaborated with team members on various web development projects',
    ],
    skills: ['HTML', 'CSS', 'JavaScript', 'SDLC'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

function Experience() {
  return (
    <section id="experience" className="py-20 md:py-32 bg-card/30" data-testid="section-experience">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <p className="text-primary font-mono text-sm mb-2">My journey</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-experience-title">Experience</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  variants={itemVariants}
                  className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 z-10" />

                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : ''} pl-8 md:pl-0`}>
                    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                      <CardContent className="p-6">
                        <div className={`flex items-center gap-2 mb-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                          <Briefcase className="h-4 w-4 text-primary" />
                          <h3 className="text-lg font-semibold" data-testid={`text-experience-title-${exp.id}`}>
                            {exp.title}
                          </h3>
                        </div>

                        <h4 className="text-primary font-medium mb-3" data-testid={`text-experience-company-${exp.id}`}>
                          {exp.company}
                        </h4>

                        <div className={`flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4 ${
                          index % 2 === 0 ? 'md:justify-end' : ''
                        }`}>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {exp.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {exp.location}
                          </span>
                        </div>

                        <ul className={`space-y-2 mb-4 ${index % 2 === 0 ? 'md:text-left' : ''}`}>
                          {exp.description.map((item, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary mt-1.5 min-w-1.5 h-1.5 rounded-full bg-primary" />
                              {item}
                            </li>
                          ))}
                        </ul>

                        <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                          {exp.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Experience;
