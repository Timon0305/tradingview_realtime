import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, isWidthUp, withWidth } from "@material-ui/core";
import CodeIcon from "@material-ui/icons/Code";
import BuildIcon from "@material-ui/icons/Build";
import ComputerIcon from "@material-ui/icons/Computer";
import BarChartIcon from "@material-ui/icons/BarChart";
import HeadsetMicIcon from "@material-ui/icons/HeadsetMic";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import CloudIcon from "@material-ui/icons/Cloud";
import MeassageIcon from "@material-ui/icons/Message";
import CancelIcon from "@material-ui/icons/Cancel";
import calculateSpacing from "./calculateSpacing";
import FeatureCard from "./FeatureCard";

const iconSize = 30;

const features = [
  {
    color: "#00C853",
    headline: "Deposit",
    text: (
      <p style={{ color: "#29b2ab" }}>
        "Open real account and add funds. We work with more than 20 payment
        systems."
      </p>
    ),
    icon: <BuildIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "0",
  },
  {
    color: "#6200EA",
    headline: "Trade",
    text: (
      <p style={{ color: "#29b2ab" }}>
        "Trade any of 100 assets and stocks. Use technical analysis and trade
        the newsLorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
        diam nonumy eirmod tempor invidunt ut labore et."{" "}
      </p>
    ),
    icon: <CalendarTodayIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "200",
  },
  {
    color: "#0091EA",
    headline: "Withdraw",
    text: (
      <p style={{ color: "#29b2ab" }}>
        "Get funds easily to your bank card or e-wallet. We take no commission."{" "}
      </p>
    ),
    icon: <MeassageIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "0",
  },

  // {
  //   color: "#d50000",
  //   headline: "Feature 4",
  //   text:
  //     "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
  //   icon: <ComputerIcon style={{ fontSize: iconSize }} />,
  //   mdDelay: "0",
  //   smDelay: "200",
  // },
  // {
  //   color: "#DD2C00",
  //   headline: "Feature 5",
  //   text:
  //     "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
  //   icon: <BarChartIcon style={{ fontSize: iconSize }} />,
  //   mdDelay: "200",
  //   smDelay: "0",
  // },
  // {
  //   color: "#64DD17",
  //   headline: "Feature 6",
  //   text:
  //     "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
  //   icon: <HeadsetMicIcon style={{ fontSize: iconSize }} />,
  //   mdDelay: "400",
  //   smDelay: "200",
  // },
  // {
  //   color: "#304FFE",
  //   headline: "Feature 7",
  //   text:
  //     "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
  //   icon: <CloudIcon style={{ fontSize: iconSize }} />,
  //   mdDelay: "0",
  //   smDelay: "0",
  // },
  // {
  //   color: "#C51162",
  //   headline: "Feature 8",
  //   text:
  //     "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
  //   icon: <CodeIcon style={{ fontSize: iconSize }} />,
  //   mdDelay: "200",
  //   smDelay: "200",
  // },
  // {
  //   color: "#00B8D4",
  //   headline: "Feature 9",
  //   text:
  //     "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
  //   icon: <CancelIcon style={{ fontSize: iconSize }} />,
  //   mdDelay: "400",
  //   smDelay: "0",
  // },
];

function FeatureSection(props) {
  const { width } = props;
  return (
    <div
      style={{
        backgroundColor: "#203c56",
        color: "white",
      }}
    >
      <div className="container-fluid lg-p-top">
        <Typography variant="h3" align="center" className="lg-mg-bottom">
          How it works
        </Typography>
        <div className="container-fluid">
          <Grid container spacing={calculateSpacing(width)}>
            {features.map((element) => (
              <Grid
                item
                xs={6}
                md={4}
                data-aos="zoom-in-up"
                data-aos-delay={
                  isWidthUp("md", width) ? element.mdDelay : element.smDelay
                }
                key={element.headline}
              >
                <FeatureCard
                  Icon={element.icon}
                  color={element.color}
                  headline={element.headline}
                  text={element.text}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}

FeatureSection.propTypes = {
  width: PropTypes.string.isRequired,
};

export default withWidth()(FeatureSection);
