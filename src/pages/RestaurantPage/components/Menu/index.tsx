import { FC } from "react";
import { Item, Label, Container } from "semantic-ui-react";
import { TCategoryItem } from "../../../../interfaces";

const MenuItem: FC<{
  data: TCategoryItem;
}> = (props: { data: TCategoryItem }) => {
  const { data } = props;

  return (
    <Item>
      <Item.Image size="tiny" src={data.image} />
      <Item.Content>
        <Item.Header>{data.name}</Item.Header>
        <Item.Meta>{data.description}</Item.Meta>
        <Item.Extra>
          <Container textAlign="right">
            <Label size="large">{`${data.price} EGP`}</Label>
          </Container>
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default MenuItem;
