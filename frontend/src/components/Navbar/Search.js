import { useState } from "react";
import './Search.css';


const Search = () => {
    const [searchVal, setSearchVal] = useState('');
    const [open, setOpen] = useState(false);

  return(
    <div className="d-flex w-50">
    <form className="d-flex w-100">
      <input
        className="form-control me-2"
        type="search"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        placeholder="Search"
        aria-label="Search"
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
    {/* <div className="search-cont">
        drop down content
    </div> */}

    </div>
  );
};

export default Search;
