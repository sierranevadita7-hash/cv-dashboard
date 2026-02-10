import React, { useState, useEffect } from 'react';
import { cvData } from '../data/mock';
import { useLanguage } from '../context/LanguageContext';
import { getText, getTextArray } from '../utils/languageHelpers';
import { 
  Briefcase, Award, Code, Folder, Mail, Phone, MapPin, 
  Download, Calendar, TrendingUp, Users, Target,
  ChevronDown, ChevronUp, BarChart3, PieChart, LineChart, Languages
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import CareerTimeline from '../components/charts/CareerTimeline';
import SectorDistribution from '../components/charts/SectorDistribution';
import TechnologyChart from '../components/charts/TechnologyChart';
import ImpactMetrics from '../components/charts/ImpactMetrics';
import CertificationProgress from '../components/charts/CertificationProgress';

const Dashboard = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [expandedExp, setExpandedExp] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleExperience = (id) => {
    setExpandedExp(expandedExp === id ? null : id);
  };

  const getIcon = (iconName) => {
    const icons = {
      briefcase: Briefcase,
      folder: Folder,
      award: Award,
      code: Code
    };
    const Icon = icons[iconName] || Briefcase;
    return <Icon className="w-6 h-6" />;
  };

  const handleDownloadCV = () => {
    const fileName = language === 'en' 
      ? 'CV_Jose_Manuel_Ortega_English.pdf'
      : 'CV_Jose_Manuel_Ortega_Spanish.pdf';
    
    const link = document.createElement('a');
    link.href = `${process.env.PUBLIC_URL}/${fileName}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Get translated stats
  const getTranslatedStats = () => {
    return [
      { label: t.hero.stats.experience, value: "15+", icon: "briefcase" },
      { label: t.hero.stats.projects, value: "50+", icon: "folder" },
      { label: t.hero.stats.certifications, value: "5+", icon: "award" },
      { label: t.hero.stats.technologies, value: "20+", icon: "code" }
    ];
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-cyan-400">José Manuel Ortega</h1>
          <nav className="hidden md:flex gap-8 items-center">
            <button onClick={() => scrollToSection('about')} className="text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer">{t.nav.about}</button>
            <button onClick={() => scrollToSection('experience')} className="text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer">{t.nav.experience}</button>
            <button onClick={() => scrollToSection('skills')} className="text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer">{t.nav.skills}</button>
            <button onClick={() => scrollToSection('education')} className="text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer">{t.nav.education}</button>
            <button onClick={() => scrollToSection('contact')} className="text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer">{t.nav.contact}</button>
            
            {/* Language Toggle Button */}
            <Button 
              onClick={toggleLanguage}
              variant="outline"
              size="sm"
              className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
            >
              <Languages className="w-4 h-4 mr-2" />
              {language === 'en' ? 'ES' : 'EN'}
            </Button>
          </nav>
          <Button 
            onClick={handleDownloadCV}
            className="bg-cyan-600 hover:bg-cyan-700 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            {t.hero.downloadCV}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-4">
              <Badge className="bg-cyan-600/20 text-cyan-400 border-cyan-600/30 mb-4">
                {t.hero.available}
              </Badge>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-slate-100">
              {cvData.personal.name}
            </h1>
            <p className="text-2xl md:text-3xl text-cyan-400 font-light mb-6">
              {getText(cvData.personal.title, language)}
            </p>
            <p className="text-xl text-slate-400 max-w-3xl mb-12">
              {getText(cvData.personal.tagline, language)}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {getTranslatedStats().map((stat, index) => (
                <Card key={index} className="bg-slate-900/50 border-slate-800 hover:border-cyan-600/50 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="text-cyan-400 mb-3 flex justify-center">
                      {getIcon(stat.icon)}
                    </div>
                    <div className="text-3xl font-bold text-slate-100 mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-400">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-6 text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-cyan-400" />
                <span>{cvData.personal.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-cyan-400" />
                <span>{cvData.personal.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-cyan-400" />
                <span>{getText(cvData.personal.location, language)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-slate-100">{t.about.title}</h2>
          <Card className="bg-slate-900/50 border-slate-800 shadow-[0_8px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_24px_rgba(6,182,212,0.2)] transition-all">
            <CardContent className="p-8">
              <p className="text-lg text-slate-300 leading-relaxed">
                {getText(cvData.personal.summary, language)}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Career Analytics Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-slate-100 flex items-center gap-3">
            <BarChart3 className="w-10 h-10 text-cyan-400" />
            {t.analytics.title}
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Career Progression Timeline */}
            <Card className="bg-slate-900/50 border-slate-800 shadow-[0_8px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_24px_rgba(6,182,212,0.2)] transition-all">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-100 flex items-center gap-2">
                  <LineChart className="w-6 h-6 text-cyan-400" />
                  {t.analytics.careerProgression}
                </CardTitle>
                <CardDescription className="text-slate-400">
                  {t.analytics.careerProgressionDesc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CareerTimeline data={cvData.careerTimeline} language={language} />
              </CardContent>
            </Card>

            {/* Sector Distribution */}
            <Card className="bg-slate-900/50 border-slate-800 shadow-[0_8px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_24px_rgba(6,182,212,0.2)] transition-all">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-100 flex items-center gap-2">
                  <PieChart className="w-6 h-6 text-cyan-400" />
                  {t.analytics.sectorDistribution}
                </CardTitle>
                <CardDescription className="text-slate-400">
                  {t.analytics.sectorDistributionDesc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SectorDistribution data={cvData.sectorDistribution} language={language} />
              </CardContent>
            </Card>
          </div>

          {/* Technology Usage */}
          <Card className="bg-slate-900/50 border-slate-800 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-100 flex items-center gap-2">
                <Code className="w-6 h-6 text-cyan-400" />
                {t.analytics.technologyExperience}
              </CardTitle>
              <CardDescription className="text-slate-400">
                {t.analytics.technologyExperienceDesc}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TechnologyChart data={cvData.technologyUsage} language={language} />
            </CardContent>
          </Card>

          {/* Impact Metrics */}
          <Card className="bg-slate-900/50 border-slate-800 shadow-[0_8px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_24px_rgba(6,182,212,0.2)] transition-all">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-100 flex items-center gap-2">
                <Target className="w-6 h-6 text-cyan-400" />
                {t.analytics.impactMetrics}
              </CardTitle>
              <CardDescription className="text-slate-400">
                {t.analytics.impactMetricsDesc}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImpactMetrics data={cvData.impactMetrics} language={language} />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-slate-100">{t.experience.title}</h2>
          <div className="space-y-6">
            {cvData.experience.map((exp, index) => (
              <Card 
                key={exp.id} 
                className="bg-slate-900/50 border-slate-800 hover:border-cyan-600/50 transition-all duration-300"
              >
                <CardHeader 
                  className="cursor-pointer"
                  onClick={() => toggleExperience(exp.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-5 h-5 text-cyan-400" />
                        <span className="text-sm text-slate-400">{getText(exp.period, language)}</span>
                      </div>
                      <CardTitle className="text-2xl text-slate-100 mb-2">{getText(exp.position, language)}</CardTitle>
                      <CardDescription className="text-lg text-cyan-400">{getText(exp.company, language)}</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" className="text-slate-400">
                      {expandedExp === exp.id ? <ChevronUp /> : <ChevronDown />}
                    </Button>
                  </div>
                </CardHeader>
                
                {expandedExp === exp.id && (
                  <CardContent className="pt-0">
                    <Separator className="mb-6 bg-slate-800" />
                    <p className="text-slate-300 mb-6">{getText(exp.description, language)}</p>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-slate-400 mb-3 flex items-center gap-2">
                        <Code className="w-4 h-4" />
                        {t.experience.technologies}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {getTextArray(exp.technologies, language).map((tech, i) => (
                          <Badge key={i} variant="outline" className="bg-slate-800/50 text-slate-300 border-slate-700">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-slate-400 mb-3 flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        {t.experience.achievements}
                      </h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="text-slate-300 flex items-start gap-2">
                            <TrendingUp className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                            <span>{getText(achievement, language)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-slate-100">{t.skills.title}</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Technical Skills */}
            <Card className="bg-slate-900/50 border-slate-800 shadow-[0_8px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_24px_rgba(6,182,212,0.2)] transition-all">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-100 flex items-center gap-2">
                  <Code className="w-6 h-6 text-cyan-400" />
                  {t.skills.technical}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {cvData.skills.technical.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-300 font-medium">{skill.name}</span>
                      <span className="text-slate-400">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2 bg-slate-800" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Business Skills */}
            <Card className="bg-slate-900/50 border-slate-800 shadow-[0_8px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_24px_rgba(6,182,212,0.2)] transition-all">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-100 flex items-center gap-2">
                  <Users className="w-6 h-6 text-cyan-400" />
                  {t.skills.business}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {cvData.skills.business.map((skill, index) => (
                    <Badge 
                      key={index} 
                      className="bg-cyan-600/20 text-cyan-300 border-cyan-600/30 px-4 py-2 text-sm"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tools */}
          <Card className="bg-slate-900/50 border-slate-800 shadow-[0_8px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_24px_rgba(6,182,212,0.2)] transition-all">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-100">{t.skills.tools}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {cvData.skills.tools.map((tool, index) => (
                  <Badge 
                    key={index} 
                    variant="outline"
                    className="bg-slate-800/50 text-slate-300 border-slate-700 px-4 py-2"
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-slate-100">{t.education.title}</h2>
          
          {/* Certification Progress Chart */}
          <Card className="bg-slate-900/50 border-slate-800 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-100 flex items-center gap-2">
                <Award className="w-6 h-6 text-emerald-400" />
                {t.education.certificationProgress}
              </CardTitle>
              <CardDescription className="text-slate-400">
                {t.education.certificationProgressDesc}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CertificationProgress data={cvData.certificationTimeline} language={language} />
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {cvData.education.map((edu, index) => (
              <Card 
                key={index} 
                className={`bg-slate-900/50 border-slate-800 hover:border-cyan-600/50 transition-all duration-300 ${
                  edu.certified ? 'ring-2 ring-cyan-600/30' : ''
                }`}
              >
                <CardContent className="p-6">
                  {edu.certified && (
                    <Badge className="bg-emerald-600/20 text-emerald-400 border-emerald-600/30 mb-3">
                      <Award className="w-3 h-3 mr-1" />
                      {t.education.certified}
                    </Badge>
                  )}
                  <div className="text-sm text-cyan-400 mb-2">{edu.year}</div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-1">{edu.degree}</h3>
                  <p className="text-slate-400">{edu.institution}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-slate-100">{t.languages.title}</h2>
          <div className="flex gap-6">
            {cvData.languages.map((lang, index) => (
              <Card key={index} className="bg-slate-900/50 border-slate-800 shadow-[0_8px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_24px_rgba(6,182,212,0.2)] transition-all">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-100 mb-1">{getText(lang.name, language)}</h3>
                  <p className="text-cyan-400">
                    {lang.level === 'Native' ? t.languages.native : t.languages.professional}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-slate-100">{t.contact.title}</h2>
          <p className="text-xl text-slate-400 mb-8">
            {t.contact.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg"
              className="bg-cyan-600 hover:bg-cyan-700 text-white"
              onClick={() => window.location.href = `mailto:${cvData.personal.email}`}
            >
              <Mail className="w-5 h-5 mr-2" />
              {t.contact.emailMe}
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
              onClick={handleDownloadCV}
            >
              <Download className="w-5 h-5 mr-2" />
              {t.contact.downloadCV}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center text-slate-400">
          <p>© 2026 {cvData.personal.name}. {t.footer.rights}</p>
          <p className="text-sm mt-2">{t.footer.subtitle}</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
