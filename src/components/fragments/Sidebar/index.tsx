import Link from "next/link";
import { useRouter } from "next/router";
import { styles } from "./Sidebar.module";

type PropTypes = {
  lists: {
    title: string;
    linkUrl: string;
    icon: React.ReactNode;
  }[];
};

const Sidebar = (props: PropTypes) => {
  const { lists } = props;
  const { pathname } = useRouter();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar__main}>
        <ul className={styles.sidebar__main__list}>
          {lists?.map((list, index) => (
            <li key={index}>
              <Link
                href={list.linkUrl}
                className={`${styles.sidebar__main__list__link} ${
                  pathname === list.linkUrl
                    ? "rounded-md bg-[#161616] text-white"
                    : "text-[#626262]"
                }`}
              >
                <div
                  className={`${styles.sidebar__main__list__link__icon} ${
                    pathname === list.linkUrl ? "text-white" : "text-[#626262]"
                  }`}
                >
                  {list.icon}
                </div>
                <span className={styles.sidebar__main__list__link__title}>
                  {list.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
