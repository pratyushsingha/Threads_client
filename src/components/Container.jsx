const Container = ({ children, className = "" }) => {
  return (
    <div className={`w-full h-screen max-w-7xl mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default Container;
