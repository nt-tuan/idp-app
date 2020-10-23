import React from "react";
import { useLocation, matchPath, Link } from "react-router-dom";
import { PageRoute } from "./PrivateRoute";
export interface BreadscrumbProps {
  href: string;
  text: React.ReactNode;
  active?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}
export const newBreadscrumb = (route: PageRoute<any>, isExact?: boolean) => {
  return {
    href: route.path,
    text: route.name,
    active: isExact,
  };
};
const Breadscrumb = ({ href, text, active, isFirst }: BreadscrumbProps) => {
  return (
    <>
      {!isFirst && <div className="mx-1">&raquo;</div>}
      <Link to={href}>{text}</Link>
    </>
  );
};
export const Breadscrumbs = ({
  breadscrumbs,
}: {
  breadscrumbs: BreadscrumbProps[];
}) => {
  return (
    <div className="flex flex-row items-end text-gray-500">
      {breadscrumbs.map((breadscrumb, index) => (
        <Breadscrumb
          key={breadscrumb.href}
          {...breadscrumb}
          isFirst={index === 0}
        />
      ))}
    </div>
  );
};
export const AutoBreadscrumbs = ({ routes }: { routes: PageRoute<any>[] }) => {
  const [breadscrumbs, setBreadscrumbs] = React.useState<BreadscrumbProps[]>();
  const location = useLocation();
  React.useEffect(() => {
    const path = location.pathname;
    const parts = path.split("/");
    const { children } = parts.reduce(
      ({ children, last }: { children: string[]; last: string }, part) => {
        if (part === "") return { children, last };
        const path = last + "/" + part;
        return { children: [...children, path], last: path };
      },
      { children: [], last: "" }
    );
    const breadScrumbs = children.reduce(
      (matchRoutes: BreadscrumbProps[], child) => {
        const breadscrumbProps = routes.reduce(
          (current: BreadscrumbProps | undefined, route) => {
            const match = matchPath(child, route.path);
            if (match == null) return current;
            if (current == null && match && match.isExact)
              return {
                href: route.path,
                text: route.name,
                active: match.isExact,
              };
            return current;
          },
          undefined
        );
        if (breadscrumbProps == null) return matchRoutes;
        return [...matchRoutes, breadscrumbProps];
      },
      []
    );
    setBreadscrumbs(breadScrumbs);
  }, [location, routes]);
  if (breadscrumbs == null) return <></>;
  return <Breadscrumbs breadscrumbs={breadscrumbs} />;
};
