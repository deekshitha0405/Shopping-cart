import React from "react";
import { useForm, Controller } from "react-hook-form";
import "./form.css";

import Button from "../Button/Button";
import { usePopup } from "react-custom-popup";

export default function Form({ fields, onSubmit }) {
  const { handleSubmit, control, reset } = useForm();
  const { hideModal } = usePopup();
  const handleData = (data) => {
    hideModal();
    onSubmit(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleData)} className="form">
        <h2>Add Product Details</h2>
        {fields.map((el, index) => (
          <Controller
            key={index}
            name={el.name}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div className="form-field">
                <label className="label">{el.label}:</label>
                {el.type == "textarea" ? (
                  <textarea
                    placeholder={el.placeHolder}
                    defaultValue={el.defaultValue}
                    {...field}
                  />
                ) : el.type == "select" ? (
                  <select name={el.name} {...field}>
                    <option value="" selected disabled>
                      Select the category
                    </option>

                    {el?.data?.map((item) => (
                      <option
                        value={item.value}
                        key={item.id}
                        selected={el.defaultValue == item.value}
                      >
                        {item.value}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={el.type}
                    placeholder={el.placeHolder}
                    min={0}
                    defaultValue={el.defaultValue}
                    {...field}
                  />
                )}
              </div>
            )}
          />
        ))}
        <div className="mt-2">
          <Button btnName="Submit" />
        </div>
      </form>
    </div>
  );
}
