import { cloneElement, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button, Grid, GridProps, IconButton, useTheme } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import Iconify from "./Iconify";

export type Props = {
  children: JSX.Element;
  initialValue?: any;
  childName?: string;
  deleteFunction?: boolean;
  arrayName: string;
  propsOfContainerGrid?: GridProps;
  propsOfClonedElementsGrid?: GridProps;
  minRender?: number;
  minLength?: number;
  propsOfPlusGrid?: GridProps;
  propsOfTrashGrid?: GridProps;
};

const CloneLineTemplate = ({
  children,
  arrayName,
  initialValue,
  deleteFunction,
  childName = "",
  propsOfContainerGrid,
  minLength = 1,
  minRender = 0,
  propsOfClonedElementsGrid,
  propsOfPlusGrid,
  propsOfTrashGrid,
}: Props) => {
  const theme = useTheme();
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: arrayName,
  });

  useEffect(() => {
    if (fields.length < minRender) {
      for (let i = fields.length; i < minRender; i++) {
        append(initialValue);
      }
    }
  }, [fields.length]);

  return (
    <Grid {...propsOfContainerGrid} spacing={2} container item>
      {fields.map((field: any, i: any) => {
        const newComponent = cloneElement(children, {
          name: `${arrayName}[${i}]${childName}`,
          key: `${arrayName}[${i}]${childName}`,
          index: i,
        });
        const component = deleteFunction ? (
          <>
            {newComponent}
            <Button
              onClick={() => {
                remove(i);
              }}
            />
          </>
        ) : (
          newComponent
        );
        return (
          <Grid {...propsOfClonedElementsGrid} container item key={field.id}>
            {component}
            {fields.length > minLength && (
              <Grid
                item
                container
                xs={1}
                {...propsOfTrashGrid}
                key={field.id + "trashGrid"}
              >
                <Grid mt={1} item>
                  <IconButton
                    onClick={() => {
                      remove(i);
                    }}
                    key={field.id + "trashButtom"}
                    color="primary"
                  >
                    <Iconify
                      icon="mdi:delete-circle-outline"
                      color={"red"}
                      key={field.id + "trashGrid"}
                    />
                  </IconButton>
                </Grid>
              </Grid>
            )}
          </Grid>
        );
      })}
      <Grid
        container
        justifyContent="flex-end"
        item
        xs={11}
        {...propsOfPlusGrid}
      >
        <IconButton
          sx={{
            float: "right",
            alignSelf: "flex-end",
            justifySelf: "flex-end",
          }}
          onClick={() => {
            append(initialValue);
          }}
          color="primary"
        >
          <Iconify icon="icons8:plus" color={"blueviolet"} />
        </IconButton>
      </Grid>
    </Grid>
  );
};
export default CloneLineTemplate;
