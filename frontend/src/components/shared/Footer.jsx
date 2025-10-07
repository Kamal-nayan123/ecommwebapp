const Footer = () => {
  return (
    <footer className="bg-secondary-100 text-secondary-800">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-20 grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-2xl font-bold tracking-wider text-secondary-900 mb-6">MODERNSTORE</h2>
            <p className="text-secondary-600 text-sm leading-relaxed">
              A curated collection of premium products for the modern individual.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary-900 mb-6">Shop</h3>
            <ul className="space-y-3">
              <li><a href="/new" className="text-secondary-600 hover:text-accent-800 text-sm transition-colors">New Arrivals</a></li>
              <li><a href="/trending" className="text-secondary-600 hover:text-accent-800 text-sm transition-colors">Trending</a></li>
              <li><a href="/sale" className="text-secondary-600 hover:text-accent-800 text-sm transition-colors">Sale</a></li>
              <li><a href="/brands" className="text-secondary-600 hover:text-accent-800 text-sm transition-colors">Brands</a></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary-900 mb-6">Help</h3>
            <ul className="space-y-3">
              <li><a href="/shipping" className="text-secondary-600 hover:text-accent-800 text-sm transition-colors">Shipping</a></li>
              <li><a href="/returns" className="text-secondary-600 hover:text-accent-800 text-sm transition-colors">Returns</a></li>
              <li><a href="/sizing" className="text-secondary-600 hover:text-accent-800 text-sm transition-colors">Sizing</a></li>
              <li><a href="/faq" className="text-secondary-600 hover:text-accent-800 text-sm transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary-900 mb-6">Contact</h3>
            <ul className="space-y-3">
              <li className="text-secondary-600 text-sm">support@modernstore.com</li>
              <li className="text-secondary-600 text-sm">+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-secondary-200 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <p className="text-sm text-secondary-600">&copy; {new Date().getFullYear()} MODERNSTORE. All Rights Reserved.</p>

          {/* Social Links */}
          <div className="flex space-x-6">
            <a href="#" className="text-secondary-600 hover:text-accent-800 transition-colors">
              <span className="sr-only">Facebook</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="#" className="text-secondary-600 hover:text-accent-800 transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
            <a href="#" className="text-secondary-600 hover:text-accent-800 transition-colors">
              <span className="sr-only">Instagram</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.585.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;