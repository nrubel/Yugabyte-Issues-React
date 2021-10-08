import React, {FC} from 'react';

const SortIcon: FC<{size?: number}> = ({size = 22}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size * (20/22)} viewBox="0 0 22 20" fill="none">
      <path id="Vector" d="M11.0443 5.82488L9.55273 7.31644L6.87763 4.64134V18.5359H4.76792V4.64134L2.09387 7.31644L0.601257 5.82488L5.82278 0.603363L11.0443 5.82488ZM21.5928 14.3692L16.3713 19.5907L11.1498 14.3692L12.6413 12.8776L15.3175 15.5527L15.3164 1.65822H17.4262V15.5527L20.1013 12.8776L21.5928 14.3692Z" fill="#727272"/>
    </svg>
  );
};

export default SortIcon;