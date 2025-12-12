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
  
  const initialFormState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    whatsappNo: '', 
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
        whatsappNo: formData.whatsappNo,
        state: showCustomState ? customState : formData.state,
        city: showCustomCity ? customCity : formData.city,
        source: pageContext,
        productPage: pageContext
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
            className="relative w-full max-w-3xl bg-white border rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="absolute right-4 top-4 z-10">
               <button 
                 onClick={onClose} 
                 className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600 hover:text-gray-900"
               >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto">
              {success ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                  <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold">Thank You!</h3>
                  <p className="text-gray-600">
                    We have received your inquiry regarding <br/>
                    <span className="font-semibold text-primary-500">{pageContext}</span>.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6 pr-8">
                    <h3 className="text-2xl font-bold">Get a Quote</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Regarding: <span className="text-primary-500 font-semibold">{pageContext}</span>
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
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
                            <div className="space-y-2">
                                <Label htmlFor="whatsappNo">WhatsApp No</Label>
                                <Input 
                                    id="whatsappNo" 
                                    type="tel" 
                                    placeholder="+91..."
                                    value={formData.whatsappNo}
                                    onChange={(e) => setFormData(prev => ({...prev, whatsappNo: e.target.value}))}
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
                                />
                            </div>
                        </div>
                    </div>

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
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="industry">Industry</Label>
                                <select
                                    id="industry"
                                    className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                                    className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                                    className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                                    className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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

                    <Button disabled={loading} type="submit" className="w-full btn-primary h-12 text-base mt-4">
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

// --- COMPREHENSIVE PRODUCT DATABASE (FIXED DESCRIPTIONS) ---
const allProductsData: { [key: string]: any } = {
  'cctv-surveillance': {
    title: "CCTV & Surveillance Systems",
    subtitle: "Enterprise-Grade Video Surveillance Solutions",
    tagline: "Unwavering security through advanced, intelligent monitoring.",
    description: "We provide state-of-the-art IP cameras, Network Video Recorders (NVRs), and Digital Video Recorders (DVRs) from industry leaders like PeopleLink, BenQ, and Panasonic. Our comprehensive surveillance solutions combine cutting-edge hardware with intelligent software analytics to deliver 24/7 security coverage for your facilities. Whether you need to protect a single office or multiple locations, our scalable systems grow with your security needs.",
    extendedDescription: "Our surveillance systems are designed to meet the demanding requirements of modern enterprises. With support for 4K ultra-high-definition video, advanced motion detection, facial recognition, license plate reading, and AI-powered behavioral analytics, our solutions go far beyond traditional CCTV. We integrate seamlessly with access control systems, alarm systems, and building management platforms to create a unified security ecosystem.",
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
      { category: "Camera Specifications", items: ["Resolution: Up to 4K Ultra HD", "Sensor: 1/2.8\" Progressive Scan CMOS", "Frame Rate: Up to 30fps at 4K"] },
      { category: "Storage & Recording", items: ["Storage Capacity: 2TB - 128TB", "Recording Modes: Continuous, Motion-based", "Compression: H.265+/H.264+"] },
    ],
    useCases: [
      { industry: "Corporate Offices", icon: <Building />, description: "Monitor entrances, parking lots, and sensitive areas." },
      { industry: "Educational Institutions", icon: <GraduationCap />, description: "Ensure student safety across campuses." },
    ],
    deploymentProcess: [
      { step: 1, title: "Site Survey & Assessment", description: "Our experts visit your facility to assess security vulnerabilities." },
      { step: 2, title: "System Design & Proposal", description: "We create a detailed system design with camera layouts." },
    ],
    faqs: [
      { question: "What is the difference between IP cameras and analog CCTV?", answer: "IP cameras transmit digital video over a network, offering higher resolution." },
      { question: "Can I access cameras remotely from my phone?", answer: "Yes! Our systems include free mobile apps for iOS and Android." },
    ],
    partners: ["PeopleLink", "BenQ", "Panasonic", "Hikvision", "Dahua"],
    warranty: "3-5 years manufacturer warranty",
    certifications: ["ISO 9001:2015", "CE Certified", "FCC Compliant"],
    brochureLink: "/brochures/cctv-surveillance.pdf",
  },

  'networking-devices': {
    title: "Enterprise Networking Devices",
    subtitle: "High-Performance Network Infrastructure",
    tagline: "Building the high-speed backbone of your digital operations.",
    description: "From core switches to wireless access points, we deliver robust and scalable networking solutions from Dell and Cisco. Our enterprise-grade network infrastructure ensures high-speed, reliable, and secure connectivity for all your critical business applications, cloud services, and workforce productivity tools. We design, deploy, and manage networks that can handle today's bandwidth demands while being ready for tomorrow's innovations.",
    extendedDescription: "Modern businesses demand networks that are fast, reliable, and secure. Our networking solutions combine best-in-class hardware from Dell and Cisco with intelligent network management software to deliver exceptional performance. Whether you're building a new network from scratch, upgrading legacy infrastructure, or expanding to new locations, we provide comprehensive solutions that include switches, routers, wireless access points, firewalls, and professional cabling services.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&q=80&w=1920",
    features: [
      { name: "Layer 3 Managed Switches", icon: <Server />, desc: "Advanced routing & VLAN segmentation" },
      { name: "Enterprise-Grade Routers", icon: <Network />, desc: "High-throughput edge routing" },
      { name: "WiFi 6/6E Access Points", icon: <Wifi />, desc: "Next-gen wireless connectivity" },
      { name: "Professional Cabling", icon: <Wrench />, desc: "Cat6a/Cat7 structured cabling" },
      { name: "Network Management", icon: <Settings />, desc: "Centralized monitoring & control" },
      { name: "PoE+ Support", icon: <Zap />, desc: "Power over Ethernet for devices" },
    ],
    keyBenefits: [
      { text: "Ensure 99.9% network uptime with redundant architecture", icon: <Award /> },
      { text: "Maximize data throughput and speed with 10Gbps+ switching", icon: <TrendingUp /> },
      { text: "Easily scale your network infrastructure as your business grows", icon: <Layers /> },
      { text: "Secure all data transmission with encryption and access control", icon: <Lock /> },
      { text: "Reduce IT overhead with cloud-managed network solutions", icon: <Globe /> },
      { text: "Future-proof infrastructure supporting IoT, VoIP, and video", icon: <Zap /> },
    ],
    technicalSpecs: [
      { category: "Switches", items: ["Switching Capacity: 10Gbps to 100Gbps", "Port Density: 24-48 port"] },
      { category: "Wireless", items: ["Standards: WiFi 6/6E", "Speed: Up to 9.6Gbps"] },
    ],
    useCases: [
      { industry: "Corporate Headquarters", icon: <Building />, description: "High-density switching for hundreds of employees." },
      { industry: "Data Centers", icon: <Server />, description: "High-throughput core switching and fiber backbone." },
    ],
    deploymentProcess: [
      { step: 1, title: "Network Assessment", description: "We analyze your current network and bandwidth needs." },
      { step: 2, title: "Architecture Design", description: "Design a scalable network topology." },
    ],
    faqs: [
      { question: "What is the difference between Layer 2 and Layer 3 switches?", answer: "Layer 3 switches include routing capabilities." },
      { question: "Do you provide network management services?", answer: "Yes, we offer 24/7 monitoring and support." },
    ],
    partners: ["Cisco", "Dell Technologies", "HPE Aruba"],
    warranty: "Lifetime hardware warranty (Cisco)",
    certifications: ["Cisco Certified Partner", "Dell Authorized Reseller"],
    brochureLink: "/brochures/networking.pdf",
  },

  'servers-storage': {
    title: "Servers & Storage Solutions",
    subtitle: "Enterprise Data Center Infrastructure",
    tagline: "Powering your data-driven enterprise with reliability and scale.",
    description: "We offer reliable and scalable server and storage solutions powered by Dell PowerEdge and Dell EMC technologies. From high-performance rack and blade servers to enterprise SAN and NAS systems, our infrastructure is engineered for maximum performance, data integrity, and simplified management. Whether you need to host mission-critical applications, databases, virtualization environments, or backup systems, we deliver the compute and storage capacity your business demands.",
    extendedDescription: "In today's data-driven world, your servers and storage form the foundation of your digital infrastructure. Our solutions combine cutting-edge Intel Xeon processors, high-speed NVMe storage, and advanced RAID protection to deliver exceptional performance and reliability. We design server and storage environments that support virtualization (VMware, Hyper-V), database workloads (SQL Server, Oracle), ERP systems (SAP, Oracle), and cloud-hybrid architectures with seamless integration to AWS, Azure, and Google Cloud.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&q=80&w=1920",
    features: [
      { name: "Dell PowerEdge Servers", icon: <Server />, desc: "Rack, tower, and blade servers" },
      { name: "NAS & SAN Storage", icon: <HardDrive />, desc: "Centralized, scalable storage arrays" },
      { name: "Automated Backup", icon: <ShieldCheck />, desc: "Continuous data protection" },
      { name: "Virtualization Ready", icon: <Layers />, desc: "VMware, Hyper-V certified" },
      { name: "Remote Management", icon: <Globe />, desc: "iDRAC enterprise remote control" },
      { name: "High Availability", icon: <Award />, desc: "Redundant PSU, RAID, clustering" },
    ],
    keyBenefits: [
      { text: "Centralize and protect critical business data", icon: <HardDrive /> },
      { text: "Ensure business continuity with robust backup", icon: <ShieldCheck /> },
      { text: "Optimize performance for demanding applications", icon: <TrendingUp /> },
      { text: "Build a future-proof and scalable IT foundation", icon: <Layers /> },
      { text: "Reduce hardware costs through virtualization", icon: <Server /> },
      { text: "Simplify management with integrated monitoring", icon: <Settings /> },
    ],
    technicalSpecs: [
      { category: "Servers", items: ["Processors: Intel Xeon Scalable", "RAM: Up to 1TB DDR4/DDR5"] },
      { category: "Storage", items: ["Drive Types: HDD, SSD, NVMe", "RAID: 0, 1, 5, 6, 10"] },
    ],
    useCases: [
      { industry: "Enterprise IT", icon: <Building />, description: "Host ERP, CRM, email servers." },
      { industry: "Healthcare", icon: <ShieldCheck />, description: "Secure storage for patient records." },
    ],
    deploymentProcess: [
      { step: 1, title: "Workload Assessment", description: "Analyze applications and storage needs." },
      { step: 2, title: "Architecture Planning", description: "Design scalable architecture with redundancy." },
    ],
    faqs: [
      { question: "What is the difference between NAS and SAN?", answer: "NAS is file-level, SAN is block-level storage." },
      { question: "Do you provide backup solutions?", answer: "Yes, we offer Veeam and Dell EMC backup solutions." },
    ],
    partners: ["Dell Technologies", "VMware", "Microsoft"],
    warranty: "3-5 years ProSupport",
    certifications: ["Dell Authorized Partner", "VMware Partner"],
    brochureLink: "/brochures/servers.pdf",
  },

  'firewalls-security': {
    title: "Firewalls & Security Appliances",
    subtitle: "Next-Generation Network Security",
    tagline: "Your first line of defense against cyber threats.",
    description: "Protect your network perimeter with our next-generation firewalls (NGFW) and unified threat management (UTM) appliances from industry leaders like Fortinet, Palo Alto Networks, and Cisco. Our comprehensive security solutions inspect all traffic, block sophisticated threats, and give you complete visibility and control over your network. From malware and ransomware to zero-day exploits and advanced persistent threats (APTs), we deploy multi-layered defenses that keep your organization secure.",
    extendedDescription: "Cyber threats are evolving faster than ever. Traditional firewalls that only filter by IP and port are no longer sufficient. Our next-generation firewalls combine stateful inspection, deep packet inspection (DPI), intrusion prevention (IPS), application control, SSL inspection, and advanced threat intelligence to stop modern attacks. We deploy comprehensive security architectures that include perimeter firewalls, internal segmentation, VPN gateways, web filtering, email security, and endpoint protection to create defense-in-depth strategies.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&q=80&w=1920",
    features: [
      { name: "Next-Gen Firewalls (NGFW)", icon: <ShieldCheck />, desc: "Advanced threat prevention" },
      { name: "Intrusion Prevention (IPS)", icon: <Network />, desc: "Real-time attack blocking" },
      { name: "VPN Gateway", icon: <KeyRound />, desc: "Secure remote access" },
      { name: "Unified Threat Management", icon: <Layers />, desc: "All-in-one security" },
      { name: "SSL Inspection", icon: <Lock />, desc: "Decrypt and inspect encrypted traffic" },
      { name: "Threat Intelligence", icon: <Globe />, desc: "Real-time global threat feeds" },
    ],
    keyBenefits: [
      { text: "Prevent unauthorized network access", icon: <Lock /> },
      { text: "Block malware and viruses at perimeter", icon: <ShieldCheck /> },
      { text: "Securely connect remote employees", icon: <Users /> },
      { text: "Gain deep visibility into network traffic", icon: <TrendingUp /> },
      { text: "Meet compliance requirements (PCI, HIPAA)", icon: <FileText /> },
      { text: "Reduce security complexity", icon: <Settings /> },
    ],
    technicalSpecs: [
      { category: "Firewall", items: ["Throughput: Up to 80Gbps", "Concurrent Sessions: 1M+"] },
      { category: "Security", items: ["IPS, Anti-malware, Web Filtering", "SSL Inspection"] },
    ],
    useCases: [
      { industry: "Corporate Networks", icon: <Building />, description: "Protect HQ and branch offices." },
      { industry: "Government", icon: <Landmark />, description: "High-security firewalls for classified networks." },
    ],
    deploymentProcess: [
      { step: 1, title: "Security Assessment", description: "Audit to identify vulnerabilities." },
      { step: 2, title: "Firewall Design", description: "Design security policies and rules." },
    ],
    faqs: [
      { question: "What is an NGFW?", answer: "Next-Gen Firewall with application awareness and IPS." },
      { question: "Can it support remote workers?", answer: "Yes, via SSL VPN and IPSec VPN." },
    ],
    partners: ["Fortinet", "Palo Alto Networks", "Cisco"],
    warranty: "3-5 years with subscription",
    certifications: ["ICSA Certified", "PCI DSS Compliant"],
    brochureLink: "/brochures/firewalls.pdf",
  },

  'collaboration-tools': {
    title: "Collaboration & Conferencing Tools",
    subtitle: "Unified Communications for Hybrid Work",
    tagline: "Connecting your teams, wherever they are.",
    description: "Equip your hybrid workforce with state-of-the-art collaboration tools from PeopleLink, BenQ, and Panasonic. From 4K interactive displays and video conferencing systems to wireless presentation tools and digital whiteboards, we create immersive and productive meeting environments that rival in-person collaboration. Whether you're running a boardroom meeting, hosting a training session, or connecting remote teams, our solutions deliver crystal-clear audio, stunning video, and seamless integration with Microsoft Teams, Zoom, and Google Meet.",
    extendedDescription: "The modern workplace is hybrid. Effective collaboration requires more than just a webcam and microphone. Our enterprise collaboration solutions include professional-grade video conferencing systems with AI-powered cameras that auto-frame speakers, beamforming microphone arrays that eliminate background noise, 4K interactive displays for content sharing, wireless presentation systems, and room scheduling panels. We design, install, and configure complete collaboration spaces from small huddle rooms to large auditoriums.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&q=80&w=1920",
    features: [
      { name: "4K Video Conferencing", icon: <Video />, desc: "Ultra-HD cameras with AI framing" },
      { name: "Interactive Displays", icon: <Monitor />, desc: "55\"-86\" 4K touchscreen panels" },
      { name: "Wireless Presentation", icon: <Wifi />, desc: "Cable-free screen sharing" },
      { name: "Room Scheduling", icon: <Clock />, desc: "Digital room booking panels" },
      { name: "Cloud Integration", icon: <Globe />, desc: "Teams, Zoom, Google Meet" },
      { name: "Professional Audio", icon: <Settings />, desc: "Beamforming microphones & DSP" },
    ],
    keyBenefits: [
      { text: "Improve team productivity and engagement", icon: <Users /> },
      { text: "Reduce travel costs with high-quality video", icon: <TrendingUp /> },
      { text: "Facilitate dynamic brainstorming sessions", icon: <Layers /> },
      { text: "Present with clarity and professionalism", icon: <Monitor /> },
      { text: "Simplify IT management", icon: <Settings /> },
      { text: "Enhance hybrid work experiences", icon: <Globe /> },
    ],
    technicalSpecs: [
      { category: "Video", items: ["4K Ultra HD cameras", "AI speaker tracking"] },
      { category: "Displays", items: ["4K Touchscreens", "Wireless casting"] },
    ],
    useCases: [
      { industry: "Boardrooms", icon: <Building />, description: "Executive meeting spaces." },
      { industry: "Classrooms", icon: <GraduationCap />, description: "Interactive learning displays." },
    ],
    deploymentProcess: [
      { step: 1, title: "Space Assessment", description: "Assess room acoustics and lighting." },
      { step: 2, title: "Solution Design", description: "Select equipment and layout." },
    ],
    faqs: [
      { question: "Can we use Zoom/Teams?", answer: "Yes, our systems are certified for both." },
      { question: "Do you provide training?", answer: "Yes, comprehensive user training included." },
    ],
    partners: ["PeopleLink", "BenQ", "Logitech"],
    warranty: "2-3 years manufacturer warranty",
    certifications: ["Teams Certified", "Zoom Certified"],
    brochureLink: "/brochures/collaboration.pdf",
  },

  'cybersecurity-software': {
    title: "Cybersecurity Software",
    subtitle: "Enterprise Endpoint & Email Security",
    tagline: "Protecting every endpoint, every email, every file.",
    description: "Safeguard your digital assets with our comprehensive suite of licensed cybersecurity software. We provide enterprise-grade antivirus, endpoint detection and response (EDR), email security, data loss prevention (DLP), and mobile device management (MDM) solutions to protect against modern cyber threats. Our multi-layered security approach combines signature-based detection, behavioral analysis, machine learning, and threat intelligence to defend against viruses, malware, ransomware, phishing, and zero-day exploits.",
    extendedDescription: "Endpoint devices are primary targets. Our software solutions provide real-time protection, continuous monitoring, and automated threat response to secure every device in your organization. We deploy solutions from industry leaders like Kaspersky, Bitdefender, Trend Micro, Sophos, and Microsoft Defender for Endpoint with centralized management consoles for full visibility and control.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&q=80&w=1920",
    features: [
      { name: "Endpoint Antivirus", icon: <ShieldCheck />, desc: "Real-time malware protection" },
      { name: "Email Security", icon: <Mail />, desc: "Anti-phishing & anti-spam" },
      { name: "Data Loss Prevention", icon: <HardDrive />, desc: "Prevent data exfiltration" },
      { name: "EDR (Endpoint Detection)", icon: <Server />, desc: "Advanced threat hunting" },
      { name: "Mobile Security", icon: <Phone />, desc: "iOS & Android protection" },
      { name: "Threat Intelligence", icon: <Globe />, desc: "Global threat feeds" },
    ],
    keyBenefits: [
      { text: "Protect against viruses and ransomware", icon: <ShieldCheck /> },
      { text: "Prevent sensitive data leaks", icon: <Lock /> },
      { text: "Secure against phishing attacks", icon: <Mail /> },
      { text: "Ensure compliance (GDPR, HIPAA)", icon: <FileText /> },
      { text: "Reduce security incidents", icon: <TrendingUp /> },
      { text: "Simplify security management", icon: <Settings /> },
    ],
    technicalSpecs: [
      { category: "Protection", items: ["Anti-virus, Anti-ransomware", "EDR capabilities"] },
      { category: "Email", items: ["Anti-spam, Anti-phishing", "Sandboxing"] },
    ],
    useCases: [
      { industry: "Enterprises", icon: <Building />, description: "Protect endpoints and servers." },
      { industry: "Financial", icon: <Lock />, description: "Advanced threat protection." },
    ],
    deploymentProcess: [
      { step: 1, title: "Assessment", description: "Evaluate security posture." },
      { step: 2, title: "Selection", description: "Recommend software solutions." },
    ],
    faqs: [
      { question: "Antivirus vs EDR?", answer: "EDR offers advanced behavior analysis and response." },
      { question: "Does it slow down PCs?", answer: "No, optimized for minimal impact." },
    ],
    partners: ["Kaspersky", "Bitdefender", "Sophos"],
    warranty: "Annual subscription",
    certifications: ["AV-Test Certified"],
    brochureLink: "/brochures/cybersecurity.pdf",
  },
};

// --- REUSABLE COMPONENTS ---
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
  const [isOpen, setIsOpen] = useState(false);
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

  const { title, subtitle, tagline, description, extendedDescription, image, features, keyBenefits, technicalSpecs, useCases, deploymentProcess, faqs, partners, warranty, certifications, brochureLink } = product;

  return (
    <div className="w-full bg-white">
      {/* Enquiry Modal */}
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
              
              {/* ✅ CHANGED: Link to Button - Opens Modal */}
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