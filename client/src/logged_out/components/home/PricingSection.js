import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  Grid,
  Typography,
  isWidthUp,
  withWidth,
  withStyles,
} from "@material-ui/core";
import PriceCard from "./PriceCard";
import calculateSpacing from "./calculateSpacing";

const styles = (theme) => ({
  containerFix: {
    [theme.breakpoints.down("md")]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    overflow: "hidden",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    color: "white",
  },
  cardWrapper: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 340,
      color: "white",
    },
  },
  cardWrapperHighlighted: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 360,
    },
  },
});

function PricingSection(props) {
  const { width, classes } = props;
  return (
    <div
      className="lg-p-top"
      style={{ backgroundColor: "#203c56", color: "white" }}
    >
      <Typography variant="h3" align="center" className="lg-mg-bottom">
        Enjoy the ultimate platform
      </Typography>
      <div className={classNames("container-fluid", classes.containerFix)}>
        <Grid
          container
          spacing={calculateSpacing(width)}
          className={classes.gridContainer}
        >
          <Grid
            item
            xs={12}
            sm={6}
            lg={3}
            className={classes.cardWrapper}
            data-aos="zoom-in-up"
          >
            <PriceCard
              title="Analysis & Alerts"
              pricing={
                <span>
                  {/* $14.99 */}
                  <Typography display="inline">
                    Get the most out of fundamental and technical analysis with
                    our News Feed and Economic Calendars. More than 100 most
                    widely-used technical indicators and widgets. Always stay
                    up-to-date on what is happening in financial markets with
                    our customizable price alerts.
                  </Typography>
                </span>
              }
              features={[]}
            />
          </Grid>
          <Grid
            item
            // className={classes.cardWrapperHighlighted}
            className={classes.cardWrapper}
            xs={12}
            sm={6}
            lg={3}
            data-aos="zoom-in-up"
            data-aos-delay="200"
          >
            <PriceCard
              container
              // highlighted
              title="Risk Management"
              pricing={
                <span>
                  {/* $29.99 */}
                  <Typography display="inline">
                    With features like Stop Loss/Take Profit, Negative balance
                    protection and Trailing Stop you can manage your losses and
                    profits at the levels predetermined by you.
                  </Typography>
                </span>
              }
              features={[]}
            />
          </Grid>
          <Grid
            item
            className={classes.cardWrapper}
            xs={12}
            sm={6}
            lg={3}
            data-aos="zoom-in-up"
            data-aos-delay={isWidthUp("md", width) ? "400" : "0"}
          >
            <PriceCard
              title="Trading Community"
              pricing={
                <span>
                  {/* $49.99 */}
                  <Typography display="inline">
                    {" "}
                    A multichart layout, technical analysis, historical quotes
                    and beyond. Everything you’re looking for in a platform — on
                    the device of your choice.
                  </Typography>
                </span>
              }
              features={[]}
            />
          </Grid>
          <Grid
            item
            className={classes.cardWrapper}
            xs={12}
            sm={6}
            lg={3}
            data-aos="zoom-in-up"
            data-aos-delay={isWidthUp("md", width) ? "600" : "200"}
          >
            <PriceCard
              title="Enjoy the ultimate platform"
              pricing={
                <span>
                  {/* $99.99 */}
                  <Typography display="inline">
                    Join massive IQ community, discuss trading ideas and
                    opportunities, or simply follow other traders with features
                    like Traders' Sentiment and Community Live Deals
                  </Typography>
                </span>
              }
              features={["Feature 1", "Feature 2", "Feature 3"]}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

PricingSection.propTypes = {
  width: PropTypes.string.isRequired,
};

export default withStyles(styles, { withTheme: true })(
  withWidth()(PricingSection)
);
