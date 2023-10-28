import styled from "styled-components";
import newest from "../../assets/new.jpg";
import love from "../../assets/love.jpg";
import Pagination from "react-bootstrap/Pagination";
import family from "../../assets/family.jpg";
import PageItem from "react-bootstrap/PageItem";
import "bootstrap/dist/css/bootstrap.min.css";
import Product from "../collections/Product";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Container = styled.div``;
const Up = styled.div`
  background-color: #c1c1c1;
  height: 50px;
  width: 100%;
`;
const Text = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Bottom = styled.div`
  margin-top: 1%;
  margin-left: 6vw;
  display: flex;
  align-items: center;
  justify-content: start;
`;
const Item = styled.div`
  display: flex;
  flex-direction: column;

  margin-right: 20px;
`;
const ImageController = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Image = styled.img`
  cursor: pointer;
  border-radius: 50%;
  height: 100px;
  width: 100%;
`;
const TextController = styled.div``;
const TextNew = styled.p`
  cursor: pointer;
  text-align: center;
`;
const SearchController = styled.div`
  /* margin-top:2%; */
  margin-bottom: 2%;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ItemOne = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
const DropdownOne = styled.select`
  outline: none;
  padding: 5px;
  border: 5px solid #cecccc;
`;
const TextInDropdown = styled.option``;
const TextSearch = styled.div``;

const Controller = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 24.125% 24.125% 24.125% 24.125%;
  gap: 1%;
  margin-top: ${({ length }) => (length > 0 ? "0px" : "10%")};
  margin-bottom: ${({ length }) => (length > 0 ? "0px" : "10%")};
`;
const PagingController = styled.div`
  margin-bottom: 2%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CollectionsCategory = (props) => {
  const {
    products,
    materialArray,
    colorsArray,
    color,
    material,
    price,
    sort,
    searchName,
    setColor,
    setMaterial,
    setPrice,
    setSort,
    filterPro,
  } = props;
  const navigate = useNavigate();
  const [foundProducts, setFoundProducts] = useState();
  const [colorsArrayTemp, setColorsArrayTemp] = useState(colorsArray);
  const [materialArrayTemp, setMaterialArrayTemp] = useState(materialArray);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(
    JSON.stringify({
      minPrice: 0,
      maxPrice: 100000000,
    })
  );
  const [selectedSort, setSelectedSort] = useState(JSON.stringify({}));
  useEffect(() => {
    setFoundProducts(products);
    setColorsArrayTemp(colorsArray);
    setMaterialArrayTemp(materialArray);

    Aos.init({ duration: 2000 });
  }, [products]);

  const handleSelected = (color, material, price, sort) => {
    console.log(color, material, price, sort);

    setColor(color);
    setMaterial(material);
    setPrice(price);
    setSort(sort);
  };
  return (
    <Container>
      <Up data-aos="fade-up">
        <Text>
          <p
            style={{
              fontWeight: "bolder",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            Xem ngay các dòng sản phẩm đang hot
          </p>
        </Text>
      </Up>
      <Bottom data-aos="fade-up">
        <Item
          onClick={() => {
            navigate("/collections");
          }}
        >
          <ImageController>
            <Image src={newest} />
          </ImageController>
          <TextController>
            <TextNew>Hàng mới về</TextNew>
          </TextController>
        </Item>
      </Bottom>
      <hr data-aos="fade-up" />
      <SearchController data-aos="fade-up">
        <ItemOne>
          <DropdownOne
            onChange={(e) =>
              handleSelected(e.target.value, material, price, sort)
            }
          >
            <TextInDropdown value="" selected>
              Màu sắc
            </TextInDropdown>
            {colorsArrayTemp?.map((color, index) => (
              <TextInDropdown
                key={index}
                style={{
                  backgroundColor: color,
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                  margin: "5px",
                  border: selectedColor === color ? "2px solid black" : "none",
                }}
                value={color}
              >
                {color}
              </TextInDropdown>
            ))}
          </DropdownOne>

          <DropdownOne
            onChange={(e) => handleSelected(color, e.target.value, price, sort)}
          >
            <TextInDropdown selected value="">
              Chất Liệu
            </TextInDropdown>
            {materialArrayTemp?.map((material, index) => (
              <TextInDropdown
                key={index}
                style={{
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                  margin: "5px",
                  border:
                    selectedMaterial === material ? "2px solid black" : "none",
                }}
                value={material}
              >
                {material}
              </TextInDropdown>
            ))}
          </DropdownOne>
          <DropdownOne
            onChange={(e) =>
              handleSelected(color, material, e.target.value, sort)
            }
          >
            <TextInDropdown
              selected
              value={JSON.stringify({
                minPrice: 0,
                maxPrice: 100000000,
              })}
            >
              Giá
            </TextInDropdown>
            <TextInDropdown
              value={JSON.stringify({
                minPrice: 0,
                maxPrice: 1000000,
              })}
            >
              0 -- 1.0000.000đ
            </TextInDropdown>
            <TextInDropdown
              value={JSON.stringify({
                minPrice: 1000001,
                maxPrice: 2000000,
              })}
            >
              1.000.001 -- 2.0000.000đ
            </TextInDropdown>
            <TextInDropdown
              value={JSON.stringify({
                minPrice: 2000001,
                maxPrice: 3000000,
              })}
            >
              2.000.001 -- 3.0000.000đ
            </TextInDropdown>
            <TextInDropdown
              value={JSON.stringify({
                minPrice: 3000001,
                maxPrice: 4000000,
              })}
            >
              3.000.001 -- 4.0000.000đ
            </TextInDropdown>
            <TextInDropdown
              value={JSON.stringify({
                minPrice: 4000001,
                maxPrice: 100000000000,
              })}
            >
              Trên 4.000.000 đ
            </TextInDropdown>
          </DropdownOne>
        </ItemOne>
        <ItemOne>
          <TextSearch>Sắp xếp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</TextSearch>
          <DropdownOne
            onChange={(e) =>
              handleSelected(color, material, price, e.target.value)
            }
          >
            <TextInDropdown selected value={JSON.stringify({})}>
              Mặc định
            </TextInDropdown>
            <TextInDropdown value={JSON.stringify({ updatedAt: 1 })}>
              Cũ nhất
            </TextInDropdown>
            <TextInDropdown value={JSON.stringify({ updatedAt: -1 })}>
              Mới nhất
            </TextInDropdown>
            <TextInDropdown value={JSON.stringify({ productPrice: 1 })}>
              Giá tăng dần
            </TextInDropdown>
            <TextInDropdown value={JSON.stringify({ productPrice: -1 })}>
              Giá giảm dần
            </TextInDropdown>
            <TextInDropdown value={JSON.stringify({ productName: 1 })}>
              Tên A-Z
            </TextInDropdown>
            <TextInDropdown value={JSON.stringify({ productName: -1 })}>
              Tên Z-A
            </TextInDropdown>
          </DropdownOne>
        </ItemOne>
      </SearchController>
      <Controller data-aos="fade-up" length={foundProducts?.length}>
        {foundProducts ? (
          foundProducts?.map((product, index) => (
            <Product product={product} key={index} />
          ))
        ) : (
          <div style={{ position: "absolute", right: "25%" }}>
            <h1>Not found product you have just filtered !!!</h1>
          </div>
        )}
      </Controller>
      <PagingController data-aos="fade-up"></PagingController>
    </Container>
  );
};

export default CollectionsCategory;
