import styled from "styled-components";
import img from "../../assets/productInCollection.jpg";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import { Button } from "bootstrap";
import Comment from "./Comment";
import { grey } from "@mui/material/colors";
import ListProduct from "../ListProduct";
import List from "./List";
const FooterProduct = styled.div`
  margin-bottom: 5%;
`
const Container = styled.div`
  margin-top: 2%;
  margin-left: 5%;
  margin-right: 5%;
`;
const ItemOne = styled.div`
  display: flex;
  gap: 3%;
`;
const Left = styled.div`
  flex-basis: 60%;
`;
const ImageController = styled.div`
  width: 100%;
  height: 70%;
  overflow: hidden;
  margin-bottom: 9%;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 1s ease-in;

  &:hover {
    transform: scale(1.6);
  }
`;
const SuggestImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SuggestText1 = styled.p`
  margin-right: 2%;
`;
const SuggestText2 = styled.p`
  margin-left: 2%;
`;
const Right = styled.div`
  flex-basis: 40%;
`;
const RightOne = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const RightTwo = styled.div``;
const RightTwoController = styled.form``;
const Control = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const DropdownOne = styled.select`
  width: 25%;
  background-color: #313131;
  color: white;
  padding: 10px;
  border: none;
`;
const InControl = styled.div`
  margin-bottom: 3%;
`;
const RightThree = styled.div`
  display: flex;
  flex-direction: column;
`;
const RButtonOne = styled.button`
  padding: 15px;
  border: none;
  background-color: #313131;
  color: white;
`;
const RButtonTwo = styled.button`
  padding: 15px;
  border: none;
  color: black;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TextInDropdown = styled.option``;
const ItemTwo = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ControllerTwo = styled.div`
  flex-basis: 90%;
  text-align: start;
`;
const IconTwo = styled.div`
  margin-top: 1.5%;
  cursor: pointer;
`;

const Action = styled.div`
  display: none;
`;

const CommentAction = styled.div`
  display:  flex;
  justify-content: space-between;

