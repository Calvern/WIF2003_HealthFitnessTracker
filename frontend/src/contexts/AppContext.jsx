import { createContext, useContext, useState } from "react";
import CustomToast from "../components/CustomToast";
import { ToastContainer } from "react-bootstrap";

const AppContext = createContext(undefined);

export const AppContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toast, setToast] = useState(undefined);
  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
      }}
    >
      {toast && (
        <ToastContainer
          position="top-end"
          className="p-3"
          style={{
            zIndex: 9999,
            position: "fixed",
            top: "1rem",
            right: "1rem",
          }}
        >
          <CustomToast
            message={toast}
            onClose={() => setToast(undefined)}
          ></CustomToast>{" "}
        </ToastContainer>
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
