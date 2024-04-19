import React from 'react';
import { Button } from 'primereact/button';
import { useRef, useState } from 'react';
import _ from 'lodash';
import { IButton } from './button.model';
import { BUTTON_TYPE } from './button.enum';

const AppButton = (props: IButton) => {
  const { type, onClick, className, onMouseDown, disabled, label } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const tooltipOptions: any = {
    position: 'bottom',
    style: {
      fontSize: '0.8rem',
    },
  };

  const lockButton = useRef<any>(
    _.debounce(() => {
      setLoading(true);
    }),
  );

  const unLockButton = useRef<any>(
    _.debounce(() => {
      setLoading(false);
    }, 1000),
  );

  const handleOnClick = (e: any) => {
    lockButton.current();
    unLockButton.current();
    if (onClick) onClick(e);
  };

  const isLoading = () => disabled || loading;

  const renderSwitch = (type: string) => {
    switch (type) {
      case `${BUTTON_TYPE.CHECK}`:
        return (
          <Button
            label={label}
            disabled={isLoading()}
            icon={isLoading() ? 'pi pi-spin pi-spinner' : 'pi pi-check'}
            className="p-button"
            onClick={onClick || handleOnClick}
          />
        );

      case `${BUTTON_TYPE.SECONDARY}`:
        return (
          <Button
            label={label}
            severity="secondary"
            className={`p-button ${className} `}
            onClick={onClick}
          />
        );

      case `${BUTTON_TYPE.SUCCESS}`:
        return (
          <Button
            label={label}
            severity="success"
            disabled={disabled}
            onClick={onClick}
            rounded
          />
        );

      case `${BUTTON_TYPE.PRIMARY}`:
        return (
          <Button
            label={label}
            disabled={isLoading()}
            icon={isLoading() ? 'pi pi-spin pi-spinner' : ''}
            className={`p-button ${className}`}
            onClick={onClick || handleOnClick}
          />
        );

      case `${BUTTON_TYPE.CANCEL}`:
        return (
          <Button
            label={label}
            type="button"
            icon="pi pi-times"
            onClick={onClick}
          />
        );
      case `${BUTTON_TYPE.DELETE}`:
        return (
          <Button
            icon="pi pi-trash"
            className={`p-button-secondary ml-1 ${className}`}
            type="button"
            onClick={onClick}
            tooltip="Delete"
            tooltipOptions={tooltipOptions}
          />
        );

      case `${BUTTON_TYPE.PERMISSION}`:
        return (
          <Button
            icon="pi pi-shield"
            className={'bg-cyan-500 border-cyan-500 ml-2'}
            rounded
            type="button"
            onClick={onClick}
            tooltip="Permission"
            tooltipOptions={tooltipOptions}
          />
        );

      case `${BUTTON_TYPE.NEXT}`:
        return (
          <Button
            icon="pi pi-arrow-right"
            className={`p-button-secondary ${className}`}
            onClick={onClick}
            tooltip="Next"
            tooltipOptions={tooltipOptions}
          />
        );
      case `${BUTTON_TYPE.PREVIOUS}`:
        return (
          <Button
            icon="pi pi-arrow-left"
            className={`p-button-secondary  ${className}`}
            onClick={onClick}
            tooltip="Previous"
            tooltipOptions={tooltipOptions}
          />
        );

      case `${BUTTON_TYPE.BACK}`:
        return (
          <Button
            icon="pi pi-arrow-left"
            className={`mr-2 p-button-text p-button-secondary ${className}`}
            onClick={onClick}
          />
        );

      case `${BUTTON_TYPE.ADD}`:
        return (
          <Button
            label={label}
            icon="pi pi-plus"
            className={`p-button ${className}`}
            tooltip={label ? '' : 'Create'}
            tooltipOptions={tooltipOptions}
            type="button"
            onMouseDown={onMouseDown}
            onClick={onClick}
          />
        );

      case `${BUTTON_TYPE.EDIT}`:
        return (
          <Button
            label={label}
            icon="pi pi-pencil"
            className={`p-button mr-1 ${className}`}
            tooltip={label ? '' : 'Edit'}
            tooltipOptions={tooltipOptions}
            onClick={onClick}
          />
        );

      default:
        throw new Error('Button type does not exist');
    }
  };

  return <>{renderSwitch(type)}</>;
};

export default AppButton;


