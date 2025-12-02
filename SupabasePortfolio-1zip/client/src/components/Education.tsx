import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const education = [
  {
    id: 1,
    degree: 'B.Tech in Computer Science & Engineering',
    institution: 'Godavari College of Engineering',
    location: 'India',
    duration: '2024 - Present',
    description: 'Currently pursuing Bachelor of Technology in Computer Science and Engineering with focus on software development and modern technologies.',
  },
  {
    id: 2,
    degree: 'Diploma in Computer Science & Engineering',
    institution: 'KBH Polytechnic, Malegaon',
    location: 'India',
    duration: '2021 - 2024',
    description: 'Completed Diploma in Computer Science and Engineering, building a strong foundation in programming, databases, and computer systems.',
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
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

function Education() {
  return (
    <section id="education" className="py-20 md:py-32 bg-card/30" data-testid="section-education">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <p className="text-primary font-mono text-sm mb-2">My academic background</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-education-title">Education</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-8">
            {education.map((edu, index) => (
              <motion.div key={edu.id} variants={itemVariants}>
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 relative overflow-visible" data-testid={`card-education-${edu.id}`}>
                  <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <GraduationCap className="h-3.5 w-3.5 text-primary-foreground" />
                  </div>
                  
                  {index < education.length - 1 && (
                    <div className="absolute -left-0.5 top-12 bottom-0 w-px bg-border translate-y-full h-8" />
                  )}

                  <CardContent className="p-6 pl-8">
                    <h3 className="text-lg font-semibold mb-1" data-testid={`text-education-degree-${edu.id}`}>
                      {edu.degree}
                    </h3>
                    <h4 className="text-primary font-medium mb-3" data-testid={`text-education-institution-${edu.id}`}>
                      {edu.institution}
                    </h4>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {edu.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {edu.location}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {edu.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Education;
