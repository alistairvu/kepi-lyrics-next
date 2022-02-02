type PageContainerProps = {
  children: React.ReactNode;
};

export const PageContainer = ({ children }: PageContainerProps) => (
  <div className="relative flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-br from-purple-500 to-purple-700 text-slate-100">
    {children}
  </div>
);
