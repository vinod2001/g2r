import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import MailIcon from "@mui/icons-material/Mail";
import { Layout1 } from "./Layout1";
import { Layout2 } from "./Layout2";
import { Layout3 } from "./Layout3";
import { Layout4 } from "./Layout4";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { MainHeaderMenu } from "./components/MainHeaderMenu";
import ApptioLogo from "./images/ApptioLogo.jpeg";
import logoFull from "./images/logoFull.png";
import NextPlanIcon from "@mui/icons-material/NextPlan";
import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { initial } from "lodash";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  zIndex: "1 !important",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const Appbar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => {
  console.log(theme.zIndex.drawer);
  theme.zIndex.drawer = 1;
  return {
    zIndex: theme.zIndex.drawer + 1,
    background: "#fff",
    width: `calc(100% - ${65}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  };
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: 1,
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState(3);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Appbar
        position="fixed"
        open={open}
        sx={{
          boxShadow: 0,
          padding: "0px",
          height: "64px",
          borderBottom: "1px solid #ccc",
        }}
      >
        <Toolbar
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ justifyContent: "flex-start", color: "#333" }}>
            <h2>Demand Planning</h2>
          </Box>
          <Box sx={{ justifyContent: "flex-end" }}>
            <IconButton>
              <QuestionMarkIcon />
            </IconButton>
            <IconButton>
              <SettingsRoundedIcon />
            </IconButton>
            <IconButton>
              <PersonRoundedIcon />
            </IconButton>
          </Box>

          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div"></Typography> */}
        </Toolbar>
      </Appbar>
      <Drawer variant="permanent" open={open} sx={{ zIndex: "1 !important" }}>
        <DrawerHeader
          sx={{ zIndex: "1 !important", justifyContent: "flex-start" }}
        >
          {/* <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton> */}
          {open === true ? (
            <img
              src={logoFull}
              style={{
                width: "147px",
                height: "37px",
                justifyContent: "flex-start",
              }}
            />
          ) : (
            <img
              src={ApptioLogo}
              style={{
                width: "40px",
                height: "40px",
              }}
            />
          )}
        </DrawerHeader>
        <Divider />
        <List>
          {["Home", "Demand Planning"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  background:
                    text === "Demand Planning" ? "#ebebeb" : "initial",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <HomeIcon /> : <NextPlanIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, background: "#adc2d9" }}>
        <DrawerHeader />
        <div>
          {open === true ? (
            <IconButton
              onClick={handleDrawerClose}
              sx={{
                marginLeft: "-15px",
                marginTop: "-15px",
                justifyContent: "flex-end",
                zIndex: 3,
                border: "1px solid #ccc",
                width: "30px",
                height: "30px",
                position: "fixed",
                background: "#ccc",
              }}
            >
              <KeyboardDoubleArrowLeftRoundedIcon
                style={{
                  width: "20px",
                  height: "20px",
                  position: "relative",
                  left: "4px",
                }}
              />
            </IconButton>
          ) : (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginLeft: "-15px",
                marginTop: "-15px",
                justifyContent: "flex-end",
                zIndex: 3,
                border: "1px solid #ccc",
                width: "30px",
                height: "30px",
                position: "fixed",
                background: "#ccc",
              }}
            >
              <KeyboardDoubleArrowRightRoundedIcon
                style={{
                  width: "20px",
                  height: "20px",
                  position: "relative",
                  left: "4px",
                }}
              />
            </IconButton>
          )}
        </div>
        <div>
          <AppBar
            position="static"
            style={{
              background: "#47617e", //#47617e
              display: "flex",
              color: "white",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Layout 1" sx={{ borderRight: "1px solid #5b7fa6" }} />
              <Tab label="Layout 2" sx={{ borderRight: "1px solid #5b7fa6" }} />
              <Tab label="Layout 3" sx={{ borderRight: "1px solid #5b7fa6" }} />
              <Tab label="Layout 4" />
            </Tabs>
          </AppBar>

          {/* <MainHeaderMenu /> */}
          {value === 0 && <Layout1 />}
          {value === 1 && <Layout2 />}
          {value === 2 && <Layout3 />}
          {value === 3 && <Layout4 />}
        </div>
      </Box>
    </Box>
  );
}
