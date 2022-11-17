import React, { useCallback, useState, useEffect, useRef } from "react";

import Helmet from "../components/Helmet";
import CheckBox from "../components/CheckBox";

import productData from "../utils/products";
// import category from "../assets/fake-data/category";
import colors from "../assets/fake-data/product-color";
import size from "../assets/fake-data/product-size";
import Button from "../components/Button";
import InfinityList from "../components/InfinityList";
import { useSelector } from "react-redux";

const Catalog = () => {
  const initFilter = {
    category: [],
    color: [],
    size: [],
  };
  const productList = useSelector((state) => state.products?.products || []);
  const category = useSelector((state) => state.categories?.categories || []);

  const [products, setProducts] = useState(productList);

  const [filter, setFilter] = useState(initFilter);

  const filterSelect = (type, checked, item) => {
    if (checked) {
      switch (type) {
        case "CATEGORY":
          setFilter({
            ...filter,
            category: [...filter.category, item.categorySlug],
          });
          break;
        case "COLOR":
          setFilter({ ...filter, color: [...filter.color, item.color] });
          break;
        case "SIZE":
          setFilter({ ...filter, size: [...filter.size, item.size] });
          break;
        default:
      }
    } else {
      switch (type) {
        case "CATEGORY":
          const newCategory = filter.category.filter(
            (e) => e !== item.categorySlug
          );
          setFilter({ ...filter, category: newCategory });
          break;
        case "COLOR":
          const newColor = filter.color.filter((e) => e !== item.color);
          setFilter({ ...filter, color: newColor });
          break;
        case "SIZE":
          const newSize = filter.size.filter((e) => e !== item.size);
          setFilter({ ...filter, size: newSize });
          break;
        default:
      }
    }
  };

  const clearFilter = () => setFilter(initFilter);

  const updateProducts = useCallback(() => {
    let temp = productList;

    if (filter.category.length > 0) {
      temp = temp.filter((e) => filter.category.includes(e.category_id.slug));
    }

    if (filter.color.length > 0) {
      temp = temp.filter((e, index) => {
        // filter color in product_options
        const color = e.product_options.filter((e) =>
          filter.color.includes(e.color)
        );
        return color.length > 0;
      });
    }

    if (filter.size.length > 0) {
      temp = temp.filter((e) => {
        const size = e.product_options.filter((e) =>
          filter.size.includes(e.size)
        );
        return size.length > 0;
      });
    }

    setProducts(temp);
  }, [filter, productList]);

  useEffect(() => {
    updateProducts();
  }, [updateProducts]);

  const filterRef = useRef(null);

  const showHideFilter = () => filterRef.current.classList.toggle("active");

  return (
    <Helmet title="Sản phẩm">
      <div className="catalog">
        <div className="catalog__filter" ref={filterRef}>
          <div
            className="catalog__filter__close"
            onClick={() => showHideFilter()}
          >
            <i className="bx bx-left-arrow-alt"></i>
          </div>
          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">
              danh mục sản phẩm
            </div>
            <div className="catalog__filter__widget__content">
              {category.map((item, index) => {
                const itemNew = {
                  display: item.name,
                  categorySlug: item.slug,
                };
                return (
                  <div
                    key={item._id}
                    className="catalog__filter__widget__content__item"
                  >
                    <CheckBox
                      label={item.name}
                      onChange={(input) =>
                        filterSelect("CATEGORY", input.checked, itemNew)
                      }
                      checked={filter.category.includes(item.slug)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">màu sắc</div>
            <div className="catalog__filter__widget__content">
              {colors.map((item, index) => (
                <div
                  key={index}
                  className="catalog__filter__widget__content__item"
                >
                  <CheckBox
                    label={item.display}
                    onChange={(input) =>
                      filterSelect("COLOR", input.checked, item)
                    }
                    checked={filter.color.includes(item.color)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">kích cỡ</div>
            <div className="catalog__filter__widget__content">
              {size.map((item, index) => (
                <div
                  key={index}
                  className="catalog__filter__widget__content__item"
                >
                  <CheckBox
                    label={item.display}
                    onChange={(input) =>
                      filterSelect("SIZE", input.checked, item)
                    }
                    checked={filter.size.includes(item.size)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__content">
              <Button size="sm" onClick={clearFilter}>
                xóa bộ lọc
              </Button>
            </div>
          </div>
        </div>
        <div className="catalog__filter__toggle">
          <Button size="sm" onClick={() => showHideFilter()}>
            bộ lọc
          </Button>
        </div>
        <div className="catalog__content">
          <InfinityList data={products} />
        </div>
      </div>
    </Helmet>
  );
};

export default Catalog;
