const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-2xl font-bold mb-4 text-gray-800">
      {children}
    </div>
  );
}

export default Title;