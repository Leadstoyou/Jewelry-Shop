import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
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
`;
const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
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
  cursor: pointer;
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

const ShoppingCart = () => {
  const [isAgreedToTerms, setIsAgreedToTerms] = useState(false);
  const [exportBill, setExportBill] = useState(false);
  const [giftNotes, setGiftNotes] = useState("");
  // const [products, setProducts] = useState([
  //   {
  //     id: 1,
  //     description: "Description for Product 1",
  //     selectedQuantity: 2,
  //     price: 10,
  //     image:
  //       "https://product.hstatic.net/200000103143/product/pngtrpnt_782506c01_rgb_bfb31d4989ec4eb28df1370676484672_master.png",
  //     priceLarge: 20,
  //     productCode: "P123", // Product CODE added
  //   },
  //   {
  //     id: 2,
  //     description: "Description for Product 2",
  //     selectedQuantity: 1,
  //     price: 15,
  //     image:
  //       "https://product.hstatic.net/200000103143/product/pngtrpnt_782506c01_rgb_bfb31d4989ec4eb28df1370676484672_master.png",
  //     priceLarge: 25,
  //     productCode: "P456", // Product CODE added
  //   },
  //   {
  //     id: 3,
  //     description: "Description for Product 3",
  //     selectedQuantity: 3,
  //     price: 20,
  //     image:
  //       "https://product.hstatic.net/200000103143/product/pngtrpnt_782506c01_rgb_bfb31d4989ec4eb28df1370676484672_master.png",
  //     priceLarge: 30,
  //     productCode: "P789", // Product CODE added
  //   },
  //   {
  //     id: 4,
  //     description: "Description for Product 3",
  //     selectedQuantity: 3,
  //     price: 20,
  //     image:
  //       "https://product.hstatic.net/200000103143/product/pngtrpnt_782506c01_rgb_bfb31d4989ec4eb28df1370676484672_master.png",
  //     priceLarge: 30,
  //     productCode: "P789", // Product CODE added
  //   },
  //   {
  //     id: 5,
  //     description: "Description for Product 3",
  //     selectedQuantity: 3,
  //     price: 20,
  //     image:
  //       "https://product.hstatic.net/200000103143/product/pngtrpnt_782506c01_rgb_bfb31d4989ec4eb28df1370676484672_master.png",
  //     priceLarge: 30,
  //     productCode: "P789", // Product CODE added
  //   },
  //   {
  //     id: 6,
  //     description: "Description for Product 3",
  //     selectedQuantity: 3,
  //     price: 20,
  //     image:
  //       "https://product.hstatic.net/200000103143/product/pngtrpnt_782506c01_rgb_bfb31d4989ec4eb28df1370676484672_master.png",
  //     priceLarge: 30,
  //     productCode: "P789", // Product CODE added
  //   },
  // ]);

  //call API view cart
  const [cartData, setCartData] = useState(null);

  //Lấy product data
  useEffect(() => {
    // const cartToken = cartData.cart_token;
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9999/api/v1/cart/615a8f7f4e7c3a1d3a9b6e60`
        );
        const data = res.data;
        setCartData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  //Xóa 1 sản phẩm trong giỏ hàng
  const handleRemoveFromCart = async (productId) => {
    const userId = cartData.user_id;
    try {
      await axios.delete(
        `http://localhost:9999/api/v1/cart/${userId}/${productId}`
      );
      const updatedCartData = cartData.productList.filter(
        (product) => product.product_id !== productId
      );
      setCartData({ ...cartData, productList: updatedCartData });
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  const handlePay = () => {
    if (isAgreedToTerms) {
      // Implement your payment logic here
    } else {
      alert("Please agree to the Terms of Service.");
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedProducts = cartData.map((product) => {
      if (product.id === productId) {
        return { ...product, selectedQuantity: newQuantity };
      }
      return product;
    });
    setCartData(updatedProducts);
  };

  const handleFormSubmit = (e) => {
    console.log(e);
  };

  const viewedProducts = [
    {
      id: 7,
      description: "Description for Viewed Product 1",
      price: 25,
      image:
        "https://product.hstatic.net/200000103143/product/pngtrpnt_782506c01_rgb_bfb31d4989ec4eb28df1370676484672_master.png",
    },
    {
      id: 8,
      description: "Description for Viewed Product 2",
      price: 35,
      image:
        "https://product.hstatic.net/200000103143/product/pngtrpnt_782506c01_rgb_bfb31d4989ec4eb28df1370676484672_master.png",
    },
    {
      id: 9,
      description: "Description for Viewed Product 2",
      price: 35,
      image:
        "https://product.hstatic.net/200000103143/product/pngtrpnt_782506c01_rgb_bfb31d4989ec4eb28df1370676484672_master.png",
    },
    {
      id: 10,
      description: "Description for Viewed Product 2",
      price: 35,
      image:
        "https://product.hstatic.net/200000103143/product/pngtrpnt_782506c01_rgb_bfb31d4989ec4eb28df1370676484672_master.png",
    },
    {
      id: 11,
      description: "Description for Viewed Product 2",
      price: 35,
      image:
        "https://product.hstatic.net/200000103143/product/pngtrpnt_782506c01_rgb_bfb31d4989ec4eb28df1370676484672_master.png",
    },
    {
      id: 10,
      description: "Description for Viewed Product 2",
      price: 35,
      image:
        "https://product.hstatic.net/200000103143/product/pngtrpnt_782506c01_rgb_bfb31d4989ec4eb28df1370676484672_master.png",
    },
    {
      id: 10,
      description: "Description for Viewed Product 2",
      price: 35,
      image:
        "https://product.hstatic.net/200000103143/product/pngtrpnt_782506c01_rgb_bfb31d4989ec4eb28df1370676484672_master.png",
    },
  ];
  if (cartData === null) {
    // Data is being fetched, you can render a loading indicator or message here.
    return (
      <Container>
        <div>Loading...</div>
      </Container>
    );
  }

  // if (cartData.length === 0) {
  //   return (
  //     <Container>
  //       <div>
  //         <h2>Cart is empty</h2>
  //         <a href="/">Continue Shopping</a>
  //       </div>
  //     </Container>
  //   );
  // }

  return (
    <div>
      <Container>
        <ScrollingArea>
          <LeftPanel>
            <Title>Shopping Cart</Title>
            {cartData.productList.map((product) => (
              <div key={product.product_id}>
                <ProductContainer>
                  <ProductImage />
                  {/* //src={} */}
                  <ProductInfo>
                    <h3></h3> {/* product.productDescription */}
                    <ProductCategory>Product Category:</ProductCategory>
                    <ProductPrice>Price: ${product.price}</ProductPrice>
                  </ProductInfo>
                  <QuantityContainer>
                    <QuantityLabel>Quantity</QuantityLabel>
                    <QuantitySelect
                      type="number"
                      min="1"
                      max="100"
                      value={product.selectedQuantity}
                      onChange={(e) => {
                        let newQuantity = parseInt(e.target.value);
                        if (isNaN(newQuantity)) newQuantity = 1;
                        if (newQuantity < 1) newQuantity = 1;
                        if (newQuantity > 10) newQuantity = 10;
                        handleQuantityChange(product.id, newQuantity);
                      }}
                    />
                  </QuantityContainer>
                  <ProductPrice> ${product.price}</ProductPrice>
                  <DeleteButton
                    onClick={() => handleRemoveFromCart(product.product_id)}
                  >
                    X
                  </DeleteButton>
                </ProductContainer>
                <RowSeparator />
              </div>
            ))}
          </LeftPanel>
        </ScrollingArea>
        <RightPanel>
          <Title>Total:{cartData?.total}</Title>
          <CheckboxContainer>
            <input
              type="checkbox"
              id="termsCheckbox"
              onChange={() => setIsAgreedToTerms(!isAgreedToTerms)}
            />
            <Label htmlFor="termsCheckbox">
              I agree to the Terms of Service
            </Label>
          </CheckboxContainer>
          <form
            id="createOrder"
            action="http://localhost:9999/api/v1/payment/create_payment_url"
            method="POST"
            target="_blank"
            onSubmit={handleFormSubmit}
          >
            <Button
              // onClick={handlePay}
              // disabled={!isAgreedToTerms}
              type="submit"
            >
              THANH TOÁN
            </Button>
          </form>
          <ImageUnderButton
            src="https://theme.hstatic.net/200000103143/1000942575/14/trustbadge.jpg?v=2700"
            alt="Your Image"
          />
          <CheckboxContainer>
            <BillExportCheckbox
              checked={exportBill}
              onChange={() => setExportBill(!exportBill)}
            />
            <Label>Export Bill</Label>
          </CheckboxContainer>

          <DescriptionInput>
            <label>Enter gift notes or special delivery instructions</label>
            <textarea
              placeholder="Note"
              value={giftNotes}
              onChange={(e) => setGiftNotes(e.target.value)}
            />
          </DescriptionInput>
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
      <ScrollableProducts>
        <ViewedProductsContainer>
          {viewedProducts.map((product) => (
            <ViewedProduct key={product.id}>
              <ViewedProductImage src={product.image} />
              <ViewedProductInfo>
                <ViewedProductDescription>
                  {product.description}
                </ViewedProductDescription>
                <ViewedProductPrice>${product.price}</ViewedProductPrice>
              </ViewedProductInfo>
            </ViewedProduct>
          ))}
        </ViewedProductsContainer>
      </ScrollableProducts>
    </div>
  );
};

export default ShoppingCart;
