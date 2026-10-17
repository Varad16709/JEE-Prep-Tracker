
"use strict";

/* =========================================================
   JEE PREP TRACKER — 75-DAY EDITION
   Saves progress locally in the browser.
   No external JavaScript libraries required.
   ========================================================= */

const $ = (id) => document.getElementById(id);

const STORAGE_KEY = "jeePrepTracker2027_v2";
const DAY_COUNT = 75;
const SUBJECTS = ["Physics", "Chemistry", "Mathematics"];

const CHAPTERS = {
  Physics: [
    "Current Electricity",
    "Electrostatics and Capacitance",
    "Modern Physics and Semiconductors",
    "Ray Optics and Wave Optics",
    "Magnetism, EMI and AC",
    "Thermodynamics and Mechanics"
  ],
  Chemistry: [
    "Chemical Bonding",
    "Coordination Compounds",
    "Periodic Properties and p-Block",
    "Chemical and Ionic Equilibrium",
    "Thermodynamics",
    "Electrochemistry and Chemical Kinetics",
    "GOC and Carbonyl Compounds"
  ],
  Mathematics: [
    "Matrices and Determinants",
    "Vector Algebra and 3D Geometry",
    "Limits, Continuity and Differentiability",
    "Applications of Derivatives",
    "Integral Calculus and Differential Equations",
    "Straight Lines, Circles and Conic Sections",
    "Sequences, Series and Probability"
  ]
};

