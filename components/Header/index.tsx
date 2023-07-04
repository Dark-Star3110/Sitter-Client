import React from "react";
import style from "./Header.module.css";
import Link from "next/link";
import { UserContext } from "../../context/UserContext";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Home from "@mui/icons-material/Home";

const settings = ["プロファイル", "ログアウト"];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const { user } = React.useContext(UserContext);
  return (
    <>
      {user ? (
        <AppBar position="static" sx={{ mb: 3 }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Home sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                HomePage
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                ></Menu>
              </Box>
              <Home sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                HomePage
              </Typography>
              <Box
                sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              ></Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user.user_name}
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem>
                    <Link href="/profile">
                      <Typography textAlign="center">プロファイル</Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href="/request/history">
                      <Typography textAlign="center">リクエスト履歴</Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      localStorage.removeItem("access_token");
                      window.location.reload();
                    }}
                  >
                    <Typography textAlign="center">ログアウト</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      ) : (
        <header className={style.header}>
          <div className={style.logo}>
            <a href="Homepage.html">
              {/* <img src="" alt="ホームページ" title="ホームページ" /> */}
            </a>
          </div>
          <nav className={style["nav-navigation"]}>
            <div className={style["header-right"]}>
              <Link className={style.button1} href="/signin">
                サインイン
              </Link>
              <Link className={style.button2} href="/signup">
                サインアップ
              </Link>
            </div>
          </nav>
        </header>
      )}
    </>
  );
};

export default Header;
