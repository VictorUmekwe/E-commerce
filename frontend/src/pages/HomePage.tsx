import { Col, Row } from "react-bootstrap";
import { useGetProductsQuery } from "../features/product/productApi";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import LoadingBox from "../components/LoadingBox";
import ProductItem from "../components/ProductItem";

const HomePage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery( );
 
  useEffect(() => {
    if (error) {
      toast.error("Failed to load products. Please try again later.");
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="text-center my-5 display-3">
        <LoadingBox />
      </div>
    );
  }

  return (
    <Row className="">
      {products!.map((product) => (
        <Col key={product.slug} sm={6} md={4} lg={3}>
          <ProductItem product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default HomePage;
