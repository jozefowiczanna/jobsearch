import React, { useContext } from "react";
import styles from "./Nav.module.scss";
import { Link } from "react-router-dom";
import cx from "classnames";
import { AppContext } from "../../context";

export default function Nav() {
  const context = useContext(AppContext);

  return (
    <div>
      <button
        className={cx(styles.hamburger, {
          [styles.hamburgerActive]: context.state.isNavOpen,
        })}
        onClick={context.toggleNav}
      >
        <span className={styles.hamburgerBox}>
          <span className={styles.hamburgerInner}></span>
        </span>
      </button>
      <div className={cx(styles.navigationHolder)}>
        <div
          className={cx(styles.navigation, {
            [styles.navigationActive]: context.state.isNavOpen,
          })}
        >
          <ul className={styles.navigationList}>
            <li className={styles.navigationItem} onClick={context.closeNav}>
              <Link className={styles.navigationLink} to="/offers">
                Offers
              </Link>
            </li>
            <li className={styles.navigationItem} onClick={context.closeNav}>
              <Link className={styles.navigationLink} to="/offers/add">
                Add offer
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
