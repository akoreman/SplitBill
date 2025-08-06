import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="mt-16 px-4 pb-8">
      <div className="glass-card max-w-6xl mx-auto p-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faReceipt} className="text-2xl text-accent" />
            <span className="font-inter text-xl font-bold text-text">Split Bill</span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-8 justify-center">
            <Link href="#" className="text-text-secondary hover:text-accent transition-colors duration-300 font-medium">
              Privacy Policy
            </Link>
            <Link href="#" className="text-text-secondary hover:text-accent transition-colors duration-300 font-medium">
              Terms of Service
            </Link>
            <Link href="#" className="text-text-secondary hover:text-accent transition-colors duration-300 font-medium">
              Contact
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {[faTwitter, faFacebook, faInstagram].map((icon, index) => (
              <Link
                key={index}
                href="#"
                className="w-10 h-10 glass-card flex items-center justify-center text-text-secondary hover:text-white hover:bg-accent transition-all duration-300 rounded-full"
              >
                <FontAwesomeIcon icon={icon} />
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center pt-8 border-t border-white/20">
          <p className="text-text-secondary text-sm">
            &copy; 2024 Split Bill. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}