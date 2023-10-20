import React, { useEffect, useRef } from "react";
import { Slider } from "@mui/material";
import FieldWrapper from "./FieldWrapper";
import { autoFocus, getComponentProps } from "../utils";

export default function SliderView(props) {
  const { data, onChange, path, schema } = props;
  const sliderRef = useRef<HTMLInputElement>(null);
  const focus = autoFocus(props);
  const { min = 0, max = 100, multipleOf = 1 } = schema;

  useEffect(() => {
    if (sliderRef.current && focus) {
      sliderRef.current.querySelector("input")?.focus();
    }
  }, [sliderRef, focus]);

  return (
    <FieldWrapper {...props}>
      <Slider
        min={min}
        max={max}
        step={multipleOf}
        disabled={schema.view?.readOnly}
        valueLabelDisplay="auto"
        value={data ?? schema.default}
        onChange={(e, value) => {
          onChange(path, value);
        }}
        ref={sliderRef}
        {...getComponentProps(props, "slider")}
      />
    </FieldWrapper>
  );
}
