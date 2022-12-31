import { FC } from "react";
import { Header, Image, SemanticSIZES } from "semantic-ui-react";
import "./styles.scss";

const EmptyState: FC<{
  imageSize: SemanticSIZES;
  sectorName: string;
  headerSize: string;
}> = (props: {
  imageSize: SemanticSIZES;
  sectorName: string;
  headerSize: string;
}) => {
  const { imageSize, sectorName, headerSize } = props;

  return (
    <div className="no-data-container">
      <Image
        alt="No Data"
        src="/assets/images/nodata.PNG"
        size={imageSize}
        className="no-data-container__image"
      />
      <Header as={headerSize}>No {sectorName} Found</Header>
    </div>
  );
};

export default EmptyState;
