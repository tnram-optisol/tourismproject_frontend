import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid3x3 } from "@mui/icons-material";
import { Button, Grid, ListItem, Select } from "@mui/material";
import { ErrorMessage, Field, useField } from "formik";
import React, { useState } from "react";
import TextError from "./TextError";

function OptionsControl(props) {
  const { label, name } = props;
  const [field, meta, helpers] = useField(props);
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);
  const [infant, setInfant] = useState(0);
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              label="Age"
              name="maxPerson"
              className="form-control"
              onClick={(event) =>
                setFieldValue(name, adult + children + infant)
              }
            >
              <ListItem value={value}>{value} guests</ListItem>
              <ListItem value={15}>
                <Grid container spacing={1}>
                  <Grid item xs={5}>
                    <Grid item xs={6}>
                      Adults
                    </Grid>
                    <Grid item xs={6}>
                      Ages : 13+
                    </Grid>
                  </Grid>
                  <Grid item xs={7}>
                    <Button
                      disabled={adult >= 5 ? true : false}
                      type="button"
                      className=" m-2"
                      onClick={() => setAdult(adult + 1)}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    {adult}
                    <Button
                      type="button"
                      className=" m-2"
                      disabled={adult === 0 ? true : false}
                      onClick={() => setAdult(adult - 1)}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </Button>{" "}
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem value={14}>
                <Grid container spacing={1}>
                  <Grid item xs={5}>
                    <Grid item xs={6}>
                      Children
                    </Grid>
                    <Grid item xs={6}>
                      Ages : 2 -12
                    </Grid>
                  </Grid>
                  <Grid item xs={7}>
                    <Button
                      disabled={children >= 2 ? true : false}
                      type="button"
                      className=" m-2"
                      onClick={() => setChildren(children + 1)}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    {children}
                    <Button
                      type="button"
                      className=" m-2"
                      disabled={children === 0 ? true : false}
                      onClick={() => setChildren(children - 1)}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </Button>{" "}
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem value={10}>
                <Grid container spacing={1}>
                  <Grid item xs={5}>
                    <Grid item xs={6}>
                      Infants
                    </Grid>
                    <Grid item xs={6}>
                      Ages : 0-2
                    </Grid>
                  </Grid>
                  <Grid item xs={7}>
                    <Button
                      disabled={infant >= 2 ? true : false}
                      type="button"
                      className=" m-2"
                      onClick={() => setInfant(infant + 1)}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    {infant}
                    <Button
                      disabled={infant === 0 ? true : false}
                      type="button"
                      className=" m-2"
                      onClick={() => setInfant(infant - 1)}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </Button>{" "}
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                This place has a maximum of 5 guests, not including infants.
              </ListItem>
            </Select>
          )}}
      </Field>
      {meta.error && meta.touched ? (
        <ErrorMessage name={name} component={TextError} />
      ) : null}
    </div>
  );
}

export default OptionsControl;
