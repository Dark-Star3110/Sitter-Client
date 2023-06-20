import React, { useCallback } from "react";
import styles from "../styles/Search.module.css";
import Footer from "../components/Footer";
import { Sitter } from "../types";
import axios from "axios";

const Search = () => {
  const SERVER_API = process.env.NEXT_PUBLIC_SERVER_URL;
  const [sitters, setSitters] = React.useState<Sitter[]>([]);
  const [dataSearch, setDataSearch] = React.useState({
    sex: "",
    minRate: "",
    maxRate: "",
    minYearEx: "",
    maxYearEx: "",
    certification: "",
    language: "",
  });
  const [starsSelected, setStarsSelected] = React.useState<string[][]>([]);

  const fetchData = async () => {
    try {
      const listSitter = await axios.get(`${SERVER_API}/searchSitter`, {
        params: dataSearch,
      });
      if (listSitter.data) {
        setSitters(listSitter.data);
      } else {
        setSitters([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const updateRate = useCallback(() => {
    const minStars = starsSelected.map((star) => Number(star[0]));
    const maxStars = starsSelected.map((star) => Number(star[1]));
    const minRate = Math.min(...minStars);
    const maxRate = Math.max(...maxStars);

    setDataSearch({
      ...dataSearch,
      minRate: minRate.toString(),
      maxRate: maxRate.toString(),
    });
  }, [starsSelected]);
  React.useEffect(() => {
    updateRate();
  }, [starsSelected, updateRate]);

  const handleSearch = async () => {
    await fetchData();
  };

  const handleChangeCertification: React.ChangeEventHandler<
    HTMLInputElement
  > = (e) => {
    const cetiSearch = e.target.value;
    if (dataSearch.certification.length === 0) {
      setDataSearch({
        ...dataSearch,
        certification: cetiSearch,
      });
      return;
    }
    const certificates = dataSearch.certification.split(",");
    const isChecked = dataSearch.certification.includes(cetiSearch);
    if (isChecked) {
      setDataSearch({
        ...dataSearch,
        certification: certificates
          .filter((ceti) => ceti !== cetiSearch)
          .join(","),
      });
    } else {
      setDataSearch({
        ...dataSearch,
        certification: [...certificates, cetiSearch].join(","),
      });
    }
  };

  const handleChangeLanguage: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const langSearch = e.target.value;
    if (dataSearch.language.length === 0) {
      setDataSearch({
        ...dataSearch,
        language: langSearch,
      });
      return;
    }
    const languages = dataSearch.language.split(",");
    const isChecked = dataSearch.language.includes(langSearch);
    if (isChecked) {
      setDataSearch({
        ...dataSearch,
        language: languages.filter((ceti) => ceti !== langSearch).join(","),
      });
    } else {
      setDataSearch({
        ...dataSearch,
        language: [...languages, langSearch].join(","),
      });
    }
  };

  const handleChangeStars = (minStar: string, maxStar: string) => {
    if (starsSelected.length === 0) {
      setStarsSelected([[minStar, maxStar]]);
    } else {
      const isChecked = starsSelected.some(
        (star) => star[0] === minStar && star[1] === maxStar
      );
      if (isChecked) {
        setStarsSelected(
          starsSelected.filter(
            (star) => star[0] !== minStar && star[1] !== maxStar
          )
        );
      } else {
        setStarsSelected([...starsSelected, [minStar, maxStar]]);
      }
    }
  };

  return (
    <div className={styles["search-layout"]}>
      <header className={styles["header"]}>
        <div className={styles["logo"]}>
          {/* <a href="HomePage.html">
              <img src="" alt="ホームページ" title="ホームページ">
          </a> */}
        </div>
        <nav className={styles["nav-navigation"]}>
          <div className={styles["header-left"]} onClick={handleSearch}>
            経験
          </div>
          <div className={styles["header-right"]}>
            <span className={styles["highlighted-text"]}>並び替え</span>
            <select id="mySelect">
              <option value="option1"></option>
              <option value="option2">Option 1</option>
              <option value="option3">Option 2</option>
              <option value="option4">Option 3</option>
            </select>
          </div>
        </nav>
      </header>
      <main>
        <div className={styles["grid-container"]}>
          <div className={styles["left-column"]}>
            <div className={styles["check1"]}>
              <div className={styles["checkbox-column"]}>
                <h2 className={styles["column-title"]}>専門</h2>
                <div className={styles["checkbox-item"]}>
                  <input
                    type="checkbox"
                    id="CPR"
                    onChange={handleChangeCertification}
                    value="CPR"
                    checked={dataSearch.certification.includes("CPR")}
                  />
                  <label htmlFor="CPR">CPR</label>
                </div>

                <div className={styles["checkbox-item"]}>
                  <input
                    type="checkbox"
                    id="cert"
                    onChange={handleChangeCertification}
                    value="safe Sitter"
                    checked={dataSearch.certification.includes("safe Sitter")}
                  />
                  <label htmlFor="cert">safe Sitter</label>
                </div>

                <div className={styles["checkbox-item"]}>
                  <input
                    type="checkbox"
                    id="bci"
                    onChange={handleChangeCertification}
                    value="BCI"
                    checked={dataSearch.certification.includes("BCI")}
                  />
                  <label htmlFor="bci">BCI</label>
                </div>

                <div className={styles["checkbox-item"]}>
                  <input type="checkbox" id="food" />
                  <label htmlFor="food">料理</label>
                </div>
              </div>
            </div>
            <div className={styles["check2"]}>
              <div className={styles["checkbox-column"]}>
                <h2 className={styles["column-title"]}>レティング</h2>

                <div className={styles["checkbox-item"]}>
                  <input
                    id="4-5-stars"
                    type="checkbox"
                    checked={starsSelected.some(
                      (star) => star[0] === "4" && star[1] === "5"
                    )}
                    onClick={() => handleChangeStars("4", "5")}
                  />
                  <label htmlFor="4-5-stars">4-5</label>
                </div>

                <div className={styles["checkbox-item"]}>
                  <input
                    id="3-4-stars"
                    type="checkbox"
                    checked={starsSelected.some(
                      (star) => star[0] === "3" && star[1] === "4"
                    )}
                    onClick={() => handleChangeStars("3", "4")}
                  />
                  <label htmlFor="3-4-stars">3-4</label>
                </div>

                <div className={styles["checkbox-item"]}>
                  <input
                    id="2-3-stars"
                    type="checkbox"
                    checked={starsSelected.some(
                      (star) => star[0] === "2" && star[1] === "3"
                    )}
                    onClick={() => handleChangeStars("2", "3")}
                  />
                  <label htmlFor="2-3-stars">2-3</label>
                </div>

                <div className={styles["checkbox-item"]}>
                  <input
                    id="1-2-stars"
                    type="checkbox"
                    checked={starsSelected.some(
                      (star) => star[0] === "1" && star[1] === "2"
                    )}
                    onClick={() => handleChangeStars("1", "2")}
                  />
                  <label htmlFor="1-2-stars">1-2</label>
                </div>
              </div>
            </div>
            <div className={styles["check3"]}>
              <div className={styles["checkbox-column"]}>
                <h2 className={styles["column-title"]}>性別</h2>

                <div className={styles["checkbox-item"]}>
                  <input
                    type="radio"
                    checked={dataSearch.sex === "male"}
                    onClick={() => {
                      if (dataSearch.sex === "male") {
                        setDataSearch({
                          ...dataSearch,
                          sex: "",
                        });
                      } else
                        setDataSearch({
                          ...dataSearch,
                          sex: "male",
                        });
                    }}
                  />
                  男性
                </div>

                <div className={styles["checkbox-item"]}>
                  <input
                    type="radio"
                    checked={dataSearch.sex === "female"}
                    onClick={() => {
                      if (dataSearch.sex === "female") {
                        setDataSearch({
                          ...dataSearch,
                          sex: "",
                        });
                      } else
                        setDataSearch({
                          ...dataSearch,
                          sex: "female",
                        });
                    }}
                  />
                  女性
                </div>
              </div>
            </div>
            <div className={styles.check4}>
              <div className={styles["checkbox-column"]}>
                <h2 className={styles["column-title"]}>外国語</h2>

                <div className={styles["checkbox-item"]}>
                  <input
                    type="checkbox"
                    id="us"
                    onChange={handleChangeLanguage}
                    value="English"
                    checked={dataSearch.language.includes("English")}
                  />
                  <label htmlFor="us">英語</label>
                </div>

                <div className={styles["checkbox-item"]}>
                  <input
                    type="checkbox"
                    id="jp"
                    onChange={handleChangeLanguage}
                    value="Japanese"
                    checked={dataSearch.language.includes("Japanese")}
                  />
                  <label htmlFor="jp">日本語</label>
                </div>
              </div>
            </div>
            <div className={styles["check5"]}>
              <div className={styles["checkbox-column"]}>
                <h2 className={styles["column-title"]}>経験年数</h2>

                <div className={styles["checkbox-item"]}>
                  <input
                    id="4-exps"
                    type="radio"
                    checked={
                      dataSearch.minYearEx === "4" &&
                      dataSearch.maxYearEx === ""
                    }
                    onClick={() => {
                      if (
                        dataSearch.minYearEx === "4" &&
                        dataSearch.maxYearEx === ""
                      ) {
                        setDataSearch({
                          ...dataSearch,
                          minYearEx: "",
                          maxYearEx: "",
                        });
                      } else
                        setDataSearch({
                          ...dataSearch,
                          minYearEx: "4",
                          maxYearEx: "",
                        });
                    }}
                  />
                  <label htmlFor="4-exps">4+</label>
                </div>

                <div className={styles["checkbox-item"]}>
                  <input
                    id="2-3-exps"
                    type="radio"
                    checked={
                      dataSearch.minYearEx === "2" &&
                      dataSearch.maxYearEx === "3"
                    }
                    onClick={() => {
                      if (
                        dataSearch.minYearEx === "2" &&
                        dataSearch.maxYearEx === "3"
                      ) {
                        setDataSearch({
                          ...dataSearch,
                          minYearEx: "",
                          maxYearEx: "",
                        });
                      } else
                        setDataSearch({
                          ...dataSearch,
                          minYearEx: "2",
                          maxYearEx: "3",
                        });
                    }}
                  />
                  <label htmlFor="2-3-exps">2-3</label>
                </div>

                <div className={styles["checkbox-item"]}>
                  <input
                    id="0-2-exps"
                    type="radio"
                    checked={
                      dataSearch.minYearEx === "0" &&
                      dataSearch.maxYearEx === "2"
                    }
                    onClick={() => {
                      if (
                        dataSearch.minYearEx === "0" &&
                        dataSearch.maxYearEx === "2"
                      ) {
                        setDataSearch({
                          ...dataSearch,
                          minYearEx: "",
                          maxYearEx: "",
                        });
                      } else
                        setDataSearch({
                          ...dataSearch,
                          minYearEx: "0",
                          maxYearEx: "2",
                        });
                    }}
                  />
                  <label htmlFor="0-2-exps">2以下</label>
                </div>
              </div>
            </div>
          </div>
          <div className={styles["sitter-information"]}>
            {sitters.length === 0 && <h1>データがありません。</h1>}
            {sitters.map((sitter) => {
              return (
                <div key={sitter.id} className={styles["sitter-rank"]}>
                  <img
                    src={sitter.avatar ?? "assets/avatar.jpg"}
                    alt="hình ảnh"
                  />
                  <div>{sitter.sitter_name}</div>
                  <div>{sitter.rate}⭐</div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