const CHAPTER_LIBRARY = [
  {
    subject: "Physics",
    chapter: "Current Electricity",
    notes: [
      "Electric current is the rate of flow of charge.",
      "Conventional current flows in the direction of positive charge.",
      "Resistance depends on the material, length, cross-sectional area and temperature.",
      "In series, current is the same. In parallel, potential difference is the same.",
      "Kirchhoff's junction rule follows conservation of charge.",
      "Kirchhoff's loop rule follows conservation of energy."
    ],
    formulas: [
      ["Current", "I = Q/t"],
      ["Ohm's law", "V = IR"],
      ["Resistance of a wire", "R = ρL/A"],
      ["Series resistors", "R = R₁ + R₂ + ..."],
      ["Parallel resistors", "1/R = 1/R₁ + 1/R₂ + ..."],
      ["Electric power", "P = VI = I²R = V²/R"],
      ["Drift current", "I = neAvᵈ"]
    ],
    question: "A 4 Ω resistor is connected to a 12 V battery. What current flows?",
    options: ["2 A", "3 A", "4 A", "48 A"],
    answer: 1,
    explanation: "Using Ohm's law, I = V/R = 12/4 = 3 A."
  },
  {
    subject: "Physics",
    chapter: "Electrostatics and Capacitance",
    notes: [
      "Like charges repel and unlike charges attract.",
      "Electric field is force per unit positive test charge.",
      "Electric potential is potential energy per unit charge.",
      "The electric field inside a conductor in electrostatic equilibrium is zero.",
      "Capacitors store charge and energy in an electric field."
    ],
    formulas: [
      ["Coulomb's law", "F = k|q₁q₂|/r²"],
      ["Electric field", "E = F/q"],
      ["Point-charge field", "E = kq/r²"],
      ["Potential", "V = kq/r"],
      ["Capacitance", "C = Q/V"],
      ["Parallel-plate capacitor", "C = ε₀A/d"],
      ["Capacitor energy", "U = ½CV² = ½QV"]
    ],
    question: "Two point charges are separated by distance r. If the distance doubles, the force becomes:",
    options: ["2F", "F/2", "F/4", "4F"],
    answer: 2,
    explanation: "Coulomb's law gives F proportional to 1/r². Doubling r reduces the force to F/4."
  },
  {
    subject: "Physics",
    chapter: "Modern Physics and Semiconductors",
    notes: [
      "Photon energy is proportional to frequency.",
      "The photoelectric effect supports the particle model of light.",
      "The maximum kinetic energy of photoelectrons depends on frequency.",
      "Semiconductors have conductivity between conductors and insulators.",
      "Doping changes the number of charge carriers in a semiconductor.",
      "A p-n junction diode conducts readily in forward bias."
    ],
    formulas: [
      ["Photon energy", "E = hν = hc/λ"],
      ["Einstein photoelectric equation", "Kmax = hν − φ"],
      ["Stopping potential", "eV₀ = Kmax"],
      ["de Broglie wavelength", "λ = h/p"],
      ["Radioactive decay", "N = N₀e^(−λt)"],
      ["Half-life", "T₁/₂ = 0.693/λ"],
      ["Mass-energy equivalence", "E = mc²"]
    ],
    question: "If the frequency of light increases above the threshold frequency, the maximum photoelectron kinetic energy:",
    options: ["Increases", "Decreases", "Always remains zero", "Becomes independent of frequency"],
    answer: 0,
    explanation: "Kmax = hν − φ, so increasing the frequency increases the maximum kinetic energy."
  },
  {
    subject: "Physics",
    chapter: "Ray Optics and Wave Optics",
    notes: [
      "Reflection obeys the equality of angles of incidence and reflection.",
      "Refraction occurs due to a change in wave speed between media.",
      "A convex lens converges parallel rays in the paraxial approximation.",
      "Interference results from superposition of coherent waves.",
      "Diffraction becomes significant when the aperture size is comparable to wavelength."
    ],
    formulas: [
      ["Refractive index", "n = c/v"],
      ["Snell's law", "n₁ sin i = n₂ sin r"],
      ["Mirror formula", "1/f = 1/v + 1/u"],
      ["Lens formula", "1/f = 1/v − 1/u"],
      ["Lens power", "P = 1/f (f in metres)"],
      ["Young's fringe width", "β = λD/d"],
      ["Single-slit minima", "a sin θ = mλ"]
    ],
    question: "In Young's double-slit experiment, what happens to fringe width when wavelength doubles?",
    options: ["It halves", "It doubles", "It stays the same", "It becomes four times"],
    answer: 1,
    explanation: "Fringe width β = λD/d, so doubling wavelength doubles the fringe width."
  },
  {
    subject: "Physics",
    chapter: "Magnetism, EMI and AC",
    notes: [
      "A moving charge can experience a magnetic force.",
      "Magnetic force is perpendicular to velocity and magnetic field.",
      "Changing magnetic flux induces an emf.",
      "Lenz's law gives the direction of induced current.",
      "An inductor opposes changes in current.",
      "In a purely resistive AC circuit, current and voltage are in phase."
    ],
    formulas: [
      ["Magnetic force", "F = qvB sin θ"],
      ["Force on wire", "F = BIL sin θ"],
      ["Magnetic flux", "Φ = BA cos θ"],
      ["Faraday's law", "ε = −dΦ/dt"],
      ["Inductor emf", "ε = −L(dI/dt)"],
      ["Inductive reactance", "Xᴸ = ωL"],
      ["Capacitive reactance", "Xᶜ = 1/(ωC)"],
      ["RMS voltage", "Vᵣₘₛ = V₀/√2"]
    ],
    question: "The magnetic flux through a coil changes by 2 Wb in 0.5 s. What is the magnitude of average induced emf for one turn?",
    options: ["0.25 V", "1 V", "4 V", "8 V"],
    answer: 2,
    explanation: "|ε| = |ΔΦ/Δt| = 2/0.5 = 4 V."
  },
  {
    subject: "Physics",
    chapter: "Thermodynamics and Mechanics",
    notes: [
      "Newton's laws describe the relationship between force and motion.",
      "Work done by a constant force is the dot product of force and displacement.",
      "Mechanical energy is conserved when only conservative forces do work.",
      "Momentum is conserved in an isolated system.",
      "The first law of thermodynamics relates heat, internal energy and work.",
      "For an ideal gas, internal energy depends only on temperature."
    ],
    formulas: [
      ["Newton's second law", "F = ma"],
      ["Work", "W = Fs cos θ"],
      ["Kinetic energy", "K = ½mv²"],
      ["Momentum", "p = mv"],
      ["Power", "P = dW/dt"],
      ["First law", "ΔQ = ΔU + W"],
      ["Ideal gas equation", "PV = nRT"],
      ["Efficiency", "η = useful output/input"]
    ],
    question: "A 2 kg object accelerates at 3 m/s². What net force acts on it?",
    options: ["1.5 N", "5 N", "6 N", "9 N"],
    answer: 2,
    explanation: "Newton's second law gives F = ma = 2 × 3 = 6 N."
  },
  {
    subject: "Chemistry",
    chapter: "Chemical Bonding",
    notes: [
      "Ionic bonding involves electrostatic attraction between oppositely charged ions.",
      "Covalent bonds involve shared electron pairs.",
      "VSEPR theory predicts molecular shape from electron-pair repulsion.",
      "Hybridisation describes mixing of atomic orbitals in bonding models.",
      "Bond order is related to bond strength and bond length.",
      "Hydrogen bonding affects boiling points and physical properties."
    ],
    formulas: [
      ["Formal charge", "FC = valence e⁻ − nonbonding e⁻ − ½(bonding e⁻)"],
      ["Dipole moment", "μ = q × r"],
      ["Bond order (MO theory)", "BO = ½(Nᵦ − Nₐ)"],
      ["Steric number", "σ bonds + lone pairs on central atom"]
    ],
    question: "What is the molecular shape of CH₄?",
    options: ["Linear", "Trigonal planar", "Tetrahedral", "Bent"],
    answer: 2,
    explanation: "Carbon has four bonding pairs and no lone pairs, giving a tetrahedral shape."
  },
  {
    subject: "Chemistry",
    chapter: "Coordination Compounds",
    notes: [
      "A central metal atom or ion is bonded to ligands.",
      "Coordination number counts donor atoms directly attached to the metal.",
      "Ligands may be monodentate, bidentate or polydentate.",
      "Oxidation state is found by balancing the overall charge.",
      "Isomerism includes structural and stereoisomerism.",
      "Crystal field splitting helps explain colour and magnetic behaviour."
    ],
    formulas: [
      ["Complex charge", "Metal oxidation state + ligand charges"],
      ["Magnetic moment (spin-only)", "μ = √[n(n + 2)] BM"],
      ["Octahedral splitting", "Δₒ = E(eᵍ) − E(t₂g)"]
    ],
    question: "What is the oxidation state of cobalt in [Co(NH₃)₆]Cl₃?",
    options: ["0", "+1", "+2", "+3"],
    answer: 3,
    explanation: "The complex cation has charge +3. NH₃ is neutral, so cobalt is in the +3 oxidation state."
  },
  {
    subject: "Chemistry",
    chapter: "Periodic Properties and p-Block",
    notes: [
      "Atomic radius generally decreases across a period and increases down a group.",
      "Ionisation enthalpy generally increases across a period.",
      "Electronegativity describes attraction for shared electrons.",
      "Periodic trends have exceptions due to electronic configuration and shielding.",
      "Study p-block trends, compounds and reactions against the official syllabus."
    ],
    formulas: [
      ["Effective nuclear charge (approx.)", "Zeff = Z − shielding"],
      ["Formal oxidation-state balance", "Sum of oxidation states = overall charge"]
    ],
    question: "Across a period, effective nuclear charge generally:",
    options: ["Increases", "Decreases", "Always becomes zero", "Never changes"],
    answer: 0,
    explanation: "Nuclear charge increases across a period while added electrons enter the same principal shell, so effective nuclear charge generally rises."
  },
  {
    subject: "Chemistry",
    chapter: "Chemical and Ionic Equilibrium",
    notes: [
      "At equilibrium, forward and reverse reaction rates are equal.",
      "The equilibrium constant depends on temperature.",
      "Reaction quotients help predict the direction of change.",
      "pH is the negative logarithm of hydrogen-ion concentration.",
      "A buffer resists changes in pH.",
      "Le Chatelier's principle predicts how equilibrium responds to a disturbance."
    ],
    formulas: [
      ["Equilibrium constant", "Kc = product concentrations / reactant concentrations (with powers)"],
      ["Reaction quotient", "Q compared with K"],
      ["pH", "pH = −log₁₀[H⁺]"],
      ["pOH", "pOH = −log₁₀[OH⁻]"],
      ["At 25°C", "pH + pOH = 14"],
      ["Weak acid approximation", "[H⁺] ≈ √(KaC)"],
      ["Henderson–Hasselbalch", "pH = pKa + log([A⁻]/[HA])"]
    ],
    question: "At 25°C, a solution has pH = 3. What is its hydrogen-ion concentration?",
    options: ["10⁻³ mol/L", "10³ mol/L", "3 mol/L", "10⁻¹¹ mol/L"],
    answer: 0,
    explanation: "[H⁺] = 10⁻ᵖᴴ = 10⁻³ mol/L."
  },
  {
    subject: "Chemistry",
    chapter: "Thermodynamics",
    notes: [
      "A system exchanges energy and possibly matter with its surroundings.",
      "Internal energy is a state function.",
      "Enthalpy change is useful for constant-pressure processes.",
      "Entropy measures energy dispersal and the number of accessible microstates.",
      "Spontaneity at constant temperature and pressure is assessed using Gibbs energy."
    ],
    formulas: [
      ["First law", "ΔU = q + w (chemistry sign convention)"],
      ["Enthalpy", "H = U + PV"],
      ["Gibbs energy", "ΔG = ΔH − TΔS"],
      ["At equilibrium", "ΔG = 0"],
      ["Relation to equilibrium", "ΔG° = −RT ln K"],
      ["Heat", "q = mcΔT"]
    ],
    question: "At constant temperature and pressure, a process is spontaneous when:",
    options: ["ΔG > 0", "ΔG < 0", "ΔG is always 100", "ΔH must equal zero"],
    answer: 1,
    explanation: "A spontaneous process at constant temperature and pressure has ΔG < 0."
  },
  {
    subject: "Chemistry",
    chapter: "Electrochemistry and Chemical Kinetics",
    notes: [
      "Oxidation occurs at the anode and reduction at the cathode.",
      "Cell potential depends on electrode potentials and conditions.",
      "Conductivity depends on the number and mobility of ions.",
      "Reaction rate describes change in concentration per unit time.",
      "Reaction order is determined experimentally.",
      "A catalyst changes reaction rate without changing the equilibrium constant."
    ],
    formulas: [
      ["Cell potential", "E°cell = E°cathode − E°anode"],
      ["Nernst equation", "E = E° − (RT/nF) ln Q"],
      ["Free energy", "ΔG = −nFE"],
      ["First-order rate law", "ln([A]₀/[A]t) = kt"],
      ["First-order half-life", "t₁/₂ = 0.693/k"],
      ["Arrhenius equation", "k = Ae^(−Ea/RT)"]
    ],
    question: "For a first-order reaction, the half-life is:",
    options: ["Proportional to initial concentration", "Independent of initial concentration", "Always zero", "Inversely proportional to temperature only"],
    answer: 1,
    explanation: "For a first-order reaction, t₁/₂ = 0.693/k, independent of initial concentration."
  },
  {
    subject: "Chemistry",
    chapter: "GOC and Carbonyl Compounds",
    notes: [
      "Inductive effects operate through sigma bonds.",
      "Resonance delocalises electrons across conjugated systems.",
      "Hyperconjugation can stabilise carbocations and alkenes.",
      "Acidity depends on the stability of the conjugate base.",
      "Aldehydes and ketones contain the carbonyl group.",
      "Nucleophiles donate electron pairs; electrophiles accept electron pairs."
    ],
    formulas: [
      ["Degree of unsaturation", "DBE = (2C + 2 + N − H − X)/2"],
      ["Carbonyl reduction", "Aldehyde/ketone → alcohol (reagent-dependent)"],
      ["Oxidation state rule", "Assign bonding electrons to the more electronegative atom"]
    ],
    question: "Which effect generally stabilises a carbocation by electron donation through adjacent sigma bonds?",
    options: ["Hyperconjugation", "Only a −I effect", "Complete loss of electrons", "No electronic effect"],
    answer: 0,
    explanation: "Hyperconjugation delocalises electron density from adjacent sigma bonds and can stabilise a carbocation."
  },
  {
    subject: "Mathematics",
    chapter: "Matrices and Determinants",
    notes: [
      "Matrices can represent rectangular arrays of numbers.",
      "Matrix multiplication is generally not commutative.",
      "A square matrix is invertible only if its determinant is nonzero.",
      "A determinant is defined for square matrices.",
      "Elementary row operations can help calculate determinants and solve systems."
    ],
    formulas: [
      ["2 × 2 determinant", "|A| = ad − bc"],
      ["Inverse", "A⁻¹ = adj(A)/|A|, if |A| ≠ 0"],
      ["Transpose", "(AB)ᵀ = BᵀAᵀ"],
      ["Determinant product", "|AB| = |A||B|"],
      ["Inverse product", "(AB)⁻¹ = B⁻¹A⁻¹"]
    ],
    question: "Find the determinant of [[2, 1], [3, 4]].",
    options: ["5", "8", "11", "14"],
    answer: 0,
    explanation: "The determinant is (2 × 4) − (1 × 3) = 5."
  },
  {
    subject: "Mathematics",
    chapter: "Vector Algebra and 3D Geometry",
    notes: [
      "A vector has both magnitude and direction.",
      "The dot product gives a scalar.",
      "The cross product gives a vector perpendicular to both input vectors.",
      "Direction ratios describe the direction of a line.",
      "The angle between two nonzero vectors can be found using the dot product."
    ],
    formulas: [
      ["Magnitude", "|a| = √(aₓ² + aᵧ² + a𝓏²)"],
      ["Dot product", "a · b = |a||b| cos θ"],
      ["Cross-product magnitude", "|a × b| = |a||b| sin θ"],
      ["Line in vector form", "r = a + λb"],
      ["Distance in 3D", "d = √[(x₂−x₁)² + (y₂−y₁)² + (z₂−z₁)²]"]
    ],
    question: "If two nonzero vectors are perpendicular, their dot product is:",
    options: ["1", "−1", "0", "Their product of magnitudes"],
    answer: 2,
    explanation: "a · b = |a||b|cos 90° = 0."
  },
  {
    subject: "Mathematics",
    chapter: "Limits, Continuity and Differentiability",
    notes: [
      "A limit describes the value approached by a function.",
      "Continuity at a point requires the function value and limit to agree.",
      "Differentiability implies continuity, but continuity does not always imply differentiability.",
      "Left-hand and right-hand limits must agree for a two-sided limit to exist.",
      "Standard limits are useful for evaluating indeterminate forms."
    ],
    formulas: [
      ["Standard limit", "lim(x→0) sin x/x = 1"],
      ["Standard limit", "lim(x→0) (1−cos x)/x² = 1/2"],
      ["Exponential limit", "lim(x→0) (eˣ−1)/x = 1"],
      ["Derivative definition", "f′(x) = lim(h→0)[f(x+h)−f(x)]/h"],
      ["Power rule", "d(xⁿ)/dx = nxⁿ⁻¹"],
      ["Product rule", "(uv)′ = u′v + uv′"],
      ["Chain rule", "d f(g(x))/dx = f′(g(x))g′(x)"]
    ],
    question: "Evaluate lim(x→0) sin(3x)/(3x).",
    options: ["0", "1", "3", "Does not exist"],
    answer: 1,
    explanation: "Using lim(u→0) sin u/u = 1 with u = 3x, the limit equals 1."
  },
  {
    subject: "Mathematics",
    chapter: "Applications of Derivatives",
    notes: [
      "The derivative gives the instantaneous rate of change.",
      "A stationary point satisfies f′(x) = 0.",
      "The first derivative can test increasing and decreasing intervals.",
      "The second derivative can help classify stationary points.",
      "Optimisation problems require checking the domain and relevant endpoints."
    ],
    formulas: [
      ["Increasing function", "f′(x) > 0 on an interval"],
      ["Decreasing function", "f′(x) < 0 on an interval"],
      ["Stationary point", "f′(x) = 0"],
      ["Second derivative test", "f′=0, f″>0 suggests a local minimum"],
      ["Tangent slope", "m = f′(a)"],
      ["Normal slope", "mₙ = −1/f′(a), when defined"]
    ],
    question: "For f(x) = x², what is the minimum value over the real numbers?",
    options: ["−1", "0", "1", "No minimum"],
    answer: 1,
    explanation: "Since x² ≥ 0 for all real x and equals zero at x = 0, the minimum is 0."
  },
  {
    subject: "Mathematics",
    chapter: "Integral Calculus and Differential Equations",
    notes: [
      "Integration reverses differentiation up to a constant.",
      "Indefinite integrals include a constant of integration.",
      "Definite integrals can represent signed area.",
      "Substitution can simplify composite functions.",
      "A differential equation relates a function and its derivatives."
    ],
    formulas: [
      ["Power rule", "∫xⁿ dx = xⁿ⁺¹/(n+1) + C, n ≠ −1"],
      ["Log integral", "∫dx/x = ln|x| + C"],
      ["Exponential integral", "∫eˣ dx = eˣ + C"],
      ["Definite integral", "∫ₐᵇ f(x)dx = F(b) − F(a)"],
      ["Integration by parts", "∫u dv = uv − ∫v du"],
      ["Separable equation", "dy/dx = g(x)h(y)"]
    ],
    question: "Evaluate ∫2x dx.",
    options: ["x + C", "x² + C", "2x² + C", "2 + C"],
    answer: 1,
    explanation: "Since d(x²)/dx = 2x, the integral is x² + C."
  },
  {
    subject: "Mathematics",
    chapter: "Straight Lines, Circles and Conic Sections",
    notes: [
      "A straight line can be expressed using slope-intercept or point-slope form.",
      "A circle is the locus of points at a fixed distance from its centre.",
      "Conic sections include parabola, ellipse and hyperbola.",
      "Coordinate geometry often translates geometry into algebraic equations.",
      "Check restrictions and geometric conditions before accepting a solution."
    ],
    formulas: [
      ["Slope", "m = (y₂−y₁)/(x₂−x₁)"],
      ["Point-slope line", "y − y₁ = m(x − x₁)"],
      ["Circle", "(x−h)² + (y−k)² = r²"],
      ["Parabola", "y² = 4ax"],
      ["Ellipse", "x²/a² + y²/b² = 1"],
      ["Hyperbola", "x²/a² − y²/b² = 1"]
    ],
    question: "What is the radius of x² + y² = 25?",
    options: ["5", "10", "25", "√5"],
    answer: 0,
    explanation: "Comparing with x² + y² = r² gives r = √25 = 5."
  },
  {
    subject: "Mathematics",
    chapter: "Sequences, Series and Probability",
    notes: [
      "An arithmetic progression has a constant difference.",
      "A geometric progression has a constant ratio.",
      "Probability lies between zero and one.",
      "For equally likely outcomes, probability is favourable outcomes divided by total outcomes.",
      "Independent events satisfy P(A ∩ B) = P(A)P(B)."
    ],
    formulas: [
      ["AP nth term", "aₙ = a + (n−1)d"],
      ["AP sum", "Sₙ = n/2 [2a + (n−1)d]"],
      ["GP nth term", "aₙ = arⁿ⁻¹"],
      ["Finite GP sum", "Sₙ = a(rⁿ−1)/(r−1), r ≠ 1"],
      ["Probability", "P(A) = favourable outcomes / total outcomes"],
      ["Complement", "P(Aᶜ) = 1 − P(A)"],
      ["Union", "P(A∪B) = P(A)+P(B)−P(A∩B)"]
    ],
    question: "A fair die is rolled once. What is the probability of getting an even number?",
    options: ["1/6", "1/3", "1/2", "2/3"],
    answer: 2,
    explanation: "The even outcomes are 2, 4 and 6. Probability = 3/6 = 1/2."
  }
];

