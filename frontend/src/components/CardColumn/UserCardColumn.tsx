import React, { memo, forwardRef, ReactNode } from 'react';
import './UserCardColumn.scss';

interface Props {
  children?: ReactNode;
  type: 'submit' | 'button';
}
export type Ref = HTMLButtonElement;

const UserCardColumn = memo(
  forwardRef(({ user, checkedState, popupHandler, imageSrc }, ref) => {
    const props = {
      name: user?.name,
      department: user?.department,
      id: `${user?.memberId} column`,
      checkedState: checkedState,
      popupHandler: popupHandler,
      imageSrc: imageSrc,
      ref,
    };

    return <UserCardColumnView {...props} />;
  })
);

const UserCardColumnView = forwardRef(
  ({ name, department, id, checkedState, popupHandler, imageSrc }, ref) => {
    return (
      <div className="card-column" ref={ref}>
        <input
          type="checkbox"
          name={id}
          id={id}
          checked={checkedState}
          onChange={popupHandler}
        />
        <label className="card-column__label" htmlFor={id}>
          <img
            className="card-column__profile"
            loading="lazy"
            src={imageSrc}
            alt="save-profile"
          />

          <div className="card-column__text-wrap">
            <span className="card-column__name">{name}</span>
            <span className="card-column__major">{department}</span>
          </div>
        </label>
      </div>
    );
  }
);

export default UserCardColumn;
