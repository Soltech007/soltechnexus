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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
  };

  const [formData, setFormData] = useState(initialFormState);
  const [showCustomState, setShowCustomState] = useState(false);
  const [showCustomCity, setShowCustomCity] = useState(false);
  const [customState, setCustomState] = useState("");
  const [customCity, setCustomCity] = useState("");
  const [availableCities, setAvailableCities] = useState<string[]>([]);

  // Prevent background scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

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
    e.preventDefault();

    if (!formData.firstName || !formData.email) {
      toast.error("Name and Email are required");
      return;
    }

    setLoading(true);

    // ✅ Final Data with Product Page info
    const finalFormData = {
      ...formData,
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
        setSuccess(true);
        toast.success("Inquiry Sent Successfully!");
        setTimeout(() => {
          onClose();
          setSuccess(false);
          setFormData(initialFormState);
          setShowCustomState(false);
          setShowCustomCity(false);
          setCustomState("");
          setCustomCity("");
        }, 2500);
      } else {
        toast.error(data.error || "Submission failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl bg-white border rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Close Button */}
            <div className="absolute right-4 top-4 z-10">
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600 hover:text-gray-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 sm:p-8 overflow-y-auto">
              {success ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                  <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold">Thank You!</h3>
                  <p className="text-gray-600">
                    We have received your inquiry regarding <br />
                    <span className="font-semibold text-primary-500">{pageContext}</span>.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6 pr-8">
                    <h3 className="text-2xl font-bold">Get a Quote</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Product: <span className="text-primary-500 font-semibold">{pageContext}</span>
                    </p>
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
                            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
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
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
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
                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="website">Website (Optional)</Label>
                          <Input
                            id="website"
                            type="url"
                            placeholder="https://yourcompany.com"
                            value={formData.website}
                            onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Organization Info */}
                    <div>
                      <h4 className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider border-b pb-1">Organization & Location</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor="company">Organization Name</Label>
                          <Input
                            id="company"
                            placeholder="Company Name"
                            value={formData.company}
                            onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="industry">Industry</Label>
                          <select
                            id="industry"
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                            value={formData.industry}
                            onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
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
                            onChange={(e) => setFormData(prev => ({ ...prev, noOfEmployees: e.target.value }))}
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

                    <button
                      disabled={loading}
                      type="submit"
                      className="w-full btn-primary h-12 text-base mt-4 flex items-center justify-center gap-2"
                    >
                      {loading ? <Loader2 className="animate-spin h-5 w-5" /> : null}
                      {loading ? 'Submitting...' : 'Submit Request'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- COMPREHENSIVE PRODUCT DATABASE ---
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
      { category: "Camera Specifications", items: [
        "Resolution: Up to 4K Ultra HD (3840 × 2160)",
        "Sensor: 1/2.8\" Progressive Scan CMOS",
        "Frame Rate: Up to 30fps at 4K, 60fps at 1080p",
        "Night Vision: IR range up to 100m",
        "Weather Rating: IP67/IP66 outdoor rated",
        "Field of View: 90° - 180° (depending on model)"
      ]},
      { category: "Storage & Recording", items: [
        "Storage Capacity: 2TB - 128TB expandable",
        "Recording Modes: Continuous, Motion-based, Scheduled",
        "Compression: H.265+/H.264+ for bandwidth efficiency",
        "Retention: 30-365 days (configurable)",
        "RAID Support: RAID 0, 1, 5, 6, 10 for data protection"
      ]},
      { category: "Network & Connectivity", items: [
        "Connectivity: PoE (Power over Ethernet), WiFi, 4G LTE",
        "Protocols: ONVIF, RTSP, HTTP, HTTPS",
        "Bandwidth: Adaptive bitrate streaming",
        "Remote Access: Web, iOS, Android apps",
        "Integration: Open API for third-party systems"
      ]},
      { category: "Intelligence & Analytics", items: [
        "AI Features: Facial recognition, people counting, heat mapping",
        "Behavioral Analytics: Loitering detection, line crossing, intrusion detection",
        "Vehicle Analytics: License plate recognition (LPR), vehicle counting",
        "Alert System: Email, SMS, push notifications, siren activation"
      ]}
    ],

    useCases: [
      { industry: "Corporate Offices", icon: <Building />, description: "Monitor entrances, parking lots, and sensitive areas. Track employee access and protect intellectual property." },
      { industry: "Educational Institutions", icon: <GraduationCap />, description: "Ensure student safety across campuses, prevent bullying, and monitor campus perimeter 24/7." },
      { industry: "Government Facilities", icon: <Landmark />, description: "High-security surveillance for critical infrastructure, public spaces, and restricted government areas." },
      { industry: "Retail & Commercial", icon: <Building />, description: "Prevent shoplifting, monitor customer behavior, and analyze foot traffic patterns for business intelligence." },
    ],

    deploymentProcess: [
      { step: 1, title: "Site Survey & Assessment", description: "Our experts visit your facility to assess security vulnerabilities, identify camera placement zones, and design optimal coverage." },
      { step: 2, title: "System Design & Proposal", description: "We create a detailed system design with camera layouts, network diagrams, and hardware specifications tailored to your needs." },
      { step: 3, title: "Installation & Configuration", description: "Professional installation of all cameras, NVRs, cabling, and network equipment with minimal disruption to operations." },
      { step: 4, title: "Testing & Commissioning", description: "Comprehensive testing of all components, video quality verification, and analytics calibration." },
      { step: 5, title: "Training & Handover", description: "Complete staff training on system operation, mobile apps, and emergency procedures." },
      { step: 6, title: "Ongoing Support & Maintenance", description: "24/7 technical support, regular maintenance, firmware updates, and annual health checks." },
    ],

   faqs: [
      { question: "What is the difference between IP cameras and analog CCTV?", answer: "IP cameras transmit digital video over a network, offering higher resolution (up to 4K), remote access, and advanced analytics. Analog CCTV uses coaxial cables and provides lower resolution. IP systems are more scalable and flexible." },
      { question: "How long can video footage be stored?", answer: "Storage duration depends on camera resolution, frame rate, and total storage capacity. Typically, we configure systems for 30-90 days of retention. With H.265+ compression and large NVRs, we can achieve 6+ months of storage." },
      { question: "Can I access cameras remotely from my phone?", answer: "Yes! Our systems include free mobile apps for iOS and Android, allowing you to view live and recorded footage, receive alerts, and control PTZ cameras from anywhere with internet access." },
      { question: "Do you provide installation and maintenance?", answer: "Absolutely. We provide end-to-end service including site survey, professional installation, configuration, staff training, and ongoing AMC support with 24/7 helpdesk." },
      { question: "Are the systems scalable for future expansion?", answer: "Yes, all our systems are designed for easy expansion. You can add more cameras, upgrade storage, and integrate with access control and alarm systems as your needs grow." },
    ],

    partners: ["PeopleLink", "BenQ", "Panasonic", "Hikvision", "Dahua"],
    warranty: "3-5 years manufacturer warranty with lifetime technical support",
    certifications: ["ISO 9001:2015", "CE Certified", "FCC Compliant", "ONVIF Profile S"],
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
      { text: "Ensure 99.9% network uptime with redundant, fault-tolerant architecture", icon: <Award /> },
      { text: "Maximize data throughput and speed with 10Gbps+ switching capacity", icon: <TrendingUp /> },
      { text: "Easily scale your network infrastructure as your business grows", icon: <Layers /> },
      { text: "Secure all data transmission with enterprise-grade encryption and access control", icon: <Lock /> },
      { text: "Reduce IT overhead with cloud-managed network solutions", icon: <Globe /> },
      { text: "Future-proof infrastructure supporting IoT, VoIP, and video", icon: <Zap /> },
    ],

    technicalSpecs: [
      { category: "Switches", items: [
        "Switching Capacity: 10Gbps to 100Gbps per port",
        "Port Density: 24-port to 48-port configurations",
        "Layer: Layer 2, Layer 3, and Layer 4 switching",
        "PoE Budget: Up to 740W PoE+ (802.3at/bt)",
        "Stacking: Up to 8 units for 384 ports",
        "Management: CLI, Web GUI, SNMP, Cloud-managed"
      ]},
      { category: "Routers", items: [
        "Throughput: 1Gbps to 100Gbps",
        "WAN Interfaces: Ethernet, Fiber, 4G/5G LTE",
        "Routing Protocols: OSPF, BGP, EIGRP, RIP",
        "VPN: IPSec, SSL, Site-to-Site, Remote Access",
        "QoS: Traffic shaping and prioritization",
        "Failover: Dual WAN with automatic failover"
      ]},
      { category: "Wireless Access Points", items: [
        "Standards: WiFi 6 (802.11ax), WiFi 6E",
        "Speed: Up to 9.6Gbps aggregate throughput",
        "Frequency: Dual-band (2.4GHz & 5GHz) and Tri-band (6GHz)",
        "Capacity: 200+ concurrent clients per AP",
        "Security: WPA3, 802.1X, MAC filtering",
        "Management: Cloud-managed, controller-based"
      ]},
      { category: "Cabling & Infrastructure", items: [
        "Cable Types: Cat6, Cat6a, Cat7, Fiber Optic",
        "Standards: TIA/EIA-568-B, ISO/IEC 11801",
        "Bandwidth: Up to 10Gbps over copper",
        "Distance: Up to 100m for copper, 10km+ for fiber",
        "Warranty: 25-year system warranty"
      ]}
    ],

    useCases: [
      { industry: "Corporate Headquarters", icon: <Building />, description: "High-density switching for hundreds of employees, secure VLANs for departments, and seamless WiFi roaming." },
      { industry: "Educational Campuses", icon: <GraduationCap />, description: "Campus-wide WiFi for students and staff, network segmentation for administration, and high-bandwidth for research labs." },
      { industry: "Government Buildings", icon: <Landmark />, description: "Secure, compliant network infrastructure for sensitive government operations with strict access controls." },
      { industry: "Data Centers", icon: <Server />, description: "High-throughput core switching, redundant uplinks, and fiber backbone for mission-critical applications." },
    ],

    deploymentProcess: [
      { step: 1, title: "Network Assessment", description: "We analyze your current network, identify bottlenecks, and assess bandwidth requirements for all applications." },
      { step: 2, title: "Architecture Design", description: "Our engineers design a scalable network topology with detailed diagrams, IP addressing schemes, and VLAN segmentation." },
      { step: 3, title: "Equipment Procurement", description: "We source all hardware from authorized Dell and Cisco distributors with genuine manufacturer warranties." },
      { step: 4, title: "Professional Installation", description: "Certified technicians install switches, routers, access points, and run Cat6a/fiber cabling to all endpoints." },
      { step: 5, title: "Configuration & Testing", description: "Complete network configuration including VLANs, routing, QoS, security policies, and performance testing." },
      { step: 6, title: "Documentation & Support", description: "Full network documentation, staff training, and 24/7 ongoing support with proactive monitoring." },
    ],

    faqs: [
      { question: "What is the difference between Layer 2 and Layer 3 switches?", answer: "Layer 2 switches operate at the data link layer and forward traffic based on MAC addresses within a LAN. Layer 3 switches include routing capabilities, allowing them to route traffic between different VLANs and subnets, providing better performance and network segmentation." },
      { question: "How many access points do I need for my office?", answer: "It depends on office size, layout, and user density. Generally, one WiFi 6 access point can cover 150-200 square meters and support 50-100 users. We conduct a site survey to determine optimal AP placement." },
      { question: "Can you upgrade our existing Cisco network?", answer: "Yes! We specialize in network upgrades and migrations. We can integrate new equipment with your existing Cisco infrastructure or plan a phased upgrade to minimize downtime." },
      { question: "Do you provide network management services?", answer: "Absolutely. We offer managed network services including 24/7 monitoring, proactive alerts, performance optimization, firmware updates, and remote troubleshooting." },
      { question: "What is PoE and why do I need it?", answer: "Power over Ethernet (PoE) delivers electrical power and data over a single Ethernet cable. It's essential for powering IP phones, wireless access points, IP cameras, and IoT devices without separate power outlets." },
    ],

    partners: ["Cisco", "Dell Technologies", "HPE Aruba", "Juniper Networks"],
    warranty: "Lifetime hardware warranty (Cisco) / 3-5 years (Dell)",
    certifications: ["Cisco Certified Partner", "Dell Authorized Reseller", "ISO 27001"],
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
      { text: "Centralize and protect critical business data with enterprise-grade storage", icon: <HardDrive /> },
      { text: "Ensure business continuity with robust backup, replication, and disaster recovery", icon: <ShieldCheck /> },
      { text: "Optimize performance for demanding applications like databases and ERP systems", icon: <TrendingUp /> },
      { text: "Build a future-proof and scalable IT foundation that grows with your business", icon: <Layers /> },
      { text: "Reduce hardware costs through server virtualization and consolidation", icon: <Server /> },
      { text: "Simplify management with integrated monitoring and automation tools", icon: <Settings /> },
    ],

    technicalSpecs: [
      { category: "Server Specifications", items: [
        "Processors: Intel Xeon Scalable (Bronze, Silver, Gold, Platinum)",
        "RAM: Up to 1TB DDR4/DDR5 ECC memory",
        "Storage: Hot-swappable SAS, SATA, NVMe drives",
        "Form Factor: 1U/2U rack, tower, blade chassis",
        "Expansion: PCIe Gen 4 slots for GPUs and HBAs",
        "Management: iDRAC9 with remote console and monitoring"
      ]},
      { category: "Storage Arrays", items: [
        "Capacity: 10TB to multi-petabyte configurations",
        "Drive Types: HDD, SSD, NVMe all-flash arrays",
        "RAID Levels: 0, 1, 5, 6, 10, 50, 60",
        "Connectivity: iSCSI, Fibre Channel, NFS, SMB",
        "Performance: Up to 500,000 IOPS (NVMe)",
        "Data Protection: Snapshots, replication, deduplication, compression"
      ]},
      { category: "Backup & Recovery", items: [
        "Backup Types: Full, Incremental, Differential",
        "Targets: Disk, tape, cloud (AWS, Azure)",
        "Software: Veeam, Commvault, Dell EMC Avamar",
        "Recovery Time: Minutes to hours (RPO/RTO)",
        "Deduplication: Up to 50:1 ratio",
        "Retention: Configurable policies (days to years)"
      ]},
      { category: "Virtualization", items: [
        "Hypervisors: VMware vSphere, Microsoft Hyper-V, Citrix XenServer",
        "VM Density: 20-100+ VMs per physical server",
        "Live Migration: vMotion, Hyper-V Live Migration",
        "Resource Management: DRS, HA clustering",
        "Storage: VMFS, vSAN, Storage Spaces Direct"
      ]}
    ],

    useCases: [
      { industry: "Enterprise IT Departments", icon: <Building />, description: "Host ERP, CRM, email servers, file shares, and internal applications with high performance and availability." },
      { industry: "Education & Research", icon: <GraduationCap />, description: "High-performance computing for research workloads, student portals, and administrative systems." },
      { industry: "Healthcare", icon: <ShieldCheck />, description: "Secure, HIPAA-compliant storage for patient records, PACS imaging, and medical applications." },
      { industry: "Finance & Banking", icon: <Lock />, description: "Mission-critical databases, transaction processing, and secure data vaults for financial institutions." },
    ],

    deploymentProcess: [
      { step: 1, title: "Workload Assessment", description: "We analyze your applications, databases, and storage requirements to determine the right server and storage configuration." },
      { step: 2, title: "Architecture Planning", description: "Design a scalable architecture with redundancy, backup strategies, and disaster recovery planning." },
      { step: 3, title: "Hardware Delivery", description: "Procure Dell PowerEdge servers and EMC storage with factory configuration and burn-in testing." },
      { step: 4, title: "Data Center Setup", description: "Professional installation in your data center or server room with rack mounting, cabling, and power configuration." },
      { step: 5, title: "OS & Application Deployment", description: "Install operating systems (Windows Server, Linux), configure RAID, and deploy your applications." },
      { step: 6, title: "Backup & Monitoring", description: "Configure automated backups, monitoring alerts, and provide ongoing management and support." },
    ],

    faqs: [
      { question: "What is the difference between NAS and SAN storage?", answer: "NAS (Network Attached Storage) is file-level storage accessible over Ethernet using protocols like NFS/SMB. SAN (Storage Area Network) is block-level storage using Fibre Channel or iSCSI, typically faster and used for databases and VMs. We help you choose based on your applications." },
      { question: "How many VMs can I run on a single server?", answer: "It depends on server specs and VM workloads. A dual-socket Dell PowerEdge R750 with 256GB RAM can comfortably host 20-40 VMs for typical business applications. High-density servers can support 100+ lightweight VMs." },
      { question: "Do you provide backup solutions?", answer: "Yes! We offer complete backup solutions using Veeam, Commvault, or Dell EMC Avamar with local disk backup, tape libraries, and cloud replication to AWS/Azure for offsite protection." },
      { question: "Can servers be hosted in your data center?", answer: "We primarily deploy on-premise infrastructure, but we can help you design hybrid solutions that combine on-premise servers with cloud hosting (colocation or IaaS) for flexibility." },
      { question: "What is the typical server lifespan?", answer: "Enterprise servers typically have a 5-year lifespan with manufacturer support. We recommend refresh cycles every 4-5 years to maintain performance, efficiency, and vendor support." },
    ],

    partners: ["Dell Technologies", "Dell EMC", "VMware", "Microsoft", "Veeam"],
    warranty: "3-5 years ProSupport with 4-hour onsite response",
    certifications: ["Dell Authorized Partner", "VMware Partner", "Microsoft Gold Partner"],
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
      { text: "Prevent unauthorized network access with stateful inspection and access control lists", icon: <Lock /> },
      { text: "Block malware, ransomware, and viruses at the network perimeter before they reach endpoints", icon: <ShieldCheck /> },
      { text: "Securely connect remote employees, branch offices, and mobile workers with VPN", icon: <Users /> },
      { text: "Gain deep visibility into network traffic, applications, and user behavior", icon: <TrendingUp /> },
      { text: "Meet compliance requirements (PCI DSS, HIPAA, GDPR) with detailed logging and reporting", icon: <FileText /> },
      { text: "Reduce security complexity with unified management of all security functions", icon: <Settings /> },
    ],

    technicalSpecs: [
      { category: "Firewall Performance", items: [
        "Throughput: 100Mbps to 100Gbps (model dependent)",
        "Firewall Throughput: Up to 80Gbps",
        "IPS Throughput: Up to 40Gbps",
        "VPN Throughput: Up to 20Gbps",
        "Concurrent Sessions: 1 million to 10 million+",
        "New Sessions/sec: Up to 500,000"
      ]},
      { category: "VPN Capabilities", items: [
        "VPN Types: SSL VPN, IPSec VPN, Site-to-Site, Remote Access",
        "Concurrent Users: 10 to 10,000+ (license-based)",
        "Encryption: AES-256, 3DES, SHA-2",
        "Authentication: RADIUS, LDAP, Active Directory, 2FA",
        "Split Tunneling: Supported",
        "Mobile VPN: iOS, Android, Windows, macOS clients"
      ]},
      { category: "Security Features", items: [
        "Threat Prevention: IPS, Anti-malware, Anti-botnet, Anti-spam",
        "Application Control: Identify and control 5,000+ applications",
        "Web Filtering: URL categorization, content filtering",
        "SSL Inspection: Decrypt HTTPS traffic for deep inspection",
        "Sandboxing: Analyze suspicious files in isolated environment",
        "Threat Intelligence: Real-time feeds from global security labs"
      ]},
      { category: "Management & Reporting", items: [
        "Management: Centralized cloud console or on-premise controller",
        "Interfaces: Web GUI, CLI, REST API",
        "Logging: Syslog, SIEM integration (Splunk, QRadar)",
        "Reporting: Traffic, security events, compliance reports",
        "High Availability: Active-Active, Active-Passive clustering",
        "Updates: Automatic signature and firmware updates"
      ]}
    ],

    useCases: [
      { industry: "Corporate Networks", icon: <Building />, description: "Protect headquarters and branch offices with enterprise firewalls, secure VPN for remote workers, and application control." },
      { industry: "Educational Institutions", icon: <GraduationCap />, description: "Web filtering for students, network segmentation, and protection against malware and cyber bullying." },
      { industry: "Government Agencies", icon: <Landmark />, description: "High-security firewalls for classified networks, compliance with government cybersecurity mandates." },
      { industry: "Healthcare Organizations", icon: <ShieldCheck />, description: "HIPAA-compliant network security, protect patient data, and secure medical devices and IoT." },
    ],

    deploymentProcess: [
      { step: 1, title: "Security Assessment", description: "Comprehensive network security audit to identify vulnerabilities, open ports, and existing security gaps." },
      { step: 2, title: "Firewall Design", description: "Design security policies, firewall rules, VPN architecture, and network segmentation strategy." },
      { step: 3, title: "Hardware Deployment", description: "Install firewall appliances at network perimeter and internal segmentation points with high-availability configuration." },
      { step: 4, title: "Policy Configuration", description: "Configure firewall rules, IPS signatures, application control policies, VPN settings, and threat prevention." },
      { step: 5, title: "Testing & Validation", description: "Conduct penetration testing, validate all security policies, and ensure no disruption to business applications." },
      { step: 6, title: "Monitoring & Management", description: "24/7 security monitoring, log analysis, threat response, and regular policy updates." },
    ],

    faqs: [
      { question: "What is a Next-Generation Firewall (NGFW)?", answer: "An NGFW goes beyond traditional port/protocol inspection and includes application awareness, integrated intrusion prevention, SSL inspection, and advanced threat protection. It can identify and control applications regardless of port, user, or device." },
      { question: "Do I need a firewall if I already have antivirus?", answer: "Yes! Antivirus protects individual endpoints, while firewalls protect the entire network perimeter. A layered security approach (firewall + antivirus + IPS) provides the best protection against modern threats." },
      { question: "Can the firewall support remote workers?", answer: "Absolutely. Our firewalls include SSL VPN and IPSec VPN capabilities to securely connect remote employees to corporate resources from anywhere in the world." },
      { question: "How often are security signatures updated?", answer: "Firewall security signatures are updated automatically in real-time (hourly or daily) from vendor threat intelligence labs to protect against the latest threats and vulnerabilities." },
      { question: "Can you integrate with our existing SIEM?", answer: "Yes, our firewalls support syslog export and integrate with popular SIEM platforms like Splunk, IBM QRadar, and ArcSight for centralized security event management." },
    ],

    partners: ["Fortinet", "Palo Alto Networks", "Cisco", "SonicWall", "Check Point"],
    warranty: "3-5 years hardware warranty with security subscription",
    certifications: ["Common Criteria EAL4+", "ICSA Certified", "PCI DSS Compliant", "FIPS 140-2"],
    brochureLink: "/brochures/firewalls.pdf",
  },

  'collaboration-tools': {
    title: "Collaboration & Conferencing Tools",
    subtitle: "Unified Communications for Hybrid Work",
    tagline: "Connecting your teams, wherever they are.",
    description: "Equip your hybrid workforce with state-of-the-art collaboration tools from PeopleLink, BenQ, and Panasonic. From 4K interactive displays and video conferencing systems to wireless presentation tools and digital whiteboards, we create immersive and productive meeting environments that rival in-person collaboration. Whether you're running a boardroom meeting, hosting a training session, or connecting remote teams, our solutions deliver crystal-clear audio, stunning video, and seamless integration with Microsoft Teams, Zoom, and Google Meet.",
    extendedDescription: "The modern workplace is hybrid—employees work from offices, homes, and on the go. Effective collaboration requires more than just a webcam and microphone. Our enterprise collaboration solutions include professional-grade video conferencing systems with AI-powered cameras that auto-frame speakers, beamforming microphone arrays that eliminate background noise, 4K interactive displays for content sharing, wireless presentation systems, and room scheduling panels. We design, install, and configure complete collaboration spaces from small huddle rooms to large auditoriums.",
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
      { text: "Improve team productivity and engagement with seamless collaboration across locations", icon: <Users /> },
      { text: "Reduce travel costs by 60% with high-quality remote meetings that feel like face-to-face", icon: <TrendingUp /> },
      { text: "Facilitate dynamic brainstorming sessions with interactive whiteboards and annotation", icon: <Layers /> },
      { text: "Present with clarity and professionalism using 4K displays and wireless sharing", icon: <Monitor /> },
      { text: "Simplify IT management with cloud-managed devices and centralized control", icon: <Settings /> },
      { text: "Enhance hybrid work with equitable meeting experiences for remote and in-office participants", icon: <Globe /> },
    ],

    technicalSpecs: [
      { category: "Video Conferencing Systems", items: [
        "Camera: 4K Ultra HD, 12x optical zoom PTZ",
        "AI Features: Speaker tracking, auto-framing, gesture recognition",
        "Field of View: Up to 120° wide-angle",
        "Frame Rate: 60fps for smooth motion",
        "Outputs: HDMI, USB-C, IP streaming",
        "Control: Remote control, mobile app, touch panel"
      ]},
      { category: "Interactive Displays", items: [
        "Screen Size: 55\", 65\", 75\", 86\" diagonal",
        "Resolution: 4K Ultra HD (3840 × 2160)",
        "Touch Technology: Infrared or capacitive multi-touch (20+ points)",
        "Brightness: 350-450 cd/m²",
        "Built-in: Android OS, whiteboarding apps, screen mirroring",
        "Connectivity: HDMI, USB-C, wireless casting"
      ]},
      { category: "Audio Systems", items: [
        "Microphones: Beamforming arrays, 360° pickup up to 6m",
        "Speakers: Full-range with subwoofer, DSP echo cancellation",
        "Acoustic Technologies: Noise suppression, automatic gain control",
        "Connectivity: USB, Bluetooth, PoE",
        "Expansion: Daisy-chain up to 4 microphones",
        "Compatibility: Certified for Zoom, Teams, Google Meet"
      ]},
      { category: "Platform Integration", items: [
        "Platforms: Microsoft Teams, Zoom Rooms, Google Meet, Webex",
        "Room Systems: Teams Rooms, Zoom Rooms appliances",
        "Calendaring: Outlook, Google Calendar integration",
        "Single Sign-On: Azure AD, Google Workspace",
        "Management: Cloud-based device management portals",
        "Updates: Automatic firmware and software updates"
      ]}
    ],

    useCases: [
      { industry: "Corporate Boardrooms", icon: <Building />, description: "Executive meeting spaces with 86\" displays, PTZ cameras, premium audio, and seamless Teams/Zoom integration." },
      { industry: "Educational Classrooms", icon: <GraduationCap />, description: "Interactive displays for smart classrooms, remote learning, and hybrid lectures with content annotation." },
      { industry: "Healthcare Telemedicine", icon: <ShieldCheck />, description: "HIPAA-compliant video conferencing for patient consultations, medical training, and multi-site collaboration." },
      { industry: "Hybrid Workspaces", icon: <Users />, description: "Huddle rooms and open collaboration zones for agile teams with plug-and-play video and wireless sharing." },
    ],

    deploymentProcess: [
      { step: 1, title: "Space Assessment", description: "Our AV consultants visit your office to assess room dimensions, lighting, acoustics, and usage patterns." },
      { step: 2, title: "Solution Design", description: "Design custom collaboration spaces with equipment selection, layout diagrams, and integration with your UC platform." },
      { step: 3, title: "Equipment Installation", description: "Professional installation of displays, cameras, microphones, speakers, cabling, and rack equipment." },
      { step: 4, title: "Platform Integration", description: "Configure Microsoft Teams Rooms, Zoom Rooms, or Google Meet hardware with your organization's account." },
      { step: 5, title: "User Training", description: "Conduct hands-on training for employees and IT staff on operating the systems and troubleshooting." },
      { step: 6, title: "Managed Services", description: "Ongoing monitoring, firmware updates, helpdesk support, and proactive maintenance." },
    ],

    faqs: [
      { question: "What is the difference between a webcam and a professional video conferencing system?", answer: "Professional systems include PTZ cameras with optical zoom and AI tracking, high-quality speakerphones with echo cancellation, and dedicated room appliances for reliability. Webcams are designed for individual use with lower quality and no room-scale features." },
      { question: "Can we use our existing Microsoft Teams/Zoom accounts?", answer: "Yes! Our systems are certified for Microsoft Teams, Zoom, and Google Meet. We configure devices with your existing subscriptions and user accounts." },
      { question: "How many people can join a video conference?", answer: "It depends on your software plan. Zoom and Teams support 100-1,000+ participants. Our hardware is designed for meeting rooms with 4-20 in-room participants connecting to any number of remote participants." },
      { question: "Do you provide training for our staff?", answer: "Absolutely. We provide comprehensive training including system operation, troubleshooting basics, and best practices for hybrid meetings. Training can be in-person or virtual." },
      { question: "What is the difference between huddle rooms and boardrooms?", answer: "Huddle rooms are small collaboration spaces (4-6 people) with compact displays and USB conferencing devices. Boardrooms are large formal spaces (10-20 people) with professional PTZ cameras, ceiling microphones, and large displays." },
    ],

    partners: ["PeopleLink", "BenQ", "Panasonic", "Logitech", "Poly", "Yealink"],
    warranty: "2-3 years manufacturer warranty with extended service options",
    certifications: ["Microsoft Teams Certified", "Zoom Certified", "Google Meet Certified"],
    brochureLink: "/brochures/collaboration.pdf",
  },

  'cybersecurity-software': {
    title: "Cybersecurity Software",
    subtitle: "Enterprise Endpoint & Email Security",
    tagline: "Protecting every endpoint, every email, every file.",
    description: "Safeguard your digital assets with our comprehensive suite of licensed cybersecurity software. We provide enterprise-grade antivirus, endpoint detection and response (EDR), email security, data loss prevention (DLP), and mobile device management (MDM) solutions to protect against modern cyber threats. Our multi-layered security approach combines signature-based detection, behavioral analysis, machine learning, and threat intelligence to defend against viruses, malware, ransomware, phishing, and zero-day exploits.",
    extendedDescription: "Endpoint devices—laptops, desktops, servers, and mobile devices—are the primary targets for cyberattacks. A single compromised endpoint can lead to data breaches, ransomware infections, and network-wide compromises. Our cybersecurity software solutions provide real-time protection, continuous monitoring, and automated threat response to secure every device in your organization. We deploy solutions from industry leaders like Kaspersky, Bitdefender, Trend Micro, Sophos, and Microsoft Defender for Endpoint with centralized management consoles for full visibility and control.",
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
      { text: "Protect against viruses, malware, ransomware, and zero-day exploits with multi-layered defenses", icon: <ShieldCheck /> },
      { text: "Prevent sensitive data from leaving your network through USB, email, or cloud uploads", icon: <Lock /> },
      { text: "Secure your organization from phishing attacks and business email compromise (BEC)", icon: <Mail /> },
      { text: "Ensure compliance with data protection regulations (GDPR, HIPAA, PCI DSS)", icon: <FileText /> },
      { text: "Reduce security incidents by 70% with proactive threat detection and response", icon: <TrendingUp /> },
      { text: "Simplify security management with centralized dashboards and automated updates", icon: <Settings /> },
    ],

    technicalSpecs: [
      { category: "Endpoint Protection", items: [
        "Detection Methods: Signature-based, heuristic, behavioral, machine learning",
        "Protection: Anti-virus, anti-malware, anti-ransomware, anti-spyware",
        "Platforms: Windows, macOS, Linux, Windows Server",
        "Performance: Minimal CPU/RAM impact (<5%)",
        "Updates: Real-time signature updates from cloud",
        "Quarantine: Automatic isolation and remediation"
      ]},
      { category: "Email Security", items: [
        "Threat Protection: Anti-phishing, anti-spam, anti-spoofing, attachment scanning",
        "Detection Rate: 99.9% spam and phishing detection",
        "Sandboxing: Analyze suspicious attachments in isolated environment",
        "URL Filtering: Block malicious and phishing links",
        "Encryption: TLS encryption, S/MIME, PGP support",
        "Platforms: Office 365, Google Workspace, on-premise Exchange"
      ]},
      { category: "Data Loss Prevention", items: [
        "Monitoring: USB devices, email, cloud storage, web uploads",
        "Policies: Predefined templates for PCI, HIPAA, GDPR compliance",
        "Detection: Content inspection, keyword matching, file fingerprinting",
        "Actions: Block, alert, encrypt, quarantine sensitive data",
        "Reports: Detailed incident logs and compliance reports",
        "Integration: SIEM, CASB, cloud platforms"
      ]},
      { category: "EDR & Threat Hunting", items: [
        "Visibility: Real-time endpoint activity monitoring",
        "Detection: Behavioral analysis, anomaly detection, IoC matching",
        "Response: Automated containment, remote remediation, rollback",
        "Forensics: Timeline analysis, root cause investigation",
        "Threat Intelligence: Integration with global threat feeds",
        "MITRE ATT&CK: Mapping to attack frameworks"
      ]}
    ],

    useCases: [
      { industry: "Corporate Enterprises", icon: <Building />, description: "Protect thousands of endpoints, servers, and email accounts with centralized management and compliance reporting." },
      { industry: "Healthcare Organizations", icon: <ShieldCheck />, description: "HIPAA-compliant endpoint security, email encryption, and DLP to protect patient health records." },
      { industry: "Financial Institutions", icon: <Lock />, description: "Advanced threat protection for banking applications, customer data, and regulatory compliance." },
      { industry: "Educational Institutions", icon: <GraduationCap />, description: "Secure student and faculty devices, prevent malware, and comply with student data privacy laws." },
    ],

    deploymentProcess: [
      { step: 1, title: "Security Assessment", description: "Evaluate your current security posture, identify gaps, and assess endpoint vulnerabilities." },
      { step: 2, title: "Software Selection", description: "Recommend the right cybersecurity software based on your threat landscape, compliance needs, and budget." },
      { step: 3, title: "Licensing & Procurement", description: "Procure licensed software with volume discounts and multi-year subscriptions." },
      { step: 4, title: "Deployment & Installation", description: "Deploy endpoint agents, configure management consoles, and establish security policies." },
      { step: 5, title: "Policy Configuration", description: "Create custom policies for antivirus scans, email filtering, DLP rules, and device control." },
      { step: 6, title: "Monitoring & Management", description: "24/7 security monitoring, threat alerts, incident response, and quarterly security reviews." },
    ],

    faqs: [
      { question: "What is the difference between antivirus and EDR?", answer: "Antivirus (AV) provides signature-based protection against known malware. EDR (Endpoint Detection and Response) uses behavioral analysis and threat intelligence to detect unknown threats, provides forensic capabilities, and enables threat hunting. EDR is more advanced and comprehensive." },
      { question: "Can cybersecurity software slow down my computers?", answer: "Modern endpoint security solutions are optimized for minimal performance impact. Our recommended solutions use less than 5% CPU and RAM, and many use cloud-based scanning to reduce local resource usage." },
      { question: "Do you provide email security for Office 365/Google Workspace?", answer: "Yes! We deploy advanced email security solutions that integrate with Office 365 and Google Workspace to provide additional layers of protection beyond the built-in security features." },
      { question: "How does Data Loss Prevention (DLP) work?", answer: "DLP monitors data in use (on endpoints), data in motion (network/email), and data at rest (file servers). It uses policies to detect sensitive information (credit cards, SSNs, health records) and can block, encrypt, or alert when unauthorized data transfer is attempted." },
      { question: "Is cybersecurity software enough, or do I need a firewall too?", answer: "You need both! Firewalls protect the network perimeter, while endpoint security protects individual devices. A layered security approach (firewall + endpoint protection + email security) provides the best defense." },
    ],

    partners: ["Kaspersky", "Bitdefender", "Trend Micro", "Sophos", "Microsoft", "Symantec"],
    warranty: "Annual subscription with 24/7 technical support",
    certifications: ["AV-Test Certified", "NSS Labs Tested", "ICSA Labs Certified", "Common Criteria"],
    brochureLink: "/brochures/cybersecurity.pdf",
  },
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

  // ✅ STATE FOR QUOTE MODAL
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
    </div>
  );
}