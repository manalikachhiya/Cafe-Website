import { FiTarget, FiEye, FiAward, FiHeart, FiFeather, FiUsers } from "react-icons/fi";
import "./About.css";

const TEAM = [
  { name: "Chef Marco Rossi", role: "Head Chef", img: "https://i.pravatar.cc/200?img=53" },
  { name: "Arjun Mehta", role: "Founder & Owner", img: "https://i.pravatar.cc/200?img=11" },
  { name: "Sneha Kapoor", role: "Cafe Manager", img: "https://i.pravatar.cc/200?img=45" },
  { name: "Vikram Singh", role: "Head Barista", img: "https://i.pravatar.cc/200?img=15" },
];

const AWARDS = [
  { title: "Best New Cafe 2019", org: "City Food Awards" },
  { title: "Top Rated Coffee Spot", org: "Foodie's Choice 2021" },
  { title: "Excellence in Hospitality", org: "Hospitality Guild 2023" },
];

const VALUES = [
  { icon: <FiHeart />, title: "Passion", desc: "We pour our heart into every cup and every plate." },
  { icon: <FiFeather />, title: "Quality", desc: "Only the finest, freshest ingredients make it to your table." },
  { icon: <FiUsers />, title: "Community", desc: "We believe a cafe should feel like a second home." },
];

const About = () => {
  return (
    <>
      <section className="cv-about-hero text-center text-white">
        <div className="container">
          <span className="section-eyebrow" style={{ color: "var(--color-accent)" }}>Our Journey</span>
          <h1>About CafeVerse</h1>
          <p>Crafted with passion, served with love.</p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h2 className="section-title">Our Story</h2>
              <p className="text-muted">
                CafeVerse opened its doors in 2018 with a single goal — to bring specialty coffee
                culture to a space that felt warm, welcoming, and unmistakably ours. What began as
                a tiny corner cafe has blossomed into a beloved gathering place for coffee lovers,
                remote workers, and families alike.
              </p>
              <p className="text-muted">
                Today, our menu spans over 40 handcrafted dishes and beverages, each made with
                care by a team that genuinely loves what they do.
              </p>
            </div>
            <div className="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=900&q=80"
                alt="Our story"
                className="rounded-18 shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="cv-card p-4 h-100">
                <FiTarget size={30} className="text-primary-custom mb-3" />
                <h4>Our Mission</h4>
                <p className="text-muted mb-0">
                  To serve exceptional coffee and food in an atmosphere that inspires connection,
                  creativity, and comfort.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="cv-card p-4 h-100">
                <FiEye size={30} className="text-primary-custom mb-3" />
                <h4>Our Vision</h4>
                <p className="text-muted mb-0">
                  To become the most cherished neighborhood cafe brand, known for quality,
                  warmth, and community spirit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="text-center">
            <span className="section-eyebrow">What Drives Us</span>
            <h2 className="section-title">Our Values</h2>
          </div>
          <div className="row g-4">
            {VALUES.map((v) => (
              <div className="col-lg-4" key={v.title}>
                <div className="cv-card p-4 text-center h-100">
                  <div className="cv-value-icon">{v.icon}</div>
                  <h5 className="mt-3">{v.title}</h5>
                  <p className="text-muted small mb-0">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card">
        <div className="container">
          <div className="text-center">
            <span className="section-eyebrow">Meet The Team</span>
            <h2 className="section-title">Our Chef &amp; Team</h2>
            <p className="section-subtitle">The people who bring CafeVerse to life every day</p>
          </div>
          <div className="row g-4">
            {TEAM.map((member) => (
              <div className="col-lg-3 col-md-6" key={member.name}>
                <div className="cv-card text-center p-4 h-100">
                  <img src={member.img} alt={member.name} className="cv-team-avatar mb-3" />
                  <h6 className="mb-0">{member.name}</h6>
                  <span className="text-muted small">{member.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="text-center">
            <span className="section-eyebrow">Recognition</span>
            <h2 className="section-title">Our Awards</h2>
          </div>
          <div className="row g-4">
            {AWARDS.map((a) => (
              <div className="col-lg-4" key={a.title}>
                <div className="cv-card p-4 text-center h-100">
                  <FiAward size={30} className="text-primary-custom mb-3" />
                  <h5>{a.title}</h5>
                  <p className="text-muted small mb-0">{a.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
