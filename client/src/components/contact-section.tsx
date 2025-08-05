import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const socialLinks: SocialLink[] = [
    { name: "LinkedIn", icon: "fab fa-linkedin", url: "https://www.linkedin.com/in/amarnath-s-s/" },
    { name: "GitHub", icon: "fab fa-github", url: "https://github.com/Amarnathss" },
    { name: "LeetCode", icon: "fas fa-code", url: "https://leetcode.com/amarnathss/" },
    { name: "X (Twitter)", icon: "fab fa-twitter", url: "https://twitter.com/amarnathss" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create FormData for Netlify Forms
      const netlifyFormData = new FormData();
      netlifyFormData.append('form-name', 'contact');
      netlifyFormData.append('name', formData.name);
      netlifyFormData.append('email', formData.email);
      netlifyFormData.append('subject', formData.subject);
      netlifyFormData.append('message', formData.message);

      // Send to Netlify Forms
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(netlifyFormData as any).toString(),
      });

      if (response.ok) {
        // Success message
        toast({
          title: "Message Sent!",
          description: "Thank you for your message. I'll get back to you soon! 📱",
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="py-20 pt-24">
      <div className="container mx-auto px-4">
        <h2 className="font-chalk text-3xl md:text-4xl lg:text-5xl font-bold chalk-text chalk-glow text-center mb-12">
          <span className="chalk-underline">Get In Touch</span>
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="chalk-box p-6 md:p-8">
            <h3 className="font-chalk text-2xl md:text-3xl chalk-text text-chalk-accent mb-8">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <i className="fas fa-phone text-chalk-accent text-xl mr-4"></i>
                <div>
                  <p className="font-chalk-body chalk-text text-lg">+91-9731103004</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <i className="fas fa-envelope text-chalk-accent text-xl mr-4"></i>
                <div>
                  <p className="font-chalk-body chalk-text text-lg">amarnathss306@gmail.com</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="font-chalk text-xl chalk-text text-chalk-accent mb-6">Connect With Me</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {socialLinks.map((link) => (
                  <a 
                    key={link.name}
                    href={link.url}
                    className="chalk-box p-4 text-center chalk-hover hover:bg-chalk hover:text-black transition-all duration-300"
                  >
                    <i className={`${link.icon} text-2xl chalk-text`}></i>
                    <p className="font-chalk-body text-sm chalk-text mt-2">{link.name}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="chalk-box p-6 md:p-8">
            <h3 className="font-chalk text-2xl md:text-3xl chalk-text text-chalk-accent mb-8">Send a Message</h3>
            
            <form 
              onSubmit={handleSubmit} 
              className="space-y-6"
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
            >
              {/* Hidden field for Netlify Forms */}
              <input type="hidden" name="form-name" value="contact" />
              
              {/* Honeypot field for spam protection */}
              <div style={{ display: 'none' }}>
                <label>
                  Don't fill this out if you're human: <input name="bot-field" />
                </label>
              </div>
              <div>
                <label className="block font-chalk-body chalk-text text-lg mb-2" htmlFor="name">
                  Name
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                  className="w-full p-3 chalk-input chalk-text font-chalk-body focus:border-chalk-accent focus:outline-none transition-colors duration-300"
                />
              </div>
              
              <div>
                <label className="block font-chalk-body chalk-text text-lg mb-2" htmlFor="email">
                  Email
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                  className="w-full p-3 chalk-input chalk-text font-chalk-body focus:border-chalk-accent focus:outline-none transition-colors duration-300"
                />
              </div>
              
              <div>
                <label className="block font-chalk-body chalk-text text-lg mb-2" htmlFor="subject">
                  Subject
                </label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleInputChange}
                  required 
                  className="w-full p-3 chalk-input chalk-text font-chalk-body focus:border-chalk-accent focus:outline-none transition-colors duration-300"
                />
              </div>
              
              <div>
                <label className="block font-chalk-body chalk-text text-lg mb-2" htmlFor="message">
                  Message
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  value={formData.message}
                  onChange={handleInputChange}
                  required 
                  className="w-full p-3 chalk-input chalk-text font-chalk-body focus:border-chalk-accent focus:outline-none transition-colors duration-300 resize-none"
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full chalk-box py-3 chalk-text font-chalk-body text-lg font-semibold hover:bg-chalk hover:text-black transition-all duration-300 chalk-hover"
              >
                <i className="fas fa-paper-plane mr-2"></i>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}