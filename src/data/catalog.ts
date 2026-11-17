export type ProductCategory = 'All' | 'Prosthetics' | 'Neural' | 'Optics' | 'Chassis';

export type FinishOption = 'Matte Carbon' | 'Brushed Titanium' | 'Crimson Anodized';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: Exclude<ProductCategory, 'All'>;
  price: number;
  availability: 'In Stock' | 'Limited Run' | 'Made to Order';
  leadTime: string;
  image: string;
  summary: string;
  description: string;
  specs: { label: string; value: string }[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'kinetic-forearm-x4',
    sku: 'AG-FR-04',
    name: 'Valkyrie X4 Kinetic Forearm',
    category: 'Prosthetics',
    price: 14800,
    availability: 'In Stock',
    leadTime: 'Ships in 5 days',
    image: '/src/assets/images/product_kinetic_forearm_1794927309017.jpg',
    summary: '16-DOF carbon-weave bionic forearm with micro-harmonic wrist rotation.',
    description:
      'Engineered from forged aerospace carbon and Grade-5 titanium bearings, the Valkyrie X4 delivers fluid wrist articulation and adaptive grip force up to 145 N with sub-2ms EMG decoding.',
    specs: [
      { label: 'Mass', value: '410 g' },
      { label: 'Peak Grip Force', value: '145 N' },
      { label: 'Latency', value: '1.8 ms' },
      { label: 'Battery Endurance', value: '38 hrs' },
    ],
  },
  {
    id: 'aero-optix-visor',
    sku: 'AG-OP-01',
    name: 'Aero-Optix Spectral Visor',
    category: 'Optics',
    price: 4200,
    availability: 'Limited Run',
    leadTime: 'Ships in 7 days',
    image: '/src/assets/images/product_optical_visor_1794927309662.jpg',
    summary: 'Titanium waveguide optical HUD with low-light thermal fusion.',
    description:
      'Milled from a single billet of anodized titanium with smoked sapphire lenses, Aero-Optix projects 120 Hz spatial telemetry directly across your natural focal plane without peripheral occlusion.',
    specs: [
      { label: 'Mass', value: '62 g' },
      { label: 'Refresh Rate', value: '120 Hz' },
      { label: 'Field of View', value: '58 deg' },
      { label: 'Ingress Rating', value: 'IP68' },
    ],
  },
  {
    id: 'neuralync-nt7',
    sku: 'AG-NR-07',
    name: 'NeuraSync NT-7 Bus Module',
    category: 'Neural',
    price: 8900,
    availability: 'In Stock',
    leadTime: 'Ships in 3 days',
    image: '/src/assets/images/product_neural_bridge_1794927316129.jpg',
    summary: 'Non-invasive 256-channel EMG & peripheral nerve bridge.',
    description:
      'Designed as the central telemetry core across all Aegis hardware, the NT-7 translates micro-voltage neuromuscular intent into encrypted differential signals with zero calibration drift.',
    specs: [
      { label: 'Channels', value: '256 ch' },
      { label: 'Sampling Rate', value: '4.0 kHz' },
      { label: 'Encryption', value: 'AES-256' },
      { label: 'Housing', value: 'Ti-6Al-4V' },
    ],
  },
  {
    id: 'triax-stride-blade',
    sku: 'AG-PR-09',
    name: 'Triax Kinetic Stride Assembly',
    category: 'Prosthetics',
    price: 19400,
    availability: 'Made to Order',
    leadTime: '2 weeks custom fit',
    image: '/src/assets/images/product_stride_prosthetic_1794927311540.jpg',
    summary: 'Forged carbon running and terrain blade with active hydraulic damper.',
    description:
      'Combines an energy-returning S-curve forged carbon keel with a microprocessor-controlled micro-hydraulic ankle joint that adapts damping resistance step-by-step on stairs, inclines, and sprints.',
    specs: [
      { label: 'Energy Return', value: '94.2%' },
      { label: 'Max Load Rating', value: '165 kg' },
      { label: 'Damper Cycle', value: '500 Hz' },
      { label: 'Mass', value: '680 g' },
    ],
  },
  {
    id: 'vertek-exospine',
    sku: 'AG-CH-03',
    name: 'Vertek Axial Exo-Brace',
    category: 'Chassis',
    price: 11600,
    availability: 'Limited Run',
    leadTime: 'Ships in 10 days',
    image: '/src/assets/images/product_exo_vertebrae_1794927311339.jpg',
    summary: 'Articulated titanium-carbon spinal load-distribution chassis.',
    description:
      'Interlocking vertebral segments follow natural multi-axis spinal flexion while offloading up to 42% of axial lumbar compression during high-load movement and extended endurance work.',
    specs: [
      { label: 'Load Offload', value: '42%' },
      { label: 'Flexion Range', value: '115 deg' },
      { label: 'Mass', value: '1.15 kg' },
      { label: 'Frame Alloy', value: 'Grade-5 Ti' },
    ],
  },
  {
    id: 'graphene-tactile-hand',
    sku: 'AG-PR-11',
    name: 'Type-7 Graphene Haptic Hand',
    category: 'Prosthetics',
    price: 16200,
    availability: 'In Stock',
    leadTime: 'Ships in 5 days',
    image: '/src/assets/images/product_tactile_glove_1794927312154.jpg',
    summary: 'Sensory-feedback titanium mesh hand with 1,024 pressure taxels.',
    description:
      'Every phalanx integrates a graphene piezo-resistive skin matrix capable of distinguishing surface texture, temperature shifts, and 0.05 N micro-slip events for delicate object handling.',
    specs: [
      { label: 'Tactile Taxels', value: '1,024' },
      { label: 'Slip Detection', value: '0.05 N' },
      { label: 'Finger Speed', value: '0.18 s' },
      { label: 'Mass', value: '340 g' },
    ],
  },
];

