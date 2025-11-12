const Footer = () => {
  return (
    <footer className="bg-white/10 backdrop-blur-md border-t border-white/20 shadow-lg mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-white text-sm mb-2 md:mb-0">
          &copy; {new Date().getFullYear()} ProfileCraft. All rights reserved.
        </div>
         
      </div>
    </footer>
  );
};

export default Footer;
