import { CircularProgress, Grid, Typography } from "@mui/material";
import CardComp from "./Card/Card";
import { useEffect, useState } from "react";
import styles from "./CardParent.module.css";
import { useSelector } from "react-redux";

function CardParent() {
  const [jobDescList, setJobDescList] = useState([]);
  const [filteredJobDescList, setFilteredJobDescList] = useState([]);
  const [dataOffset, setDataOffset] = useState(0);
  const [spinner, setSpinner] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  //   const dt = [
  //     { label: "IOS", value: "ios" },
  //     { label: "Frontend", value: "frontend" },
  //   ];
  const dt = useSelector((state) => state.selected.value);
  const inputVal = useSelector((state) => state.inputVal.value);

  const checkStringInArray = (stringData, arrayData) => {
    return arrayData.some((items) => items.value === stringData);
  };
  //   const checkLocation = (stringData, arrayData) => {
  //     return arrayData.some((items) => items.value.includes("i") === stringData);
  //   };

  useEffect(() => {
    setSpinner(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      limit: 10,
      offset: dataOffset,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    )
      .then((response) => response?.json())
      .then((result) => {
        setSpinner(false);
        setErrorMsg(false);
        if (Array.isArray(dt) && dt?.length !== 0) {
          const filteredData = result.jdList.filter(
            (data) =>
              checkStringInArray(data?.jobRole, dt) ||
              checkStringInArray(data?.location, dt)
          );
          console.log(filteredData, "idhar dekho");
          setJobDescList([]);
          setFilteredJobDescList((preval) =>
            dataOffset > 0 ? [...preval, ...filteredData] : filteredData
          );
          return;
        } else if (typeof dt === "object" && dt !== null) {
          const filteredData = result.jdList.filter(
            (data) =>
              // (
              data.minExp === dt?.value
            // ||
            // (data.minJdSalary ?? 0) >= dt?.value)
          );
          console.log(filteredData, "idhar dekho");
          setJobDescList([]);
          setFilteredJobDescList((preval) =>
            dataOffset > 0 ? [...preval, ...filteredData] : filteredData
          );
          return;
        } else if (inputVal) {
          const filteredData = result.jdList.filter((data) =>
            data.companyName.toLowerCase().includes(inputVal.toLowerCase())
          );
          setJobDescList([]);
          setFilteredJobDescList((preval) =>
            dataOffset > 0 ? [...preval, ...filteredData] : filteredData
          );
          return;
        }
        setJobDescList((preval) => [...preval, ...result.jdList]);
        setFilteredJobDescList([]);
      })
      .catch((error) => (console.error(error), setErrorMsg(true)));
  }, [dataOffset, dt, inputVal]);

  useEffect(() => setDataOffset(0), [dt, inputVal]);

  const handleInfinityScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setSpinner(true);
        setDataOffset((prev) => prev + 10);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfinityScroll);
    return () => window.removeEventListener("scroll", handleInfinityScroll);
  }, []);

  //   const { jdList } = jobDescList;

  console.log(dt !== null && dt?.length !== 0 ? "true" : "false", dt, inputVal);

  return (
    <Grid
      sx={{ maxWidth: "1200px", position: "relative", paddingBottom: "5rem" }}
      container
      spacing={4}
    >
      {filteredJobDescList.length !== 0
        ? filteredJobDescList.map((items) => (
            <Grid item xs={12} sm={6} md={4} key={items.jdUid}>
              <CardComp jdList={items} />
            </Grid>
          ))
        : jobDescList.length !== 0
        ? jobDescList.map((items) => (
            <Grid item xs={12} sm={6} md={4} key={items.jdUid}>
              <CardComp jdList={items} />
            </Grid>
          ))
        : !spinner && (
            <Typography sx={{ margin: "10rem" }} variant="h5">
              🙏 Apologies! An error occured while getting the data😢. Please
              reload the page or try after some time.
            </Typography>
          )}
      {spinner && (
        <CircularProgress className={`${styles.loader} ${styles.circular}`} />
      )}
      {errorMsg && (
        <Typography sx={{ margin: "10rem" }} variant="h5">
          🙏 Apologies! An error occured while getting the data😢. Please reload
          the page or try after some time.
        </Typography>
      )}
    </Grid>
  );
}

export default CardParent;