export const FINISH_OPTIONS: { name: FinishOption; swatch: string; delta: number }[] = [
  { name: 'Matte Carbon', swatch: '#1c1c1f', delta: 0 },
  { name: 'Brushed Titanium', swatch: '#71717a', delta: 450 },
  { name: 'Crimson Anodized', swatch: '#991b1b', delta: 750 },
];

export interface BiotechStage {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  metrics: { label: string; value: string }[];
}

export const BIOTECH_STAGES: BiotechStage[] = [
  {
    id: 'lattice',
    index: '01.',
    title: 'Autoclaved Carbon-Weave Lattice',
    subtitle: 'Structural Shell Architecture',
    description:
      'Continuous-fiber T1100G carbon plies are oriented along physiological stress vectors, achieving bone-equivalent stiffness at less than half the skeletal weight.',
    metrics: [
      { label: 'Tensile Strength', value: '7,000 MPa' },
      { label: 'Shell Density', value: '1.58 g/cm3' },
      { label: 'Fatigue Cycles', value: '10M+' },
    ],
  },
  {
    id: 'tendons',
    index: '02.',
    title: 'Grade-5 Titanium Micro-Tendons',
    subtitle: 'Zero-Backlash Joint Actuation',
    description:
      'Braided tungsten-titanium filaments route torque from compact brushless ring motors in the forearm chassis directly to multi-axis distal joints.',
    metrics: [
      { label: 'Joint Backlash', value: '< 0.04 deg' },
      { label: 'Torque-to-Weight', value: '48 Nm/kg' },
      { label: 'Acoustic Floor', value: '24 dBA' },
    ],
  },
  {
    id: 'neural-bus',
    index: '03.',
    title: 'Bidirectional Neural Telemetry Bus',
    subtitle: 'Closed-Loop Sensory Return',
    description:
      'High-frequency surface EMG decoding pairs with vibro-electro tactile relays, allowing users to feel grip pressure and texture without visual confirmation.',
    metrics: [
      { label: 'Decode Latency', value: '1.8 ms' },
      { label: 'Bus Bandwidth', value: '4.0 kHz' },
      { label: 'Drift Error', value: '0.02%' },
    ],
  },
  {
    id: 'bio-seal',
    index: '04.',
    title: 'Hermetic Biocompatible Isolation',
    subtitle: 'All-Weather Clinical Sealing',
    description:
      'Medical-grade PEEK interface liners and laser-welded titanium seals protect internal optics and drive electronics against sweat, dust, and immersion.',
    metrics: [
      { label: 'Ingress Seal', value: 'IP68' },
      { label: 'Thermal Window', value: '-20 to +55 C' },
      { label: 'Contact Grade', value: 'ISO 10993' },
    ],
  },
];

