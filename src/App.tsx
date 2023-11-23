import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemList from "./components/ProductList/ProductList";
import ViewSingle from "./components/SingleProduct/SingleProduct";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ItemList />} />
            <Route path="/singleItem/:id" element={<ViewSingle />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}
export default App;
