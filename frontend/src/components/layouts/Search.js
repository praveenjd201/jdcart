import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
function Search() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const location = useLocation();

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/search/${keyword}`);
  }

  function clearKeyword() {
    setKeyword("");
  }

  useEffect(() => {
    if (location.pathname === "/") {
      clearKeyword();
    }
  }, [location]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          onChange={(e) => setKeyword(e.target.value)}
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Enter Product Name ..."
          value={keyword}
        />
        <div className="input-group-append">
          <button id="search_btn" className="btn">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
}

export default Search;
