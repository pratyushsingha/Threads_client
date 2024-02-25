const Container = ({ children, className = "" }) => {
  return (
    <div className={`w-full max-w-7xl py-4 mx-auto px-4 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
