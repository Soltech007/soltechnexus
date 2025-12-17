"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import toast from "react-hot-toast";
import {
  Handshake,
  Building2,
  User,
  Phone,
  Mail,
  Globe,
  MapPin,
  IndianRupee,
  ChevronDown,
  Check,
  Loader2,
  Sparkles,
  BadgeCheck,
  TrendingUp,
  Users,
  Building,
  FileText,
  Target,
  ArrowLeft,
  CheckCircle2,
  Shield,
  Network,
  Server,
  Cloud,
} from "lucide-react";

// ✅ Industries List (Updated for IT Infrastructure)
const industries = [
  "IT Services",
  "Software",
  "Technology",
  "Education",
  "Health Care",
  "Manufacturing",
  "Banking",
  "Financial Services",
  "Real Estate",
  "Retail & Wholesale",
  "E-Commerce",
  "Hospitality",
  "Government",
  "Data Centers",
  "Logistics & Warehousing",
  "Media & Entertainment",
  "Consulting",
  "Automotive",
  "Agriculture",
  "Chemical",
  "Other",
];

// ✅ Employee Ranges
const employeeRanges = [
  { value: "1-10", label: "1-10" },
  { value: "11-50", label: "11-50" },
  { value: "51-200", label: "51-200" },
  { value: "201-500", label: "201-500" },
  { value: "501-1000", label: "501-1000" },
  { value: "1000+", label: "1000+" },
];

