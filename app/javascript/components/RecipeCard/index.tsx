import React from "react";
import {
  ClockIcon,
  ShoppingCartIcon,
  StarIcon,
  UserIcon,
} from "@heroicons/react/outline";

interface Props {
  title: string;
  ratings: number;
  prepTime: number;
  cookTime: number;
  ingredients: string[];
  image_url?: string;
  author?: string;
}

export default (props: Props) => {
  return (
    <div className="w-60 card bg-neutral text-neutral-content">
      <figure>
        <img
          className="object-fit h-60"
          src={props.image_url || "assets/No-Image-Placeholder.png"}
          alt={props.title}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{props.title}</h2>
        {props.author && (
          <div className="flex">
            <UserIcon className="h-6 w-6" />
            <span className="pl-2">{props.author}</span>
          </div>
        )}
        <div className="flex">
          <ClockIcon className="h-6 w-6" />
          <span className="pl-2">
            {props.prepTime}m | {props.cookTime}m
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
