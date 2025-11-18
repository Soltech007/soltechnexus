'use client';
import { motion } from 'framer-motion';
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
  Sparkles
} from 'lucide-react';
import React from 'react';
import CTA from '@/app/components/CTA';

// --- COMPREHENSIVE SERVICES DATABASE ---
const allServicesData: { [key: string]: any } = {
  'it-consulting': {
    title: "IT Infrastructure Consulting",
    subtitle: "Strategic Technology Advisory Services",
    tagline: "Transform your IT from a cost center to a strategic business enabler.",
    description: "Our expert IT consultants work closely with your organization to assess, design, and optimize your technology infrastructure. We provide strategic guidance that aligns IT investments with business objectives, ensuring you get maximum value from your technology spending while building a scalable foundation for future growth.",
    extendedDescription: "With deep expertise in enterprise IT and partnerships with leading vendors like Dell, Cisco, and Microsoft, we deliver vendor-neutral consulting that puts your business needs first. Our consultants bring years of experience across diverse industries, helping you navigate complex technology decisions, avoid costly mistakes, and implement best practices that drive operational excellence.",
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
      { text: "Gain competitive advantage through innovative technology adoption", icon: <Award /> },
      { text: "Ensure compliance with industry regulations and standards", icon: <FileText /> },
    ],

    methodology: [
      { 
        phase: "Discovery & Assessment",
        duration: "1-2 weeks",
        activities: [
          "Current state analysis",
          "Stakeholder interviews",
          "Infrastructure audit",
          "Gap analysis",
          "Risk assessment"
        ]
      },
      { 
        phase: "Strategy Development",
        duration: "2-3 weeks",
        activities: [
          "Future state design",
          "Technology roadmap creation",
          "Vendor evaluation",
          "Budget planning",
          "Business case development"
        ]
      },
      { 
        phase: "Implementation Planning",
        duration: "1-2 weeks",
        activities: [
          "Project planning",
          "Resource allocation",
          "Timeline development",
          "Risk mitigation planning",
          "Change management strategy"
        ]
      },
      { 
        phase: "Execution Support",
        duration: "Ongoing",
        activities: [
          "Project oversight",
          "Vendor coordination",
          "Quality assurance",
          "Progress monitoring",
          "Continuous optimization"
        ]
      }
    ],

    deliverables: [
      "Comprehensive IT assessment report",
      "3-5 year technology roadmap",
      "Infrastructure architecture designs",
      "Vendor evaluation and recommendations",
      "Implementation project plans",
      "Budget and ROI analysis",
      "Risk assessment and mitigation strategies",
      "Compliance audit reports"
    ],

    industries: [
      { 
        name: "Corporates", 
        icon: <Building />, 
        focus: "Enterprise architecture, digital workplace, cloud strategy" 
      },
      { 
        name: "Education", 
        icon: <GraduationCap />, 
        focus: "E-learning infrastructure, campus networks, student portals" 
      },
      { 
        name: "Government", 
        icon: <Landmark />, 
        focus: "Compliance, security, citizen services digitization" 
      },
      { 
        name: "Data Centers", 
        icon: <Server />, 
        focus: "Capacity planning, optimization, migration strategies" 
      },
    ],

    process: [
      { 
        step: 1, 
        title: "Initial Consultation", 
        description: "Free consultation to understand your challenges and objectives" 
      },
      { 
        step: 2, 
        title: "Engagement Planning", 
        description: "Define scope, timeline, and deliverables for the consulting engagement" 
      },
      { 
        step: 3, 
        title: "Assessment & Analysis", 
        description: "Comprehensive review of your current IT environment and business needs" 
      },
      { 
        step: 4, 
        title: "Strategy Development", 
        description: "Create customized recommendations and implementation roadmap" 
      },
      { 
        step: 5, 
        title: "Presentation & Approval", 
        description: "Present findings and recommendations to stakeholders" 
      },
      { 
        step: 6, 
        title: "Implementation Support", 
        description: "Ongoing guidance during implementation phase" 
      },
    ],

    faqs: [
      { 
        question: "What is the typical duration of a consulting engagement?", 
        answer: "Most consulting engagements range from 4-12 weeks, depending on scope and complexity. Quick assessments can be done in 1-2 weeks, while comprehensive transformation planning may take 3-6 months." 
      },
      { 
        question: "Do you provide implementation services or just consulting?", 
        answer: "We offer both! Our consulting services can stand alone or be combined with our implementation services. Many clients prefer our end-to-end approach where we not only plan but also execute the recommended solutions." 
      },
      { 
        question: "How do you ensure vendor neutrality in your recommendations?", 
        answer: "While we have partnerships with major vendors, our recommendations are always based on what's best for your business. We evaluate multiple vendors objectively and can work with your existing vendor relationships." 
      },
      { 
        question: "What industries do you specialize in?", 
        answer: "We have deep expertise in corporates, education, government, data centers, and SMEs. Our consultants have industry-specific knowledge and understand unique regulatory and operational requirements." 
      },
      { 
        question: "Can you help with IT budget planning?", 
        answer: "Absolutely! We help organizations optimize their IT spending, create multi-year budget forecasts, identify cost-saving opportunities, and justify technology investments with clear ROI analysis." 
      },
    ],

    pricing: "Custom pricing based on engagement scope",
    certifications: ["ISO 9001:2015", "CMMI Level 3", "PMP Certified Consultants"],
  },

  'enterprise-networking': {
    title: "Enterprise Networking Solutions",
    subtitle: "High-Performance Network Infrastructure",
    tagline: "Build a network that powers your business at the speed of innovation.",
    description: "We design, implement, and manage enterprise-grade network infrastructure that delivers reliable, secure, and high-speed connectivity. Our networking solutions leverage best-in-class hardware from Dell and Cisco to create scalable networks that support your current needs while being ready for future growth.",
    extendedDescription: "Modern businesses require networks that are not just fast and reliable, but also secure, flexible, and intelligent. Our enterprise networking services encompass everything from initial network design and architecture to implementation, optimization, and ongoing management. We ensure your network infrastructure supports critical business applications, cloud services, unified communications, and emerging technologies like IoT and AI.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1920&auto=format&fit=crop",
    
    serviceFeatures: [
      { name: "Network Design & Architecture", icon: <Network />, desc: "Custom network topology planning" },
      { name: "LAN/WAN Implementation", icon: <Globe />, desc: "Local and wide area networks" },
      { name: "Wireless Infrastructure", icon: <Zap />, desc: "Enterprise WiFi 6/6E deployment" },
      { name: "Network Security", icon: <Shield />, desc: "Segmentation and access control" },
      { name: "SD-WAN Solutions", icon: <Cloud />, desc: "Software-defined networking" },
      { name: "Network Monitoring", icon: <BarChart />, desc: "24/7 performance monitoring" },
    ],

    keyBenefits: [
      { text: "Achieve 99.99% network uptime with redundant architecture", icon: <Award /> },
      { text: "Increase productivity with high-speed, low-latency connectivity", icon: <TrendingUp /> },
      { text: "Scale network capacity seamlessly as your business grows", icon: <Layers /> },
      { text: "Enhance security with network segmentation and access controls", icon: <Shield /> },
      { text: "Reduce network management costs by 40% with automation", icon: <Settings /> },
      { text: "Enable remote work with secure, reliable connectivity", icon: <Users /> },
    ],

    methodology: [
      { 
        phase: "Network Assessment",
        duration: "1 week",
        activities: [
          "Current network analysis",
          "Performance baseline",
          "Bottleneck identification",
          "Security audit",
          "Capacity planning"
        ]
      },
      { 
        phase: "Design & Architecture",
        duration: "2 weeks",
        activities: [
          "Topology design",
          "VLAN planning",
          "IP addressing scheme",
          "Redundancy design",
          "Security architecture"
        ]
      },
      { 
        phase: "Implementation",
        duration: "2-4 weeks",
        activities: [
          "Hardware installation",
          "Configuration deployment",
          "Cable infrastructure",
          "Testing & validation",
          "Documentation"
        ]
      },
      { 
        phase: "Optimization & Support",
        duration: "Ongoing",
        activities: [
          "Performance tuning",
          "Monitoring setup",
          "Troubleshooting",
          "Capacity management",
          "Upgrades & patches"
        ]
      }
    ],

    deliverables: [
      "Network design documentation",
      "Implementation project plan",
      "Network diagrams (logical & physical)",
      "Configuration templates",
      "Testing & validation reports",
      "As-built documentation",
      "Network management playbooks",
      "Training materials"
    ],

    industries: [
      { 
        name: "Corporate Offices", 
        icon: <Building />, 
        focus: "High-density switching, WiFi, unified communications" 
      },
      { 
        name: "Educational Campuses", 
        icon: <GraduationCap />, 
        focus: "Campus-wide WiFi, BYOD support, content filtering" 
      },
      { 
        name: "Data Centers", 
        icon: <Server />, 
        focus: "Core switching, high-speed interconnects, SDN" 
      },
      { 
        name: "Healthcare", 
        icon: <Shield />, 
        focus: "Secure clinical networks, medical device integration" 
      },
    ],

    process: [
      { 
        step: 1, 
        title: "Requirements Gathering", 
        description: "Understand your business needs, applications, and growth plans" 
      },
      { 
        step: 2, 
        title: "Network Assessment", 
        description: "Analyze current infrastructure and identify improvement opportunities" 
      },
      { 
        step: 3, 
        title: "Solution Design", 
        description: "Create detailed network architecture and implementation plan" 
      },
      { 
        step: 4, 
        title: "Hardware Procurement", 
        description: "Source equipment from authorized Dell and Cisco partners" 
      },
      { 
        step: 5, 
        title: "Professional Installation", 
        description: "Deploy network infrastructure with minimal business disruption" 
      },
      { 
        step: 6, 
        title: "Testing & Handover", 
        description: "Comprehensive testing, documentation, and knowledge transfer" 
      },
    ],

    faqs: [
      { 
        question: "How long does a network implementation take?", 
        answer: "Small office networks (20-50 users) typically take 1-2 weeks. Medium enterprises (100-500 users) require 3-6 weeks. Large deployments may take 2-3 months. We always work to minimize disruption to your operations." 
      },
      { 
        question: "Can you upgrade our existing network or do we need to start fresh?", 
        answer: "We can absolutely work with your existing infrastructure! We'll assess what can be retained, upgraded, or repurposed, helping you maximize your existing investments while modernizing where needed." 
      },
      { 
        question: "Do you provide ongoing network management?", 
        answer: "Yes! We offer comprehensive managed network services including 24/7 monitoring, proactive maintenance, troubleshooting, and regular optimization to ensure peak performance." 
      },
      { 
        question: "What vendors do you work with?", 
        answer: "We're authorized partners for Dell and Cisco, the industry leaders in networking. We can also work with existing equipment from other vendors to ensure seamless integration." 
      },
      { 
        question: "How do you ensure network security?", 
        answer: "Security is built into every layer of our network designs including firewalls, network segmentation, access controls, encryption, and continuous monitoring for threats." 
      },
    ],

    pricing: "Custom pricing based on engagement scope",
    certifications: ["Cisco Premier Partner", "Dell Gold Partner", "BICSI Certified"],
  },

  'cloud-migration': {
    title: "Cloud Services & Migration",
    subtitle: "Seamless Cloud Transformation",
    tagline: "Accelerate innovation and agility with cloud-first infrastructure.",
    description: "We help organizations embrace the cloud with confidence through strategic planning, seamless migration, and ongoing optimization. Our cloud services cover AWS, Microsoft Azure, Google Cloud Platform, and productivity suites like Microsoft 365 and Google Workspace, ensuring you leverage the best cloud solutions for your needs.",
    extendedDescription: "Cloud adoption is no longer optional—it's essential for business agility, scalability, and innovation. Our cloud experts guide you through every step of your cloud journey, from initial assessment and strategy development to migration, optimization, and management. We ensure your cloud transformation delivers tangible business benefits while maintaining security, compliance, and cost control.",
    image: "https://images.unsplash.com/photo-1667984390527-850f63192709?q=80&w=1920&auto=format&fit=crop",
    
    serviceFeatures: [
      { name: "Cloud Strategy & Planning", icon: <Target />, desc: "Roadmap for cloud adoption" },
      { name: "Migration Services", icon: <Cloud />, desc: "Seamless workload migration" },
      { name: "Hybrid Cloud Solutions", icon: <Layers />, desc: "On-premise and cloud integration" },
      { name: "Cloud Security", icon: <Shield />, desc: "Zero-trust security models" },
      { name: "Cost Optimization", icon: <TrendingUp />, desc: "FinOps and cost management" },
      { name: "Managed Cloud Services", icon: <Settings />, desc: "24/7 cloud operations" },
    ],

    keyBenefits: [
      { text: "Reduce infrastructure costs by up to 50% with cloud economics", icon: <TrendingUp /> },
      { text: "Scale resources instantly to meet changing business demands", icon: <Zap /> },
      { text: "Improve disaster recovery with 99.99% availability SLAs", icon: <Shield /> },
      { text: "Accelerate time-to-market for new applications and services", icon: <Clock /> },
      { text: "Enable global collaboration with cloud-based productivity tools", icon: <Globe /> },
      { text: "Enhance security with enterprise-grade cloud protection", icon: <Lock /> },
    ],

    methodology: [
      { 
        phase: "Cloud Readiness Assessment",
        duration: "1-2 weeks",
        activities: [
          "Application portfolio analysis",
          "Dependency mapping",
          "Compliance requirements",
          "Cost-benefit analysis",
          "Risk assessment"
        ]
      },
      { 
        phase: "Migration Planning",
        duration: "2-3 weeks",
        activities: [
          "Migration strategy (6Rs)",
          "Prioritization matrix",
          "Architecture design",
          "Security planning",
          "Timeline development"
        ]
      },
      { 
        phase: "Migration Execution",
        duration: "4-12 weeks",
        activities: [
          "Environment setup",
          "Data migration",
          "Application migration",
          "Testing & validation",
          "Cutover planning"
        ]
      },
      { 
        phase: "Optimization & Management",
        duration: "Ongoing",
        activities: [
          "Performance optimization",
          "Cost optimization",
          "Security monitoring",
          "Backup & DR",
          "Continuous improvement"
        ]
      }
    ],

    deliverables: [
      "Cloud readiness assessment report",
      "Migration strategy and roadmap",
      "Cloud architecture documentation",
      "Migration runbooks",
      "Security and compliance reports",
      "Cost optimization recommendations",
      "Disaster recovery plans",
      "Training and knowledge transfer"
    ],

    industries: [
      { 
        name: "Enterprises", 
        icon: <Building />, 
        focus: "SAP on cloud, enterprise applications, hybrid cloud" 
      },
      { 
        name: "Startups & SMEs", 
        icon: <Zap />, 
        focus: "Cloud-native development, serverless, cost optimization" 
      },
      { 
        name: "Education", 
        icon: <GraduationCap />, 
        focus: "Virtual classrooms, learning management systems, collaboration" 
      },
      { 
        name: "Healthcare", 
        icon: <Shield />, 
        focus: "HIPAA compliance, medical imaging, telemedicine platforms" 
      },
    ],

    process: [
      { 
        step: 1, 
        title: "Discovery Workshop", 
        description: "Understand your applications, data, and business objectives" 
      },
      { 
        step: 2, 
        title: "Assessment & Planning", 
        description: "Evaluate cloud readiness and develop migration strategy" 
      },
      { 
        step: 3, 
        title: "Proof of Concept", 
        description: "Pilot migration with non-critical workloads" 
      },
      { 
        step: 4, 
        title: "Migration Execution", 
        description: "Migrate applications and data with minimal downtime" 
      },
      { 
        step: 5, 
        title: "Testing & Optimization", 
        description: "Validate performance and optimize for cloud" 
      },
      { 
        step: 6, 
        title: "Handover & Support", 
        description: "Knowledge transfer and ongoing management" 
      },
    ],

    faqs: [
      { 
        question: "Which cloud platform should we choose - AWS, Azure, or Google Cloud?", 
        answer: "The choice depends on your specific needs. AWS offers the broadest service portfolio, Azure integrates seamlessly with Microsoft products, and Google Cloud excels in data analytics and AI. We'll help you choose based on your requirements, existing technology stack, and budget." 
      },
      { 
        question: "How long does cloud migration take?", 
        answer: "Simple migrations (like email to Microsoft 365) can be done in days. Small application migrations take 4-8 weeks. Large enterprise migrations typically require 3-6 months. We use phased approaches to minimize risk and disruption." 
      },
      { 
        question: "What about data security in the cloud?", 
        answer: "Cloud providers offer enterprise-grade security that often exceeds on-premise capabilities. We implement additional layers including encryption, access controls, monitoring, and compliance frameworks to ensure your data remains secure." 
      },
      { 
        question: "Will cloud migration disrupt our operations?", 
        answer: "We use proven migration strategies to minimize disruption. Most migrations are done during off-hours, and we often run parallel systems during transition. Critical applications can be migrated with near-zero downtime using advanced techniques." 
      },
      { 
        question: "How do we control cloud costs?", 
        answer: "We implement FinOps practices including right-sizing resources, reserved instances, auto-scaling, and continuous monitoring. Most clients see 30-40% cost reduction through optimization after migration." 
      },
    ],

    pricing: " Custom pricing based on Migration projects scope",
    certifications: ["AWS Advanced Partner", "Microsoft Gold Partner", "Google Cloud Partner"],
  },

  'cybersecurity': {
    title: "Cybersecurity Solutions",
    subtitle: "Comprehensive Security Services",
    tagline: "Protect your digital assets from evolving cyber threats.",
    description: "We provide end-to-end cybersecurity services that protect your organization from modern threats. Our multi-layered security approach combines advanced technology, proven processes, and expert professionals to safeguard your data, systems, and reputation from cyber attacks.",
    extendedDescription: "In today's threat landscape, cybersecurity is not just about technology—it's about people, processes, and continuous vigilance. Our cybersecurity services span from initial risk assessment and security architecture design to implementation of advanced security controls, 24/7 monitoring, and incident response. We help you build cyber resilience while ensuring compliance with regulatory requirements.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1920&auto=format&fit=crop",
    
    serviceFeatures: [
      { name: "Security Assessment", icon: <Shield />, desc: "Vulnerability and risk analysis" },
      { name: "Firewall & Network Security", icon: <Network />, desc: "Next-gen firewall deployment" },
      { name: "Endpoint Protection", icon: <Lock />, desc: "EDR and antivirus solutions" },
      { name: "Email Security", icon: <Mail />, desc: "Anti-phishing and encryption" },
      { name: "SOC Services", icon: <BarChart />, desc: "24/7 security monitoring" },
      { name: "Incident Response", icon: <Zap />, desc: "Rapid threat containment" },
    ],

    keyBenefits: [
      { text: "Reduce security incidents by 90% with proactive threat prevention", icon: <Shield /> },
      { text: "Achieve compliance with industry regulations (GDPR, HIPAA, PCI)", icon: <FileText /> },
      { text: "Minimize breach impact with rapid incident response", icon: <Clock /> },
      { text: "Protect brand reputation and customer trust", icon: <Award /> },
      { text: "Lower security costs through managed services", icon: <TrendingUp /> },
      { text: "Gain visibility into your entire security posture", icon: <BarChart /> },
    ],

    methodology: [
      { 
        phase: "Security Assessment",
        duration: "1-2 weeks",
        activities: [
          "Vulnerability scanning",
          "Penetration testing",
          "Risk assessment",
          "Compliance audit",
          "Security gap analysis"
        ]
      },
      { 
        phase: "Security Architecture",
        duration: "2 weeks",
        activities: [
          "Security framework design",
          "Control selection",
          "Policy development",
          "Incident response planning",
          "Security roadmap"
        ]
      },
      { 
        phase: "Implementation",
        duration: "4-8 weeks",
        activities: [
          "Security tool deployment",
          "Configuration hardening",
          "Access control setup",
          "Encryption deployment",
          "Security training"
        ]
      },
      { 
        phase: "Ongoing Protection",
        duration: "Continuous",
        activities: [
          "24/7 monitoring",
          "Threat hunting",
          "Patch management",
          "Incident response",
          "Security updates"
        ]
      }
    ],

    deliverables: [
      "Security assessment report",
      "Risk register and mitigation plan",
      "Security architecture documentation",
      "Security policies and procedures",
      "Incident response playbooks",
      "Compliance audit reports",
      "Security awareness training",
      "Monthly security reports"
    ],

    industries: [
      { 
        name: "Financial Services", 
        icon: <Lock />, 
        focus: "PCI DSS compliance, fraud prevention, data protection" 
      },
      { 
        name: "Healthcare", 
        icon: <Shield />, 
        focus: "HIPAA compliance, patient data protection, medical device security" 
      },
      { 
        name: "Government", 
        icon: <Landmark />, 
        focus: "Critical infrastructure protection, data sovereignty, compliance" 
      },
      { 
        name: "E-commerce", 
        icon: <Building />, 
        focus: "Payment security, customer data protection, DDoS prevention" 
      },
    ],

    process: [
      { 
        step: 1, 
        title: "Security Consultation", 
        description: "Understand your security concerns and compliance requirements" 
      },
      { 
        step: 2, 
        title: "Risk Assessment", 
        description: "Identify vulnerabilities and quantify security risks" 
      },
      { 
        step: 3, 
        title: "Solution Design", 
        description: "Develop comprehensive security architecture" 
      },
      { 
        step: 4, 
        title: "Security Implementation", 
        description: "Deploy security controls and technologies" 
      },
      { 
        step: 5, 
        title: "Testing & Validation", 
        description: "Verify security effectiveness through testing" 
      },
      { 
        step: 6, 
        title: "Continuous Monitoring", 
        description: "24/7 security operations and threat response" 
      },
    ],

    faqs: [
      { 
        question: "What types of cyber threats do you protect against?", 
        answer: "We protect against all major threats including malware, ransomware, phishing, DDoS attacks, data breaches, insider threats, and zero-day exploits. Our multi-layered approach ensures comprehensive protection." 
      },
      { 
        question: "Do you provide 24/7 security monitoring?", 
        answer: "Yes! Our Security Operations Center (SOC) provides round-the-clock monitoring, threat detection, and incident response. We use advanced SIEM tools and threat intelligence to identify and respond to threats in real-time." 
      },
      { 
        question: "How do you help with compliance?", 
        answer: "We help achieve and maintain compliance with regulations like GDPR, HIPAA, PCI DSS, and others. This includes gap assessments, control implementation, documentation, and audit support." 
      },
      { 
        question: "What happens during a security incident?", 
        answer: "Our incident response team immediately activates to contain the threat, minimize damage, preserve evidence, and restore normal operations. We follow established playbooks and keep you informed throughout the process." 
      },
      { 
        question: "Can you secure our cloud environment?", 
        answer: "Absolutely! We provide comprehensive cloud security including identity management, data encryption, network security, compliance monitoring, and cloud-native security tools for AWS, Azure, and Google Cloud." 
      },
    ],

    pricing: " Custom pricing based on Security services scope",
    certifications: ["ISO 27001", "SOC 2 Type II", "CERT-IN Empanelled"],
  },

  'amc-support': {
    title: "AMC & Technical Support",
    subtitle: "Comprehensive IT Maintenance Services",
    tagline: "Keep your IT infrastructure running at peak performance, always.",
    description: "Our Annual Maintenance Contract (AMC) and technical support services ensure your IT infrastructure operates smoothly with minimal downtime. We provide proactive maintenance, rapid issue resolution, and continuous optimization to maximize your technology investments and maintain business continuity.",
    extendedDescription: "Technology failures can cripple business operations and lead to significant losses. Our AMC and support services provide peace of mind with guaranteed response times, proactive maintenance, and expert technical assistance. From servers and networks to security systems and end-user devices, we keep your entire IT ecosystem healthy and performing optimally.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1920&auto=format&fit=crop",
    
    serviceFeatures: [
      { name: "24/7 Helpdesk Support", icon: <Headphones />, desc: "Round-the-clock assistance" },
      { name: "Preventive Maintenance", icon: <Wrench />, desc: "Regular health checks" },
      { name: "Remote Support", icon: <Globe />, desc: "Instant remote assistance" },
      { name: "Onsite Support", icon: <Users />, desc: "Expert field engineers" },
      { name: "Spare Parts Management", icon: <Settings />, desc: "Ready replacement parts" },
      { name: "Performance Monitoring", icon: <BarChart />, desc: "Proactive monitoring" },
    ],

    keyBenefits: [
      { text: "Achieve 99.9% uptime with proactive maintenance", icon: <Award /> },
      { text: "Reduce IT costs by 40% compared to break-fix approach", icon: <TrendingUp /> },
      { text: "Get guaranteed response times with defined SLAs", icon: <Clock /> },
      { text: "Extend equipment lifespan through regular maintenance", icon: <Settings /> },
      { text: "Free your IT team to focus on strategic initiatives", icon: <Target /> },
      { text: "Ensure compliance with audit-ready documentation", icon: <FileText /> },
    ],

    methodology: [
      { 
        phase: "Onboarding",
        duration: "1 week",
        activities: [
          "Asset inventory",
          "Documentation review",
          "SLA definition",
          "Contact setup",
          "Knowledge transfer"
        ]
      },
      { 
        phase: "Preventive Maintenance",
        duration: "Quarterly",
        activities: [
          "Health checks",
          "Firmware updates",
          "Performance tuning",
          "Cleaning & inspection",
          "Documentation updates"
        ]
      },
      { 
        phase: "Monitoring & Support",
        duration: "24/7",
        activities: [
          "Real-time monitoring",
          "Alert management",
          "Incident response",
          "Remote troubleshooting",
          "Escalation management"
        ]
      },
      { 
        phase: "Reporting & Review",
        duration: "Monthly",
        activities: [
          "Performance reports",
          "Incident analysis",
          "SLA compliance",
          "Improvement recommendations",
          "Review meetings"
        ]
      }
    ],

    deliverables: [
      "Detailed asset inventory",
      "SLA documentation",
      "Maintenance schedules",
      "Monthly performance reports",
      "Incident reports",
      "Root cause analyses",
      "Quarterly business reviews",
      "Annual health assessments"
    ],

   
    industries: [
      { 
        name: "Corporate IT", 
        icon: <Building />, 
        focus: "Servers, networks, endpoints, applications" 
      },
      { 
        name: "Data Centers", 
        icon: <Server />, 
        focus: "24/7 infrastructure monitoring and support" 
      },
      { 
        name: "Educational Institutions", 
        icon: <GraduationCap />, 
        focus: "Campus IT infrastructure, labs, digital classrooms" 
      },
      { 
        name: "Healthcare Facilities", 
        icon: <Shield />, 
        focus: "Medical systems, PACS, EMR infrastructure" 
      },
    ],

    process: [
      { 
        step: 1, 
        title: "Initial Assessment", 
        description: "Evaluate your infrastructure and support requirements" 
      },
      { 
        step: 2, 
        title: "AMC Proposal", 
        description: "Custom support package based on your needs" 
      },
      { 
        step: 3, 
        title: "Contract Finalization", 
        description: "Define SLAs, coverage, and terms" 
      },
      { 
        step: 4, 
        title: "Service Activation", 
        description: "Onboarding and knowledge transfer" 
      },
      { 
        step: 5, 
        title: "Continuous Support", 
        description: "24/7 monitoring and support delivery" 
      },
      { 
        step: 6, 
        title: "Regular Reviews", 
        description: "Performance reviews and optimization" 
      },
    ],

    faqs: [
      { 
        question: "What's included in an AMC?", 
        answer: "AMC includes preventive maintenance, break-fix support, remote assistance, onsite visits (as per SLA), spare parts (depending on contract type), firmware updates, and performance monitoring. Comprehensive contracts also include replacement guarantees." 
      },
      { 
        question: "What are your response time SLAs?", 
        answer: "Response times vary by support level: Enterprise (30 min), Premium (1 hour), Standard (2 hours), Basic (4 hours). Critical issues get priority response. Onsite support arrival times depend on location and contract type." 
      },
      { 
        question: "Do you support multi-vendor environments?", 
        answer: "Yes! While we specialize in Dell, Cisco, and Microsoft technologies, our engineers are trained to support multi-vendor environments. We can maintain equipment from most major vendors." 
      },
      { 
        question: "Can we upgrade our support level mid-contract?", 
        answer: "Absolutely! You can upgrade your support level anytime. Downgrades can be done at contract renewal. We regularly review your needs to ensure you have the right level of support." 
      },
      { 
        question: "How do you handle spare parts?", 
        answer: "For Premium and Enterprise contracts, we maintain a local spare parts inventory for critical components. For Standard contracts, we ensure next-business-day parts availability. Part costs may be additional depending on contract type." 
      },
    ],

    pricing: "Custom pricing based on AMC scope",
    certifications: ["ISO 20000", "ITIL Certified", "OEM Authorized Support"],
  },
};

