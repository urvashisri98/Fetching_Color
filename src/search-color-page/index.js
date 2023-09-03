import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";

const SearchColorPage = () => {
  const [color, setColor] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredColors, setFilteredColors] = useState([]);
  const [invalidColor, setInvalidColor] = useState(false);
  const handleInput = (e) => {
    setSearchInput(e.target.value);
    setInvalidColor(false);
  };

  const colorApiCall = async () => {
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/NishantChandla/color-test-resources/main/xkcd-colors.json"
      );
      setColor(response.data.colors);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    colorApiCall();
  }, []);

  useEffect(() => {
    const filtered = color.filter(
      (color) =>
        color.color.toLowerCase().includes(searchInput.toLowerCase()) ||
        color.hex.toLowerCase().includes(searchInput.toLowerCase())
    );
    if (filtered.length > 0) {
      setFilteredColors(filtered);
      setInvalidColor(false);
    } else {
      setFilteredColors([]);
      setInvalidColor(true);
    }
    setFilteredColors(filtered);
  }, [searchInput, color]);

  return (
    <div className="color-container">
      <div className="search-box">
        <label className="color-searcher-heading">Color Searcher</label>
        <input
          type="text"
          name="search"
          className="search"
          value={searchInput}
          onChange={handleInput}
          placeholder="Search Color here"
        />
        {invalidColor && <p style={{ color: "red" }}>Invalid color</p>}
      </div>
      <div className="listing-container">
        <table className="color-table">
          <thead>
            <tr>
              <th>Color Name</th>
              <th>Hex Code</th>
            </tr>
          </thead>
          <tbody>
            {filteredColors.map((item) => (
              <tr key={item.hex}>
                <td style={{ backgroundColor: item.hex }}>{item.color}</td>
                <td>{item.hex}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchColorPage;
