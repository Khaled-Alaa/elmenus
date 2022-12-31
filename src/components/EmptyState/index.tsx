import { FC } from "react";
import { Header, Image, SemanticSIZES } from "semantic-ui-react";

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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Image
        alt="No Data"
        src="/assets/images/nodata.PNG"
        style={{ margin: "auto" }}
        size={imageSize}
      />
      <Header as={headerSize}>No {sectorName} Found</Header>
    </div>
  );
};

export default EmptyState;