// ✅ States and Cities
const statesAndCities: { [key: string]: string[] } = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati"],
  Delhi: ["New Delhi", "South Delhi", "North Delhi", "East Delhi"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Vapi", "Gandhinagar"],
  Karnataka: ["Bengaluru", "Mysuru", "Hubli", "Mangalore"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
  Telangana: ["Hyderabad", "Warangal", "Secunderabad"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Noida", "Ghaziabad", "Agra", "Varanasi"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur"],
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
  Punjab: ["Ludhiana", "Amritsar", "Chandigarh", "Jalandhar"],
  Haryana: ["Gurgaon", "Faridabad", "Panipat", "Karnal"],
  Kerala: ["Kochi", "Trivandrum", "Kozhikode"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior"],
  Bihar: ["Patna", "Gaya", "Muzaffarpur"],
  Odisha: ["Bhubaneswar", "Cuttack", "Rourkela"],
};
const statesList = Object.keys(statesAndCities).sort();

// ✅ Benefits Data - Updated for SOLTECH Nexus
const channelPartnerBenefits = [
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: "High Revenue Share",
    desc: "Up to 40% margin on IT solutions",
  },
  {
    icon: <BadgeCheck className="w-5 h-5" />,
    title: "Authorized Partner",
    desc: "Official SOLTECH certification",
  },
  {
    icon: <Network className="w-5 h-5" />,
    title: "Premium Products",
    desc: "Dell, Cisco, Microsoft portfolio",
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "Technical Support",
    desc: "24/7 dedicated partner support",
  },
];

const salesPartnerBenefits = [
  {
    icon: <IndianRupee className="w-5 h-5" />,
    title: "Attractive Commission",
    desc: "Earn on every successful deal",
  },
  {
    icon: <Target className="w-5 h-5" />,
    title: "No Investment",
    desc: "Start with zero investment",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Full Support",
    desc: "We handle everything end-to-end",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Growth Path",
    desc: "Scale to Channel Partner level",
  },
];

// ✅ Partner Type Options - Updated for SOLTECH Nexus
const partnerTypes = [
  {
    id: "channel",
    title: "Channel Partner",
    icon: <Building2 className="w-8 h-8" />,
    description: "You generate invoices, we provide IT solutions",
    features: [
      "Generate your own sales invoices",
      "Access to Dell, Cisco, Microsoft products",
      "Higher margins & exclusive partner pricing",
      "Requires GST registration",
    ],
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-600",
  },
  {
    id: "sales",
    title: "Sales Partner",
    icon: <Target className="w-8 h-8" />,
    description: "We generate invoices, you earn commission per deal",
    features: [
      "SOLTECH Nexus generates all invoices",
      "Commission paid as per partner policy",
      "No GST registration required",
      "Perfect for individuals & freelancers",
    ],
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-600",
  },
];

// ✅ Custom Input Style
const inputClassName =
  "h-11 rounded-lg bg-white focus:ring-primary/20 shadow-sm border-slate-200";
const selectClassName =
  "flex h-11 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-sm";

export default function ChannelPartnerPage() {
  const [selectedPartnerType, setSelectedPartnerType] = useState<
    "channel" | "sales" | null
  >(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // ✅ Form Data State
  const initialFormState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    website: "",
    industry: "",
    noOfEmployees: "",
    state: "",
    city: "",
    gstNumber: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [gstError, setGstError] = useState("");

  // Location States
  const [showCustomState, setShowCustomState] = useState(false);
  const [showCustomCity, setShowCustomCity] = useState(false);
  const [customState, setCustomState] = useState("");
  const [customCity, setCustomCity] = useState("");
  const [availableCities, setAvailableCities] = useState<string[]>([]);

  useEffect(() => {
    if (
      formData.state &&
      formData.state !== "other" &&
      statesAndCities[formData.state]
    ) {
      setAvailableCities(statesAndCities[formData.state]);
      setShowCustomCity(false);
      setFormData((prev) => ({ ...prev, city: "" }));
    } else if (formData.state === "other") {
      setAvailableCities([]);
      setShowCustomCity(true);
    } else {
      setAvailableCities([]);
    }
  }, [formData.state]);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // ✅ GST Validation
  const validateGST = (value: string) => {
    if (!value) {
      setGstError("");
      return true;
    }

    if (value.length !== 15) {
      setGstError(`GST must be 15 characters (currently ${value.length})`);
      return false;
    }

    const gstRegex =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    if (!gstRegex.test(value.toUpperCase())) {
      setGstError("Invalid GST format (e.g., 22AAAAA0000A1Z5)");
      return false;
    }

    setGstError("");
    return true;
  };

  const handleGSTChange = (value: string) => {
    const upperValue = value.toUpperCase();
    handleChange("gstNumber", upperValue);
    validateGST(upperValue);
  };

  const handleStateChange = (value: string) => {
    if (value === "other") {
      setShowCustomState(true);
      setFormData((prev) => ({ ...prev, state: "other", city: "" }));
    } else {
      setShowCustomState(false);
      setCustomState("");
      setFormData((prev) => ({ ...prev, state: value, city: "" }));
    }
  };

  const handleCityChange = (value: string) => {
    if (value === "other") {
      setShowCustomCity(true);
      setFormData((prev) => ({ ...prev, city: "other" }));
    } else {
      setShowCustomCity(false);
      setCustomCity("");
      setFormData((prev) => ({ ...prev, city: value }));
    }
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setAgreed(false);
    setSelectedPartnerType(null);
    setFormSubmitted(false);
    setShowCustomState(false);
    setShowCustomCity(false);
    setCustomState("");
    setCustomCity("");
    setGstError("");
  };

  // ✅ SUBMIT HANDLER
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.email || !formData.phone) {
      toast.error("Please fill Name, Email and Phone.");
      return;
    }

    if (!agreed) {
      toast.error("Please agree to the terms and conditions.");
      return;
    }

    if (selectedPartnerType === "channel" && !formData.companyName) {
      toast.error("Company Name is required for Channel Partners.");
      return;
    }

    // GST Validation (if provided)
    if (formData.gstNumber && !validateGST(formData.gstNumber)) {
      toast.error("Please enter a valid GST Number.");
      return;
    }

    try {
      setSubmitting(true);

      const finalState = showCustomState ? customState : formData.state;
      const finalCity = showCustomCity ? customCity : formData.city;

      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        company: formData.companyName,
        website: formData.website,
        industry: formData.industry,
        noOfEmployees: formData.noOfEmployees,
        state: finalState,
        city: finalCity,
        gstNumber: formData.gstNumber,
        partnerCategory:
          selectedPartnerType === "channel"
            ? "Channel Partner"
            : "Sales Partner",
        source: `SOLTECH Nexus - ${
          selectedPartnerType === "channel" ? "Channel" : "Sales"
        } Partner Application`,
      };

      // ✅ Single API endpoint for both partner types
      const response = await fetch("/api/partner-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setFormSubmitted(true);
        toast.success("🎉 Application submitted successfully!", {
          duration: 5000,
        });
      } else {
        // Still show success to user (as per your requirement)
        setFormSubmitted(true);
        toast.success("🎉 Application submitted successfully!", {
          duration: 5000,
        });
      }
    } catch (err) {
      console.error("Submit error:", err);
      // Show success even on error (data might have gone through)
      setFormSubmitted(true);
      toast.success("Thank you! Your application has been received.", {
        duration: 5000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const currentBenefits =
    selectedPartnerType === "sales"
      ? salesPartnerBenefits
      : channelPartnerBenefits;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      {/* ✅ HERO SECTION */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Handshake className="w-4 h-4" />
              Partner Program
            </span>

            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
              Grow Your Business with <br />
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                SOLTECH Nexus
              </span>
            </h1>

            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              {selectedPartnerType
                ? selectedPartnerType === "channel"
                  ? "Partner with us to deliver enterprise IT infrastructure solutions with industry-leading margins."
                  : "Refer clients for IT solutions, we handle everything else. Earn attractive commissions!"
                : "Choose your partnership model and start earning with India's leading IT infrastructure provider."}
            </p>

            {/* Benefits Cards */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPartnerType || "default"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10"
              >
                {currentBenefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/50 shadow-sm hover:shadow-md transition-all"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl ${
                        selectedPartnerType === "sales"
                          ? "bg-green-500/10 text-green-600"
                          : "bg-primary/10 text-primary"
                      } flex items-center justify-center mx-auto mb-3`}
                    >
                      {benefit.icon}
                    </div>
                    <h3 className="font-semibold text-slate-900 text-sm">
                      {benefit.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">{benefit.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* ✅ MAIN CONTENT */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <AnimatePresence mode="wait">
          {/* STEP 1: PARTNER TYPE SELECTION */}
          {!selectedPartnerType && !formSubmitted && (
            <motion.div
              key="partner-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                  Select Your Partnership Type
                </h2>
                <p className="text-slate-600">
                  Choose the model that best fits your business goals
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {partnerTypes.map((type, index) => (
                  <motion.div
                    key={type.id}
                    initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    onClick={() =>
                      setSelectedPartnerType(type.id as "channel" | "sales")
                    }
                    className="relative cursor-pointer group"
                  >
                    <div
                      className={`absolute -inset-0.5 bg-gradient-to-r ${type.color} rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity`}
                    />
                    <div
                      className={`relative bg-white rounded-2xl p-6 border-2 ${type.borderColor} hover:border-opacity-100 transition-all shadow-lg hover:shadow-xl`}
                    >
                      <div
                        className={`w-16 h-16 rounded-2xl ${type.bgColor} ${type.textColor} flex items-center justify-center mb-4`}
                      >
                        {type.icon}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {type.title}
                      </h3>
                      <p className="text-slate-600 text-sm mb-4">
                        {type.description}
                      </p>
                      <ul className="space-y-2">
                        {type.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-slate-600"
                          >
                            <Check
                              className={`w-4 h-4 ${type.textColor} mt-0.5 flex-shrink-0`}
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className={`w-full mt-6 h-12 bg-gradient-to-r ${type.color} hover:opacity-90 text-white font-semibold rounded-xl`}
                      >
                        Select {type.title}
                        <ChevronDown className="w-4 h-4 ml-2 rotate-[-90deg]" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-slate-500">
                  Not sure which one to choose?{" "}
                  <a
                    href="/contact"
                    className="text-primary hover:underline font-medium"
                  >
                    Contact our partnership team
                  </a>
                </p>
              </div>
            </motion.div>
          )}

          {/* STEP 2: FORM */}
          {selectedPartnerType && !formSubmitted && (
            <motion.div
              key="partner-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="max-w-4xl mx-auto mb-6">
                <button
                  onClick={() => setSelectedPartnerType(null)}
                  className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Change Partner Type
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start max-w-6xl mx-auto">
                {/* LEFT – IMAGE PANEL */}
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="lg:col-span-5 lg:sticky lg:top-24"
                >
                  <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/50 bg-white">
                    <div className="relative w-full h-72 lg:h-[420px]">
                      <Image
                        src="/partner.jpg"
                        alt="SOLTECH Nexus Partner"
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      <div className="absolute left-6 right-6 bottom-8 text-white">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-3 ${
                            selectedPartnerType === "channel"
                              ? "bg-blue-500/80 text-white"
                              : "bg-green-500/80 text-white"
                          }`}
                        >
                          {selectedPartnerType === "channel" ? (
                            <>
                              <Building2 className="w-3.5 h-3.5" /> Channel
                              Partner
                            </>
                          ) : (
                            <>
                              <Target className="w-3.5 h-3.5" /> Sales Partner
                            </>
                          )}
                        </span>

                        <h2 className="text-2xl lg:text-3xl font-bold leading-tight drop-shadow-lg">
                          {selectedPartnerType === "channel"
                            ? "Build & Scale Together"
                            : "Earn Without Investment"}
                        </h2>
                        <p className="mt-2 text-white/90 text-sm lg:text-base">
                          {selectedPartnerType === "channel"
                            ? "Enterprise IT solutions, training & revenue partnerships."
                            : "Refer clients and earn attractive commissions per deal."}
                        </p>

                        <div className="flex gap-6 mt-6">
                          <div>
                            <p className="text-2xl font-bold">100+</p>
                            <p className="text-xs text-white/70">
                              Active Partners
                            </p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold">₹5Cr+</p>
                            <p className="text-xs text-white/70">
                              Partner Revenue
                            </p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold">
                              {selectedPartnerType === "channel" ? "40%" : "25%"}
                            </p>
                            <p className="text-xs text-white/70">Commission</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start">
                    {["Dell Partner", "Cisco Certified", "24/7 Support"].map(
                      (badge) => (
                        <span
                          key={badge}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-xs font-medium text-slate-700 border shadow-sm"
                        >
                          <Check className="w-3.5 h-3.5 text-green-500" />
                          {badge}
                        </span>
                      )
                    )}
                  </div>
                </motion.div>

                {/* RIGHT – FORM */}
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="lg:col-span-7"
                >
                  <div
                    className={`bg-white border-2 ${
                      selectedPartnerType === "channel"
                        ? "border-blue-200/80"
                        : "border-green-200/80"
                    } rounded-3xl p-6 md:p-8 shadow-xl`}
                  >
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`p-2 rounded-xl ${
                            selectedPartnerType === "channel"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {selectedPartnerType === "channel" ? (
                            <Building2 className="w-5 h-5" />
                          ) : (
                            <Target className="w-5 h-5" />
                          )}
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                          {selectedPartnerType === "channel"
                            ? "Channel Partner Registration"
                            : "Sales Partner Registration"}
                        </h3>
                      </div>
                      <p className="text-sm text-slate-500">
                        Fill in your details — our team will reach out within
                        1-2 business days.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* ===== Personal Details ===== */}
                      <div>
                        <h4 className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-wider border-b pb-2 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Personal Details
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name *</Label>
                            <Input
                              id="firstName"
                              placeholder="John"
                              value={formData.firstName}
                              onChange={(e) =>
                                handleChange("firstName", e.target.value)
                              }
                              className={inputClassName}
                              required
                              disabled={submitting}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                              id="lastName"
                              placeholder="Doe"
                              value={formData.lastName}
                              onChange={(e) =>
                                handleChange("lastName", e.target.value)
                              }
                              className={inputClassName}
                              disabled={submitting}
                            />
                          </div>
                        </div>
                      </div>

                      {/* ===== Contact Info ===== */}
                      <div>
                        <h4 className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-wider border-b pb-2 flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Contact Information
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                              <Input
                                id="email"
                                type="email"
                                placeholder="partner@company.com"
                                value={formData.email}
                                onChange={(e) =>
                                  handleChange("email", e.target.value)
                                }
                                className={`${inputClassName} pl-10`}
                                required
                                disabled={submitting}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone *</Label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                              <Input
                                id="phone"
                                type="tel"
                                placeholder="+91 98765 43210"
                                value={formData.phone}
                                onChange={(e) =>
                                  handleChange("phone", e.target.value)
                                }
                                className={`${inputClassName} pl-10`}
                                required
                                disabled={submitting}
                              />
                            </div>
                          </div>
                          <div className="space-y-1 sm:col-span-2">
                            <Label htmlFor="website">Website (Optional)</Label>
                            <div className="relative">
                              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                              <Input
                                id="website"
                                type="url"
                                placeholder="https://yourcompany.com"
                                value={formData.website}
                                onChange={(e) =>
                                  handleChange("website", e.target.value)
                                }
                                className={`${inputClassName} pl-10`}
                                disabled={submitting}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ===== Company & Business ===== */}
                      <div>
                        <h4 className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-wider border-b pb-2 flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          Company Info
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="companyName">
                              Company Name{" "}
                              {selectedPartnerType === "channel" && "*"}
                            </Label>
                            <div className="relative">
                              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                              <Input
                                id="companyName"
                                placeholder={
                                  selectedPartnerType === "sales"
                                    ? "Optional"
                                    : "Acme Pvt Ltd"
                                }
                                value={formData.companyName}
                                onChange={(e) =>
                                  handleChange("companyName", e.target.value)
                                }
                                className={`${inputClassName} pl-10`}
                                required={selectedPartnerType === "channel"}
                                disabled={submitting}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="industry">Industry</Label>
                            <select
                              id="industry"
                              className={selectClassName}
                              value={formData.industry}
                              onChange={(e) =>
                                handleChange("industry", e.target.value)
                              }
                              disabled={submitting}
                            >
                              <option value="">Select Industry</option>
                              {industries.map((ind) => (
                                <option key={ind} value={ind}>
                                  {ind}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="noOfEmployees">
                              No. of Employees
                            </Label>
                            <select
                              id="noOfEmployees"
                              className={selectClassName}
                              value={formData.noOfEmployees}
                              onChange={(e) =>
                                handleChange("noOfEmployees", e.target.value)
                              }
                              disabled={submitting}
                            >
                              <option value="">Select Range</option>
                              {employeeRanges.map((range) => (
                                <option key={range.value} value={range.value}>
                                  {range.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="gstNumber">GST Number</Label>
                            <div className="relative">
                              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                              <Input
                                id="gstNumber"
                                placeholder="27AABCU9603R1ZM"
                                value={formData.gstNumber}
                                onChange={(e) => handleGSTChange(e.target.value)}
                                className={`${inputClassName} pl-10 ${
                                  gstError
                                    ? "border-red-500 focus:ring-red-200"
                                    : ""
                                }`}
                                maxLength={15}
                                disabled={submitting}
                              />
                            </div>
                            {gstError && (
                              <p className="text-xs text-red-500 mt-1">
                                {gstError}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* ===== Location ===== */}
                      <div>
                        <h4 className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-wider border-b pb-2 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Location
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <select
                              id="state"
                              className={selectClassName}
                              value={showCustomState ? "other" : formData.state}
                              onChange={(e) => handleStateChange(e.target.value)}
                              disabled={submitting}
                            >
                              <option value="">Select State</option>
                              {statesList.map((state) => (
                                <option key={state} value={state}>
                                  {state}
                                </option>
                              ))}
                              <option value="other">➕ Other</option>
                            </select>
                            {showCustomState && (
                              <Input
                                placeholder="Enter State"
                                className={`${inputClassName} mt-2`}
                                value={customState}
                                onChange={(e) => setCustomState(e.target.value)}
                                disabled={submitting}
                              />
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <select
                              id="city"
                              className={selectClassName}
                              value={
                                showCustomCity && !showCustomState
                                  ? "other"
                                  : formData.city
                              }
                              onChange={(e) => handleCityChange(e.target.value)}
                              disabled={
                                (!formData.state && !showCustomState) ||
                                submitting
                              }
                            >
                              <option value="">
                                {!formData.state && !showCustomState
                                  ? "Select State First"
                                  : showCustomState
                                  ? "Enter City Below"
                                  : "Select City"}
                              </option>
                              {!showCustomState &&
                                availableCities.map((city) => (
                                  <option key={city} value={city}>
                                    {city}
                                  </option>
                                ))}
                              {!showCustomState && formData.state && (
                                <option value="other">➕ Other</option>
                              )}
                            </select>
                            {(showCustomCity || showCustomState) && (
                              <Input
                                placeholder="Enter City"
                                className={`${inputClassName} mt-2`}
                                value={customCity}
                                onChange={(e) => setCustomCity(e.target.value)}
                                disabled={submitting}
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* ===== AGREEMENT ===== */}
                      <div
                        className={`p-4 rounded-xl border-2 ${
                          selectedPartnerType === "channel"
                            ? "bg-blue-50 border-blue-200"
                            : "bg-green-50 border-green-200"
                        }`}
                      >
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            className={`mt-1 h-5 w-5 rounded border-gray-300 ${
                              selectedPartnerType === "channel"
                                ? "text-blue-600 focus:ring-blue-500"
                                : "text-green-600 focus:ring-green-500"
                            }`}
                            disabled={submitting}
                          />
                          <span className="text-sm leading-relaxed text-slate-700">
                            {selectedPartnerType === "channel" ? (
                              <>
                                <strong>Declaration:</strong> I understand that
                                sales invoice will be generated by me (Channel
                                Partner) and SOLTECH Nexus will provide IT
                                infrastructure solutions & products. I agree to
                                the terms and conditions.
                              </>
                            ) : (
                              <>
                                <strong>Agreement:</strong> I understand that
                                sales invoice will be generated by SOLTECH Nexus
                                and commission will be paid as per company
                                policy. I agree to the partnership guidelines.
                              </>
                            )}
                          </span>
                        </label>
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        className={`w-full h-14 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all ${
                          selectedPartnerType === "sales"
                            ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                            : ""
                        }`}
                        disabled={submitting || !agreed || !!gstError}
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            {selectedPartnerType === "channel" ? (
                              <Building2 className="w-5 h-5 mr-2" />
                            ) : (
                              <Target className="w-5 h-5 mr-2" />
                            )}
                            Apply as{" "}
                            {selectedPartnerType === "channel"
                              ? "Channel"
                              : "Sales"}{" "}
                            Partner
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-center text-slate-400 mt-4">
                        By submitting, you agree to our{" "}
                        <a
                          href="/termsandconditions"
                          className="text-primary hover:underline"
                        >
                          Terms
                        </a>{" "}
                        and{" "}
                        <a
                          href="/privacypolicy"
                          className="text-primary hover:underline"
                        >
                          Privacy Policy
                        </a>
                        .
                      </p>
                    </form>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* SUCCESS STATE */}
          {formSubmitted && (
            <motion.div
              key="success-state"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto text-center py-16"
            >
              <div
                className={`mx-auto h-24 w-24 rounded-full flex items-center justify-center mb-6 ${
                  selectedPartnerType === "channel"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <h2 className="text-3xl font-bold text-slate-900 mb-3">
                Thank You! 🎉
              </h2>

              <p className="text-lg text-slate-600 mb-2">
                Your{" "}
                {selectedPartnerType === "channel" ? "Channel" : "Sales"} Partner
                application has been submitted!
              </p>

              <p className="text-slate-500 mb-8">
                Our partnership team will review your application and get back
                within 1-2 business days.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={resetForm}
                  className="rounded-xl"
                >
                  Submit Another Application
                </Button>
                <Button
                  size="lg"
                  onClick={() => (window.location.href = "/")}
                  className="rounded-xl"
                >
                  Back to Home
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}