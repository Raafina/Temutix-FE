import PageHead from "@/components/commons/PageHead";
import { Fragment, ReactNode } from "react";

interface PropTypes {
  children: ReactNode;
  title?: string;
}
const AuthLayout = (props: PropTypes) => {
  const { title, children } = props;
  return (
    <div className="flex min-h-screen min-w-full flex-col items-center justify-center gap-10 py-10 lg:py-0">
      <PageHead title={title} />
      <section className="max-w-screen-3xl 3xl:container">{children}</section>
    </div>
  );
};

export default AuthLayout;
