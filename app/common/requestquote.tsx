'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  CheckCircle2,
  ChevronRight,
  Download,
  Server,
  ShieldCheck,
  Wifi,
  Video,
  Users,
  HardDrive,
  Network,
  Wrench,
  KeyRound,
  Layers,
  Monitor,
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
  Star,
  X,
  Loader2
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Button } from '@/app/components/ui/button';
import toast from "react-hot-toast";

// --- CONSTANTS FOR FORM ---
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

// --- ENQUIRY MODAL COMPONENT ---
const EnquiryModal = ({ 
  isOpen, 
  onClose, 
  pageContext 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  pageContext: string 
}) => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  
  // ✅ 1. WhatsApp No Added to State
  const initialFormState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    whatsappNo: '', // 🆕 Added
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

  // Prevent background scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  // Handle State Selection Change
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
    
    if (!formData.firstName.trim()) {
      toast.error("First Name is required")
      return
    }
    
    if (!formData.email.trim()) {
      toast.error("Email is required")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address")
      return
    }

    setLoading(true)

    // ✅ 2. WhatsApp No Added to Payload
    const finalFormData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      whatsappNo: formData.whatsappNo.trim(), // 🆕 Added
      company: formData.company.trim(),
      website: formData.website.trim(),
      industry: formData.industry,
      noOfEmployees: formData.noOfEmployees,
      state: showCustomState ? customState.trim() : formData.state,
      city: showCustomCity ? customCity.trim() : formData.city,
      message: formData.message.trim(),
      source: pageContext,
      servicePage: pageContext,
      productPage: pageContext
    };

    console.log("📤 Sending Form Data:", JSON.stringify(finalFormData, null, 2));

    try {
      const response = await fetch("/api/send-lead", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(finalFormData),
      });

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        throw new Error("Invalid response from server");
      }

      if (response.ok && data.success) {
        setSuccess(true)
        toast.success("Inquiry Sent Successfully! 🎉")
        
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
        const errorMessage = data.error || data.message || "Submission failed.";
        toast.error(errorMessage)
      }
    } catch (error: any) {
      console.error("❌ Network/Fetch Error:", error)
      toast.error(error.message || "Network error.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!isOpen) {
      setFormData(initialFormState)
      setSuccess(false)
      setLoading(false)
    }
  }, [isOpen])

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
            className="relative w-full max-w-3xl bg-white border rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="absolute right-4 top-4 z-10">
              <button onClick={onClose} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto">
              {success ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center space-y-4"
                >
                  <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Thank You!</h3>
                  <p className="font-semibold text-primary-500 text-lg">{pageContext}</p>
                </motion.div>
              ) : (
                <>
                  <div className="mb-6 pr-8">
                    <h3 className="text-2xl font-bold text-gray-900">Get a Quote</h3>
                    <p className="text-sm text-gray-600 mt-1">Regarding: <span className="text-primary-500 font-semibold">{pageContext}</span></p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Personal Info */}
                    <div>
                      <h4 className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider border-b pb-1">Personal Details</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input 
                            id="firstName" 
                            placeholder="First Name" 
                            value={formData.firstName}
                            onChange={(e) => setFormData(prev => ({...prev, firstName: e.target.value}))}
                            required
                            className="border-gray-300 focus:border-primary-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input 
                            id="lastName" 
                            placeholder="Last Name" 
                            value={formData.lastName}
                            onChange={(e) => setFormData(prev => ({...prev, lastName: e.target.value}))}
                            className="border-gray-300 focus:border-primary-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                      <h4 className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider border-b pb-1">Contact Info</h4>
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
                            className="border-gray-300 focus:border-primary-500"
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
                            className="border-gray-300 focus:border-primary-500"
                          />
                        </div>

                        {/* ✅ WHATSAPP FIELD IS HERE NOW */}
                        <div className="space-y-2">
                          <Label htmlFor="whatsappNo">WhatsApp No</Label>
                          <Input 
                            id="whatsappNo" 
                            type="tel" 
                            placeholder="+91..."
                            value={formData.whatsappNo}
                            onChange={(e) => setFormData(prev => ({...prev, whatsappNo: e.target.value}))}
                            className="border-gray-300 focus:border-primary-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="website">Website (Optional)</Label>
                          <Input 
                            id="website" 
                            type="url"
                            placeholder="https://yourcompany.com"
                            value={formData.website}
                            onChange={(e) => setFormData(prev => ({...prev, website: e.target.value}))}
                            className="border-gray-300 focus:border-primary-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Organization & Location Sections */}
                    <div>
                      <h4 className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider border-b pb-1">Organization & Location</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor="company">Organization Name</Label>
                          <Input 
                            id="company" 
                            placeholder="Company Name"
                            value={formData.company}
                            onChange={(e) => setFormData(prev => ({...prev, company: e.target.value}))}
                            className="border-gray-300 focus:border-primary-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="industry">Industry</Label>
                          <select
                            id="industry"
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
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

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <select
                            id="state"
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                            <Input placeholder="Enter State" className="mt-2" value={customState} onChange={(e) => setCustomState(e.target.value)} />
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <select
                            id="city"
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                            <Input placeholder="Enter City" className="mt-2" value={customCity} onChange={(e) => setCustomCity(e.target.value)} />
                          )}
                        </div>
                      </div>
                    </div>

                    <button 
                      disabled={loading} 
                      type="submit" 
                      className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-white h-12 text-base mt-4 flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors"
                    >
                      {loading ? (<><Loader2 className="animate-spin h-5 w-5" />Submitting...</>) : ('Submit Request')}
                    </button>
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

