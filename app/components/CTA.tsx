'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  CheckCircle2, 
  ChevronRight, 
  Phone,
  ArrowRight,
  Building,
  GraduationCap,
  Landmark,
  Settings,
  Zap,
  Clock,
  Award,
  Globe,
  Lock,
  TrendingUp,
  FileText,
  Mail,
  MessageCircle,
  Users,
  Shield,
  Server,
  Network,
  Cloud,
  Wrench,
  Headphones,
  Target,
  Layers,
  BarChart,
  PlayCircle,
  Download,
  Check,
  Star,
  Sparkles,
  X,
  Loader2
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Button } from '@/app/components/ui/button';
import toast from "react-hot-toast";

// ========================================
// FORM CONSTANTS
// ========================================
const employeeRanges = [
  { value: "1-10", label: "1-10" },
  { value: "11-50", label: "11-50" },
  { value: "51-200", label: "51-200" },
  { value: "201-500", label: "201-500" },
  { value: "501-1000", label: "501-1000" },
  { value: "1000+", label: "1000+" },
];

const industries = [
  "Agriculture", "Automotive", "Banking", "Chemical", "Consulting", "Education", 
  "Financial Services", "Health Care", "Manufacturing", "Real Estate", 
  "Retail & Wholesale", "Software", "Technology", "Logistics & Warehousing", "Other"
].map((ind) => ({ value: ind, label: ind }));

