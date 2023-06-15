import React from "react";
import {
  ClockIcon,
  ShoppingCartIcon,
  StarIcon,
  UserIcon,
} from "@heroicons/react/outline";

interface Props {
  title: string;
  image_url: string;
  ratings: number;
  prep_time: number;
  cook_time: number;
  author: string;
  category: string;
  ingredients: string[];
}

export default (props: Props) => {
  return (
    <div className="w-60 card m-5 bg-neutral text-neutral-content">
      <figure>
        <img
          className="object-fit h-60"
          src={props.image_url || "assets/No-Image-Placeholder.png"}
          alt={props.title}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{props.title}</h2>
        <div className="flex">
          <UserIcon className="h-6 w-6" />
          <span className="pl-2">{props.author}</span>
        </div>
        <div className="flex">
          <ClockIcon className="h-6 w-6" />
          <span className="pl-2">
            {props.prep_time}m | {props.cook_time}m
          </span>
        </div>
        <div className="flex">
          <StarIcon className="h-6 w-6" />
          <span className="pl-2">{props.ratings}/5</span>
        </div>
        <div className="flex">
          <ShoppingCartIcon className="h-6 w-6" />
          <span className="pl-2">{props.ingredients.length} ingredients</span>
        </div>
      </div>
    </div>
  );
};