// --- COMPONENT FUNCTIONS (Blue Theme) ---

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
  const [isOpen, setIsOpen] = React.useState(false);
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
      {/* <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
        <Clock className="w-4 h-4" />
        {duration}
      </span> */}
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

// --- MAIN COMPONENT ---
export default function ServiceDetailsPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const service = allServicesData[slug];

  if (!service) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen section text-center px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="w-24 h-24 rounded-full bg-primary-gradient flex items-center justify-center mb-6 shadow-glow">
          <Settings className="w-12 h-12 text-white" />
        </div>
        <h1 className="h1 text-gray-800 mb-4">Service Not Found</h1>
        <p className="p-large mb-8 text-gray-600 max-w-md">The service you are looking for does not exist or has been moved.</p>
        <Link href="/services" className="btn-primary">
          <ArrowRight className="w-5 h-5" />
          Browse All Services
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
      
      {/* ================================================= */}
      {/*                  HERO SECTION                     */}
      {/* ================================================= */}
      <section className="relative pt-32 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-primary-gradient">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Floating Gradient Orbs */}
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

              {/* <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="btn-gradient shadow-2xl bg-white text-primary-500 hover:bg-blue-50">
                  <Phone className="w-5 h-5" />
                  Request Service Quote
                </Link>
                <button className="btn-outline border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm">
                  <PlayCircle className="w-5 h-5" />
                  Watch Demo
                </button>
              </div> */}
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
              
              {/* Floating Stats Badge */}
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
          
          {/* Service Overview - Full Width */}
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

          {/* Support Levels */}
      

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
      {/*                  CTA SECTION                      */}
     <CTA/>
    </div>
  );
}