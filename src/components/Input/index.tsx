import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
} from "react";
import { TextInputProps, Text } from "react-native";
import { useField } from "@unform/core";

import { Container, TextInput, TextError } from "./styles";

interface InputProps extends TextInputProps {
  name: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, onChangeText, ...rest },
  ref
) => {
  const inputElementRef = useRef<any>(null);

  const { fieldName, registerField, defaultValue = "", error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useEffect(() => {
    if (inputValueRef.current) inputValueRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      getValue() {
        if (inputValueRef.current) return inputValueRef.current.value;

        return "";
      },
      setValue(ref, value) {
        if (inputValueRef.current) {
          inputElementRef.current.setNativeProps({ text: value });
          inputValueRef.current.value = value;
        }
      },
      clearValue() {
        if (inputValueRef.current) {
          inputElementRef.current.setNativeProps({ text: "" });
          inputValueRef.current.value = "";
        }
      },
    });
  }, [fieldName, registerField]);

  const handleChangeText = useCallback(
    (value: string) => {
      if (inputValueRef.current) inputValueRef.current.value = value;

      if (onChangeText) onChangeText(value);
    },
    [onChangeText]
  );

  return (
    <>
      <Container isFocused={isFocused}>
        <TextInput
          ref={inputElementRef}
          placeholderTextColor="#919AA3"
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChangeText={handleChangeText}
          {...rest}
        />
      </Container>
      {error && <TextError isFocused={!!isFocused}>{error}</TextError>}
    </>
  );
};

export default forwardRef(Input);
