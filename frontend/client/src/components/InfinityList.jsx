import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import Grid from "./Grid";
import ProductCard from "./ProductCard";

const InfinityList = (props) => {
  const perLoad = 6; // items each load

  const listRef = useRef(null);

  const [data, setData] = useState([]);

  const [load, setLoad] = useState(true);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    setData(props.data.slice(0, perLoad));
    setIndex(1);
  }, [props.data]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (listRef && listRef.current) {
        if (
          window.scrollY + window.innerHeight >=
          listRef.current.clientHeight + listRef.current.offsetTop + 500
        ) {
          console.log("bottom reach");
          setLoad(true);
        }
      }
    });
    // clean up
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, [listRef]);

  useEffect(() => {
    const getItems = () => {
      const pages = Math.floor(props.data.length / perLoad);
      const maxIndex = props.data.length % perLoad === 0 ? pages : pages + 1;

      if (load && index <= maxIndex) {
        const start = perLoad * index;
        const end = start + perLoad;

        setData(data.concat(props.data.slice(start, end)));
        setIndex(index + 1);
      }
    };
    getItems();
    setLoad(false);
  }, [load, index, data, props.data]);

  return (
    <div ref={listRef}>
      <Grid col={3} mdCol={2} smCol={1} gap={20}>
        {data.map((item, index) => {
          return (
            <ProductCard
              key={item._id}
              img01={item.images[0].image_url}
              img02={item.images[1]?.image_url}
              name={item.name}
              price={Number(item.price)}
              slug={item.slug}
            />
          );
        })}
      </Grid>
    </div>
  );
};

InfinityList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default InfinityList;
