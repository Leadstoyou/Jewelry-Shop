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
  padding: 5px;
  border: none;
`;
const TextInDropdown = styled.option``;
const TextSearch = styled.div``;

const Controller = styled.div`
  display: grid;
  grid-template-columns: 24.125% 24.125% 24.125% 24.125%;
  gap: 1%;
`;
const PagingController = styled.div`
  margin-top: 10%;
  margin-bottom: 3%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CollectionsCategory = (props) => {
  const { products, materialArray, colorsArray, fetchData } = props;
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
    setSelectedColor(color);
    setSelectedMaterial(material);
    setSelectedPrice(price);
    setSelectedSort(sort);

    fetchData(color, material, JSON.parse(price), JSON.parse(sort));
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
              handleSelected(
                e.target.value,
                selectedMaterial,
                selectedPrice,
                selectedSort
              )
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
            onChange={(e) =>
              handleSelected(
                selectedColor,
                e.target.value,
                selectedPrice,
                selectedSort
              )
            }
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
              handleSelected(
                selectedColor,
                selectedMaterial,
                e.target.value,
                selectedSort
              )
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
              handleSelected(
                selectedColor,
                selectedMaterial,
                selectedPrice,
                e.target.value
              )
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
      <Controller data-aos="fade-up">
        {foundProducts?.map((product, index) => (
          <Product product={product} key={index} />
        ))}
      </Controller>
      <PagingController data-aos="fade-up">
        {/* <Pagination>
          <Pagination.Prev linkStyle={{ color: "black" }} />
          <Pagination.Item
            linkStyle={{ color: "white", backgroundColor: "#3b3b3b" }}
            disabled
          >
            {1}
          </Pagination.Item>
          <Pagination.Item linkStyle={{ color: "black" }}>{2}</Pagination.Item>
          <Pagination.Item linkStyle={{ color: "black" }}>{3}</Pagination.Item>
          <Pagination.Item linkStyle={{ color: "black" }}>{4}</Pagination.Item>
          <Pagination.Item linkStyle={{ color: "black" }}>{5}</Pagination.Item>
          <Pagination.Item linkStyle={{ color: "black" }}>{6}</Pagination.Item>
          <Pagination.Item linkStyle={{ color: "black" }}>{7}</Pagination.Item>
          <Pagination.Next linkStyle={{ color: "black" }} />
        </Pagination> */}
      </PagingController>
    </Container>
  );
};

export default CollectionsCategory;
