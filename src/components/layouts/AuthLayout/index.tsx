import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { styles } from "./AuthLayout.module";

type PropTypes = {
  title?: string;
  linkText?: string;
  link: string;
  children: React.ReactNode;
  setToaster: Dispatch<SetStateAction<{}>>;
};

const AuthLayout = (props: PropTypes) => {
  const { title, linkText, link, children, setToaster } = props;

  return (
    <section className={styles.authlayout}>
      <div className={styles.authlayout__main}>
        <Link href="/">
          <h1 className={styles.authlayout__main__logo}>
            Hardea
            <span className={styles.authlayout__main__logo__second}>
              .Store
            </span>
          </h1>
        </Link>
        <div className={styles.form}>
          <div className={styles.form__main}>
            <h1 className={styles.form__main__title}>{title}</h1>
            {children}
          </div>
        </div>
        <p className={styles.link}>
          {linkText}{" "}
          <Link href={link} className={styles.link__title}>
            here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default AuthLayout;
