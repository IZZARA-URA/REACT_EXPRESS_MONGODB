import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles"
import { useSelector } from "react-redux";
import { themeSettings } from "theme";
import { useMemo } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// COMPONENTS // 
import Layout from "scenes/layout"
import Dashboard from "scenes/dashboard"
import Products from "scenes/products"
import Customers from "scenes/customers";
import Transaction from "scenes/transaction";
import Geography from "scenes/geography";
import Overview from "scenes/overview";

function App() {
  /* FOR mode */
  /* 
    -Imagin all state has been stored 
     global or state.global there is in store
     location: ./state/index.js
  */
  const mode = useSelector((state) => state.global.mode)

  /* FOR themeSetting(mode) */
  /*
    -If mode == dark use dark : light
     location: ../theme.js in themeSetting()
  */
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
              {/* loged in */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={<Transaction />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/overview" element={<Overview />}/>
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