/* ---------- Storage ---------- */

function createDefaultData() {
  return {
    checks: {},
    notes: [],
    studySeconds: {},
    testHistory: [],
    startDate: new Date().toISOString().slice(0, 10)
  };
}

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultData();

    const saved = JSON.parse(raw);
    const defaults = createDefaultData();

    return {
      ...defaults,
      ...saved,
      checks: saved.checks && typeof saved.checks === "object"
        ? saved.checks : {},
      notes: Array.isArray(saved.notes) ? saved.notes : [],
      studySeconds: saved.studySeconds && typeof saved.studySeconds === "object"
        ? saved.studySeconds : {},
      testHistory: Array.isArray(saved.testHistory) ? saved.testHistory : []
    };
  } catch (error) {
    console.error("Could not load saved progress:", error);
    return createDefaultData();
  }
}

let data = loadData();

function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Could not save progress:", error);
    showToast("Unable to save. Check your browser storage.");
    return false;
  }
}

/* ---------- General helpers ---------- */

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function showToast(message) {
  const toast = $("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 2800);
}

let toastTimeout = null;

function getDateForDay(day) {
  const start = new Date(`${data.startDate}T12:00:00`);
  start.setDate(start.getDate() + day - 1);
  return start;
}

function getCurrentDay() {
  const start = new Date(`${data.startDate}T00:00:00`);
  const today = new Date();
  start.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const difference = Math.floor((today - start) / 86400000) + 1;
  return Math.max(1, Math.min(DAY_COUNT, difference));
}

function dayKey(day, subjectIndex) {
  return `${day}-${subjectIndex}`;
}

function isChecked(day, subjectIndex) {
  return Boolean(data.checks[dayKey(day, subjectIndex)]);
}

function completedForDay(day) {
  return [0, 1, 2].filter(index => isChecked(day, index)).length;
}

function totalCompleted() {
  return Object.values(data.checks).filter(Boolean).length;
}

function currentStreak() {
  let streak = 0;

  for (let day = getCurrentDay(); day >= 1; day--) {
    if (completedForDay(day) === 3) streak++;
    else break;
  }

  return streak;
}

/* ---------- Build the 75-day plan ---------- */

function getTask(day, subjectIndex) {
  const subject = SUBJECTS[subjectIndex];
  const chapters = CHAPTERS[subject];
  const chapter = chapters[Math.floor((day - 1) / 3) % chapters.length];
  const phase = Math.floor((day - 1) / 15);

  if (phase === 0) {
    const steps = ["Concepts and theory", "Worked examples and practice", "PYQs and revision"];
    return `${chapter} — ${steps[(day - 1) % 3]}`;
  }

  if (phase === 1) {
    return `${chapter} — concepts, formulas and standard questions`;
  }

  if (phase === 2) {
    return `${chapter} — practice questions and previous-year questions`;
  }

  if (phase === 3) {
    return `${chapter} — timed practice and error review`;
  }

  return `${chapter} — final revision and mixed questions`;
}

function getDailyTasks(day) {
  return SUBJECTS.map((subject, index) => ({
    subject,
    index,
    title: getTask(day, index),
    duration: "2 hours"
  }));
}

/* ---------- Render tasks ---------- */

function renderTask(day, subjectIndex, compact = false) {
  const subject = SUBJECTS[subjectIndex];
  const title = getTask(day, subjectIndex);
  const checked = isChecked(day, subjectIndex);
  const id = `task-${day}-${subjectIndex}-${compact ? "compact" : "full"}`;

  return `
    <div class="task-item ${checked ? "completed" : ""}">
      <input
        type="checkbox"
        id="${id}"
        data-day="${day}"
        data-subject="${subjectIndex}"
        ${checked ? "checked" : ""}
        aria-label="Mark ${escapeHTML(subject)} task complete">
      <label class="task-content" for="${id}">
        <span class="task-title">${escapeHTML(title)}</span>
        <span class="task-meta">
          <span class="task-subject ${subject.toLowerCase()}">${escapeHTML(subject)}</span>
          · ${compact ? "2-hour study block" : "Learn · Practise · Review"}
        </span>
      </label>
    </div>`;
}

/* ---------- Dashboard ---------- */

let selectedDay = getCurrentDay();
let activeView = "dashboard";

function renderDashboard() {
  const today = getCurrentDay();
  const done = completedForDay(today);
  const total = totalCompleted();

  if ($("todayLabel")) {
    $("todayLabel").textContent = new Date().toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric"
    });
  }

  if ($("greeting")) {
    $("greeting").textContent = done === 3
      ? "Today's study goals completed!"
      : "Small steps. Big results.";
  }

  if ($("completedCount")) $("completedCount").textContent = done;
  if ($("taskCaption")) {
    $("taskCaption").textContent = `${done} of 3 subject blocks completed today`;
  }
  if ($("overallProgress")) {
    $("overallProgress").textContent = `${Math.round(total / (DAY_COUNT * 3) * 100)}%`;
  }
  if ($("streakCount")) {
    $("streakCount").innerHTML = `${currentStreak()} <small>days</small>`;
  }
  if ($("dayHeading")) $("dayHeading").textContent = `Day ${today} Study Plan`;
  if ($("dayProgressText")) {
    $("dayProgressText").textContent = `${done} of 3 subject blocks completed`;
  }
  if ($("dayProgressPercent")) {
    $("dayProgressPercent").textContent = `${Math.round(done / 3 * 100)}%`;
  }
  if ($("dayProgressBar")) {
    $("dayProgressBar").style.width = `${done / 3 * 100}%`;
  }

  if ($("dashboardTasks")) {
    $("dashboardTasks").innerHTML = [0, 1, 2]
      .map(index => renderTask(today, index, true)).join("");
  }

  const bars = [
    ["physicsBar", 0],
    ["chemistryBar", 1],
    ["mathsBar", 2]
  ];

  bars.forEach(([id, index]) => {
    if ($(id)) $(id).style.width = `${isChecked(today, index) ? 100 : 0}%`;
  });

  if ($("daySelector")) {
    $("daySelector").innerHTML = Array.from({ length: DAY_COUNT }, (_, index) => {
      const day = index + 1;
      return `<option value="${day}" ${day === selectedDay ? "selected" : ""}>Day ${day}</option>`;
    }).join("");
  }

  renderActiveView();
}