// --- COMPREHENSIVE PRODUCT DATABASE ---
const allProductsData: { [key: string]: any } = {
  'cctv-surveillance': {
    title: "CCTV & Surveillance Systems",
    subtitle: "Enterprise-Grade Video Surveillance Solutions",
    tagline: "Unwavering security through advanced, intelligent monitoring.",
    description: "We provide state-of-the-art IP cameras, Network Video Recorders (NVRs), and Digital Video Recorders (DVRs) from industry leaders like PeopleLink, BenQ, and Panasonic...",
    // ... rest of your product data
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&q=80&w=1920",
    features: [
      { name: "4K High-Definition IP Cameras", icon: <Video />, desc: "Crystal-clear video with exceptional detail" },
      { name: "Scalable NVR & DVR Storage", icon: <HardDrive />, desc: "From 2TB to 128TB capacity" },
      { name: "AI-Powered Video Analytics", icon: <Layers />, desc: "Intelligent threat detection & alerts" },
      { name: "Secure Remote & Mobile Viewing", icon: <Users />, desc: "Access from anywhere, anytime" },
      { name: "Facial Recognition Technology", icon: <Lock />, desc: "Advanced biometric identification" },
      { name: "License Plate Recognition", icon: <Globe />, desc: "Automated vehicle tracking" },
    ],
    keyBenefits: [
      { text: "Deter criminal activity and theft with visible surveillance presence", icon: <ShieldCheck /> },
      { text: "Monitor employee productivity, safety compliance, and operational efficiency", icon: <Users /> },
      { text: "Reduce long-term security operational costs by up to 60%", icon: <TrendingUp /> },
      { text: "Provide crucial forensic evidence for investigations and legal proceedings", icon: <FileText /> },
      { text: "Real-time alerts for suspicious activities and security breaches", icon: <Zap /> },
      { text: "Integration with existing security and building management systems", icon: <Settings /> },
    ],
    technicalSpecs: [
      { category: "Camera Specifications", items: [
        "Resolution: Up to 4K Ultra HD (3840 × 2160)",
        "Sensor: 1/2.8\" Progressive Scan CMOS",
        "Frame Rate: Up to 30fps at 4K, 60fps at 1080p",
      ]},
    ],
    useCases: [
      { industry: "Corporate Offices", icon: <Building />, description: "Monitor entrances, parking lots, and sensitive areas." },
    ],
    deploymentProcess: [
      { step: 1, title: "Site Survey & Assessment", description: "Our experts visit your facility to assess security vulnerabilities." },
    ],
    faqs: [
      { question: "What is the difference between IP cameras and analog CCTV?", answer: "IP cameras transmit digital video over a network..." },
    ],
    partners: ["PeopleLink", "BenQ", "Panasonic", "Hikvision", "Dahua"],
    warranty: "3-5 years manufacturer warranty with lifetime technical support",
    certifications: ["ISO 9001:2015", "CE Certified", "FCC Compliant", "ONVIF Profile S"],
    brochureLink: "/brochures/cctv-surveillance.pdf",
    extendedDescription: "Our surveillance systems are designed to meet the demanding requirements..."
  },
  // Add more products here...
};

// --- ENHANCED REUSABLE COMPONENTS ---
const FeatureItem = ({ icon, name, desc }: { icon: React.ReactNode, name: string, desc?: string }) => (
  <div className="flex items-start gap-4 bg-white p-5 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all group">
    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
      {React.cloneElement(icon as React.ReactElement, { className: "w-6 h-6 text-primary-500" })}
    </div>
    <div>
      <span className="font-semibold text-gray-800 block">{name}</span>
      {desc && <span className="text-sm text-gray-600">{desc}</span>}
    </div>
  </div>
);

