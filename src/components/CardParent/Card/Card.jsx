/* eslint-disable react/prop-types */
import styles from "./Card.module.css";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Tooltip,
  Typography,
} from "@mui/material";

function CardComp({ jdList }) {
  const para = jdList.jobDetailsFromCompany;

  const infoStyle = {
    fontFamily: "inherit",
  };
  const lightWeight14Style = {
    fontSize: "14px",
    fontWeight: "300",
  };
  const greyBoldHeadStyle = {
    fontSize: "13px",
    letterSpacing: "1px",
    color: "#8b8b8b",
  };
  return (
    <Card className={`${styles.cardCont} ${styles.cardCont1}`}>
      {/* <CardActionArea className={styles.cardContButton} sx={infoStyle}> */}
        {/* ######### Posted History Chip ######### */}
        <Box className={styles.postedCont}>⏳ Posted 4 days ago</Box>

        {/* ######### Company Title, Logo and Location Section ######### */}
        <Box className={styles.companyCont}>
          <Avatar
            src={jdList.logoUrl}
            alt={jdList.companyName}
            variant="rounded"
          ></Avatar>
          <Box className={styles.companyInfo}>
            <Typography
              sx={{
                ...infoStyle,
                ...greyBoldHeadStyle,
              }}
              variant="h6"
              gutterBottom
            >
              {jdList.companyName}
            </Typography>
            <Typography
              sx={{
                ...infoStyle,
                ...lightWeight14Style,
                textTransform: "capitalize",
              }}
              variant="h5"
              gutterBottom
            >
              {jdList.jobRole}
            </Typography>
            <Typography
              sx={{
                ...infoStyle,
                fontSize: "11px",
                textTransform: "capitalize",
              }}
              variant="body2"
            >
              {jdList.location}
            </Typography>
          </Box>
        </Box>

        {/* ######### Estimated Salary Section ######### */}
        <Typography sx={{ ...infoStyle, fontSize: "14px", fontWeight: "300" }}>
          Estimated Salary:{" "}
          {jdList.minJdSalary ? `₹${jdList.minJdSalary}` : "Not Mentioned"}{" "}
          {jdList.maxJdSalary ? `- ${jdList.maxJdSalary}` : ""} LPA{" "}
          <Tooltip
            title={
              <span style={{ fontFamily: "Lexend" }}>
                Estimated by Weekday. Not provided by employer
              </span>
            }
            placement="top"
          >
            <>⚠️</>
          </Tooltip>
        </Typography>

        {/* ######### Company Description Section ######### */}
        <CardContent
          sx={{ padding: 0, paddingBottom: "3rem", position: "relative" }}
        >
          <Typography
            variant="h6"
            sx={{ ...infoStyle, fontSize: "1rem", color: "#000000cf" }}
          >
            About Company:
          </Typography>
          <Typography sx={{ ...infoStyle, ...lightWeight14Style }}>
            {`${para.length >= 380 ? para.substring(0, 380) : para}...`}
          </Typography>
          <Box className={styles.textButtonCont}>
            <Button variant="text" sx={{ ...infoStyle, ...lightWeight14Style, textTransform: "capitalize" }}>Show more</Button>
          </Box>
        </CardContent>

        {/* ######### Experience Section ######### */}
        <Box className={styles.expCont}>
          <Typography
            variant="h6"
            sx={{ ...infoStyle, ...greyBoldHeadStyle }}
            gutterBottom
          >
            Minimum Experience
          </Typography>
          <Typography sx={{ ...infoStyle, ...lightWeight14Style }}>
            {`${jdList.minExp ?? jdList.maxExp ?? "Not Mentioned"} ${
              jdList.minExp || jdList.minExp
                ? `Year${jdList.minExp > 1 ? "s" : ""}`
                : ""
            }`}
          </Typography>
        </Box>

        {/* ######### Apply Button ######### */}
        <Button
          href={jdList.jdLink}
          target="blank"
          variant="secondary"
          className={styles.applyButton}
        >
          ⚡ Easy Apply
        </Button>
      {/* </CardActionArea> */}
    </Card>
  );
}

export default CardComp;