/* ---------- Daily plan ---------- */

function renderPlan() {
  if (!$("viewHeading") || !$("viewContent")) return;

  const day = Math.max(1, Math.min(DAY_COUNT, selectedDay));
  const done = completedForDay(day);
  const date = getDateForDay(day);

  $("viewHeading").textContent = `Day ${day} — Daily Tasks`;

  $("viewContent").innerHTML = `
    <p class="task-meta">${date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric"
    })}</p>

    <div class="progress-row">
      <span>${done} of 3 subject blocks completed</span>
      <strong>${Math.round(done / 3 * 100)}%</strong>
    </div>

    <div class="progress-track">
      <div class="progress-fill" style="width:${done / 3 * 100}%"></div>
    </div>

    ${getDailyTasks(day).map(task => `
      <h3 class="subject-heading">${escapeHTML(task.subject)} · ${task.duration}</h3>
      ${renderTask(day, task.index)}
      <p class="task-meta">
        Suggested session: 45 min concepts, 35 min examples and practice,
        30 min PYQs, 10 min review.
      </p>
    `).join("")}

    <div class="tip-box">
      <strong>Study tip</strong>
      <p>Complete all three subject blocks, record doubts in Notes, and revisit mistakes during revision.</p>
    </div>`;
}

/* ---------- Calendar ---------- */