`
const CommentDisplay = styled.div``
const CommentController = styled.div``;
const ProductBody = () => {
  const [comdisplay,setCom] = useState(true)
  const [desc, setDesc] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");

  const handleDisplay = ()=>{
    setCom(!comdisplay)
  }

  const handleDesc = () => {
    setDesc(!desc);
  };

  const handleFavorite = () => {
    setFavorite(!favorite);
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleMaterialChange = (event) => {
    setSelectedMaterial(event.target.value);
  };

  const resetSelections = () => {
    setSelectedSize("");
    setSelectedColor("");
    setSelectedMaterial("");
  };
  
  return (
    <Container>
      <ItemOne>
        <Left>
          <ImageController>
            <Image src={img} />
          </ImageController>
          <SuggestImg>
            <SuggestText1>Miễn phí vận chuyển</SuggestText1>
            <p>|</p>
            <SuggestText2>Vệ sinh, làm sạch sản phẩm miễn phí</SuggestText2>
          </SuggestImg>
        </Left>
        <Right>
          <RightOne>
            <h1 style={{ textAlign: "center" }}>
              Bông tai bạc mạ vàng 14k hình vỏ sò Disney The Little Mermaid được
              đính ngọc trai nhân tạo màu trắng
            </h1>
            <h3 style={{ backgroundColor: "#cacaca", padding: "10px" }}>
              3,890,000<span style={{ textDecoration: "underline" }}>đ</span>
            </h3>
          </RightOne>
          <hr />
          <RightTwo>
            <RightTwoController>
              <Control>
                <InControl>
                  <DropdownOne value={selectedSize} onChange={handleSizeChange}>
                    <TextInDropdown value="" disabled>
                      Kích thước
                    </TextInDropdown>
                    <TextInDropdown value="Size1">Size 1</TextInDropdown>
                    <TextInDropdown value="Size2">Size 2</TextInDropdown>
                    <TextInDropdown value="Size3">Size 3</TextInDropdown>
                  </DropdownOne>
                  {selectedSize ? (
                    <p style={{ fontWeight: "bolder" }}>
                      Kích thước : {selectedSize}
                    </p>
                  ) : (
                    <p style={{ visibility: "hidden" }}>
                      Kích thước : {selectedSize}
                    </p>
                  )}
                </InControl>
                <InControl>
                  <DropdownOne
                    value={selectedColor}
                    onChange={handleColorChange}
                  >
                    <TextInDropdown value="" disabled>
                      Màu sắc
                    </TextInDropdown>
                    <TextInDropdown value="Color1">Color 1</TextInDropdown>
                    <TextInDropdown value="Color2">Color 2</TextInDropdown>
                    <TextInDropdown value="Color3">Color 3</TextInDropdown>
                  </DropdownOne>
                  {selectedColor ? (
                    <p style={{ fontWeight: "bolder" }}>
                      Màu sắc: {selectedColor}
                    </p>
                  ) : (
                    <p style={{ visibility: "hidden" }}>
                      Màu sắc : {selectedColor}
                    </p>
                  )}
                </InControl>
                <InControl>
                  <DropdownOne
                    value={selectedMaterial}
                    onChange={handleMaterialChange}
                  >
                    <TextInDropdown value="" disabled>
                      Chất liệu
                    </TextInDropdown>
                    <TextInDropdown value="Material1">
                      Material 1
                    </TextInDropdown>
                    <TextInDropdown value="Material2">
                      Material 2
                    </TextInDropdown>
                    <TextInDropdown value="Material3">
                      Material 3
                    </TextInDropdown>
                  </DropdownOne>
                  {selectedMaterial ? (
                    <p style={{ fontWeight: "bolder" }}>
                      Chất liệu: {selectedMaterial}
                    </p>
                  ) : (
                    <p style={{ visibility: "hidden" }}>
                      Chất liệu : {selectedMaterial}
                    </p>
                  )}
                </InControl>
              </Control>
            </RightTwoController>
            <button
              onClick={resetSelections}
              style={{ border: "none", padding: "10px" }}
            >
              Reset
            </button>
          </RightTwo>
          <hr />
          <RightThree>
            <RButtonOne>Thêm vào giỏ</RButtonOne>
            <RButtonTwo onClick={handleFavorite}>
              {favorite ? (
                <>
                  <FavoriteIcon />
                  Xóa khỏi yêu thích
                </>
              ) : (
                <>
                  <FavoriteBorderIcon />
                  Thêm vào yêu thích
                </>
              )}
            </RButtonTwo>
          </RightThree>
        </Right>
      </ItemOne>
      <ItemTwo>
        <ControllerTwo>
          <h1>Thông tin sản phẩm</h1>
          <Action style={{ display: desc ? "block" : "none" }}>
            <p>
              Bước ra khỏi vòng an toàn của mình với đôi bông tai Disney The
              Little Mermaid Seashell đầy cảm xúc của chúng tôi. Mỗi chiếc bông
              tai mạ vàng 14k được tạo hình với những đường rãnh chân thực và
              trang trí bằng viên ngọc trai nhân tạo. Những chiếc bông tai này
              không chỉ là một món trang sức, mà còn là biểu tượng của sự tự do
              và khát vọng khám phá. Hãy thêm chúng vào bộ sưu tập của bạn để
              nhớ rằng thế giới đang chờ đợi bạn khám phá, như một đại dương với
              vô số khả năng và kỳ diệu.
            </p>
            <p>
              <span style={{ fontWeight: "bolder" }}>Mã sản phẩm:</span>{" "}
              262686C01
            </p>
            <p>
              <span style={{ fontWeight: "bolder" }}>Phân loại sản phẩm:</span>{" "}
              Hoa tai
            </p>
            <p>
              <span style={{ fontWeight: "bolder" }}>Kim loại:</span> Bạc
            </p>
            <p>
              <span style={{ fontWeight: "bolder" }}>Chất liệu:</span> Bạc mạ
              vàng 14k
            </p>
            <p>
              <span style={{ fontWeight: "bolder" }}>Màu sắc:</span> Vàng
            </p>
          </Action>
        </ControllerTwo>
        <IconTwo onClick={handleDesc}>
          {desc ? <RemoveIcon /> : <AddIcon />}
        </IconTwo>
      </ItemTwo>
      <hr />
      <CommentController>
        <CommentAction>
        <h1>Đánh giá sản phẩm</h1>
        <IconTwo onClick={handleDisplay}>
        {comdisplay ? <RemoveIcon /> : <AddIcon />}
        </IconTwo>
        </CommentAction>
        <CommentDisplay style={{display: comdisplay ? 'block': 'none'}}>
        <Comment />
        </CommentDisplay>
      </CommentController>
      <hr />
      <FooterProduct>
        <List />
      </FooterProduct>
    </Container>
  );
};

export default ProductBody;