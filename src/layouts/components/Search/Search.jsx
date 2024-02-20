import { useRef, useState } from "react";

import classNames from "classnames/bind";
import styles from "./Search.module.scss";

import HeadlessTippy from "@tippyjs/react/headless";
import { Wrapper } from "@/components/Menu";
import useDebounce from "@/hooks/useDebounce";
import { useGetProductByName } from "@/react-query/productQuery";

import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import CakeItem from "@/components/CakeItem/CakeItem";
import { useGetDetailUser } from "../../../react-query/userQuery";

const cx = classNames.bind(styles);

const Search = () => {
  const [headerInput, setHeaderInput] = useState("");
  const [showResult, setShowResult] = useState(true);
  const inputSearch = useRef();

  const debounceSearch = useDebounce(headerInput, 500);

  const { data: searchProducts, isLoading } = useGetProductByName({
    search: debounceSearch,
  });

  const handleInput = (e) => {
    const searchValue = e.target.value;

    //Kiểm tra kí tự đầu tiên nhập vào có dấu cách không
    if (!searchValue.startsWith(" ")) {
      setHeaderInput(searchValue);
    }
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleClear = () => {
    setHeaderInput("");
    inputSearch.current.focus();
  };

  return (
    <div className={cx("search-wrapper")}>
      <HeadlessTippy
        interactive
        visible={showResult && searchProducts?.data.length > 0}
        render={(attrs) => (
          <div tabIndex="-1" {...attrs}>
            <Wrapper>
              <h4 className={cx("search-tittle")}>Cakes</h4>
              {searchProducts?.data.map((result, index) => (
                <CakeItem key={index} data={result} />
              ))}
            </Wrapper>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={cx("search")}>
          <input
            ref={inputSearch}
            value={headerInput}
            placeholder="Tìm kiếm bánh"
            spellCheck={false}
            onChange={handleInput}
            onFocus={() => setShowResult(true)}
          />

          {headerInput && !isLoading && (
            <button className={cx("clear")} onClick={handleClear}>
              <CancelIcon />
            </button>
          )}

          {isLoading && (
            <div className={cx("loading")}>
              <CircularProgress className={cx("loading-icon")} />
            </div>
          )}

          <button
            className={cx("search-btn")}
            onMouseDown={(e) => e.preventDefault()}
          >
            <SearchIcon className={cx("search-icon")} />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
};

Search.propTypes = {};

export default Search;