function renderCalendar() {
  if (!$("viewHeading") || !$("viewContent")) return;

  $("viewHeading").textContent = "Your 75-Day Calendar";

  const startDay = getDateForDay(1).getDay();
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let html = `<div class="calendar-grid">`;
  html += weekdays.map(day =>
    `<div class="calendar-weekday">${day}</div>`
  ).join("");

  for (let i = 0; i < startDay; i++) html += "<div></div>";

  for (let day = 1; day <= DAY_COUNT; day++) {
    const done = completedForDay(day);
    const classes = [
      "calendar-day",
      day === selectedDay ? "selected" : "",
      day === getCurrentDay() ? "today" : "",
      done === 3 ? "completed" : ""
    ].filter(Boolean).join(" ");

    html += `
      <button class="${classes}" data-select-day="${day}"
        aria-label="Day ${day}, ${done} of 3 tasks completed">
        <span class="calendar-day-number">${day}</span>
        <small>${done}/3</small>
      </button>`;
  }

  html += `</div>
    <p class="task-meta" style="margin-top:16px">
      Select a day to view or update its study tasks.
    </p>`;

  $("viewContent").innerHTML = html;
}

/* ---------- Statistics ---------- */

function renderStatistics() {
  if (!$("viewHeading") || !$("viewContent")) return;

  $("viewHeading").textContent = "Progress Statistics";

  const total = totalCompleted();
  const percent = Math.round(total / (DAY_COUNT * 3) * 100);
  const seconds = Object.values(data.studySeconds)
    .reduce((sum, value) => sum + Number(value || 0), 0);
  const hours = seconds / 3600;

  let chart = `<div class="chart-bars">`;

  for (let week = 0; week < 11; week++) {
    const start = week * 7 + 1;
    const end = Math.min(DAY_COUNT, start + 6);
    let completed = 0;

    for (let day = start; day <= end; day++) {
      completed += completedForDay(day);
    }

    const maximum = (end - start + 1) * 3;
    const rate = Math.round(completed / maximum * 100);

    chart += `
      <div class="chart-column">
        <strong>${rate}%</strong>
        <div class="chart-bar-track">
          <div class="chart-bar" style="height:${rate}%"></div>
        </div>
        <small>W${week + 1}</small>
      </div>`;
  }

  chart += "</div>";

  $("viewContent").innerHTML = `
    <div class="stats-grid">
      <article class="stat-card">
        <p>Tasks completed</p>
        <strong class="stat-value">${total}<small> / ${DAY_COUNT * 3}</small></strong>
      </article>
      <article class="stat-card">
        <p>Overall completion</p>
        <strong class="stat-value">${percent}%</strong>
      </article>
      <article class="stat-card">
        <p>Recorded timer hours</p>
        <strong class="stat-value">${hours.toFixed(1)} h</strong>
      </article>
      <article class="stat-card">
        <p>Current streak</p>
        <strong class="stat-value">${currentStreak()} days</strong>
      </article>
    </div>
    <h3>Weekly completion</h3>
    ${chart}
    <p class="task-meta">Statistics update when you mark tasks complete or finish a timer session.</p>`;
}

