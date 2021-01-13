import React from "react";
import { useLocation, matchPath, Link } from "react-router-dom";
import { PageRoute } from "./PrivateRoute";
export interface BreadcrumbProps {
  href: string;
  text: React.ReactNode;
  active?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}
export const newBreadcrumb = (route: PageRoute<any>, isExact?: boolean) => {
  return {
    href: route.path,
    text: route.name,
    active: isExact,
  };
};
const Breadcrumb = ({ href, text, active, isFirst }: BreadcrumbProps) => {
  return (
    <>
      {!isFirst && <div className="mx-1">&raquo;</div>}
      <Link to={href}>{text}</Link>
    </>
  );
};
export const Breadcrumbs = ({
  breadcrumbs,
}: {
  breadcrumbs: BreadcrumbProps[];
}) => {
  return (
    <div className="flex flex-row items-baseline text-gray-500">
      {breadcrumbs.map((breadcrumb, index) => (
        <Breadcrumb
          key={breadcrumb.href}
          {...breadcrumb}
          isFirst={index === 0}
        />
      ))}
    </div>
  );
};
export const AutoBreadcrumbs = ({ routes }: { routes: PageRoute<any>[] }) => {
  const [breadcrumbs, setBreadcrumbs] = React.useState<BreadcrumbProps[]>();
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
    const breadcrumbs = children.reduce(
      (matchRoutes: BreadcrumbProps[], child) => {
        const breadcrumbProps = routes.reduce(
          (current: BreadcrumbProps | undefined, route) => {
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
        if (breadcrumbProps == null) return matchRoutes;
        return [...matchRoutes, breadcrumbProps];
      },
      []
    );
    setBreadcrumbs(breadcrumbs);
  }, [location, routes]);
  if (breadcrumbs == null) return <></>;
  return <Breadcrumbs breadcrumbs={breadcrumbs} />;
};
