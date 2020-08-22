import React from "react";
import Nav from "../Nav/Nav";
import styles from "./Layout.module.scss";

export default function Layout(props) {
  return (
    <>
      <Nav />
      <div className={styles.wrapper}>
        <div className="container" {...props}>
          <div className="content">{props.children}</div>
        </div>
      </div>
    </>
  );
}
