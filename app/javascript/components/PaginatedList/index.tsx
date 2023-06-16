import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/outline";
import React from "react";
import ReactPaginate from "react-paginate";

interface Props<T> {
  data: T[];
  count: number;
  limit: number;
  item: (datum: T) => React.ReactNode;
  onPageChange: (page: number) => void;
}

export default <T,>(props: Props<T>) => {
  const handlePageChange = (selectedItem: { selected: number }) => {
    props.onPageChange(selectedItem.selected);
  };

  return (
    <>
      <div className="flex flex-row flex-wrap justify-center">
        {props.data.map((datum) => props.item(datum))}
      </div>
      <div className="flex flex-row justify-center">
        <ReactPaginate
          className="join fixed bottom-0"
          activeLinkClassName="bg-black"
          pageLinkClassName="join-item btn btn-square no-animation"
          previousClassName="join-item btn btn-square no-animation"
          nextClassName="join-item btn btn-square no-animation"
          breakClassName="join-item btn btn-square no-animation"
          pageCount={Math.ceil(props.count / props.limit)}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          nextLabel={<ArrowRightIcon className="h-6 w-6" />}
          previousLabel={<ArrowLeftIcon className="h-6 w-6" />}
        />
      </div>
    </>
  );
};