export interface CaseRecord {
  id: string;
  code: string;
  patientName: string;
  role: string;
  organization: string;
  moduleUsed: string;
  outcomeMetric: string;
  quote: string;
  beforeStat: string;
  afterStat: string;
}

export const CASE_RECORDS: CaseRecord[] = [
  {
    id: 'cr-01',
    code: 'REC-0419',
    patientName: 'Elena Vance',
    role: 'Acoustic Luthier & Precision Woodworker',
    organization: 'Zurich Guild Workshop',
    moduleUsed: 'Type-7 Graphene Haptic Hand',
    outcomeMetric: '0.05 N Grip Sensitivity',
    quote:
      'After switching to the Type-7 hand, I returned to hand-planing spruce soundboards. The micro-slip feedback lets me trust a chisel grip without looking at my fingers.',
    beforeStat: '14.2 ms mechanical lag',
    afterStat: '1.8 ms neural lock',
  },
  {
    id: 'cr-02',
    code: 'REC-0872',
    patientName: 'Marcus Chen',
    role: 'Alpine Search & Rescue Specialist',
    organization: 'Cascade Ridge Operations',
    moduleUsed: 'Triax Kinetic Stride + Vertek Brace',
    outcomeMetric: '+38% Steep Ascent Endurance',
    quote:
      'The hydraulic ankle damper locks automatically on wet granite scrambles, while the axial brace takes pack weight off my lower spine on 12-hour deployments.',
    beforeStat: '4.5 hr field ceiling',
    afterStat: '11.8 hr continuous load',
  },
  {
    id: 'cr-03',
    code: 'REC-1104',
    patientName: 'Dr. Nadia Al-Mansoor',
    role: 'Micro-Assembly Robotics Surgeon',
    organization: 'Geneva Bionics Institute',
    moduleUsed: 'Valkyrie X4 + NeuraSync NT-7',
    outcomeMetric: '99.4% Repeatability Score',
    quote:
      'Zero-backlash harmonic wrist joints hold sub-millimeter tolerances across three-hour procedures without tremor or actuator heat build-up.',
    beforeStat: '0.85 mm positioning drift',
    afterStat: '0.09 mm lock precision',
  },
];

export interface IntegrationTier {
  id: string;
  name: string;
  tagline: string;
  annualPrice: number;
  monthlyPrice: number;
  featured?: boolean;
  deliverables: string[];
  ctaLabel: string;
}

export const INTEGRATION_TIERS: IntegrationTier[] = [
  {
    id: 'tier-core',
    name: '01. Core Calibration',
    tagline: 'Single-module fitting and clinic-grade neural baseline mapping.',
    annualPrice: 2400,
    monthlyPrice: 240,
    deliverables: [
      '3D photometric limb & socket scan',
      'Custom PEEK breathable interface liner',
      '4-hour EMG neuromuscular mapping session',
      '2-year mechanical seal & firmware coverage',
    ],
    ctaLabel: 'Select Core Tier',
  },
  {
    id: 'tier-fullstack',
    name: '02. Clinical Full-Stack',
    tagline: 'Multi-module integration with live telemetry tuning and loaner hardware.',
    annualPrice: 4800,
    monthlyPrice: 460,
    featured: true,
    deliverables: [
      'Everything in Core Calibration',
      'Dual-module NeuraSync bus synchronization',
      'Quarterly haptic & torque firmware refinement',
      '48-hour express swap hardware guarantee',
    ],
    ctaLabel: 'Select Full-Stack',
  },
  {
    id: 'tier-sovereign',
    name: '03. Sovereign Bespoke',
    tagline: 'Direct engineering liaison and custom CNC titanium morphology.',
    annualPrice: 9200,
    monthlyPrice: 880,
    deliverables: [
      'Bespoke CAD structural frame geometry',
      'Dedicated biomechanics engineer on call',
      'Custom anodized titanium & carbon weaves',
      'Lifetime sensor array & cell refreshes',
    ],
    ctaLabel: 'Request Bespoke Brief',
  },
];
