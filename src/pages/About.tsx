import { Linkedin, Instagram, Mail, Phone, MapPin, Send, Shield, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";

const About = () => (
  <Layout>
    <section className="gradient-navy py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground">About BBS</h1>
        <p className="mx-auto max-w-2xl text-lg text-primary-foreground/70">
          Benefit Business Solutions Pvt Ltd is a managed recruitment platform that connects professionals with the right opportunities — anonymously and without bias.
        </p>
      </div>
    </section>

    <div className="container mx-auto px-4 py-12 space-y-16">
      {/* Mission & Values */}
      <section className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 font-display text-2xl font-bold text-foreground">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            At BBS, we believe hiring should be about skills and potential — not brand names. We act as the bridge between candidates and hiring partners, managing the entire process so both sides can focus on what matters.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Our platform ensures complete anonymity for candidates, eliminating bias and creating a level playing field for all professionals regardless of their background.
          </p>
        </div>
        <div>
          <h2 className="mb-4 font-display text-2xl font-bold text-foreground">Our Values</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "Anonymity First", desc: "Candidates are evaluated on merit, not brand recognition.", icon: Shield },
              { title: "Platform Trust", desc: "We verify backgrounds and manage every touchpoint.", icon: Target },
              { title: "People Centric", desc: "Every decision is made with candidates' best interests in mind.", icon: Users },
              { title: "Transparency", desc: "Clear status updates at every stage of the hiring journey.", icon: Mail },
            ].map((v) => (
              <Card key={v.title}>
                <CardContent className="p-4">
                  <v.icon className="mb-2 h-5 w-5 text-accent" />
                  <h3 className="font-sans text-sm font-semibold text-foreground">{v.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 font-display text-2xl font-bold text-foreground">Get in Touch</h2>
          <p className="mb-6 text-muted-foreground">Have questions or want to partner with us? We'd love to hear from you.</p>
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
              <a href="https://in.linkedin.com/company/benefit-business-solutions-pvt-ltd" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/bbs_pvt.ltd/" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
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
                <Label htmlFor="contactEmail">Email</Label>
                <Input id="contactEmail" type="email" placeholder="you@example.com" />
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

export default About;
