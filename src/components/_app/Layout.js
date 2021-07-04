import HeadContent from "./HeadContent";

function Layout({ children }) {
  return (
    <>
      <HeadContent />
      <div>{children}</div>
    </>
  );
}

export default Layout;