const statesAndCities: { [key: string]: string[] } = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur"],
  "Delhi": ["New Delhi", "South Delhi", "North Delhi"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Vapi"],
  "Karnataka": ["Bengaluru", "Mysuru", "Hubli"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  "Telangana": ["Hyderabad", "Warangal"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Noida", "Ghaziabad"],
  "West Bengal": ["Kolkata", "Howrah"],
};
const statesList = Object.keys(statesAndCities).sort();

// ========================================
// ENQUIRY MODAL COMPONENT
// ========================================
const EnquiryModal = ({ isOpen, onClose, pageContext }: { isOpen: boolean; onClose: () => void; pageContext: string }) => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const initialFormState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    industry: '',
    noOfEmployees: '',
    state: '',
    city: '',
    message: ''
  }
  
  const [formData, setFormData] = useState(initialFormState)
  const [showCustomState, setShowCustomState] = useState(false);
  const [showCustomCity, setShowCustomCity] = useState(false);
  const [customState, setCustomState] = useState("");
  const [customCity, setCustomCity] = useState("");
  const [availableCities, setAvailableCities] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  useEffect(() => {
    if (formData.state && formData.state !== "other" && statesAndCities[formData.state]) {
      setAvailableCities(statesAndCities[formData.state]);
      setShowCustomCity(false);
      setFormData(prev => ({ ...prev, city: "" }));
    } else if (formData.state === "other") {
      setAvailableCities([]);
      setShowCustomCity(true);
    } else {
      setAvailableCities([]);
    }
  }, [formData.state]);

  const handleStateChange = (value: string) => {
    if (value === "other") {
      setShowCustomState(true);
      setFormData(prev => ({ ...prev, state: "other", city: "" }));
    } else {
      setShowCustomState(false);
      setCustomState("");
      setFormData(prev => ({ ...prev, state: value, city: "" }));
    }
  };

  const handleCityChange = (value: string) => {
    if (value === "other") {
      setShowCustomCity(true);
      setFormData(prev => ({ ...prev, city: "other" }));
    } else {
      setShowCustomCity(false);
      setCustomCity("");
      setFormData(prev => ({ ...prev, city: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.firstName || !formData.email) {
      toast.error("Name and Email are required")
      return
    }

    setLoading(true)

    const finalFormData = {
        ...formData,
        state: showCustomState ? customState : formData.state,
        city: showCustomCity ? customCity : formData.city,
        source: pageContext,
        servicePage: pageContext
    };

    try {
      const response = await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalFormData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true)
        toast.success("Inquiry Sent Successfully!")
        setTimeout(() => {
            onClose()
            setSuccess(false)
            setFormData(initialFormState)
            setShowCustomState(false)
            setShowCustomCity(false)
            setCustomState("")
            setCustomCity("")
        }, 2500)
      } else {
        toast.error(data.error || "Submission failed.")
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl bg-background border rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="absolute right-4 top-4 z-10">
               <button 
                 onClick={onClose} 
                 className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
               >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar">
              {success ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                  <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold">Thank You!</h3>
                  <p className="text-muted-foreground">
                    We have received your inquiry regarding <br/>
                    <span className="font-semibold text-primary">{pageContext}</span>.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6 pr-8">
                    <h3 className="text-2xl font-bold font-headline">Get a Quote</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Service: <span className="text-primary font-semibold">{pageContext}</span>
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Personal Info */}
                    <div>
                        <h4 className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-wider border-b pb-1">Personal Details</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name *</Label>
                                <Input 
                                    id="firstName" 
                                    placeholder="First Name" 
                                    value={formData.firstName}
                                    onChange={(e) => setFormData(prev => ({...prev, firstName: e.target.value}))}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input 
                                    id="lastName" 
                                    placeholder="Last Name" 
                                    value={formData.lastName}
                                    onChange={(e) => setFormData(prev => ({...prev, lastName: e.target.value}))}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-wider border-b pb-1">Contact Info</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email *</Label>
                                <Input 
                                    id="email" 
                                    type="email" 
                                    placeholder="work@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input 
                                    id="phone" 
                                    type="tel" 
                                    placeholder="+91..."
                                    value={formData.phone}
                                    onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                                />
                            </div>
                            <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="website">Website (Optional)</Label>
                                <Input 
                                    id="website" 
                                    type="url"
                                    placeholder="https://yourcompany.com"
                                    value={formData.website}
                                    onChange={(e) => setFormData(prev => ({...prev, website: e.target.value}))}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Organization Info */}
                    <div>
                        <h4 className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-wider border-b pb-1">Organization & Location</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                             <div className="space-y-2">
                                <Label htmlFor="company">Organization Name</Label>
                                <Input 
                                    id="company" 
                                    placeholder="Company Name"
                                    value={formData.company}
                                    onChange={(e) => setFormData(prev => ({...prev, company: e.target.value}))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="industry">Industry</Label>
                                <select
                                    id="industry"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    value={formData.industry}
                                    onChange={(e) => setFormData(prev => ({...prev, industry: e.target.value}))}
                                >
                                    <option value="">Select Industry</option>
                                    {industries.map((ind) => (
                                        <option key={ind.value} value={ind.value}>{ind.label}</option>
                                    ))}
                                </select>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="employees">No. of Employees</Label>
                                <select
                                    id="employees"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    value={formData.noOfEmployees}
                                    onChange={(e) => setFormData(prev => ({...prev, noOfEmployees: e.target.value}))}
                                >
                                    <option value="">Select Range</option>
                                    {employeeRanges.map((range) => (
                                        <option key={range.value} value={range.value}>{range.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* State/City */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label htmlFor="state">State</Label>
                                <select
                                    id="state"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    value={showCustomState ? "other" : formData.state}
                                    onChange={(e) => handleStateChange(e.target.value)}
                                >
                                    <option value="">Select State</option>
                                    {statesList.map((state) => (
                                        <option key={state} value={state}>{state}</option>
                                    ))}
                                    <option value="other">➕ Other</option>
                                </select>
                                {showCustomState && (
                                    <Input 
                                        placeholder="Enter State" 
                                        className="mt-2"
                                        value={customState}
                                        onChange={(e) => setCustomState(e.target.value)}
                                    />
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <select
                                    id="city"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    value={showCustomCity && !showCustomState ? "other" : formData.city}
                                    onChange={(e) => handleCityChange(e.target.value)}
                                    disabled={!formData.state && !showCustomState}
                                >
                                    <option value="">
                                        {!formData.state && !showCustomState ? "Select State First" : showCustomState ? "Enter City Below" : "Select City"}
                                    </option>
                                    {!showCustomState && availableCities.map((city) => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                    {!showCustomState && formData.state && (
                                        <option value="other">➕ Other</option>
                                    )}
                                </select>
                                {(showCustomCity || showCustomState) && (
                                    <Input 
                                        placeholder="Enter City" 
                                        className="mt-2"
                                        value={customCity}
                                        onChange={(e) => setCustomCity(e.target.value)}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <Button disabled={loading} type="submit" className="w-full btn-primary-custom h-12 text-base mt-4">
                      {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : 'Submit Request'}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

// ========================================
// SERVICES DATABASE
// ========================================
const allServicesData: { [key: string]: any } = {
  'it-consulting': {
    title: "IT Infrastructure Consulting",
    subtitle: "Strategic Technology Advisory Services",
    tagline: "Transform your IT from a cost center to a strategic business enabler.",
    description: "Our expert IT consultants work closely with your organization to assess, design, and optimize your technology infrastructure. We provide strategic guidance that aligns IT investments with business objectives, ensuring you get maximum value from your technology spending while building a scalable foundation for future growth.",
    extendedDescription: "With deep expertise in enterprise IT and partnerships with leading vendors like Dell, Cisco, and Microsoft, we deliver vendor-neutral consulting that puts your business needs first.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1920&auto=format&fit=crop",
    
    serviceFeatures: [
      { name: "Infrastructure Assessment", icon: <BarChart />, desc: "Complete audit of your IT environment" },
      { name: "Technology Roadmap", icon: <Target />, desc: "3-5 year strategic planning" },
      { name: "Digital Transformation", icon: <Zap />, desc: "Modernization strategies" },
      { name: "Vendor Management", icon: <Users />, desc: "Optimization & negotiations" },
      { name: "Budget Planning", icon: <TrendingUp />, desc: "IT investment optimization" },
      { name: "Compliance Advisory", icon: <Shield />, desc: "Regulatory compliance guidance" },
    ],

    keyBenefits: [
      { text: "Reduce IT costs by 30-40% through optimization and strategic sourcing", icon: <TrendingUp /> },
      { text: "Align technology investments with business objectives for maximum ROI", icon: <Target /> },
      { text: "Minimize risks with expert guidance on technology decisions", icon: <Shield /> },
      { text: "Accelerate digital transformation with proven methodologies", icon: <Zap /> },
    ],

    methodology: [
      { phase: "Discovery & Assessment", duration: "1-2 weeks", activities: ["Current state analysis", "Stakeholder interviews", "Infrastructure audit"] },
      { phase: "Strategy Development", duration: "2-3 weeks", activities: ["Future state design", "Technology roadmap creation", "Budget planning"] },
      { phase: "Implementation Planning", duration: "1-2 weeks", activities: ["Project planning", "Resource allocation", "Timeline development"] },
      { phase: "Execution Support", duration: "Ongoing", activities: ["Project oversight", "Vendor coordination", "Quality assurance"] }
    ],

    deliverables: [
      "Comprehensive IT assessment report",
      "3-5 year technology roadmap",
      "Infrastructure architecture designs",
      "Vendor evaluation and recommendations",
    ],

    industries: [
      { name: "Corporates", icon: <Building />, focus: "Enterprise architecture, digital workplace, cloud strategy" },
      { name: "Education", icon: <GraduationCap />, focus: "E-learning infrastructure, campus networks" },
      { name: "Government", icon: <Landmark />, focus: "Compliance, security, citizen services digitization" },
      { name: "Data Centers", icon: <Server />, focus: "Capacity planning, optimization, migration strategies" },
    ],

    process: [
      { step: 1, title: "Initial Consultation", description: "Free consultation to understand your challenges and objectives" },
      { step: 2, title: "Engagement Planning", description: "Define scope, timeline, and deliverables" },
      { step: 3, title: "Assessment & Analysis", description: "Comprehensive review of your IT environment" },
      { step: 4, title: "Strategy Development", description: "Create customized recommendations" },
      { step: 5, title: "Presentation & Approval", description: "Present findings to stakeholders" },
      { step: 6, title: "Implementation Support", description: "Ongoing guidance during implementation" },
    ],

    faqs: [
      { question: "What is the typical duration of a consulting engagement?", answer: "Most engagements range from 4-12 weeks, depending on scope and complexity." },
      { question: "Do you provide implementation services?", answer: "Yes! We offer both consulting and implementation services." },
    ],

    pricing: "Custom pricing based on engagement scope",
    certifications: ["ISO 9001:2015", "CMMI Level 3", "PMP Certified Consultants"],
  },

  'enterprise-networking': {
    title: "Enterprise Networking Solutions",
    subtitle: "High-Performance Network Infrastructure",
    tagline: "Build a network that powers your business at the speed of innovation.",
    description: "We design, implement, and manage enterprise-grade network infrastructure that delivers reliable, secure, and high-speed connectivity.",
    extendedDescription: "Modern businesses require networks that are not just fast and reliable, but also secure, flexible, and intelligent.",
    image: "/network.webp",
    
    serviceFeatures: [
      { name: "Network Design & Architecture", icon: <Network />, desc: "Custom network topology planning" },
      { name: "LAN/WAN Implementation", icon: <Globe />, desc: "Local and wide area networks" },
      { name: "Wireless Infrastructure", icon: <Zap />, desc: "Enterprise WiFi 6/6E deployment" },
      { name: "Network Security", icon: <Shield />, desc: "Segmentation and access control" },
    ],

    keyBenefits: [
      { text: "Achieve 99.99% network uptime with redundant architecture", icon: <Award /> },
      { text: "Increase productivity with high-speed connectivity", icon: <TrendingUp /> },
    ],

    methodology: [
      { phase: "Network Assessment", duration: "1 week", activities: ["Current network analysis", "Performance baseline"] },
      { phase: "Design & Architecture", duration: "2 weeks", activities: ["Topology design", "VLAN planning"] },
    ],

    deliverables: ["Network design documentation", "Implementation project plan"],

    industries: [
      { name: "Corporate Offices", icon: <Building />, focus: "High-density switching, WiFi" },
      { name: "Educational Campuses", icon: <GraduationCap />, focus: "Campus-wide WiFi, BYOD support" },
    ],

    process: [
      { step: 1, title: "Requirements Gathering", description: "Understand your business needs" },
      { step: 2, title: "Network Assessment", description: "Analyze current infrastructure" },
      { step: 3, title: "Solution Design", description: "Create detailed network architecture" },
      { step: 4, title: "Hardware Procurement", description: "Source equipment from authorized partners" },
      { step: 5, title: "Professional Installation", description: "Deploy network infrastructure" },
      { step: 6, title: "Testing & Handover", description: "Comprehensive testing and documentation" },
    ],

    faqs: [
      { question: "How long does implementation take?", answer: "Small networks take 1-2 weeks, large deployments 2-3 months." },
    ],

    pricing: "Custom pricing based on engagement scope",
    certifications: ["Cisco Premier Partner", "Dell Gold Partner"],
  },

  'cloud-migration': {
    title: "Cloud Services & Migration",
    subtitle: "Seamless Cloud Transformation",
    tagline: "Accelerate innovation and agility with cloud-first infrastructure.",
    description: "We help organizations embrace the cloud with confidence through strategic planning and seamless migration.",
    extendedDescription: "Cloud adoption is essential for business agility, scalability, and innovation.",
    image: "/hero2.webp",
    
    serviceFeatures: [
      { name: "Cloud Strategy & Planning", icon: <Target />, desc: "Roadmap for cloud adoption" },
      { name: "Migration Services", icon: <Cloud />, desc: "Seamless workload migration" },
      { name: "Hybrid Cloud Solutions", icon: <Layers />, desc: "On-premise and cloud integration" },
      { name: "Cloud Security", icon: <Shield />, desc: "Zero-trust security models" },
    ],

    keyBenefits: [
      { text: "Reduce infrastructure costs by up to 50%", icon: <TrendingUp /> },
      { text: "Scale resources instantly", icon: <Zap /> },
    ],

    methodology: [
      { phase: "Cloud Readiness Assessment", duration: "1-2 weeks", activities: ["Application portfolio analysis", "Dependency mapping"] },
      { phase: "Migration Planning", duration: "2-3 weeks", activities: ["Migration strategy", "Prioritization matrix"] },
    ],

    deliverables: ["Cloud readiness assessment report", "Migration strategy and roadmap"],

    industries: [
      { name: "Enterprises", icon: <Building />, focus: "SAP on cloud, enterprise applications" },
      { name: "Startups & SMEs", icon: <Zap />, focus: "Cloud-native development, serverless" },
    ],

    process: [
      { step: 1, title: "Discovery Workshop", description: "Understand your applications and data" },
      { step: 2, title: "Assessment & Planning", description: "Evaluate cloud readiness" },
      { step: 3, title: "Proof of Concept", description: "Pilot migration with non-critical workloads" },
      { step: 4, title: "Migration Execution", description: "Migrate applications and data" },
      { step: 5, title: "Testing & Optimization", description: "Validate performance" },
      { step: 6, title: "Handover & Support", description: "Knowledge transfer and ongoing management" },
    ],

    faqs: [
      { question: "Which cloud platform should we choose?", answer: "It depends on your specific needs. We'll help you choose." },
    ],

    pricing: "Custom pricing based on Migration projects scope",
    certifications: ["AWS Advanced Partner", "Microsoft Gold Partner"],
  },

  'cybersecurity': {
    title: "Cybersecurity Solutions",
    subtitle: "Comprehensive Security Services",
    tagline: "Protect your digital assets from evolving cyber threats.",
    description: "We provide end-to-end cybersecurity services that protect your organization from modern threats.",
    extendedDescription: "Cybersecurity is about people, processes, and continuous vigilance.",
    image: "/hero1.webp",
    
    serviceFeatures: [
      { name: "Security Assessment", icon: <Shield />, desc: "Vulnerability and risk analysis" },
      { name: "Firewall & Network Security", icon: <Network />, desc: "Next-gen firewall deployment" },
      { name: "Endpoint Protection", icon: <Lock />, desc: "EDR and antivirus solutions" },
      { name: "Email Security", icon: <Mail />, desc: "Anti-phishing and encryption" },
    ],

    keyBenefits: [
      { text: "Reduce security incidents by 90%", icon: <Shield /> },
      { text: "Achieve compliance with GDPR, HIPAA, PCI", icon: <FileText /> },
    ],

    methodology: [
      { phase: "Security Assessment", duration: "1-2 weeks", activities: ["Vulnerability scanning", "Penetration testing"] },
      { phase: "Security Architecture", duration: "2 weeks", activities: ["Security framework design", "Control selection"] },
    ],

    deliverables: ["Security assessment report", "Risk register and mitigation plan"],

    industries: [
      { name: "Financial Services", icon: <Lock />, focus: "PCI DSS compliance, fraud prevention" },
      { name: "Healthcare", icon: <Shield />, focus: "HIPAA compliance, patient data protection" },
    ],

    process: [
      { step: 1, title: "Security Consultation", description: "Understand your security concerns" },
      { step: 2, title: "Risk Assessment", description: "Identify vulnerabilities and quantify risks" },
      { step: 3, title: "Solution Design", description: "Develop comprehensive security architecture" },
      { step: 4, title: "Security Implementation", description: "Deploy security controls" },
      { step: 5, title: "Testing & Validation", description: "Verify security effectiveness" },
      { step: 6, title: "Continuous Monitoring", description: "24/7 security operations" },
    ],

    faqs: [
      { question: "What threats do you protect against?", answer: "Malware, ransomware, phishing, DDoS attacks, and more." },
    ],

    pricing: "Custom pricing based on Security services scope",
    certifications: ["ISO 27001", "SOC 2 Type II"],
  },

  'amc-support': {
    title: "AMC & Technical Support",
    subtitle: "Comprehensive IT Maintenance Services",
    tagline: "Keep your IT infrastructure running at peak performance, always.",
    description: "Our AMC and technical support services ensure your IT infrastructure operates smoothly with minimal downtime.",
    extendedDescription: "Technology failures can cripple business operations. Our services provide peace of mind.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1920&auto=format&fit=crop",
    
    serviceFeatures: [
      { name: "24/7 Helpdesk Support", icon: <Headphones />, desc: "Round-the-clock assistance" },
      { name: "Preventive Maintenance", icon: <Wrench />, desc: "Regular health checks" },
      { name: "Remote Support", icon: <Globe />, desc: "Instant remote assistance" },
      { name: "Onsite Support", icon: <Users />, desc: "Expert field engineers" },
    ],

    keyBenefits: [
      { text: "Achieve 99.9% uptime with proactive maintenance", icon: <Award /> },
      { text: "Reduce IT costs by 40% compared to break-fix", icon: <TrendingUp /> },
    ],

    methodology: [
      { phase: "Onboarding", duration: "1 week", activities: ["Asset inventory", "Documentation review"] },
      { phase: "Preventive Maintenance", duration: "Quarterly", activities: ["Health checks", "Firmware updates"] },
    ],

    deliverables: ["Detailed asset inventory", "SLA documentation", "Monthly performance reports"],

    industries: [
      { name: "Corporate IT", icon: <Building />, focus: "Servers, networks, endpoints" },
      { name: "Data Centers", icon: <Server />, focus: "24/7 infrastructure monitoring" },
    ],

    process: [
      { step: 1, title: "Initial Assessment", description: "Evaluate your infrastructure" },
      { step: 2, title: "AMC Proposal", description: "Custom support package" },
      { step: 3, title: "Contract Finalization", description: "Define SLAs, coverage, and terms" },
      { step: 4, title: "Service Activation", description: "Onboarding and knowledge transfer" },
      { step: 5, title: "Continuous Support", description: "24/7 monitoring and support" },
      { step: 6, title: "Regular Reviews", description: "Performance reviews and optimization" },
    ],

    faqs: [
      { question: "What's included in an AMC?", answer: "Preventive maintenance, break-fix support, remote assistance, onsite visits." },
    ],

    pricing: "Custom pricing based on AMC scope",
    certifications: ["ISO 20000", "ITIL Certified"],
  },
};

// ========================================
// COMPONENT FUNCTIONS
// ========================================

const ServiceFeature = ({ icon, name, desc }: { icon: React.ReactNode, name: string, desc?: string }) => (
  <div className="flex items-start gap-4 p-6 rounded-xl border border-gray-200 hover:border-primary-400 hover:shadow-lg transition-all group bg-white">
    <div className="flex-shrink-0 w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
      {React.cloneElement(icon as React.ReactElement, { className: "w-7 h-7 text-primary-500" })}
    </div>
    <div className="flex-1">
      <h4 className="font-bold text-gray-900 mb-1 text-lg">{name}</h4>
      {desc && <p className="text-sm text-gray-600">{desc}</p>}
    </div>
  </div>
);

const BenefitItem = ({ text, icon }: { text: string, icon?: React.ReactNode }) => (
  <li className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-r from-primary-50 to-blue-50 border-l-4 border-primary-500 hover:shadow-md transition-all">
    {icon ? (
      <div className="flex-shrink-0 w-11 h-11 bg-primary-500 rounded-full flex items-center justify-center shadow-sm">
        {React.cloneElement(icon as React.ReactElement, { className: "w-6 h-6 text-white" })}
      </div>
    ) : (
      <CheckCircle2 className="w-6 h-6 text-primary-500 mt-0.5 flex-shrink-0" />
    )}
    <span className="p-base text-gray-800 flex-1 font-medium">{text}</span>
  </li>
);

const ProcessStep = ({ step, title, description }: { step: number, title: string, description: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: step * 0.08 }}
    className="relative"
  >
    <div className="flex gap-6 items-start">
      <div className="flex-shrink-0 relative">
        <div className="w-16 h-16 bg-primary-gradient rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg relative z-10">
          {step}
        </div>
        {step < 6 && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-primary-300 to-transparent"></div>
        )}
      </div>
      <div className="flex-1 pt-2">
        <h4 className="font-bold text-gray-900 mb-2 text-xl">{title}</h4>
        <p className="p-base text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  </motion.div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-primary-300 transition-colors bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-blue-50 transition-colors"
      >
        <span className="font-bold text-gray-900 pr-4 text-lg">{question}</span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center transition-all ${isOpen ? 'rotate-90 bg-primary-500' : ''}`}>
          <ChevronRight className={`w-5 h-5 ${isOpen ? 'text-white' : 'text-primary-500'}`} />
        </div>
      </button>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="px-6 pb-6"
        >
          <div className="pt-4 border-t border-gray-200">
            <p className="p-base text-gray-700 leading-relaxed">{answer}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const MethodologyPhase = ({ phase, duration, activities }: any) => (
  <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-primary-400 transition-all hover:shadow-lg">
    <div className="flex items-center justify-between mb-4">
      <h4 className="font-bold text-gray-900 text-lg">{phase}</h4>
    </div>
    <ul className="space-y-2">
      {activities.map((activity: string, idx: number) => (
        <li key={idx} className="flex items-start gap-2 text-gray-700">
          <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
          <span className="text-sm">{activity}</span>
        </li>
      ))}
    </ul>
  </div>
);

const IndustryCard = ({ name, icon, focus }: any) => (
  <div className="group relative overflow-hidden rounded-xl border-2 border-gray-200 hover:border-primary-400 transition-all bg-white p-6 hover:shadow-xl">
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100 to-transparent rounded-bl-full opacity-50"></div>
    <div className="relative">
      <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-gradient rounded-xl mb-4 group-hover:scale-110 transition-transform shadow-md">
        {React.cloneElement(icon as React.ReactElement, { className: "w-7 h-7 text-white" })}
      </div>
      <h4 className="font-bold text-gray-900 mb-2 text-lg">{name}</h4>
      <p className="text-sm text-gray-600 leading-relaxed">{focus}</p>
    </div>
  </div>
);

// ========================================
// MAIN PAGE COMPONENT
// ========================================
export default function ServiceDetailsPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const service = allServicesData[slug];

  // ✅ MODAL STATE
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);



  const { 
    title, 
    subtitle,
    tagline, 
    description, 
    extendedDescription,
    image, 
    serviceFeatures, 
    keyBenefits, 
    methodology,
    deliverables,
    industries,
    process,
    faqs,
    pricing,
    certifications,
  } = service;

  return (
    <div className="w-full bg-white">
      
      {/* ✅ ENQUIRY MODAL */}
      <EnquiryModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        pageContext={title}
      />

      {/* ================================================= */}
      {/*                  HERO SECTION                     */}
      {/* ================================================= */}
      <section className="relative pt-32 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-primary-gradient">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl"></div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="text-white"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 mb-6 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-white animate-pulse" />
                <span className="text-sm font-semibold">PROFESSIONAL SERVICE</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
                {title}
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100 font-semibold mb-6">
                {subtitle}
              </p>
              
              <p className="text-lg text-blue-50 mb-8 leading-relaxed">
                {tagline}
              </p>

              {/* ✅ REQUEST QUOTE BUTTON IN HERO */}
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="btn-gradient shadow-2xl bg-white text-primary-500 hover:bg-blue-50"
                >
                  <Phone className="w-5 h-5" />
                  Request Service Quote
                </Button>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                <Image 
                  src={image} 
                  alt={title} 
                  width={600} 
                  height={400} 
                  className="object-cover w-full h-[400px]"
                  priority 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent"></div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-6 max-w-[200px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-bold text-gray-900">Available Now</span>
                </div>
                <p className="text-sm text-gray-600">Expert consultants ready to help</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="py-4 bg-gray-50 border-b border-gray-200">
        <div className="container-custom">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-primary-500 transition-colors font-medium">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/services" className="text-gray-600 hover:text-primary-500 transition-colors font-medium">Services</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-primary-600 font-bold">{title}</span>
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/*                MAIN CONTENT AREA                  */}
      {/* ================================================= */}
      <section className="section bg-gradient-to-b from-white to-blue-50">
        <div className="container-custom">
          
          {/* Service Overview */}
          <div className="grid lg:grid-cols-5 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-12 bg-primary-gradient rounded-full"></div>
                <h2 className="h2 text-gray-900">Service Overview</h2>
              </div>
              <p className="p-large text-gray-700 leading-relaxed mb-6">{description}</p>
              <p className="p-base text-gray-600 leading-relaxed">{extendedDescription}</p>
            </motion.div>

            {/* Quick Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-primary-gradient rounded-3xl p-8 text-white shadow-2xl sticky top-32">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Star className="w-6 h-6" />
                  Service Highlights
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold mb-1">Certified Experts</p>
                      <p className="text-sm text-blue-100">Industry-certified professionals</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold mb-1">Rapid Deployment</p>
                      <p className="text-sm text-blue-100">Fast turnaround times</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold mb-1">100% Secure</p>
                      <p className="text-sm text-blue-100">Enterprise-grade security</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/20">
                  <p className="text-sm text-blue-100 mb-2">Starting From</p>
                  <p className="text-3xl font-bold">{pricing}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Service Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <div className="badge mb-4 mx-auto">
                <Settings className="w-4 h-4" />
                <span>CORE CAPABILITIES</span>
              </div>
              <h3 className="h2 text-gray-900 mb-4">What We Deliver</h3>
              <p className="p-base text-gray-600 max-w-2xl mx-auto">
                Comprehensive solutions designed to address your unique business challenges
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceFeatures.map((feature: any, index: number) => (
                <ServiceFeature key={index} {...feature} />
              ))}
            </div>
          </motion.div>

          {/* Key Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="bg-gradient-to-br from-blue-50 to-primary-50 rounded-3xl p-8 md:p-12 border-2 border-primary-200 shadow-lg">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-12 bg-primary-gradient rounded-full"></div>
                <h3 className="h2 text-gray-900">Business Impact & Benefits</h3>
              </div>
              <ul className="grid md:grid-cols-2 gap-4">
                {keyBenefits.map((benefit: any, index: number) => (
                  <BenefitItem key={index} {...benefit} />
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Methodology */}
          {methodology && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="text-center mb-12">
                <div className="badge mb-4 mx-auto">
                  <Target className="w-4 h-4" />
                  <span>OUR APPROACH</span>
                </div>
                <h3 className="h2 text-gray-900 mb-4">Proven Methodology</h3>
                <p className="p-base text-gray-600 max-w-2xl mx-auto">
                  A structured approach ensuring successful project delivery
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {methodology.map((phase: any, index: number) => (
                  <MethodologyPhase key={index} {...phase} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Industries Served */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <div className="badge mb-4 mx-auto">
                <Building className="w-4 h-4" />
                <span>INDUSTRY FOCUS</span>
              </div>
              <h3 className="h2 text-gray-900 mb-4">Industries We Serve</h3>
              <p className="p-base text-gray-600 max-w-2xl mx-auto">
                Specialized solutions tailored to your industry requirements
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {industries.map((industry: any, index: number) => (
                <IndustryCard key={index} {...industry} />
              ))}
            </div>
          </motion.div>

          {/* Process Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-12">
              <div className="w-1.5 h-12 bg-primary-gradient rounded-full"></div>
              <h3 className="h2 text-gray-900">Our Implementation Process</h3>
            </div>
            <div className="max-w-4xl mx-auto space-y-6">
              {process.map((step: any) => (
                <ProcessStep key={step.step} {...step} />
              ))}
            </div>
          </motion.div>

          {/* Deliverables */}
          {deliverables && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="bg-white rounded-3xl p-8 md:p-12 border-2 border-gray-200 shadow-xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-primary-gradient rounded-xl flex items-center justify-center shadow-lg">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="h3 text-gray-900">What You'll Receive</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {deliverables.map((item: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 hover:bg-primary-100 transition-colors border border-blue-100">
                      <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* FAQs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-12">
              <div className="w-1.5 h-12 bg-primary-gradient rounded-full"></div>
              <h3 className="h2 text-gray-900">Frequently Asked Questions</h3>
            </div>
            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq: any, index: number) => (
                <FAQItem key={index} {...faq} />
              ))}
            </div>
          </motion.div>

        </div>
      </section>
      

      {/* ================================================= */}
      {/*           ✅ CTA SECTION WITH MODAL BUTTON        */}
      {/* ================================================= */}
      <section className="py-10 md:py-10">
        <div className="container max-w-6xl px-4 md:px-8">
          <motion.div 
            className="text-center rounded-2xl py-16 px-6 relative overflow-hidden"
            style={{
              background: 'linear-gradient(to bottom, hsl(var(--accent)), hsl(var(--background)))'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl"
              style={{ backgroundColor: 'hsl(var(--primary) / 0.05)' }}
              animate={{ scale: [1, 1.2, 1], x: [0, 20, 0], y: [0, 20, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.h2 
              className="text-3xl md:text-4xl font-bold font-headline mb-4 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Ready to Get Started with {title}?
            </motion.h2>
            <motion.p 
              className="text-lg max-w-2xl mx-auto mb-8 relative z-10"
              style={{ color: 'hsl(var(--muted-foreground))' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Let's discuss your requirements for <strong>{title}</strong> and build a custom roadmap for your business.
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4 justify-center relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* ✅ CTA BUTTON THAT OPENS MODAL */}
                <Button 
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="btn-primary-custom h-11 px-8 text-base"
                >
                  For Inquiry
                  <motion.span
                    className="inline-block ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}