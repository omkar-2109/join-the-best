import { Linkedin, Instagram, Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";

const teamMembers = [
  { name: "Rajesh Kumar", role: "Founder & CEO", avatar: "RK" },
  { name: "Ananya Singh", role: "Head of Operations", avatar: "AS" },
  { name: "Vikram Patel", role: "Director of Recruitment", avatar: "VP" },
  { name: "Meera Reddy", role: "Head of Technology", avatar: "MR" },
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-navy py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground">About BBS</h1>
          <p className="mx-auto max-w-2xl text-lg text-primary-foreground/70">
            Benefit Business Solutions Pvt Ltd is a leading recruitment firm dedicated to connecting world-class talent with transformative opportunities across the globe.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Mission & Values */}
        <section className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-foreground">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              At BBS, we believe that the right talent in the right role can transform organizations and change lives. Our mission is to bridge the gap between exceptional professionals and forward-thinking companies, creating value for businesses and meaningful careers for individuals.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Founded with a vision to revolutionize recruitment in the modern economy, we leverage technology, industry expertise, and a deep understanding of human potential to deliver results that matter.
            </p>
          </div>
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-foreground">Our Values</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Excellence", desc: "We set the highest standards in everything we do." },
                { title: "Integrity", desc: "Transparent, honest, and ethical in all interactions." },
                { title: "Innovation", desc: "Embracing technology to solve recruitment challenges." },
                { title: "People First", desc: "Putting candidates and clients at the center." },
              ].map((v) => (
                <Card key={v.title}>
                  <CardContent className="p-4">
                    <h3 className="font-sans text-sm font-semibold text-foreground">{v.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{v.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="mb-8 text-center font-display text-2xl font-bold text-foreground">Our Leadership</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <Card key={member.name} className="text-center">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                    {member.avatar}
                  </div>
                  <h3 className="font-sans font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-foreground">Get in Touch</h2>
            <p className="mb-6 text-muted-foreground">
              Have questions or want to partner with us? We'd love to hear from you.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-5 w-5 text-primary" />
                <span>contact@benefitbusiness.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-5 w-5 text-primary" />
                <span>+91 (xxx) xxx-xxxx</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <span>India</span>
              </div>
              <div className="flex gap-3">
                <a
                  href="https://in.linkedin.com/company/benefit-business-solutions-pvt-ltd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/bbs_pvt.ltd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <Card className="shadow-premium">
            <CardHeader>
              <CardTitle className="font-display text-lg">Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="How can we help?" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Tell us more..." rows={4} />
              </div>
              <Button className="w-full bg-primary text-primary-foreground">
                <Send className="mr-2 h-4 w-4" /> Send Message
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  );
};

export default About;
