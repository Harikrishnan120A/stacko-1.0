import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ marginTop: '120px', borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(20px)' }}>
      <div className="page-shell grid lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]" style={{ gap: '64px', paddingTop: '80px', paddingBottom: '40px' }}>
        {/* Brand Column */}
        <div>
          <div className="flex items-center" style={{ gap: '16px', marginBottom: '24px' }}>
            <div className="h-12 w-12 flex items-center justify-center flex-shrink-0">
              <img 
                src="/stacko-1.0/stacko-logo.svg" 
                alt="STACKO Logo" 
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <p style={{ fontSize: '28px', fontWeight: 800, color: 'white', lineHeight: 1 }}>STACKO</p>
              <p className="text-small" style={{ color: 'var(--color-text-muted)', marginTop: '4px' }}>Programming Collective</p>
            </div>
          </div>
          <p className="text-small" style={{ maxWidth: '400px', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
            STACKO teaches modern web development through hands-on courses and provides professional development services.
          </p>
          <div className="flex flex-wrap items-center text-small" style={{ gap: '16px', color: 'var(--color-text-secondary)' }}>
            <a className="transition hover:text-white" href="mailto:stackoindustries@gmail.com">
              stackoindustries@gmail.com
            </a>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
            <p>+91 9751987380</p>
          </div>
        </div>

        {/* Company Column */}
        <div>
          <p className="text-sm uppercase tracking-wider font-semibold" style={{ color: 'var(--color-primary)', marginBottom: '16px' }}>
            Company
          </p>
          <div className="flex flex-col" style={{ gap: '16px' }}>
            <Link className="text-small transition hover:text-white" style={{ color: 'var(--color-text-secondary)' }} to="/about">
              About & Founders
            </Link>
            <Link className="text-small transition hover:text-white" style={{ color: 'var(--color-text-secondary)' }} to="/blog">
              Programming Blog
            </Link>
            <Link className="text-small transition hover:text-white" style={{ color: 'var(--color-text-secondary)' }} to="/services">
              Development Services
            </Link>
            <Link className="text-small transition hover:text-white" style={{ color: 'var(--color-text-secondary)' }} to="/contact">
              Book a Consultation
            </Link>
          </div>
        </div>

        {/* Resources Column */}
        <div>
          <p className="text-sm uppercase tracking-wider font-semibold" style={{ color: 'var(--color-primary)', marginBottom: '16px' }}>
            Resources
          </p>
          <div className="flex flex-col" style={{ gap: '16px' }}>
            <Link className="text-small transition hover:text-white" style={{ color: 'var(--color-text-secondary)' }} to="/courses">
              Courses
            </Link>
            <Link className="text-small transition hover:text-white" style={{ color: 'var(--color-text-secondary)' }} to="/blog">
              Blog
            </Link>
            <a className="text-small transition hover:text-white" style={{ color: 'var(--color-text-secondary)' }} href="#">
              Documentation
            </a>
            <a className="text-small transition hover:text-white" style={{ color: 'var(--color-text-secondary)' }} href="#">
              Support
            </a>
          </div>
        </div>

        {/* Legal Column */}
        <div>
          <p className="text-sm uppercase tracking-wider font-semibold" style={{ color: 'var(--color-primary)', marginBottom: '16px' }}>
            Legal
          </p>
          <div className="flex flex-col" style={{ gap: '16px' }}>
            <Link className="text-small transition hover:text-white" style={{ color: 'var(--color-text-secondary)' }} to="/privacy">
              Privacy
            </Link>
            <Link className="text-small transition hover:text-white" style={{ color: 'var(--color-text-secondary)' }} to="/terms">
              Terms
            </Link>
            <a className="text-small transition hover:text-white" style={{ color: 'var(--color-text-secondary)' }} href="#">
              Accessibility
            </a>
          </div>
        </div>

        {/* Social Column */}
        <div>
          <p className="text-sm uppercase tracking-wider font-semibold" style={{ color: 'var(--color-primary)', marginBottom: '16px' }}>
            Connect
          </p>
          <div className="flex flex-col" style={{ gap: '16px' }}>
            <a className="text-small transition hover:text-white" style={{ color: 'var(--color-text-secondary)' }} href="#">
              Twitter
            </a>
            <a className="text-small transition hover:text-white" style={{ color: 'var(--color-text-secondary)' }} href="#">
              LinkedIn
            </a>
            <a className="text-small transition hover:text-white" style={{ color: 'var(--color-text-secondary)' }} href="#">
              GitHub
            </a>
            <a className="text-small transition hover:text-white" style={{ color: 'var(--color-text-secondary)' }} href="#">
              Discord
            </a>
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '32px', paddingBottom: '32px' }}>
        <div className="page-shell flex flex-col md:flex-row md:items-center md:justify-between" style={{ gap: '16px' }}>
          <p className="text-small" style={{ color: 'var(--color-text-muted)' }}>
            © {currentYear} STACKO Labs. Built for the next generation of creators.
          </p>
          <div className="flex flex-wrap text-small" style={{ gap: '24px', color: 'var(--color-text-muted)' }}>
            <Link className="transition hover:text-white" to="/privacy">
              Privacy
            </Link>
            <Link className="transition hover:text-white" to="/terms">
              Terms
            </Link>
            <a className="transition hover:text-white" href="#">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
