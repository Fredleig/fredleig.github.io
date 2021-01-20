import React, {useCallback, useState} from "react";
import {Form} from "react-bootstrap";
import {TValidation} from "../../utils/validation";

interface IFormItemProps {
  onChange: (ev: React.ChangeEvent<HTMLInputElement>, isValid: boolean) => void;
  label: React.ReactNode;
  description?: React.ReactNode
  validate?: TValidation
}

const FormItem:React.FC<IFormItemProps> = (props) => {
  const {onChange, label, description, validate} = props;
  const [isValid, setIsValid] = useState(true);

  const handleChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    if(!validate?.validate(ev.target.value)) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
    onChange(ev, isValid)
  }, [isValid, onChange, validate])

  return (
      <>
        <Form.Label>{label}</Form.Label>
        <Form.Control onChange={handleChange} />
        {description && isValid &&
        <Form.Text className="text-muted">
          {description}
        </Form.Text>}
        {!isValid && <Form.Text className="text-muted">
          {validate?.text}
        </Form.Text>}
      </>
  )
}

export default React.memo(FormItem)
