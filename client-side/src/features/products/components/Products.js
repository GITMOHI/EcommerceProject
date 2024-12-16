import React, { Fragment, useEffect, useState, useCallback } from "react";
import {
  Dialog,
  Disclosure,
  Menu,
  Transition,
} from "@headlessui/react";
import { XMarkIcon, ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductsAsync, fetchBrandsAsync, fetchCategoriesAsync, selectAllProducts, selectBrands, selectCategories } from "../productSlice";
import ProductCart from "./ProductCart";
import { useParams } from "react-router-dom";
import { debounce } from "lodash";

const sortOptions = [
  
  { name: "All Products", sort: "all", field:'all', order: "desc", current: false },
  { name: "Best Sellers", sort: "BestSeller",field:'BestSeller', order: "desc", current: false },
  { name: "Best Rating", sort: "rating",field:'rating', order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", field:'price(low)', order: "asc", current: false },
  { name: "Price: High to Low", sort: "price",field:'price(high)', order: "desc", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Products = () => {
  const allProducts = useSelector(selectAllProducts);

  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const [filter, setFilter] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const dispatch = useDispatch();
  // const { id} = useParams();
  const sortField = "";
  





  // useEffect(()=>{
  //   if(allProducts.length>0){
  //     const filtered = allProducts.filter(product => product.category === field);
  //   }
  // },[])



  const [filters, setFilters] = useState([
    {
      id: "brand",
      name: "Brand",
      options: brands?.map(brand => ({ ...brand, checked: false })),
    },
    {
      id: "category",
      name: "Category",
      options: categories?.map(category => ({ ...category, checked: false })),
    },
  ]);

  useEffect(() => {
    setFilters([
      {
        id: "brand",
        name: "Brand",
        options: brands.map(brand => ({ ...brand, checked: false })),
      },
      {
        id: "category",
        name: "Category",
        options: categories.map(category => ({ ...category, checked: false })),
      },
    ]);
  }, [brands, categories]);






  const [selectedFilters, setSelectedFilters] = useState({
    brand: [],
    category: []
  });



  const filterProducts = () => {
    let filteredProducts = allProducts;
    Object.entries(selectedFilters).forEach(([filterKey, selectedValues]) => {
      if (selectedValues.length > 0) {
        filteredProducts = filteredProducts.filter(product => selectedValues.includes(product[filterKey]));
      }
    });
    return filteredProducts;
  };


  const handleFilter = (sectionId, optionValue) => {
    setFilters(prevFilters => {
      const updatedFilters = prevFilters.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            options: section.options.map(option => {
              if (option.value === optionValue) {
                const isChecked = !option.checked;
                updateSelectedFilters(sectionId, optionValue, isChecked);
                return { ...option, checked: isChecked };
              }
              return option;
            })
          };
        }
        return section;
      });
      return updatedFilters;
    });
  };
  
  const updateSelectedFilters = (sectionId, optionValue, isChecked) => {
    setSelectedFilters(prevSelectedFilters => {
      const updatedSelectedFilters = { ...prevSelectedFilters };
      if (isChecked) {
        // Add the option to the selected filters
        if (!updatedSelectedFilters[sectionId].includes(optionValue)) {
          updatedSelectedFilters[sectionId].push(optionValue);
        }
      } else {
        // Remove the option from the selected filters
        updatedSelectedFilters[sectionId] = updatedSelectedFilters[sectionId].filter(value => value !== optionValue);
      }
      return updatedSelectedFilters;
    });

    

  };
  





  const handleSort = (e, option) => {


    sortOptions.forEach(op => {
      // Check if the current sort field matches the sort field of the option
      if (op.field === option.field) {
        // If it matches, set the current property to true
        op.current = true;
      } else {
        // Otherwise, set the current property to false
        op.current = false;
      }
    });

    if(option.sort==='all'){
      setFilter({});
    }
    e.preventDefault();
    const newFilter = { ...filter, _sort: option.sort, _order: option.order };
    setFilter(newFilter);
  };



  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
    dispatch(fetchAllProductsAsync(filter));
  }, [dispatch, filter]);


  useEffect(() => {
    if (sortField === "bestSeller") {
      
      setFilter(prevFilter => {
        const newFilter = { ...prevFilter, _sort: "BestSeller", _order: "desc" };
        dispatch(fetchAllProductsAsync(newFilter));
        return newFilter;
      });
    }
  }, [dispatch, sortField]);




  return (
    <div className="bg-white container mx-auto">
      <div>
        {/* Mobile filter dialog */}
        <Transition show={mobileFiltersOpen}>
          <Dialog className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child enter="transition-opacity ease-linear duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity ease-linear duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child enter="transition ease-in-out duration-300 transform" enterFrom="translate-x-full" enterTo="translate-x-0" leave="transition ease-in-out duration-300 transform" leaveFrom="translate-x-0" leaveTo="translate-x-full">
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button type="button" className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400" onClick={() => setMobileFiltersOpen(false)}>
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    {filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? <MinusIcon className="h-5 w-5" aria-hidden="true" /> : <PlusIcon className="h-5 w-5" aria-hidden="true" />}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input id={`filter-mobile-${section.id}-${optionIdx}`} name={`${section.id}[]`} type="checkbox" checked={option.checked} onChange={() => handleFilter(section.id, option.value)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                    <label htmlFor={`filter-mobile-${section.id}-${optionIdx}`} className="ml-3 min-w-0 flex-1 text-gray-500">{option.label}</label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Products</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  </Menu.Button>
                </div>

                <Transition enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <p onClick={(e) => handleSort(e, option)} href={option.href} className={classNames(option.current ? "font-medium text-gray-900" : "text-gray-500", active ? "bg-gray-100" : "", "block px-4 py-2 text-sm")}>{option.name}</p>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button type="button" className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden" onClick={() => setMobileFiltersOpen(true)}>
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">Products</h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? <MinusIcon className="h-5 w-5" aria-hidden="true" /> : <PlusIcon className="h-5 w-5" aria-hidden="true" />}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input id={`filter-${section.id}-${optionIdx}`} name={`${section.id}[]`} type="checkbox" checked={option.checked} onChange={() => handleFilter(section.id, option.value)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                <label htmlFor={`filter-${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">{option.label}</label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3 grid grid-cols-3 gap-10 space-y-3">
              {filterProducts().map((product) => (
                <ProductCart key={product.id} product={product}></ProductCart>
              ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default React.memo(Products);
