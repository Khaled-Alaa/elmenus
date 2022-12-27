import { FC } from "react";
import { useQuery } from "react-query";
import { getCategoriesService } from "../../services";

const RestaurantPage: FC = () => {
  const { data, error } = useQuery(["categries"], getCategoriesService, {
    retry: 0,
    onError: (error: Error) => alert(error.message),
  });

  return <div className="page-container">menu page (Home)</div>;
};

export default RestaurantPage;
