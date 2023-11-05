import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getNumber } from "../../redux/GetNumber.jsx";
import { useSelector } from "react-redux";

import {
  viewCartAPI,
  removeFromCart,
  updateCart,
  addOrder,
} from "../../services/connectApi.js";
import { useDispatch } from "react-redux";
const Container = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  min-height: 50vh;
  padding: 0 20vh 0 20vh;

  @media (max-width: 1500px) {
    padding: 25px;
  }
  margin-top: 15vh;
`;

const LeftPanel = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  /* Set a fixed height to match the right panel */
  height: 50vh; /* You can adjust this value based on your layout */
`;

const RightPanel = styled.div`
  flex: 1;
  padding: 0 0 0 10px;
  position: sticky;
  top: 0;
`;
const Title = styled.h2`
  text-align: left;
  color: #333;
  font-size: 30px;
  font-weight: bold;
`;

const ProductContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 10px;
`;

const ProductImage = styled.img`
  max-width: 100px;
  max-height: 100px;
  margin-right: 20px;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductPrice = styled.span`
  margin-right: 60px;
  display: block;
  margin-top: 5px;
  font-size: 16px;
  color: rgb(58, 57, 53);
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 1px;
  cursor: pointer;
  outline: none;
  height: 56px;
  font-size: 19px;

  &:hover {
    background-color: #444;
  }
`;
const ImageUnderButton = styled.img`
  max-width: 100%;
  max-height: 100px;
  margin: 20px auto;
  display: block;
`;
const DeleteButton = styled.button`
  background-color: #ccc;
  color: #777;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  font-size: 11px;
`;

const RowSeparator = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.09);
  margin-top: 10px;
`;
const QuantityContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuantityLabel = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  margin-right: 55px;
`;

const QuantitySelect = styled.input`
  font-size: 16px;
  width: 60px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px;
  text-align: center;
  margin-right: 60px;
`;
const ProductCategory = styled.p`
  font-size: 13px;
  color: #777;
`;
const ScrollingArea = styled.div`
  flex: 3;
  max-height: calc(100vh - 70px);
  overflow: auto;
`;
const BillExportCheckbox = styled.input.attrs({ type: "checkbox" })`
  margin-right: 10px;
  appearance: checkbox;
`;
const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const Label = styled.label`
  margin-left: 10px;
`;
const DescriptionInput = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0 60px 0;

  label {
    margin-bottom: 5px;
  }

  textarea {
    max-width: 100%;
    border-radius: 4px;
    padding: 4px;
  }
`;
const ContinueShoppingLink = styled.a`
  text-decoration: none;
  display: flex;
  color: #000; /* Set the desired color */
  font-size: 16px;
  margin-top: 20px;
  align-items: center;
  color: red;
  font-weight: bolder;
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    color: #f86767;
  }
`;

const ContinueShoppingText = styled.span`
  margin-right: 5px;
  font-weight: bold;
  font-size: 20px;
`;

const ArrowIcon = styled.svg`
  width: 8px;
  height: 6px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.25;
  stroke-linecap: square;
`;

const PoliciesContainer = styled.div`
  padding: 20px 0 5px 0;
  border-bottom: 1px solid #e1e1e1;
  margin-bottom: 30px;
  margin: 0 20vh 0 20vh;

  @media (max-width: 768px) {
    margin: 0;
  }
`;

const PolicyRow = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;
const Policy = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  img {
    max-width: 40px;
    height: auto;
  }

  p {
    margin: 0;
    padding-left: 5px;
  }
`;
const ViewedProductsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;
  padding: 20px 0;
  border-top: 1px solid #e1e1e1;
`;

const ViewedProduct = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  padding: 10px;
  border-radius: 4px;
`;

const ViewedProductImage = styled.img`
  max-width: 200px;
  max-height: 200px;
  margin-right: 10px;
`;

const ViewedProductInfo = styled.div``;

const ViewedProductDescription = styled.h4`
  margin: 20px;
  max-width: 200px;
`;

const ViewedProductPrice = styled.span`
  margin: 20px;
  font-size: 14px;
  color: #555;
`;
const ScrollableProducts = styled.div`
  display: flex;
  overflow: auto;
  padding: 0 100px; /* Adjust the margin from the left and right sides */
`;

const EmptyCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh; /* You can adjust the height based on your layout */
`;

const ShoppingCart = (props) => {
  const { spin, setSpin } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.loginController?.value);

  const [isAgreedToTerms, setIsAgreedToTerms] = useState(false);
  // const [exportBill, setExportBill] = useState(false);
  // const [giftNotes, setGiftNotes] = useState("");
  // const [hoveredDescription, setHoveredDescription] = useState("");
  const [order, setOrder] = useState();
  //call API view cart
  const [cartData, setCartData] = useState();

  //Lấy product data
  const [cartUpdate, setCartUpdate] = useState();
  const [deleteCart, setDeleteCart] = useState();
  const notify = (text) => {
    toast.error(text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        await viewCartAPI("hi", setCartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [deleteCart, cartUpdate, order]);
  useEffect(() => {
    dispatch(getNumber(cartData?.productList?.length));
  }, [cartData]);

  const handleUpdateQuantity = async (productId, newQuantity, price) => {
    try {
      if (newQuantity > 10) {
        document.getElementById(`${productId}`).value = 10;
        const number = 10;
        await updateCart(productId, number, price, setCartUpdate, toast , setSpin);

        return;
      } else if (newQuantity <= 0) {
        document.getElementById(`${productId}`).value = 1;
        const numberO = 1;
        await updateCart(productId, numberO, price, setCartUpdate, toast , setSpin);

        return;
      } else {
        await updateCart(productId, newQuantity, price, setCartUpdate, toast , setSpin);
        return;
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemoveProduct = async (product, toast) => {
    try {
      await removeFromCart(product, setDeleteCart, toast);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const handlePay = () => {
    if (isAgreedToTerms === false) {
      notify("Please agree to Terms to checkout !!!");
    } else if (cartData?.total > 50000000) {
      notify("Please buy with total less than 50.000.000đ  !!!");
    } else if (isAgreedToTerms === true) {
      if (user) {
        navigate("/checkouts");
        // addOrder(toast, setOrder);
        // dispatch(getNumber(0));
      } else if (!user) {
        toast?.error("You must login to check out");
      }
    }
  };

  if (!cartData || cartData.productList.length === 0) {
    return (
      <EmptyCartContainer>
        <Title>Your Cart is Empty</Title>
        <ContinueShoppingLink onClick={() => navigate("/")}>
          Click here to continue shopping
        </ContinueShoppingLink>
      </EmptyCartContainer>
    );
  }
  return (
    <div>
      <Container>
        <ScrollingArea>
          <LeftPanel>
            <Title>Shopping Cart</Title>
            {cartData?.productList?.map((product, index) => (
              <div key={index}>
                <ProductContainer>
                  <ProductImage src={product.productImage} />
                  <ProductInfo>
                    <h6>{product?.productName}</h6>
                    <ProductCategory>
                      Product Category: {product?.productCategory}
                    </ProductCategory>
                    <ProductPrice>
                      Price: {product?.price?.toLocaleString("vn-VI")}
                    </ProductPrice>
                  </ProductInfo>

                  <QuantityLabel>Quantity</QuantityLabel>
                  <QuantitySelect
                    type="number"
                    defaultValue={product?.quantity}
                    id={`${product.product_id}`}
                    min={0}
                    max={10}
                    onChange={(e) => {
                      handleUpdateQuantity(
                        product?.product_id,
                        e.target.value,
                        product?.price
                      );
                    }}
                  />

                  <section></section>
                  <ProductPrice>
                    {" "}
                    {product?.price?.toLocaleString("vn-VI")}đ
                  </ProductPrice>
                  <DeleteButton onClick={() => handleRemoveProduct(product)}>
                    X
                  </DeleteButton>
                </ProductContainer>
                <RowSeparator />
              </div>
            ))}
          </LeftPanel>
        </ScrollingArea>
        {!cartData ||
          (cartData.productList.length === 0 && (
            <EmptyCartContainer>
              <Title>Your Cart is Empty</Title>
              <ContinueShoppingLink href="/">
                Click here to continue shopping
              </ContinueShoppingLink>
            </EmptyCartContainer>
          ))}

        <RightPanel>
          <Title>Total: {spin ? (
              <span style={{marginLeft:'20px'}}>
                <CircularProgress size={30} />
              </span>
          ) : (
            <span>{cartData?.total?.toLocaleString("vn-VI")}đ</span>
          )}
          </Title>
          <CheckboxContainer>
            <input
              type="checkbox"
              id="termsCheckbox"
              onChange={() => setIsAgreedToTerms(!isAgreedToTerms)}
              style={{ WebkitAppearance: "checkbox" }}
            />
            <Label htmlFor="termsCheckbox">
              I agree to the Terms of Service
            </Label>
          </CheckboxContainer>
          <Button onClick={handlePay} type="submit">
            THANH TOÁN
          </Button>
          <ImageUnderButton
            src="https://theme.hstatic.net/200000103143/1000942575/14/trustbadge.jpg?v=2700"
            alt="Your Image"
          />

          <ContinueShoppingLink href="/">
            <ContinueShoppingText>Tiếp tục mua sắm</ContinueShoppingText>
            <ArrowIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 6">
              <path d="M4 4.5L7 1.5" className="icon-chevron-down-left" />
              <path d="M4 4.5L1 1.5" className="icon-chevron-down-right" />
            </ArrowIcon>
          </ContinueShoppingLink>
        </RightPanel>
      </Container>
      <PoliciesContainer className="ega-policies">
        <div className="row">
          <PolicyRow>
            <div className="col-md-4 col-12">
              <Policy>
                <div className="ega-media__image">
                  <img
                    src="https://file.hstatic.net/200000103143/file/original_0aff5e30166a460db3bb0c64fc9ace74.jpg"
                    alt="Hàng chính hãng mới 100%"
                  />
                </div>
                <p>Hàng chính hãng mới 100%</p>
              </Policy>
            </div>
            <div className="col-md-4 col-12">
              <Policy>
                <div className="ega-media__image">
                  <img
                    src="https://file.hstatic.net/200000103143/file/truck_3250dd1c9cb64b5e9d86248f6a49e662.jpg"
                    alt="Miễn phí giao hàng toàn quốc"
                  />
                </div>
                <p>Miễn phí giao hàng toàn quốc</p>
              </Policy>
            </div>
            <div className="col-md-4 col-12">
              <Policy>
                <div className="ega-media__image">
                  <img
                    src="https://file.hstatic.net/200000103143/file/pay_b07d9237eecd4a19a06bae34a5638b04.jpg"
                    alt="Mua trước trả sau với lãi suất 0%"
                  />
                </div>
                <p>Mua trước trả sau với lãi suất 0%</p>
              </Policy>
            </div>
          </PolicyRow>
        </div>
      </PoliciesContainer>
      <ToastContainer
        style={{ height: "500px" }}
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default ShoppingCart;
