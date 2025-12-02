import { motion } from 'framer-motion';
import { FileText, Download, Eye, Briefcase, GraduationCap, Code, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const resumeHighlights = [
  {
    icon: Briefcase,
    title: 'Professional Experience',
    description: 'Full Stack Development internships and freelance projects',
  },
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'B.Tech in Computer Science Engineering',
  },
  {
    icon: Code,
    title: 'Technical Skills',
    description: 'React, Node.js, Python, TypeScript, MongoDB, PostgreSQL',
  },
  {
    icon: Award,
    title: 'Achievements',
    description: 'Multiple certifications and project completions',
  },
];

function Resume() {
  const handleDownload = () => {
    const resumeUrl = '/resume.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Raj_Suryavanshi_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = () => {
    window.open('/resume.pdf', '_blank');
  };

  return (
    <section
      id="resume"
      className="py-20 px-6"
      data-testid="section-resume"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">My</span> Resume
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Download my resume to learn more about my experience, skills, and qualifications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {resumeHighlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary/10 via-card/50 to-primary/5 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-primary/20 rounded-2xl">
                <FileText className="w-12 h-12 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Raj Suryavanshi
                </h3>
                <p className="text-muted-foreground">
                  Full Stack Developer | CSE Student
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Resume.pdf • Updated 2024
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleView}
                variant="outline"
                size="lg"
                className="gap-2 border-primary/50 hover:bg-primary/10"
              >
                <Eye className="w-5 h-5" />
                View Resume
              </Button>
              <Button
                onClick={handleDownload}
                size="lg"
                className="gap-2 bg-primary hover:bg-primary/90"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground text-sm mt-8"
        >
          Feel free to download my resume and reach out if you have any opportunities!
        </motion.p>
      </div>
    </section>
  );
}

export default Resume;
