import { Link } from "react-router-dom";
import { MapPin, Users, ArrowRight, Building } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { sampleCompanies } from "@/data/sampleData";

const Companies = () => {
  return (
    <Layout>
      <section className="gradient-navy py-10">
        <div className="container mx-auto px-4">
          <h1 className="mb-2 font-display text-3xl font-bold text-primary-foreground">Top Companies Hiring</h1>
          <p className="text-primary-foreground/70">Discover great places to work</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search companies..." className="pl-10" />
          </div>
          <Button className="bg-primary text-primary-foreground">Search</Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sampleCompanies.map((company) => (
            <Card key={company.id} className="group transition-all hover:shadow-premium">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                    {company.logo}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-sans text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                      {company.name}
                    </h3>
                    <Badge variant="secondary" className="mt-1 text-xs">{company.industry}</Badge>
                  </div>
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{company.about}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {company.location}</span>
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {company.size}</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-medium text-accent">{company.openPositions} open positions</span>
                  <Button variant="ghost" size="sm" className="h-7 text-xs text-primary" asChild>
                    <Link to={`/company/${company.id}`}>
                      View <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Companies;