const BenefitItem = ({ text, icon }: { text: string, icon?: React.ReactNode }) => (
  <li className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors">
    {icon ? (
      <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
        {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5 text-primary-500" })}
      </div>
    ) : (
      <CheckCircle2 className="w-7 h-7 text-success-500 mt-0.5 flex-shrink-0" />
    )}
    <span className="p-base text-gray-700 flex-1">{text}</span>
  </li>
);

const SpecItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-3 p-base text-gray-600">
    <ChevronRight className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
    <span>{text}</span>
  </li>
);

const UseCaseCard = ({ industry, icon, description }: { industry: string, icon: React.ReactNode, description: string }) => (
  <div className="card-hover text-center">
    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-4">
      {React.cloneElement(icon as React.ReactElement, { className: "w-8 h-8 text-primary-500" })}
    </div>
    <h4 className="font-bold text-gray-900 mb-2">{industry}</h4>
    <p className="p-small text-gray-600">{description}</p>
  </div>
);

const DeploymentStep = ({ step, title, description }: { step: number, title: string, description: string }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: step * 0.1 }}
    className="flex gap-6"
  >
    <div className="flex-shrink-0">
      <div className="w-12 h-12 bg-primary-gradient rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
        {step}
      </div>
    </div>
    <div className="flex-1 pb-8">
      <h4 className="font-bold text-gray-900 mb-2 text-lg">{title}</h4>
      <p className="p-base text-gray-600">{description}</p>
    </div>
  </motion.div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 pr-4">{question}</span>
        <ChevronRight className={`w-5 h-5 text-primary-500 flex-shrink-0 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-6 pb-6">
          <p className="p-base text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

const Breadcrumbs = ({ productTitle }: { productTitle: string }) => (
  <div className="py-4 bg-gray-50 border-b border-gray-200">
    <div className="container-custom">
      <div className="flex items-center gap-2 text-sm">
        <Link href="/" className="text-gray-600 hover:text-primary-500 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <Link href="/products" className="text-gray-600 hover:text-primary-500 transition-colors">Products</Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-900 font-semibold">{productTitle}</span>
      </div>
    </div>
  </div>
);

// --- MAIN COMPONENT ---
export default function ProductDetailsPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const product = allProductsData[slug];

  // ✅ STATE FOR MODAL
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Handle product not found
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen section text-center px-4 bg-white">
        <ShieldCheck className="w-24 h-24 text-gray-300 mb-6" />
        <h1 className="h1 text-gray-800 mb-4">Product Not Found</h1>
        <p className="p-large mb-8 text-gray-600">The product you are looking for does not exist or is coming soon.</p>
        <Link href="/products" className="btn-primary">
          <ArrowRight className="w-5 h-5" />
          Back to All Products
        </Link>
      </div>
    );
  }

  const {
    title,
    subtitle,
    tagline,
    description,
    extendedDescription,
    image,
    features,
    keyBenefits,
    technicalSpecs,
    useCases,
    deploymentProcess,
    faqs,
    partners,
    warranty,
    certifications,
    brochureLink
  } = product;

  return (
    <div className="w-full bg-white">
      {/* ✅ ENQUIRY MODAL */}
      <EnquiryModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        pageContext={title}
      />

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-32 md:pt-25 md:pb-40 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={image} alt={title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/50" />
        </div>
        <div className="container-custom relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="badge mb-6 bg-primary">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-white">PRODUCT DETAILS</span>
            </div>
            <h1 className="h1 text-white max-w-4xl mb-4">{title}</h1>
            <p className="text-2xl font-semibold text-primary-200 mb-4">{subtitle}</p>
            <p className="p-large text-primary-100 max-w-3xl">{tagline}</p>
          </motion.div>
        </div>
      </section>

      <Breadcrumbs productTitle={title} />

      {/* MAIN CONTENT SECTION */}
      <section className="section">
        <div className="container-custom grid lg:grid-cols-3 gap-12 lg:gap-16">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Product Overview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="h2 mb-6 border-l-4 border-primary-500 pl-4">Product Overview</h2>
              <p className="p-large text-gray-700 leading-relaxed mb-4">{description}</p>
              <p className="p-base text-gray-600 leading-relaxed">{extendedDescription}</p>
            </motion.div>

            {/* Key Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="h3 mb-8 border-l-4 border-primary-500 pl-4">Key Features & Capabilities</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {features.map((feature: any, index: number) => (
                  <FeatureItem key={index} name={feature.name} icon={feature.icon} desc={feature.desc} />
                ))}
              </div>
            </motion.div>

            {/* Key Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="h2 mb-8 border-l-4 border-primary-500 pl-4">Business Benefits</h3>
              <ul className="space-y-4">
                {keyBenefits.map((benefit: any, index: number) => (
                  <BenefitItem key={index} text={benefit.text} icon={benefit.icon} />
                ))}
              </ul>
            </motion.div>

            {/* Technical Specifications */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gray-50 rounded-3xl p-8 border border-gray-200"
            >
              <h3 className="h3 mb-8 flex items-center gap-3">
                <Settings className="w-8 h-8 text-primary-500" />
                Technical Specifications
              </h3>
              <div className="space-y-8">
                {technicalSpecs.map((category: any, index: number) => (
                  <div key={index}>
                    <h4 className="font-bold text-gray-900 mb-4 text-lg">{category.category}</h4>
                    <ul className="space-y-3">
                      {category.items.map((spec: string, idx: number) => (
                        <SpecItem key={idx} text={spec} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Use Cases */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="h2 mb-8 border-l-4 border-primary-500 pl-4">Industry Applications</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {useCases.map((useCase: any, index: number) => (
                  <UseCaseCard key={index} industry={useCase.industry} icon={useCase.icon} description={useCase.description} />
                ))}
              </div>
            </motion.div>

            {/* Deployment Process */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="h2 mb-8 border-l-4 border-primary-500 pl-4">Our Deployment Process</h3>
              <div className="relative">
                <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-200"></div>
                <div className="relative space-y-2">
                  {deploymentProcess.map((process: any) => (
                    <DeploymentStep key={process.step} step={process.step} title={process.title} description={process.description} />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* FAQs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="h2 mb-8 border-l-4 border-primary-500 pl-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqs.map((faq: any, index: number) => (
                  <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Sticky Sidebar */}
          <aside className="lg:sticky top-32 h-fit space-y-6">
            
            {/* Quick Actions Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card space-y-6"
            >
              <h3 className="h4">Get Started Today</h3>

              {/* ✅ CHANGED: Link to Button */}
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="btn-primary w-full text-center flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Request a Quote
              </button>

              <a
                href={brochureLink}
                download
                className="btn-outline w-full text-center flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Brochure
              </a>
            </motion.div>

            {/* Product Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="card space-y-6"
            >
              <h4 className="font-bold text-gray-900">Product Information</h4>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-2">WARRANTY</p>
                  <p className="p-small text-gray-700">{warranty}</p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm font-semibold text-gray-500 mb-3">CERTIFICATIONS</p>
                  <div className="flex flex-wrap gap-2">
                    {certifications.map((cert: string, index: number) => (
                      <span key={index} className="badge text-xs">{cert}</span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm font-semibold text-gray-500 mb-3">TECHNOLOGY PARTNERS</p>
                  <div className="flex flex-wrap gap-2">
                    {partners.map((partner: string, index: number) => (
                      <span key={index} className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                        <Award className="w-3 h-3" />
                        {partner}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Support Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-primary-50 rounded-2xl p-6 border border-primary-100"
            >
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary-500" />
                Need Expert Guidance?
              </h4>
              <p className="p-small text-gray-600 mb-4">
                Our certified technical team is ready to help you choose the right solution for your specific needs.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-primary-500 font-semibold hover:gap-3 transition-all">
                Talk to a Specialist
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="card text-center space-y-4"
            >
              <Award className="w-12 h-12 text-primary-500 mx-auto" />
              <div>
                <p className="font-bold text-gray-900 mb-1">Authorized Partner</p>
                <p className="p-small text-gray-600">Genuine products with full manufacturer warranty</p>
              </div>
            </motion.div>
          </aside>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="section-blue text-center">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="h2 text-white max-w-3xl mx-auto mb-4">
              Ready to Deploy {title.split(' ')[0]} Solutions?
            </h2>
            <p className="p-large max-w-3xl mx-auto mb-8 text-primary-100">
              Our experts are ready to help you design, deploy, and manage the perfect solution for your business infrastructure.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {/* ✅ CHANGED: This button also opens modal */}
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="btn-gradient flex items-center gap-2"
              >
                Get a Custom Quote
                <ChevronRight className="w-5 h-5" />
              </button>
              <Link href="/contact" className="btn-outline bg-white text-primary-500 hover:bg-primary-50 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Call Us Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="h3 mb-4">Explore Our Other Products</h2>
            <p className="p-base text-gray-600 max-w-2xl mx-auto">
              Discover our complete range of enterprise IT infrastructure solutions
            </p>
          </div>
          <div className="text-center">
            <Link href="/products" className="btn-outline flex items-center gap-2 justify-center w-fit mx-auto">
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}