/* ---------- Timer ---------- */

let timerSeconds = 25 * 60;
let timerRunning = false;
let timerMode = "focus";
let timerInterval = null;
let lastTimerTick = null;

function formatTime(seconds) {
  const safe = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(safe / 60);
  const remainingSeconds = safe % 60;

  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

function renderTimer() {
  if (!$("viewHeading") || !$("viewContent")) return;

  $("viewHeading").textContent = "Study Timer";

  $("viewContent").innerHTML = `
    <div class="timer-card">
      <span class="badge">${timerMode === "focus" ? "Focus session" : "Break session"}</span>
      <div class="timer-display" id="timerDisplay">${formatTime(timerSeconds)}</div>
      <div class="timer-controls">
        <button class="primary-button" id="timerStart">
          ${timerRunning ? "Pause timer" : "Start timer"}
        </button>
        <button class="secondary-button" id="timerReset">Reset</button>
        <button class="secondary-button" id="timerModeButton">
          ${timerMode === "focus" ? "Switch to break" : "Switch to focus"}
        </button>
      </div>
      <p style="margin-top:18px">
        Focus for 25 minutes, then take a short break.
        Finished focus sessions count toward your recorded study time.
      </p>
    </div>`;
}

function stopTimer() {
  timerRunning = false;
  lastTimerTick = null;

  if (timerInterval !== null) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function startTimer() {
  if (timerRunning) return;

  timerRunning = true;
  lastTimerTick = Date.now();

  timerInterval = setInterval(() => {
    const now = Date.now();
    const elapsed = Math.max(1, Math.floor((now - lastTimerTick) / 1000));
    lastTimerTick = now;
    timerSeconds = Math.max(0, timerSeconds - elapsed);

    const display = $("timerDisplay");
    if (display) display.textContent = formatTime(timerSeconds);

    if (timerSeconds <= 0) finishTimer();
  }, 250);
}

function finishTimer() {
  stopTimer();

  if (timerMode === "focus") {
    const key = String(getCurrentDay());
    data.studySeconds[key] = Number(data.studySeconds[key] || 0) + 25 * 60;
    saveData();
    showToast("Focus session complete! Take a break.");
    timerMode = "break";
    timerSeconds = 5 * 60;
  } else {
    showToast("Break finished. Ready to focus?");
    timerMode = "focus";
    timerSeconds = 25 * 60;
  }

  renderActiveView();
}

/* ---------- Notes ---------- */

function renderNotes() {
  if (!$("viewHeading") || !$("viewContent")) return;

  $("viewHeading").textContent = "Notes & Weak Topics";

  const notesHTML = data.notes.length
    ? data.notes.map(note => `
        <article class="note-card">
          <h3>${escapeHTML(note.title)}</h3>
          <span class="badge">${escapeHTML(note.subject)}</span>
          <p>${escapeHTML(note.body)}</p>
          <div class="note-card-footer">
            <span>${new Date(note.createdAt).toLocaleString()}</span>
            <button class="secondary-button" data-delete-note="${escapeHTML(note.id)}">
              Delete
            </button>
          </div>
        </article>`).join("")
    : `<div class="empty-state">No notes saved yet. Add a doubt, formula, or topic to revise.</div>`;

  $("viewContent").innerHTML = `
    <form id="noteForm">
      <div class="form-group">
        <label class="field-label" for="noteTitle">Topic or chapter</label>
        <input class="form-control" id="noteTitle" maxlength="120"
          placeholder="e.g. Current Electricity — Kirchhoff's laws" required>
      </div>
      <div class="form-group">
        <label class="field-label" for="noteBody">Notes or doubts</label>
        <textarea class="form-control" id="noteBody" maxlength="5000"
          placeholder="Write the formula, concept, or mistake you need to review..." required></textarea>
      </div>
      <div class="form-group">
        <label class="field-label" for="noteSubject">Subject</label>
        <select class="form-control" id="noteSubject">
          <option>Physics</option>
          <option>Chemistry</option>
          <option>Mathematics</option>
          <option>General</option>
        </select>
      </div>
      <button class="primary-button" type="submit">Save note</button>
    </form>
    <hr>
    <div class="notes-list">${notesHTML}</div>`;
}

/* ---------- Study library ---------- */

function renderLibrary() {
  if (!$("viewHeading") || !$("viewContent")) return;

  $("viewHeading").textContent = "Study Notes & Formulas";

  const subjects = ["All", ...SUBJECTS];

  $("viewContent").innerHTML = `
    <p>Quick revision notes, core formulas, and a practice question for each chapter group.</p>
    <div class="library-toolbar">
      <input class="form-control" id="librarySearch" type="search"
        placeholder="Search chapters or concepts..." aria-label="Search study library">
      <select class="form-control" id="librarySubject" aria-label="Filter subject">
        ${subjects.map(subject => `<option value="${escapeHTML(subject)}">${escapeHTML(subject)}</option>`).join("")}
      </select>
    </div>
    <div id="libraryResults" class="library-grid"></div>`;

  renderLibraryCards();
}

function renderLibraryCards() {
  const results = $("libraryResults");
  if (!results) return;

  const search = ($("librarySearch")?.value || "").trim().toLowerCase();
  const subject = $("librarySubject")?.value || "All";

  const matches = CHAPTER_LIBRARY.filter(item => {
    const subjectMatches = subject === "All" || item.subject === subject;
    const searchText = [
      item.subject,
      item.chapter,
      ...item.notes,
      ...item.formulas.map(formula => formula.join(" "))
    ].join(" ").toLowerCase();

    return subjectMatches && (!search || searchText.includes(search));
  });

  if (!matches.length) {
    results.innerHTML = `<div class="empty-state">No matching chapters. Try a different search.</div>`;
    return;
  }

  results.innerHTML = matches.map((item, index) => `
    <article class="library-card">
      <div class="library-card-top">
        <span class="subject-pill">${escapeHTML(item.subject)}</span>
        <span class="badge">${item.formulas.length} formulas</span>
      </div>
      <h3>${escapeHTML(item.chapter)}</h3>
      <p>${escapeHTML(item.notes[0])}</p>
      <div class="library-card-footer">
        <span class="task-meta">Notes · Formulas · Practice</span>
        <button class="primary-button" data-open-chapter="${CHAPTER_LIBRARY.indexOf(item)}">
          Open chapter
        </button>
      </div>
    </article>`).join("");
}

function renderChapter(index) {
  const item = CHAPTER_LIBRARY[index];
  if (!item || !$("viewContent")) return;

  $("viewHeading").textContent = item.chapter;

  $("viewContent").innerHTML = `
    <button class="secondary-button" id="backToLibrary">← Back to library</button>

    <div class="study-section">
      <span class="subject-pill">${escapeHTML(item.subject)}</span>
      <h3 style="margin-top:12px">Quick Notes</h3>
      <ul>${item.notes.map(note => `<li>${escapeHTML(note)}</li>`).join("")}</ul>
    </div>

    <div class="study-section">
      <h3>Formula Sheet</h3>
      <ul class="formula-list">
        ${item.formulas.map(([name, formula]) => `
          <li><strong>${escapeHTML(name)}:</strong> <code>${escapeHTML(formula)}</code></li>
        `).join("")}
      </ul>
    </div>

    <div class="question-card">
      <div class="question-number">Practice Question</div>
      <h3>${escapeHTML(item.question)}</h3>
      <div class="quiz-options">
        ${item.options.map((option, optionIndex) => `
          <button class="quiz-option"
            data-practice-answer="${optionIndex}"
            data-chapter-index="${index}">
            ${String.fromCharCode(65 + optionIndex)}. ${escapeHTML(option)}
          </button>`).join("")}
      </div>
      <div id="practiceFeedback"></div>
    </div>`;
}

function answerPractice(chapterIndex, answerIndex, clickedButton) {
  const item = CHAPTER_LIBRARY[chapterIndex];
  if (!item) return;

  const feedback = $("practiceFeedback");
  if (!feedback) return;

  document.querySelectorAll("[data-practice-answer]").forEach(button => {
    button.disabled = true;

    const optionIndex = Number(button.dataset.practiceAnswer);
    if (optionIndex === item.answer) button.classList.add("correct");
    if (button === clickedButton && optionIndex !== item.answer) {
      button.classList.add("incorrect");
    }
  });

  const correct = answerIndex === item.answer;

  feedback.innerHTML = `
    <div class="answer-explanation">
      <strong class="${correct ? "correct-answer" : "wrong-answer"}">
        ${correct ? "Correct!" : "Not quite."}
      </strong>
      <p>${escapeHTML(item.explanation)}</p>
    </div>`;

  if (correct) showToast("Correct answer!");
}

/* ---------- Diagnostic quiz ---------- */

let quizQuestions = [];
let quizIndex = 0;
let quizAnswers = [];
let quizFinished = false;

function startQuiz() {
  quizQuestions = [...CHAPTER_LIBRARY];
  quizIndex = 0;
  quizAnswers = [];
  quizFinished = false;
  renderQuizQuestion();
}

function renderMockTests() {
  if (!$("viewHeading") || !$("viewContent")) return;

  $("viewHeading").textContent = "Mock Tests";

  const history = data.testHistory.length
    ? data.testHistory.slice().reverse().map(test => `
        <div class="test-history-item">
          <div>
            <strong>${escapeHTML(test.title)}</strong>
            <p style="margin:4px 0 0">${new Date(test.date).toLocaleString()}</p>
          </div>
          <strong>${test.score}/${test.total}</strong>
        </div>`).join("")
    : `<div class="empty-state">No diagnostic tests completed yet.</div>`;

  $("viewContent").innerHTML = `
    <div class="mock-intro" style="padding:22px">
      <span class="badge">Chapter diagnostic</span>
      <h3 style="margin-top:12px">Test your revision</h3>
      <p>This practice quiz contains one question from each chapter group in the study library.</p>
      <p><strong>Questions:</strong> ${CHAPTER_LIBRARY.length}</p>
      <p><strong>Scoring:</strong> 1 point for each correct answer; no negative marking in this diagnostic.</p>
      <button class="primary-button" id="startQuiz">Start diagnostic test</button>
    </div>
    <h3 style="margin-top:24px">Previous results</h3>
    <div class="test-history">${history}</div>
    <p class="task-meta" style="margin-top:16px">
      This is a chapter practice quiz, not a full official JEE Main mock paper.
    </p>`;
}

function renderQuizQuestion() {
  if (!$("viewContent")) return;

  if (quizIndex >= quizQuestions.length) {
    finishQuiz();
    return;
  }

  const item = quizQuestions[quizIndex];

  $("viewHeading").textContent = "Diagnostic Test";

  $("viewContent").innerHTML = `
    <div class="progress-row">
      <span>Question ${quizIndex + 1} of ${quizQuestions.length}</span>
      <strong>${Math.round(quizIndex / quizQuestions.length * 100)}%</strong>
    </div>
    <div class="progress-track">
      <div class="progress-fill" style="width:${quizIndex / quizQuestions.length * 100}%"></div>
    </div>

    <div class="question-card">
      <span class="subject-pill">${escapeHTML(item.subject)}</span>
      <p class="question-number" style="margin-top:14px">${escapeHTML(item.chapter)}</p>
      <h3>${escapeHTML(item.question)}</h3>
      <div class="quiz-options">
        ${item.options.map((option, index) => `
          <button class="quiz-option" data-quiz-answer="${index}">
            ${String.fromCharCode(65 + index)}. ${escapeHTML(option)}
          </button>`).join("")}
      </div>
      <p class="task-meta" style="margin-top:15px">Choose one answer to continue.</p>
    </div>`;
}

function selectQuizAnswer(answerIndex, clickedButton) {
  if (quizFinished || quizAnswers[quizIndex] !== undefined) return;

  const item = quizQuestions[quizIndex];
  quizAnswers[quizIndex] = answerIndex;

  document.querySelectorAll("[data-quiz-answer]").forEach(button => {
    button.disabled = true;
    const optionIndex = Number(button.dataset.quizAnswer);

    if (optionIndex === item.answer) button.classList.add("correct");
    if (button === clickedButton && optionIndex !== item.answer) {
      button.classList.add("incorrect");
    }
  });

  const correct = answerIndex === item.answer;

  const explanation = document.createElement("div");
  explanation.className = "answer-explanation";
  explanation.innerHTML = `
    <strong class="${correct ? "correct-answer" : "wrong-answer"}">
      ${correct ? "Correct!" : "Incorrect"}
    </strong>
    <p>${escapeHTML(item.explanation)}</p>
    <button class="primary-button" id="nextQuizQuestion">
      ${quizIndex === quizQuestions.length - 1 ? "See results" : "Next question"}
    </button>`;

  $("viewContent").querySelector(".question-card").appendChild(explanation);
}

function finishQuiz() {
  quizFinished = true;

  const score = quizQuestions.reduce((total, item, index) =>
    total + (quizAnswers[index] === item.answer ? 1 : 0), 0);

  data.testHistory.push({
    title: "Chapter Diagnostic",
    date: Date.now(),
    score,
    total: quizQuestions.length
  });

  data.testHistory = data.testHistory.slice(-30);
  saveData();

  $("viewHeading").textContent = "Diagnostic Results";
  $("viewContent").innerHTML = `
    <div class="mock-intro" style="padding:24px">
      <span class="badge">Test completed</span>
      <h2 style="margin-top:14px">${score} / ${quizQuestions.length}</h2>
      <div class="progress-track">
        <div class="progress-fill" style="width:${score / quizQuestions.length * 100}%"></div>
      </div>
      <p style="margin-top:16px">
        Review your incorrect answers in the study library and practise those chapters again.
      </p>
      <button class="primary-button" id="retryQuiz">Retake diagnostic</button>
      <button class="secondary-button" id="backToTests">Back to mock tests</button>
    </div>`;

  showToast("Diagnostic result saved.");
}

/* ---------- Navigation and events ---------- */

const VIEW_TITLES = {
  dashboard: "Dashboard",
  plan: "Daily Tasks",
  calendar: "75-Day Calendar",
  statistics: "Statistics",
  timer: "Study Timer",
  notes: "My Notes",
  "study-library": "Study Notes & Formulas",
  "mock-tests": "Mock Tests"
};

function navigate(view) {
  const validViews = Object.keys(VIEW_TITLES);
  if (!validViews.includes(view)) return;

  activeView = view;

  document.querySelectorAll(".nav-item[data-view]").forEach(button => {
    button.classList.toggle("active", button.dataset.view === activeView);
  });

  if ($("pageTitle")) $("pageTitle").textContent = VIEW_TITLES[activeView];

  const sidebar = $("sidebar");
  if (sidebar && window.innerWidth <= 760) sidebar.classList.remove("open");

  renderActiveView();
}

function renderActiveView() {
  if (activeView === "dashboard" || activeView === "plan") {
    renderPlan();
  } else if (activeView === "calendar") {
    renderCalendar();
  } else if (activeView === "statistics") {
    renderStatistics();
  } else if (activeView === "timer") {
    renderTimer();
  } else if (activeView === "notes") {
    renderNotes();
  } else if (activeView === "study-library") {
    renderLibrary();
  } else if (activeView === "mock-tests") {
    renderMockTests();
  }

  document.querySelectorAll(".nav-item[data-view]").forEach(button => {
    button.classList.toggle("active", button.dataset.view === activeView);
  });

  if ($("pageTitle")) $("pageTitle").textContent = VIEW_TITLES[activeView] || "Dashboard";
}

document.addEventListener("click", event => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const nav = target.closest("[data-view]");
  if (nav) {
    navigate(nav.dataset.view);
    return;
  }

  const taskCheckbox = target.closest('input[type="checkbox"][data-day]');
  if (taskCheckbox) {
    const day = Number(taskCheckbox.dataset.day);
    const subject = Number(taskCheckbox.dataset.subject);

    if (
      Number.isInteger(day) && day >= 1 && day <= DAY_COUNT &&
      Number.isInteger(subject) && subject >= 0 && subject <= 2
    ) {
      data.checks[dayKey(day, subject)] = taskCheckbox.checked;
      saveData();
      renderDashboard();
    }
    return;
  }

  const calendarButton = target.closest("[data-select-day]");
  if (calendarButton) {
    selectedDay = Number(calendarButton.dataset.selectDay);
    if ($("daySelector")) $("daySelector").value = String(selectedDay);
    navigate("plan");
    return;
  }

  if (target.closest("#viewAllTasks") || target.closest("#continueButton")) {
    selectedDay = getCurrentDay();
    navigate("plan");
    return;
  }

  if (target.closest("#menuButton")) {
    $("sidebar")?.classList.toggle("open");
    return;
  }

  if (target.closest("#timerStart")) {
    if (timerRunning) {
      stopTimer();
    } else {
      startTimer();
    }
    renderTimer();
    return;
  }

  if (target.closest("#timerReset")) {
    stopTimer();
    timerSeconds = timerMode === "focus" ? 25 * 60 : 5 * 60;
    renderTimer();
    return;
  }

  if (target.closest("#timerModeButton")) {
    stopTimer();
    timerMode = timerMode === "focus" ? "break" : "focus";
    timerSeconds = timerMode === "focus" ? 25 * 60 : 5 * 60;
    renderTimer();
    return;
  }

  const deleteButton = target.closest("[data-delete-note]");
  if (deleteButton) {
    const id = deleteButton.dataset.deleteNote;
    data.notes = data.notes.filter(note => String(note.id) !== String(id));
    saveData();
    renderNotes();
    showToast("Note deleted.");
    return;
  }

  const chapterButton = target.closest("[data-open-chapter]");
  if (chapterButton) {
    renderChapter(Number(chapterButton.dataset.openChapter));
    return;
  }

  if (target.closest("#backToLibrary")) {
    navigate("study-library");
    return;
  }

  const practiceButton = target.closest("[data-practice-answer]");
  if (practiceButton) {
    answerPractice(
      Number(practiceButton.dataset.chapterIndex),
      Number(practiceButton.dataset.practiceAnswer),
      practiceButton
    );
    return;
  }

  if (target.closest("#startQuiz") || target.closest("#retryQuiz")) {
    startQuiz();
    return;
  }

  const quizButton = target.closest("[data-quiz-answer]");
  if (quizButton) {
    selectQuizAnswer(Number(quizButton.dataset.quizAnswer), quizButton);
    return;
  }

  if (target.closest("#nextQuizQuestion")) {
    quizIndex++;
    renderQuizQuestion();
    return;
  }

  if (target.closest("#backToTests")) {
    navigate("mock-tests");
  }
});

document.addEventListener("change", event => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  if (target.id === "daySelector") {
    const day = Number(target.value);
    if (Number.isInteger(day) && day >= 1 && day <= DAY_COUNT) {
      selectedDay = day;
      renderActiveView();
    }
  }
});

