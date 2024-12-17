import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 px-[10%] py-12">
      {/* Footer Content */}
      <div className="container mx-auto py-12 px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Company */}
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-100">About Us</a></li>
            <li><a href="#" className="hover:text-gray-100">Help Center</a></li>
            <li><a href="#" className="hover:text-gray-100">FAQ</a></li>
            <li><a href="#" className="hover:text-gray-100">Contact Us</a></li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Useful Links</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-100">Create Event</a></li>
            <li><a href="#" className="hover:text-gray-100">Sell Tickets Online</a></li>
            <li><a href="#" className="hover:text-gray-100">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-gray-100">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-white font-semibold mb-4">Resources</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-100">Pricing</a></li>
            <li><a href="#" className="hover:text-gray-100">Blog</a></li>
            <li><a href="#" className="hover:text-gray-100">Refer a Friend</a></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div className="space-y-6">
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {/* Social Icons */}
              <a href="#" className="hover:text-white"><img src="/icons/fb.svg" alt="Facebook" className="h-6" /></a>
              <a href="#" className="hover:text-white"><img src="/icons/insta.svg" alt="Facebook" className="h-6" /></a>
              <a href="#" className="hover:text-white"><img src="/icons/tiktok.svg" alt="Facebook" className="h-6" /></a>
              
            </div>
          </div>

          {/* Download Mobile App */}
          <div>
            <h4 className="text-white font-semibold mb-2">Download Mobile App</h4>
            <div className="flex space-x-4">
              <a href="#">
                <img
                  src="/imgs/app-store.png"
                  alt="App Store"
                  className="h-10"
                />
              </a>
              <a href="#">
                <img
                  src="/imgs/google-play.png"
                  alt="Google Play"
                  className="h-10"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 py-6 text-center text-sm">
        <p>
          © 2024, <span className="font-bold">Ticket Port</span>. All rights reserved. 
        </p>
      </div>
    </footer>
  );
};

export default Footer;
