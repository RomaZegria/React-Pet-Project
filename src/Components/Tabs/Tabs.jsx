import React, { useState } from "react";
import classNames from "classnames";
import TabsStyle from "./Tabs.module.css";

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);
  const handleClick = (index) => {
    setActiveTab(index);
  };

  return (
    <>
      <div className={TabsStyle.tabList}>
        {React.Children.map(children, (child, index) => (
          <button
            className={classNames(
              TabsStyle.tab,
              activeTab === index ? TabsStyle.tabActive : ""
            )}
            onClick={() => {
              handleClick(index);
            }}
            key={index}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div>
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            className={classNames(
              activeTab === index ? TabsStyle.active : TabsStyle.disabled
            )}
          >
            {child}
          </div>
        ))}
      </div>
    </>
  );
};

export default Tabs;
