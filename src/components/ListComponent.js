import React from "react";

const ListComponent = ({ items, renderItem, emptyMessage = "No items found." }) => {
  if (!items || items.length === 0) {
    return <p>{emptyMessage}</p>;
  }

  return (
    <ul style={{ listStyleType: "none", padding: 0 }}>
      {items.map((item, index) => (
        <li key={item.id || index} style={{ marginBottom: "1rem" }}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
};

export default ListComponent;