document.addEventListener("input", event => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  if (target.id === "librarySearch" || target.id === "librarySubject") {
    renderLibraryCards();
  }
});

document.addEventListener("submit", event => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement) || form.id !== "noteForm") return;

  event.preventDefault();

  const title = $("noteTitle")?.value.trim();
  const body = $("noteBody")?.value.trim();
  const subject = $("noteSubject")?.value || "General";

  if (!title || !body) {
    showToast("Enter a topic and your note first.");
    return;
  }

  data.notes.unshift({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    title,
    body,
    subject,
    createdAt: Date.now()
  });

  saveData();
  renderNotes();
  showToast("Note saved on this device.");
});

/* ---------- Safe startup ---------- */

function initialize() {
  if (!$("viewContent")) {
    console.error("Tracker startup failed: #viewContent was not found in index.html.");
    return;
  }

  selectedDay = getCurrentDay();

  if ($("daySelector")) {
    $("daySelector").innerHTML = Array.from({ length: DAY_COUNT }, (_, index) =>
      `<option value="${index + 1}">Day ${index + 1}</option>`
    ).join("");

    $("daySelector").value = String(selectedDay);
  }

  if ($("syncLabel")) $("syncLabel").textContent = "Local progress active";
  if ($("syncDescription")) {
    $("syncDescription").textContent = "Progress is saved in this browser";
  }

  const statusDot = document.querySelector(".status-dot");
  if (statusDot) statusDot.style.background = "#4ed5a0";

  renderDashboard();
  console.info("JEE Prep Tracker initialized successfully.");
}

initialize();
