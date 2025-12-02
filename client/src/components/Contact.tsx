import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, Linkedin, Github, Loader2, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm } from '@/lib/supabaseClient';

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 7385210293',
    href: 'tel:+917385210293',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'rajsuryanshi659@gmail.com',
    href: 'mailto:rajsuryanshi659@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'India',
    href: null,
  },
];

const socialLinks = [
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/raj-suryavanshi-158531254',
  },
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/raj659721',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all fields before submitting.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await submitContactForm(formData);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      toast({
        title: 'Message sent!',
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
    } catch (error: any) {
      console.error('Error submitting form:', error);
      const errorMessage = error?.code === '42P01' 
        ? 'Contact form is being set up. Please try again later or email directly.'
        : 'Failed to send message. Please try again later.';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32" data-testid="section-contact">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <p className="text-primary font-mono text-sm mb-2">Get in touch</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-contact-title">Contact Me</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div variants={itemVariants}>
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6">Send a Message</h3>

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                      <h4 className="text-lg font-semibold mb-2">Message Sent!</h4>
                      <p className="text-muted-foreground mb-4">
                        Thank you for reaching out. I'll get back to you soon.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => setIsSubmitted(false)}
                        data-testid="button-send-another"
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="bg-background/50"
                          data-testid="input-name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="bg-background/50"
                          data-testid="input-email"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Your message..."
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="bg-background/50 resize-none"
                          data-testid="input-message"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                        data-testid="button-submit-contact"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{info.label}</p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-foreground hover:text-primary transition-colors"
                            data-testid={`link-contact-${info.label.toLowerCase()}`}
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-foreground">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-6">Connect With Me</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
                      data-testid={`link-social-${social.label.toLowerCase()}`}
                    >
                      <social.icon className="h-6 w-6" />
                    </a>
                  ))}
                </div>
              </div>

              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">Open to Opportunities</h4>
                  <p className="text-sm text-muted-foreground">
                    I'm currently looking for internship and full-time opportunities in web development and software engineering. 
                    Feel free to reach out if you have any exciting opportunities!
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-border/50">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p data-testid="text-footer-copyright">
            &copy; {new Date().getFullYear()} Raj Suryavanshi. All rights reserved.
          </p>
          <p>Built with React, Three.js & Supabase</p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
