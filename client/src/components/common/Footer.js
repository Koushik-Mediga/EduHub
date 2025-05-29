import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import LogoFull from '../../assets/Logo/Logo-Full-Light (2).png';

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="w-full min-h-[300px] px-6 py-10 flex flex-col md:flex-row justify-around items-start border-t-2 border-richblack-900 mt-16">
        {/* Left Section */}
        <div className="w-full md:w-1/3 flex flex-col items-start mt-10 md:mt-0">
          <div className="flex items-center flex-row justify-center space-x-3 mb-2">
            <img src={LogoFull} className='w-[150px] px-1'/>
          </div>
          <p className="text-sm text-richblack-100 mb-4 ml-2">
            Seamless Learning for Brighter Futures.
          </p>
          <div className="flex space-x-3 ml-2">
            <FaFacebook className='text-richblack-500 hover:cursor-pointer hover:text-richblack-100 transition-all hover:scale-95'/>
            <FaInstagram className='text-richblack-500 hover:cursor-pointer hover:text-richblack-100 transition-all hover:scale-95'/>
            <FaLinkedinIn className='text-richblack-500 hover:cursor-pointer hover:text-richblack-100 transition-all hover:scale-95'/>
            <FaXTwitter className='text-richblack-500 hover:cursor-pointer hover:text-richblack-100 transition-all hover:scale-95'/>
            {/* <img src="twitterlogo.png" alt="Twitter" className="h-10 w-10 rounded-full opacity-50 hover:opacity-100 transform hover:scale-105 transition duration-300" />
            <img src="facebooklogo.png" alt="Facebook" className="h-10 w-10 rounded-full opacity-50 hover:opacity-100 transform hover:scale-105 transition duration-300" />
            <img src="instalogo.jpeg" alt="Instagram" className="h-10 w-10 rounded-full opacity-50 hover:opacity-100 transform hover:scale-105 transition duration-300" />
            <img src="githublogo.png" alt="GitHub" className="h-10 w-10 rounded-full opacity-50 hover:opacity-100 transform hover:scale-105 transition duration-300" /> */}
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-2/3 grid grid-cols-4 grid-rows-6 gap-2 p-4 mt-10 md:mt-0">
          {['Products', 'Company', 'Support', 'Legal'].map((title, i) => (
            <h4 key={i} className="text-sm font-semibold text-richblack-100 col-span-1">{title}</h4>
          ))}

          {[
            'Overview', 'About', 'Contact', 'Terms of Service',
            'Solutions', 'Investor Relations', 'Documentation', 'Privacy Policy',
            'Pricing', 'Jobs', 'Chat', 'Cookie Settings',
            'Customers', 'Press', 'FAQ'
          ].map((link, i) => (
            <a key={i} href="#" className="text-xs text-richblack-100 hover:opacity-100 opacity-70 col-span-1">
              {link}
            </a>
          ))}

          <a
            href="#"
            id="blog1"
            className="text-xs text-richblack-100 hover:opacity-100 opacity-70 col-start-2 row-start-6"
          >
            Blog
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 w-full h-[50px] flex justify-center items-center">
        <p className="text-sm text-richblack-100 font-['Roboto_Condensed']">
          &copy; 2025-present EduHub, All rights are reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
